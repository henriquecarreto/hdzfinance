"use client";

import Link from "next/link";
import { PRODUCTS } from "@/data/products";
import ProductCard from "@/components/ProductCard";
import { GraduationCap, ArrowLeft } from "lucide-react";

export default function CursosPage() {
  const cursos = PRODUCTS.filter((p) => p.type === "Curso");

  return (
    <div className="min-h-screen bg-[#050607] text-[#F5F7FA] py-8 md:py-12">
      <div className="max-w-[1360px] mx-auto px-5 md:px-8 space-y-8">
        <Link
          href="/educacional"
          className="inline-flex items-center space-x-2 text-xs font-semibold text-[#9BA5B3] hover:text-[#147BFF] transition-colors"
        >
          <ArrowLeft className="h-4 w-4" />
          <span>Voltar para Educacional</span>
        </Link>

        <div className="p-6 md:p-10 rounded-2xl bg-[#0D1117] border border-white/[0.08] space-y-3">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-md bg-[#F59A18]/10 text-[#F59A18] border border-[#F59A18]/30 text-xs font-bold uppercase tracking-wider">
            <GraduationCap className="h-3.5 w-3.5" />
            <span>Cursos HDZ Finance</span>
          </div>
          <h1 className="font-outfit font-extrabold text-3xl md:text-5xl text-[#F5F7FA]">
            Cursos & Formações Práticas
          </h1>
          <p className="text-sm md:text-base text-[#9BA5B3] max-w-3xl leading-relaxed">
            Treinamentos completos sobre alocação de ativos, macroeconomia, gestão financeira e segurança patrimonial.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {cursos.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </div>
  );
}
