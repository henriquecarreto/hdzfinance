export type QuoteStatus =
  | "realtime"
  | "delayed"
  | "close"
  | "reference"
  | "stale"
  | "unavailable";

export type MarketState = "open" | "closed" | "reference";

export interface MarketAssetSnapshot {
  symbol: string;
  name: string;
  price: number | null;
  formattedPrice: string;
  changePercent: number | null;
  currency: "BRL" | "USD" | "POINTS" | "%";
  direction: "up" | "down" | "neutral";
  sourceTimestamp: string; // ISO 8601 UTC
  receivedAt: string; // ISO 8601 UTC
  marketState: MarketState;
  quoteStatus: QuoteStatus;
  source: string;
  referenceDate?: string;
  referenceMonth?: string;
}

export interface MarketDataSnapshot {
  snapshotId: string;
  generatedAt: string; // ISO 8601 UTC
  timezone: "UTC";
  assets: Record<string, MarketAssetSnapshot>;
  hasErrors: boolean;
}

// Compatibility types for Ticker & Legacy Consumers
export interface MarketTickerItem {
  symbol: string;
  name: string;
  price: number | null;
  formattedPrice: string;
  currency: "BRL" | "USD" | "POINTS" | "%";
  changePercent: number | null;
  direction: "up" | "down" | "neutral";
  lastUpdated: string | null;
  marketState: "open" | "closed" | "unknown";
  isStale: boolean;
  source: string;
  quoteStatus?: QuoteStatus;
  sourceTimestamp?: string;
}

export interface MarketResponse {
  items: MarketTickerItem[];
  fetchedAt: string;
  hasErrors: boolean;
  snapshotId?: string;
  generatedAt?: string;
}

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
