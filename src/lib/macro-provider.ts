export interface MacroIndicatorDetail {
  value: number;
  formattedValue: string;
  unit: string;
  referenceDate?: string;
  referenceMonth?: string;
  status: "official" | "stale" | "error";
}

export interface MacroDataResponse {
  selic: MacroIndicatorDetail;
  ipca12m: MacroIndicatorDetail;
  fetchedAt: string;
  hasError: boolean;
}

const MACRO_CACHE_VERSION = "v2";

// Server memory cache to preserve last valid official values across API timeouts
let macroMemoryCache: {
  data: MacroDataResponse | null;
  selicFetchedAt: number;
  ipcaFetchedAt: number;
} = {
  data: null,
  selicFetchedAt: 0,
  ipcaFetchedAt: 0,
};

function getBrasiliaDateParts(d: Date = new Date()) {
  const parts = new Intl.DateTimeFormat("pt-BR", {
    timeZone: "America/Sao_Paulo",
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  }).formatToParts(d);

  const day = parts.find((p) => p.type === "day")?.value || "01";
  const month = parts.find((p) => p.type === "month")?.value || "01";
  const year = parts.find((p) => p.type === "year")?.value || "2026";
  return { day, month, year, dateStr: `${day}/${month}/${year}` };
}

function getBrasiliaFullTimestamp(): string {
  const d = new Date();
  const dateStr = new Intl.DateTimeFormat("pt-BR", {
    timeZone: "America/Sao_Paulo",
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  }).format(d);

  const timeStr = new Intl.DateTimeFormat("pt-BR", {
    timeZone: "America/Sao_Paulo",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  }).format(d);

  return `${dateStr} às ${timeStr}`;
}

// Convert "01/07/2026" to "Jul/2026"
function formatMonthYearReference(dateStr: string): string {
  const [day, month, year] = dateStr.split("/");
  const monthNames = [
    "Jan", "Fev", "Mar", "Abr", "Mai", "Jun",
    "Jul", "Ago", "Set", "Out", "Nov", "Dez"
  ];
  const mIndex = parseInt(month, 10) - 1;
  const monthName = monthNames[mIndex] || month;
  return `${monthName}/${year}`;
}

// Fetch Meta Selic Vigente from BCB SGS 432
async function fetchOfficialSelic(): Promise<MacroIndicatorDetail> {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 7000); // 7s timeout

  try {
    const todayObj = new Date();
    const { day, month, year, dateStr: dEnd } = getBrasiliaDateParts(todayObj);

    // Window of 180 days to find recent rate decision
    const pastObj = new Date(todayObj.getTime() - 180 * 86400000);
    const { dateStr: dStart } = getBrasiliaDateParts(pastObj);

    const url = `https://api.bcb.gov.br/dados/serie/bcdata.sgs.432/dados?formato=json&dataInicial=${encodeURIComponent(dStart)}&dataFinal=${encodeURIComponent(dEnd)}`;

    const res = await fetch(url, {
      signal: controller.signal,
      headers: { Accept: "application/json", "User-Agent": "HDZFinance/2.0" },
      next: { revalidate: 3600 }, // Cache 1 hour
    });

    clearTimeout(timeoutId);

    if (res.ok) {
      const data = await res.json();
      if (Array.isArray(data) && data.length > 0) {
        // Compare YYYYMMDD numeric keys
        const toYmdNum = (s: string) => {
          const [d, m, y] = s.split("/");
          return parseInt(`${y}${m.padStart(2, "0")}${d.padStart(2, "0")}`, 10);
        };

        const todayYmd = parseInt(`${year}${month.padStart(2, "0")}${day.padStart(2, "0")}`, 10);
        const validRecords = data.filter((r) => toYmdNum(r.data) <= todayYmd);

        if (validRecords.length > 0) {
          const latestRecord = validRecords[validRecords.length - 1];
          const rawVal = parseFloat(latestRecord.valor.replace(",", "."));

          if (!isNaN(rawVal) && rawVal > 0 && rawVal < 100) {
            // Find effective date (when this rate first started)
            let effectiveDate = latestRecord.data;
            for (let i = validRecords.length - 1; i >= 0; i--) {
              if (validRecords[i].valor === latestRecord.valor) {
                effectiveDate = validRecords[i].data;
              } else {
                break;
              }
            }

            const formattedVal = `${rawVal.toFixed(2).replace(".", ",")}%`;

            return {
              value: Number(rawVal.toFixed(2)),
              formattedValue: formattedVal,
              unit: "% a.a.",
              referenceDate: effectiveDate,
              status: "official",
            };
          }
        }
      }
    }
  } catch (err) {
    console.error("[MacroProvider] Error fetching BCB Selic (432):", err);
  } finally {
    clearTimeout(timeoutId);
  }

  // Fallback to memory cache if API failed
  if (macroMemoryCache.data?.selic) {
    return {
      ...macroMemoryCache.data.selic,
      status: "stale",
    };
  }

  // Guaranteed valid baseline fallback if first boot offline
  return {
    value: 14.0,
    formattedValue: "14,00%",
    unit: "% a.a.",
    referenceDate: "06/08/2026",
    status: "stale",
  };
}

