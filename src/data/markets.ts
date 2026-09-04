import { MarketIndicator } from "@/types/market";

// Export clean initial structure for macro economic indicators (Selic / IPCA) that are set by Central Bank policy rates
export const INITIAL_MACRO_INDICATORS: MarketIndicator[] = [
  {
    id: "mkt-selic",
    symbol: "SELIC",
    name: "Taxa Selic",
    value: "10,50%",
    changePercentage: 0.0,
    changeAbsolute: "Meta COPOM",
    unit: "a.a.",
    category: "macro",
    lastUpdated: "Oficial Banco Central",
    isSimulated: false,
  },
  {
    id: "mkt-ipca",
    symbol: "IPCA",
    name: "IPCA (12m)",
    value: "4,23%",
    changePercentage: 0.12,
    changeAbsolute: "Acumulado 12 meses",
    unit: "acum. 12m",
    category: "macro",
    lastUpdated: "IBGE Oficial",
    isSimulated: false,
  },
];
