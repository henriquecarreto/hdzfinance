"use client";

import { useEffect } from "react";
import ArticleClientFallback from "@/components/ArticleClientFallback";
import { useParams } from "next/navigation";

export default function ArticleError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const params = useParams();
  const slug = (params?.slug as string) || "";

  useEffect(() => {
    console.error("[ArticleRoute Error Boundary]:", error);
  }, [error]);

  if (slug) {
    return <ArticleClientFallback slug={slug} />;
  }

  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center p-6 text-center">
      <h2 className="text-xl font-bold mb-4">Não foi possível carregar a notícia.</h2>
      <button
        onClick={() => reset()}
        className="px-4 py-2 bg-[#147BFF] text-white rounded-lg hover:bg-blue-600 transition"
      >
        Tentar novamente
      </button>
    </div>
  );
}
