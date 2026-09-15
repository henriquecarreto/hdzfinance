"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { ShieldCheck, Scale, TrendingUp, CheckCircle2, ArrowUpRight } from "lucide-react";
import { YoutubeIcon, InstagramIcon } from "@/components/SocialIcons";
import { cmsStore, SiteSettingsData } from "@/lib/cms-store";

export default function AboutPage() {
  const [settings, setSettings] = useState<SiteSettingsData | null>(null);

  useEffect(() => {
    setSettings(cmsStore.getSettings());
  }, []);

  const instagramUrl = settings?.instagramUrl || "https://instagram.com/hdzfinance";
  const youtubeUrl = settings?.youtubeUrl || "https://youtube.com/@hdzfinance";

  return (
    <div className="min-h-screen bg-[#050607] text-[#F5F7FA] py-10 md:py-20 selection:bg-[#147BFF] selection:text-white">
      <div className="max-w-4xl mx-auto px-5 sm:px-6 lg:px-8 space-y-12 md:space-y-16">
        
        {/* ========================================================================= */}
        {/* 1. PRIMEIRA SEÇÃO: LOGO + TÍTULO HERO + SUBTÍTULO                          */}
        {/* ========================================================================= */}
        <div className="text-center space-y-5 max-w-3xl mx-auto">
          {/* HDZ Logo Header */}
          <div className="inline-flex items-center space-x-3 justify-center mb-1">
            <div className="relative w-11 h-11 shrink-0">
              <Image
                src="/assets/hdz-symbol.png"
                alt="Símbolo HDZ Finance"
                fill
                className="object-contain"
                priority
              />
            </div>
            <span className="font-outfit font-extrabold text-2xl md:text-3xl tracking-tight">
              <span className="text-[#FFFFFF]">HDZ</span>{" "}
              <span className="text-[#F59A18]">FINANCE</span>
            </span>
          </div>

          {/* Hero Main Title */}
          <h1 className="about-hero-title font-outfit font-extrabold text-[#FFFFFF] tracking-tight leading-[1.08] text-[clamp(28px,3.5vw,42px)]">
            Clareza para compreender o dinheiro. <br className="hidden sm:inline" />
            <span className="text-[#F59A18]">Conhecimento para decidir melhor.</span>
          </h1>

          {/* Subtitle Paragraph */}
          <p className="about-hero-description text-[#A7AFBA] max-w-2xl mx-auto leading-[1.65] font-normal text-[clamp(14px,1.25vw,17px)]">
            A HDZ Finance traduz economia, mercados, Bitcoin e tecnologia em conteúdo claro, responsável e conectado às forças que realmente influenciam o seu dinheiro.
          </p>
        </div>

        {/* ========================================================================= */}
        {/* 2. MANIFESTO HDZ FINANCE                                                  */}
        {/* ========================================================================= */}
        <div className="relative p-7 md:p-11 rounded-2xl bg-gradient-to-br from-[#0E131A] via-[#090D12] to-[#06080C] border border-white/10 text-center space-y-5 shadow-2xl overflow-hidden">
          {/* Subtle Background Bitcoin Emblem with reduced opacity */}
          <div className="absolute -top-10 -right-10 opacity-[0.035] pointer-events-none select-none">
            <svg className="w-80 h-80 text-white" viewBox="0 0 24 24" fill="currentColor">
              <path d="M23.638 14.904c-1.602 6.43-8.113 10.34-14.542 8.736C2.668 22.038-1.24 15.527.362 9.097 1.965 2.666 8.477-1.24 14.906.362c6.43 1.603 10.338 8.114 8.732 14.542zm-5.69-3.238c.287-1.92-1.176-2.953-3.177-3.64l.65-2.603-1.583-.395-.632 2.533c-.416-.104-.844-.202-1.27-.3l.638-2.556-1.583-.396-.65 2.604c-.344-.078-.682-.156-1.012-.236l.002-.01-2.184-.545-.421 1.69s1.175.269 1.15.286c.642.16.758.584.739.92l-.74 2.966c.044.011.101.028.164.054l-.168-.042-1.036 4.156c-.078.194-.278.486-.727.375.016.024-1.15-.287-1.15-.287l-.786 1.813 2.06.514c.383.096.759.196 1.13.29l-.657 2.637 1.583.395.65-2.602c.432.117.852.226 1.264.328l-.647 2.593 1.584.395.657-2.63c2.7.511 4.73.305 5.586-2.138.69-1.966-.034-3.1-1.458-3.839 1.038-.24 1.82-.922 2.03-2.332zm-3.633 5.094c-.49 1.965-3.805.903-4.88.636l.87-3.488c1.076.269 4.512.802 4.01 2.852zm.49-5.127c-.446 1.79-3.208.88-4.103.657l.79-3.164c.895.223 3.768.64 3.313 2.507z" />
            </svg>
          </div>

          <span className="inline-block px-3.5 py-1 rounded-md text-[11px] font-extrabold uppercase tracking-widest bg-[#168BFF]/10 text-[#42A5FF] border border-[#168BFF]/30">
            MANIFESTO HDZ FINANCE
          </span>

          <h2 className="about-section-title font-outfit font-extrabold text-[#F5F7FA] leading-snug max-w-2xl mx-auto text-[clamp(20px,2vw,28px)]">
            Entender o dinheiro é entender as forças que moldam o futuro.
          </h2>

          <p className="about-section-text text-[#D5DDE6] max-w-2xl mx-auto leading-[1.7] font-normal text-[clamp(14px,1.15vw,16px)]">
            Inflação, juros, crédito, tecnologia e ativos digitais estão transformando a forma como o valor é criado, preservado e transferido. A HDZ Finance conecta esses movimentos para revelar o que existe além das manchetes.
          </p>
        </div>

        {/* ========================================================================= */}
        {/* 3. EVOLUÇÃO DA MARCA                                                      */}
        {/* ========================================================================= */}
        <div className="space-y-4 max-w-3xl">
          <h2 className="about-section-title font-outfit font-extrabold text-[#F5F7FA] tracking-tight text-[clamp(20px,2vw,28px)]">
            De uma origem em cripto a uma visão completa do mercado
          </h2>

          <div className="space-y-4 text-[#D5DDE6] leading-[1.7] font-normal text-[clamp(14px,1.15vw,16px)]">
            <p>
              A HDZ Finance nasceu acompanhando as transformações provocadas pelo Bitcoin, pela blockchain e pelos ativos digitais. Com o amadurecimento do mercado, nossa cobertura evoluiu para interpretar um cenário financeiro cada vez mais conectado.
            </p>
            <p>
              Hoje, reunimos economia, mercados, finanças pessoais, renda fixa, tecnologia e Bitcoin em uma visão integrada. Nosso propósito é oferecer contexto para que cada leitor compreenda as mudanças, avalie riscos e desenvolva decisões mais conscientes.
            </p>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* 4. POSICIONAMENTO EDITORIAL (O QUE NÃO FAZEMOS)                           */}
        {/* ========================================================================= */}
        <div className="p-6 md:p-7 rounded-xl bg-[#0E131A] border border-white/10 space-y-3 shadow-lg">
          <h3 className="font-outfit font-bold text-lg md:text-xl text-[#F59A18] flex items-center gap-2.5">
            <ShieldCheck className="h-5 w-5 text-[#F59A18] shrink-0" />
            <span>Clareza também significa saber o que não fazemos</span>
          </h3>
          <p className="text-xs sm:text-sm text-[#D5DDE6] leading-[1.7] font-normal">
            A HDZ Finance não é uma plataforma de apostas, grupo de sinais ou serviço de recomendação individual de investimentos. Não prometemos ganhos rápidos nem resultados garantidos. Nosso conteúdo é informativo, jornalístico e educacional, produzido para ampliar o entendimento e preservar a autonomia de cada leitor.
          </p>
        </div>

        {/* ========================================================================= */}
        {/* 5. PRINCÍPIOS EDITORIAIS (3 CARDS REFINADOS)                               */}
        {/* ========================================================================= */}
        <div className="space-y-6">
          <h2 className="about-section-title font-outfit font-extrabold text-[#F5F7FA] text-center text-[clamp(20px,2vw,28px)]">
            Nossos Princípios Editoriais
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch">
            {/* Card 1 */}
            <div className="editorial-principle-card p-6 flex flex-col justify-between space-y-4 h-full group">
              <div className="space-y-3.5">
                <div className="w-[44px] h-[44px] rounded-xl bg-[#11161F] border border-[#F59A18]/30 flex items-center justify-center text-[#F59A18] shadow-inner group-hover:border-[#F59A18]/60 transition-colors">
                  <CheckCircle2 className="h-5 w-5" />
                </div>
                <h3 className="font-outfit font-bold text-base md:text-lg text-[#F5F7FA] leading-snug">
                  Credibilidade e rigor
                </h3>
                <p className="text-xs md:text-sm text-[#D5DDE6] leading-[1.6] font-normal">
                  Analisamos dados, fontes oficiais e informações verificáveis para produzir conteúdo preciso, responsável e livre de sensacionalismo.
                </p>
              </div>
            </div>

            {/* Card 2 */}
            <div className="editorial-principle-card p-6 flex flex-col justify-between space-y-4 h-full group">
              <div className="space-y-3.5">
                <div className="w-[44px] h-[44px] rounded-xl bg-[#11161F] border border-[#168BFF]/30 flex items-center justify-center text-[#168BFF] shadow-inner group-hover:border-[#168BFF]/60 transition-colors">
                  <Scale className="h-5 w-5" />
                </div>
                <h3 className="font-outfit font-bold text-base md:text-lg text-[#F5F7FA] leading-snug">
                  Independência editorial
                </h3>
                <p className="text-xs md:text-sm text-[#D5DDE6] leading-[1.6] font-normal">
                  Separamos análise de publicidade, identificamos relações comerciais e preservamos a transparência necessária para que o leitor forme a própria visão.
                </p>
              </div>
            </div>

            {/* Card 3 */}
            <div className="editorial-principle-card p-6 flex flex-col justify-between space-y-4 h-full group">
              <div className="space-y-3.5">
                <div className="w-[44px] h-[44px] rounded-xl bg-[#11161F] border border-[#F59A18]/30 flex items-center justify-center text-[#F59A18] shadow-inner group-hover:border-[#F59A18]/60 transition-colors">
                  <TrendingUp className="h-5 w-5" />
                </div>
                <h3 className="font-outfit font-bold text-base md:text-lg text-[#F5F7FA] leading-snug">
                  Visão de longo prazo
                </h3>
                <p className="text-xs md:text-sm text-[#D5DDE6] leading-[1.6] font-normal">
                  Valorizamos fundamentos, gestão de riscos e disciplina. Menos reação ao ruído do momento, mais compreensão das forças que atravessam os ciclos.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* 6. REDES SOCIAIS (EXCLUSIVAMENTE INSTAGRAM E YOUTUBE)                      */}
        {/* ========================================================================= */}
        <div className="p-7 md:p-9 rounded-2xl bg-[#0E131A] border border-white/10 text-center space-y-5 shadow-xl">
          <div className="space-y-2">
            <h2 className="font-outfit font-extrabold text-xl md:text-2xl text-[#F5F7FA]">
              Continue acompanhando a HDZ Finance
            </h2>
            <p className="text-xs md:text-sm text-[#A7AFBA] max-w-lg mx-auto font-normal leading-relaxed">
              Análises, conteúdos e novas perspectivas sobre economia, mercados, Bitcoin e tecnologia.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-1">
            {/* Instagram Button */}
            <a
              href={instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-[270px] min-h-[50px] px-6 inline-flex items-center justify-center gap-3 rounded-xl bg-gradient-to-r from-[#111622] via-[#0E131A] to-[#121824] border border-white/15 hover:border-[#F59A18]/60 text-[#F5F7FA] hover:text-[#FFFFFF] transition-all duration-200 shadow-md group focus:outline-none focus:ring-2 focus:ring-[#168BFF]"
            >
              <InstagramIcon className="h-5 w-5 text-[#F59A18] group-hover:scale-110 transition-transform shrink-0" />
              <span className="text-sm font-bold tracking-wide">Acompanhar no Instagram</span>
              <ArrowUpRight className="h-4 w-4 text-[#A7AFBA] group-hover:text-white shrink-0" />
            </a>

            {/* YouTube Button */}
            <a
              href={youtubeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-[270px] min-h-[50px] px-6 inline-flex items-center justify-center gap-3 rounded-xl bg-gradient-to-r from-[#111622] via-[#0E131A] to-[#121824] border border-white/15 hover:border-[#EF4444]/60 text-[#F5F7FA] hover:text-[#FFFFFF] transition-all duration-200 shadow-md group focus:outline-none focus:ring-2 focus:ring-[#168BFF]"
            >
              <YoutubeIcon className="h-5 w-5 text-[#EF4444] group-hover:scale-110 transition-transform shrink-0" />
              <span className="text-sm font-bold tracking-wide">Explorar no YouTube</span>
              <ArrowUpRight className="h-4 w-4 text-[#A7AFBA] group-hover:text-white shrink-0" />
            </a>
          </div>
        </div>

      </div>
    </div>
  );
}
