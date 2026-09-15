import React from "react";

export type PictogramType =
  | "time-clock"
  | "currencies-exchange"
  | "capital-flow"
  | "tech-infrastructure"
  | "dollar-reserves"
  | "bank-ledger"
  | "central-bank-signal"
  | "programmable-layers"
  | "predictable-issuance"
  | "distributed-validation"
  | "keys-custody"
  | "risk-shield"
  | "flag-brasil"
  | "flag-usa"
  | "flag-europe"
  | "chip-ai"
  | "fact"
  | "cause"
  | "transmission"
  | "signals";

interface HdzPictogramProps {
  type: PictogramType;
  colorScheme?: "gold" | "blue" | "cyan" | "green" | "violet";
  className?: string;
}

export default function HdzPictogram({
  type,
  colorScheme = "gold",
  className = "",
}: HdzPictogramProps) {
  // Define color themes
  const colorMap = {
    gold: {
      border: "rgba(245, 154, 24, 0.4)",
      bgStart: "#1F1508",
      bgEnd: "#0D0A04",
      primary: "#F59A18",
      secondary: "#FFC05A",
      glow: "rgba(245, 154, 24, 0.25)",
    },
    blue: {
      border: "rgba(22, 139, 255, 0.4)",
      bgStart: "#09172B",
      bgEnd: "#040A14",
      primary: "#168BFF",
      secondary: "#60A5FA",
      glow: "rgba(22, 139, 255, 0.25)",
    },
    cyan: {
      border: "rgba(24, 198, 216, 0.4)",
      bgStart: "#071D22",
      bgEnd: "#030E11",
      primary: "#18C6D8",
      secondary: "#67E8F9",
      glow: "rgba(24, 198, 216, 0.25)",
    },
    green: {
      border: "rgba(19, 214, 156, 0.4)",
      bgStart: "#051F17",
      bgEnd: "#020F0B",
      primary: "#13D69C",
      secondary: "#6EE7B7",
      glow: "rgba(19, 214, 156, 0.25)",
    },
    violet: {
      border: "rgba(130, 119, 255, 0.4)",
      bgStart: "#14112E",
      bgEnd: "#090717",
      primary: "#8277FF",
      secondary: "#A78BFA",
      glow: "rgba(130, 119, 255, 0.25)",
    },
  };

  const scheme = colorMap[colorScheme];

  // Custom Duotone SVG Vectors
  const renderSvg = () => {
    switch (type) {
      case "time-clock":
        return (
          <svg width="25" height="25" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="9" stroke={scheme.primary} fill="none" />
            <polyline points="12 7 12 12 15 15" stroke={scheme.secondary} />
            <path d="M16 8L19 5" stroke={scheme.primary} strokeWidth="1.5" />
            <path d="M12 21C16.9706 21 21 16.9706 21 12" stroke={scheme.secondary} strokeDasharray="2 2" />
          </svg>
        );

      case "currencies-exchange":
        return (
          <svg width="25" height="25" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="8" cy="8" r="5" stroke={scheme.primary} fill="none" />
            <path d="M8 6v4M6.5 8h3" stroke={scheme.primary} />
            <circle cx="16" cy="16" r="5" stroke={scheme.secondary} fill="none" />
            <path d="M16 14v4M14.5 16h3" stroke={scheme.secondary} />
            <path d="M13 7h5v4" stroke={scheme.primary} />
            <path d="M11 17H6v-4" stroke={scheme.secondary} />
          </svg>
        );

      case "capital-flow":
        return (
          <svg width="25" height="25" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
            <path d="M3 17l6-6 4 4 8-8" stroke={scheme.primary} />
            <polyline points="17 7 21 7 21 11" stroke={scheme.secondary} />
            <path d="M3 21h18" stroke={scheme.primary} strokeOpacity="0.4" />
            <circle cx="9" cy="11" r="2" fill={scheme.secondary} stroke="none" />
            <circle cx="13" cy="15" r="2" fill={scheme.primary} stroke="none" />
          </svg>
        );

      case "tech-infrastructure":
        return (
          <svg width="25" height="25" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
            <rect x="6" y="6" width="12" height="12" rx="2" stroke={scheme.primary} fill="none" />
            <rect x="9" y="9" width="6" height="6" fill={scheme.secondary} opacity="0.6" />
            <path d="M9 2v4M15 2v4M9 18v4M15 18v4M2 9h4M2 15h4M18 9h4M18 15h4" stroke={scheme.primary} />
          </svg>
        );

      case "dollar-reserves":
        return (
          <svg width="25" height="25" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
            <rect x="3" y="5" width="18" height="14" rx="3" stroke={scheme.primary} fill="none" />
            <circle cx="12" cy="12" r="3" stroke={scheme.secondary} />
            <path d="M12 10v4" stroke={scheme.secondary} />
            <path d="M6 9h.01M18 15h.01" stroke={scheme.primary} strokeWidth="2" />
            <path d="M2 12h2M20 12h2" stroke={scheme.secondary} />
          </svg>
        );

      case "bank-ledger":
        return (
          <svg width="25" height="25" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
            <path d="M3 21h18M3 10h18M5 10v11M19 10v11M9 10v11M15 10v11" stroke={scheme.primary} />
            <path d="M12 3L2 10h20L12 3z" stroke={scheme.secondary} fill="none" />
          </svg>
        );

      case "central-bank-signal":
        return (
          <svg width="25" height="25" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 2a10 10 0 0 1 10 10" stroke={scheme.primary} strokeDasharray="2 2" />
            <path d="M12 6a6 6 0 0 1 6 6" stroke={scheme.secondary} />
            <circle cx="12" cy="12" r="3" fill={scheme.primary} stroke="none" />
            <path d="M12 15v6M8 21h8" stroke={scheme.secondary} />
          </svg>
        );

      case "programmable-layers":
        return (
          <svg width="25" height="25" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
            <polygon points="12 2 2 7 12 12 22 7 12 2" stroke={scheme.primary} fill="none" />
            <polyline points="2 12 12 17 22 12" stroke={scheme.secondary} />
            <polyline points="2 17 12 22 22 17" stroke={scheme.primary} />
          </svg>
        );

      case "predictable-issuance":
        return (
          <svg width="25" height="25" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
            <rect x="3" y="4" width="18" height="16" rx="2" stroke={scheme.primary} fill="none" />
            <line x1="16" y1="2" x2="16" y2="6" stroke={scheme.secondary} />
            <line x1="8" y1="2" x2="8" y2="6" stroke={scheme.secondary} />
            <line x1="3" y1="10" x2="21" y2="10" stroke={scheme.primary} />
            <circle cx="12" cy="15" r="2" fill={scheme.secondary} stroke="none" />
          </svg>
        );

      case "distributed-validation":
        return (
          <svg width="25" height="25" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="5" r="2.5" stroke={scheme.primary} />
            <circle cx="5" cy="18" r="2.5" stroke={scheme.secondary} />
            <circle cx="19" cy="18" r="2.5" stroke={scheme.secondary} />
            <line x1="12" y1="7.5" x2="6.5" y2="16" stroke={scheme.primary} />
            <line x1="12" y1="7.5" x2="17.5" y2="16" stroke={scheme.primary} />
            <line x1="7.5" y1="18" x2="16.5" y2="18" stroke={scheme.secondary} />
          </svg>
        );

      case "keys-custody":
        return (
          <svg width="25" height="25" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="8" cy="15" r="4" stroke={scheme.primary} fill="none" />
            <path d="M10.85 12.15L19 4M16 4l3 3M14 6l2.5 2.5" stroke={scheme.secondary} />
            <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" stroke={scheme.primary} opacity="0.3" fill="none" />
          </svg>
        );

      case "risk-shield":
        return (
          <svg width="25" height="25" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" stroke={scheme.primary} fill="none" />
            <line x1="12" y1="8" x2="12" y2="12" stroke={scheme.secondary} strokeWidth="2" />
            <circle cx="12" cy="16" r="1" fill={scheme.secondary} stroke="none" />
          </svg>
        );

      case "flag-brasil":
        return (
          <svg width="26" height="26" viewBox="0 0 32 32" fill="none">
            <circle cx="16" cy="16" r="15" fill="#10B981" />
            <polygon points="16,5 27,16 16,27 5,16" fill="#F59A18" />
            <circle cx="16" cy="16" r="6" fill="#168BFF" />
            <path d="M11 15.5C13 14 19 14 21 16.5" stroke="#FFFFFF" strokeWidth="1.2" fill="none" />
          </svg>
        );

      case "flag-usa":
        return (
          <svg width="26" height="26" viewBox="0 0 32 32" fill="none">
            <circle cx="16" cy="16" r="15" fill="#E11D48" />
            <path d="M1 12h30M1 18h30M1 24h30" stroke="#FFFFFF" strokeWidth="3" />
            <path d="M1 1a15 15 0 0 1 15 15H1V1z" fill="#1E40AF" />
            <circle cx="6" cy="6" r="1" fill="#FFFFFF" />
            <circle cx="11" cy="6" r="1" fill="#FFFFFF" />
            <circle cx="8" cy="10" r="1" fill="#FFFFFF" />
          </svg>
        );

      case "flag-europe":
        return (
          <svg width="26" height="26" viewBox="0 0 32 32" fill="none">
            <circle cx="16" cy="16" r="15" fill="#1E40AF" />
            <circle cx="16" cy="7" r="1" fill="#F59A18" />
            <circle cx="22.3" cy="9.7" r="1" fill="#F59A18" />
            <circle cx="25" cy="16" r="1" fill="#F59A18" />
            <circle cx="22.3" cy="22.3" r="1" fill="#F59A18" />
            <circle cx="16" cy="25" r="1" fill="#F59A18" />
            <circle cx="9.7" cy="22.3" r="1" fill="#F59A18" />
            <circle cx="7" cy="16" r="1" fill="#F59A18" />
            <circle cx="9.7" cy="9.7" r="1" fill="#F59A18" />
          </svg>
        );

      case "chip-ai":
        return (
          <svg width="25" height="25" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
            <rect x="5" y="5" width="14" height="14" rx="2" stroke={scheme.primary} fill="none" />
            <path d="M9 9h6v6H9z" fill={scheme.secondary} opacity="0.8" />
            <path d="M2 9h3M2 15h3M19 9h3M19 15h3M9 2v3M15 2v3M9 19v3M15 19v3" stroke={scheme.primary} />
          </svg>
        );

      case "fact":
        return (
          <svg width="25" height="25" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="9" stroke={scheme.primary} />
            <path d="M12 8v4M12 16h.01" stroke={scheme.secondary} strokeWidth="2" />
          </svg>
        );

      case "cause":
        return (
          <svg width="25" height="25" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
            <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" stroke={scheme.primary} fill={scheme.secondary} opacity="0.3" />
          </svg>
        );

      case "transmission":
        return (
          <svg width="25" height="25" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
            <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" stroke={scheme.primary} />
            <path d="M13.73 21a2 2 0 0 1-3.46 0" stroke={scheme.secondary} />
          </svg>
        );

      case "signals":
        return (
          <svg width="25" height="25" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
            <path d="M22 12h-4l-3 9L9 3l-3 9H2" stroke={scheme.primary} />
            <circle cx="12" cy="12" r="2" fill={scheme.secondary} stroke="none" />
          </svg>
        );

      default:
        return null;
    }
  };

  return (
    <div
      className={`hdz-pictogram ${className}`}
      style={
        {
          "--icon-border": scheme.border,
          "--icon-bg-start": scheme.bgStart,
          "--icon-bg-end": scheme.bgEnd,
          width: "48px",
          height: "48px",
          display: "inline-flex",
          alignItems: "center",
          justifyContent: "center",
          flex: "0 0 48px",
          borderRadius: "14px",
          position: "relative",
          overflow: "hidden",
          border: `1px solid ${scheme.border}`,
          background: `radial-gradient(circle at 30% 20%, rgba(255, 255, 255, 0.18), transparent 42%), linear-gradient(145deg, ${scheme.bgStart}, ${scheme.bgEnd})`,
          boxShadow: `inset 0 1px 0 rgba(255, 255, 255, 0.12), 0 10px 24px ${scheme.glow}`,
        } as React.CSSProperties
      }
    >
      {renderSvg()}
    </div>
  );
}
