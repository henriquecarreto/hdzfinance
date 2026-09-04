export type MarketTickerItem = {
  symbol: string;
  name: string;
  price: number | null;
  formattedPrice: string;
  currency: "BRL" | "USD" | "POINTS";
  changePercent: number | null;
  direction: "up" | "down" | "neutral";
  lastUpdated: string | null;
  marketState: "open" | "closed" | "unknown";
  isStale: boolean;
  source: string;
};

export type MarketResponse = {
  items: MarketTickerItem[];
  fetchedAt: string;
  hasErrors: boolean;
};

// Legacy compatibility for static indicators on /mercados route if referenced
export interface MarketIndicator {
  id: string;
  symbol: string;
  name: string;
  value: string;
  changePercentage: number;
  changeAbsolute?: string;
  unit?: string;
  category: "macro" | "tradicional" | "cripto";
  lastUpdated: string;
  isSimulated: boolean;
}
