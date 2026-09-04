import React from "react";

export interface AssetIconProps {
  type?: string;
  symbol?: string;
  accent?: string;
  label?: string;
  className?: string;
}

export function AssetIcon({ type, symbol, accent, label }: AssetIconProps) {
  const targetKey = (type || symbol || "").toUpperCase();

  let accentColor = accent;
  if (!accentColor) {
    switch (targetKey) {
      case "SELIC":
      case "IPCA":
      case "XAU/USD":
      case "OURO":
        accentColor = "#F5A623";
        break;
      case "USD/BRL":
        accentColor = "#18D3A2";
        break;
      case "IBOV":
        accentColor = "#0073CF";
        break;
      case "S&P 500":
      case "SPX":
        accentColor = "#43A4FF";
        break;
      case "NASDAQ":
      case "IXIC":
        accentColor = "#00B8D9";
        break;
      case "VIX":
        accentColor = "#FF5964";
        break;
      case "BTC/USD":
      case "BITCOIN":
        accentColor = "#F7931A";
        break;
      case "ETH/USD":
      case "ETHEREUM":
        accentColor = "#627EEA";
        break;
      default:
        accentColor = "#F5A623";
    }
  }

  const renderInnerSvg = () => {
    switch (targetKey) {
      case "SELIC":
        return (
          <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <path d="M3 21h18M3 10h18M5 10v8M9 10v8M15 10v8M19 10v8" stroke="#F5A623" strokeWidth="1.8" strokeLinecap="round"/>
            <path d="M12 3L2 9h20L12 3z" fill="#F5A623" fillOpacity="0.2" stroke="#F5A623" strokeWidth="1.8" strokeLinejoin="round"/>
            <circle cx="12" cy="14" r="1.5" fill="#F5A623"/>
          </svg>
        );

      case "IPCA":
        return (
          <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <path d="M4 19L11 12L15 16L20 9M20 9H15.5M20 9V13.5" stroke="#F5A623" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <circle cx="7.5" cy="8.5" r="2" fill="#F5A623" fillOpacity="0.25" stroke="#F5A623" strokeWidth="1.5"/>
            <circle cx="14.5" cy="15.5" r="2" fill="#F5A623" fillOpacity="0.25" stroke="#F5A623" strokeWidth="1.5"/>
            <path d="M7 16L17 7" stroke="#F5A623" strokeWidth="1.6" strokeLinecap="round" strokeDasharray="1 2"/>
          </svg>
        );

      case "USD/BRL":
        return (
          <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <rect x="2" y="5" width="20" height="14" rx="2.5" fill="#18D3A2" fillOpacity="0.16" stroke="#18D3A2" strokeWidth="1.8"/>
            <circle cx="12" cy="12" r="3.5" fill="#18D3A2" fillOpacity="0.2" stroke="#18D3A2" strokeWidth="1.5"/>
            <path d="M12 9.5v5M10.8 10.5c0-.6.5-1 1.2-1s1.2.4 1.2 1c0 1.2-2.4 1-2.4 2.2 0 .6.5 1 1.2 1s1.2-.4 1.2-1" stroke="#18D3A2" strokeWidth="1.5" strokeLinecap="round"/>
            <circle cx="5.5" cy="12" r="1" fill="#18D3A2"/>
            <circle cx="18.5" cy="12" r="1" fill="#18D3A2"/>
          </svg>
        );

      case "IBOV":
        return (
          <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <rect x="3" y="14" width="4" height="7" rx="1" fill="#0073CF" fillOpacity="0.4" stroke="#0073CF" strokeWidth="1.5"/>
            <rect x="10" y="10" width="4" height="11" rx="1" fill="#0073CF" fillOpacity="0.6" stroke="#0073CF" strokeWidth="1.5"/>
            <rect x="17" y="6" width="4" height="15" rx="1" fill="#0073CF" fillOpacity="0.8" stroke="#0073CF" strokeWidth="1.5"/>
            <path d="M2 12l6-4 5 3 8-7" stroke="#EEF4FA" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M17 4h4v4" stroke="#EEF4FA" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        );

      case "S&P 500":
      case "SPX":
        return (
          <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <path d="M3 3v17a1 1 0 001 1h17" stroke="#43A4FF" strokeWidth="1.6" strokeLinecap="round"/>
            <path d="M6 16l4-5 4 3 6-7" stroke="#43A4FF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M20 7v3.5M20 7h-3.5" stroke="#43A4FF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <rect x="5.5" y="15.5" width="2" height="4" rx="0.5" fill="#43A4FF" fillOpacity="0.4"/>
            <rect x="11.5" y="12.5" width="2" height="7" rx="0.5" fill="#43A4FF" fillOpacity="0.6"/>
            <rect x="17.5" y="8.5" width="2" height="11" rx="0.5" fill="#43A4FF" fillOpacity="0.8"/>
          </svg>
        );

      case "NASDAQ":
      case "IXIC":
        return (
          <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <path d="M6 4v16M12 2v20M18 6v14" stroke="#00B8D9" strokeWidth="1" strokeDasharray="1 2"/>
            <rect x="4.5" y="10" width="3" height="6" rx="1" fill="#00B8D9" fillOpacity="0.3" stroke="#00B8D9" strokeWidth="1.5"/>
            <rect x="10.5" y="6" width="3" height="10" rx="1" fill="#00B8D9" fillOpacity="0.5" stroke="#00B8D9" strokeWidth="1.5"/>
            <rect x="16.5" y="4" width="3" height="8" rx="1" fill="#00B8D9" stroke="#00B8D9" strokeWidth="1.5"/>
            <path d="M3 15l6-4 4 2 8-8" stroke="#EEF4FA" strokeWidth="1.8" strokeLinecap="round"/>
            <circle cx="21" cy="5" r="1.5" fill="#00B8D9"/>
          </svg>
        );

      case "VIX":
        return (
          <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <path d="M2 13h3.5l2.5-5 3.5 11 4-15 3 11h3.5" stroke="#FF5964" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <circle cx="11.5" cy="19" r="1.5" fill="#168BFF"/>
            <circle cx="15.5" cy="4" r="1.5" fill="#168BFF"/>
            <path d="M2 12h20" stroke="#168BFF" strokeWidth="1" strokeDasharray="2 2" strokeOpacity="0.4"/>
          </svg>
        );

      case "XAU/USD":
      case "OURO":
        return (
          <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <path d="M2 14l3-2h7l-3 2H2z" fill="#FFD166"/>
            <path d="M2 14h7v4H2v-4z" fill="#F5A623"/>
            <path d="M9 14l3-2v4l-3 2v-4z" fill="#B86F08"/>
            <path d="M12 14l3-2h7l-3 2h-7z" fill="#FFD166"/>
            <path d="M12 14h7v4h-7v-4z" fill="#F5A623"/>
            <path d="M19 14l3-2v4l-3 2v-4z" fill="#B86F08"/>
            <path d="M7 8l3-2h7l-3 2H7z" fill="#FFD166"/>
            <path d="M7 8h7v4H7V8z" fill="#F5A623"/>
            <path d="M14 8l3-2v4l-3 2V8z" fill="#B86F08"/>
          </svg>
        );

      case "BTC/USD":
      case "BITCOIN":
        return (
          <div className="bitcoin-symbol" aria-hidden="true">
            <svg viewBox="0 0 32 32" fill="#FFFFFF" style={{ width: 17, height: 17 }}>
              <path d="M23.184 11.57c.312-2.083-1.275-3.203-3.444-3.95l.704-2.825-1.72-.429-.686 2.75c-.452-.113-.917-.22-1.378-.327l.692-2.775-1.72-.429-.705 2.825c-.375-.085-.742-.172-1.102-.26l.002-.007-2.373-.593-.458 1.838s1.277.293 1.25.312c.697.174.823.637.802 1.004l-.803 3.22c.048.012.11.03.18.058l-.183-.046-1.126 4.512c-.085.211-.301.528-.788.408.018.026-1.25-.312-1.25-.312l-.855 1.97 2.238.558c.416.104.824.213 1.226.317l-.714 2.867 1.718.428.705-2.826c.469.127.924.244 1.37.355l-.7 2.81 1.72.428.714-2.862c2.932.555 5.138.33 6.066-2.321.748-2.134-.037-3.364-1.58-4.164 1.124-.26 1.97-1 2.196-2.531zm-3.93 5.523c-.532 2.138-4.128.982-5.295.69l.944-3.784c1.167.292 4.9.87 4.35 3.094zm.533-5.556c-.485 1.944-3.483.956-4.454.714l.856-3.43c.97.242 4.09.696 3.598 2.716z" />
            </svg>
          </div>
        );

      case "ETH/USD":
      case "ETHEREUM":
        return (
          <svg viewBox="0 0 256 417" fill="none" aria-hidden="true">
            <path fill="#627EEA" d="M127.961 0l-2.795 9.5v275.668l2.795 2.79 127.962-75.638z" />
            <path fill="#8A92FF" d="M127.962 0L0 212.32l127.962 75.639V154.158z" />
            <path fill="#627EEA" d="M127.961 312.187l-1.575 1.92v98.199l1.575 4.601 128.038-180.32z" />
            <path fill="#8A92FF" d="M127.962 416.907v-104.72L0 236.585z" />
            <path fill="#454A75" d="M127.961 287.958l127.96-75.637-127.96-58.162z" />
            <path fill="#8A92FF" d="M0 212.32l127.96 75.638V154.159z" />
          </svg>
        );

      default:
        return (
          <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <path d="M4 19L11 12L15 16L20 9" stroke={accentColor} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        );
    }
  };

  return (
    <div
      className="asset-icon"
      style={{ "--icon-accent": accentColor } as React.CSSProperties}
      aria-hidden="true"
      aria-label={label}
    >
      {renderInnerSvg()}
    </div>
  );
}

export function MarketIcon({ symbol }: { symbol: string; className?: string }) {
  return <AssetIcon symbol={symbol} />;
}
