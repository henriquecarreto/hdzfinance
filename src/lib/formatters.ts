export const formatBRL = new Intl.NumberFormat("pt-BR", {
  style: "currency",
  currency: "BRL",
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
});

export const formatUSD = new Intl.NumberFormat("pt-BR", {
  style: "currency",
  currency: "USD",
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
});

export const formatPoints = new Intl.NumberFormat("pt-BR", {
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
});

export const formatPercent = new Intl.NumberFormat("pt-BR", {
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
});

export function formatUsdCustom(val: number | null): string {
  if (val === null || isNaN(val)) return "—";
  const formatted = new Intl.NumberFormat("pt-BR", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(val);
  return `US$ ${formatted}`;
}

export function formatAssetValue(val: number | null, currency: "BRL" | "USD" | "POINTS"): string {
  if (val === null || isNaN(val)) return "—";
  if (currency === "BRL") return formatBRL.format(val);
  if (currency === "USD") return formatUsdCustom(val);
  return formatPoints.format(val);
}

export function formatChangePercent(val: number | null): string {
  if (val === null || isNaN(val)) return "—";
  let normalized = val;
  if (Math.abs(normalized) < 0.005) {
    normalized = 0;
  }
  const formatted = formatPercent.format(Math.abs(normalized));
  if (normalized > 0) return `+${formatted}%`;
  if (normalized < 0) return `-${formatted}%`;
  return `${formatted}%`;
}