// Fetch IPCA 12m from BCB SGS 13522 (IBGE Official)
async function fetchOfficialIpca12m(): Promise<MacroIndicatorDetail> {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 7000); // 7s timeout

  try {
    const url = "https://api.bcb.gov.br/dados/serie/bcdata.sgs.13522/dados/ultimos/12?formato=json";

    const res = await fetch(url, {
      signal: controller.signal,
      headers: { Accept: "application/json", "User-Agent": "HDZFinance/2.0" },
      next: { revalidate: 21600 }, // Cache 6 hours
    });

    clearTimeout(timeoutId);

    if (res.ok) {
      const data = await res.json();
      if (Array.isArray(data) && data.length > 0) {
        const latestRecord = data[data.length - 1];
        const rawVal = parseFloat(latestRecord.valor.replace(",", "."));

        if (!isNaN(rawVal) && rawVal > -50 && rawVal < 100) {
          const formattedVal = `${rawVal.toFixed(2).replace(".", ",")}%`;
          const refMonth = formatMonthYearReference(latestRecord.data);

          return {
            value: Number(rawVal.toFixed(2)),
            formattedValue: formattedVal,
            unit: "%",
            referenceMonth: refMonth,
            status: "official",
          };
        }
      }
    }
  } catch (err) {
    console.error("[MacroProvider] Error fetching BCB IPCA (13522):", err);
  } finally {
    clearTimeout(timeoutId);
  }

  // Fallback to memory cache if API failed
  if (macroMemoryCache.data?.ipca12m) {
    return {
      ...macroMemoryCache.data.ipca12m,
      status: "stale",
    };
  }

  // Guaranteed valid baseline fallback if first boot offline
  return {
    value: 4.44,
    formattedValue: "4,44%",
    unit: "%",
    referenceMonth: "Jul/2026",
    status: "stale",
  };
}

export async function getMacroIndicatorsData(): Promise<MacroDataResponse> {
  const now = Date.now();
  const selicCacheMaxAge = 3600 * 1000; // 1 hr
  const ipcaCacheMaxAge = 6 * 3600 * 1000; // 6 hrs

  let selic = macroMemoryCache.data?.selic;
  let ipca12m = macroMemoryCache.data?.ipca12m;

  const needSelic = !selic || now - macroMemoryCache.selicFetchedAt > selicCacheMaxAge;
  const needIpca = !ipca12m || now - macroMemoryCache.ipcaFetchedAt > ipcaCacheMaxAge;

  if (needSelic || needIpca) {
    const [fetchedSelic, fetchedIpca] = await Promise.all([
      needSelic ? fetchOfficialSelic() : Promise.resolve(selic!),
      needIpca ? fetchOfficialIpca12m() : Promise.resolve(ipca12m!),
    ]);

    selic = fetchedSelic;
    ipca12m = fetchedIpca;

    if (needSelic) macroMemoryCache.selicFetchedAt = now;
    if (needIpca) macroMemoryCache.ipcaFetchedAt = now;
  }

  let hasError = false;
  if (selic?.status === "stale" || ipca12m?.status === "stale") {
    hasError = true;
  }

  const response: MacroDataResponse = {
    selic: selic!,
    ipca12m: ipca12m!,
    fetchedAt: getBrasiliaFullTimestamp(),
    hasError,
  };

  macroMemoryCache.data = response;
  return response;
}
