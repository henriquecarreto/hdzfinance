export interface AssetConfig {
  symbol: string;
  name: string;
  assetClass: "crypto" | "forex" | "commodity" | "index" | "macro";
  currency: "BRL" | "USD" | "POINTS" | "%";
  refreshMs: number;
  staleAfterMs: number;
  decimals: number;
}

export const MARKET_ASSETS_CONFIG: Record<string, AssetConfig> = {
  "BTC/USD": {
    symbol: "BTC/USD",
    name: "Bitcoin",
    assetClass: "crypto",
    currency: "USD",
    refreshMs: 15000,
    staleAfterMs: 60000,
    decimals: 2,
  },
  "ETH/USD": {
    symbol: "ETH/USD",
    name: "Ethereum",
    assetClass: "crypto",
    currency: "USD",
    refreshMs: 15000,
    staleAfterMs: 60000,
    decimals: 2,
  },
  "USD/BRL": {
    symbol: "USD/BRL",
    name: "Dólar Comercial",
    assetClass: "forex",
    currency: "BRL",
    refreshMs: 30000,
    staleAfterMs: 120000,
    decimals: 4,
  },
  "EUR/BRL": {
    symbol: "EUR/BRL",
    name: "Euro",
    assetClass: "forex",
    currency: "BRL",
    refreshMs: 30000,
    staleAfterMs: 120000,
    decimals: 4,
  },
  "GBP/BRL": {
    symbol: "GBP/BRL",
    name: "Libra Esterlina",
    assetClass: "forex",
    currency: "BRL",
    refreshMs: 30000,
    staleAfterMs: 120000,
    decimals: 4,
  },
  "XAU/USD": {
    symbol: "XAU/USD",
    name: "Ouro Spot",
    assetClass: "commodity",
    currency: "USD",
    refreshMs: 30000,
    staleAfterMs: 120000,
    decimals: 2,
  },
  "S&P 500": {
    symbol: "S&P 500",
    name: "S&P 500",
    assetClass: "index",
    currency: "POINTS",
    refreshMs: 30000,
    staleAfterMs: 120000,
    decimals: 2,
  },
  NASDAQ: {
    symbol: "NASDAQ",
    name: "Nasdaq Composite",
    assetClass: "index",
    currency: "POINTS",
    refreshMs: 30000,
    staleAfterMs: 120000,
    decimals: 2,
  },
  IBOV: {
    symbol: "IBOV",
    name: "Ibovespa",
    assetClass: "index",
    currency: "POINTS",
    refreshMs: 30000,
    staleAfterMs: 120000,
    decimals: 2,
  },
  DJI: {
    symbol: "DJI",
    name: "Dow Jones",
    assetClass: "index",
    currency: "POINTS",
    refreshMs: 30000,
    staleAfterMs: 120000,
    decimals: 2,
  },
  VIX: {
    symbol: "VIX",
    name: "VIX Volatilidade",
    assetClass: "index",
    currency: "POINTS",
    refreshMs: 30000,
    staleAfterMs: 120000,
    decimals: 2,
  },
  SELIC: {
    symbol: "SELIC",
    name: "Taxa Selic",
    assetClass: "macro",
    currency: "%",
    refreshMs: 3600000,
    staleAfterMs: 86400000,
    decimals: 2,
  },
  IPCA12M: {
    symbol: "IPCA12M",
    name: "IPCA acumulado 12m",
    assetClass: "macro",
    currency: "%",
    refreshMs: 21600000,
    staleAfterMs: 86400000,
    decimals: 2,
  },
};
