"use client";

import { usePathname } from "next/navigation";
import Header from "@/components/Header";
import MarketTicker from "@/components/MarketTicker";

export default function HeaderWrapper() {
  const pathname = usePathname();
  const isTrainingPage = pathname === "/educacional/fundamentos-do-dinheiro-bitcoin-criptomoedas";

  if (isTrainingPage) {
    return (
      <div className="w-full relative z-[60]">
        <Header />
      </div>
    );
  }

  return (
    <div className="sticky top-0 z-[60] w-full bg-[#050607]/95 backdrop-blur-md border-b border-white/[0.06] shadow-lg">
      <Header />
      <MarketTicker />
    </div>
  );
}
