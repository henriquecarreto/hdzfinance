"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function ComboEbooksPageRedirect() {
  const router = useRouter();

  useEffect(() => {
    router.replace("/educacional/guia-visual-financas");
  }, [router]);

  return (
    <div className="min-h-screen bg-[#0B1F3A] flex items-center justify-center text-white font-outfit p-4 text-center">
      <div className="space-y-3">
        <div className="w-8 h-8 border-4 border-[#00A859] border-t-transparent rounded-full animate-spin mx-auto" />
        <p className="text-lg font-semibold">Redirecionando para a Coleção Visual...</p>
      </div>
    </div>
  );
}
