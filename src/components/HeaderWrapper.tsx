"use client";

import { usePathname } from "next/navigation";
import Header from "@/components/Header";
import MarketTicker from "@/components/MarketTicker";

export default function HeaderWrapper() {
  const pathname = usePathname();
  const isSalesPage =
    pathname === "/educacional/fundamentos-do-dinheiro-bitcoin-criptomoedas" ||
    pathname === "/educacional/guia-visual-financas" ||
    pathname === "/educacional/combo-ebooks";

  if (isSalesPage) {
    return (
      <div className="w-full relative z-[60]">
        <Header />
      </div>
    );
  }

  return (
    <div className="sticky top-0 z-[60] w-full bg-[#000000]/95 backdrop-blur-md border-b border-white/[0.06] shadow-lg">
      <Header />
      <MarketTicker />
    </div>
  );
}
