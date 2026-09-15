"use client";

import { useState } from "react";
import Image from "next/image";
import { ExternalLink, Copy, Check, Percent, CalendarCheck, CreditCard, Globe } from "lucide-react";

export default function MarketPartnerships() {
  const [copiedQuantfury, setCopiedQuantfury] = useState(false);

  const partnerships = {
    picnic: {
      enabled: true,
      url: "https://promo.usepicnic.com/8pQU/HDZ",
    },
    quantfury: {
      enabled: process.env.NEXT_PUBLIC_ENABLE_QUANTFURY_PARTNER === "true",
      url: "https://quantfury.com/",
      referralCode: "N22M34P9",
    },
  };

  const handleCopyQuantfuryCode = async () => {
    try {
      await navigator.clipboard.writeText(partnerships.quantfury.referralCode);
      setCopiedQuantfury(true);
      setTimeout(() => setCopiedQuantfury(false), 2500);
    } catch {
      setCopiedQuantfury(true);
      setTimeout(() => setCopiedQuantfury(false), 2500);
    }
  };

  const showQuantfury = partnerships.quantfury.enabled;

  return (
    <section className="pt-16 md:pt-20 border-t border-white/[0.09] space-y-6 text-left">
      {/* Section Header */}
      <div className="space-y-1.5 text-left">
        <div className="flex items-center space-x-3">
          <div className="w-1 h-5 bg-[#F59A18] rounded-full" aria-hidden="true" />
          <span className="text-[12px] font-bold text-[#F59A18] uppercase tracking-widest block">
            PARCERIAS
          </span>
        </div>

        <h2 className="font-outfit font-bold text-[24px] md:text-[28px] text-[#F5F7FA] tracking-tight">
          Soluções que ampliam suas possibilidades
        </h2>

        <p className="text-[15px] md:text-[16px] text-[#A9B4C2] leading-relaxed max-w-3xl">
          A HDZ Finance apresenta plataformas alinhadas a uma experiência financeira mais simples, transparente e conectada ao mundo.
        </p>
      </div>

      {/* Cards Layout */}
      <div
        className={`grid grid-cols-1 ${
          showQuantfury ? "md:grid-cols-2 gap-6" : "w-full"
        } items-stretch`}
      >
        {/* CARD 1: Picnic Commercial Presentation Card */}
        {partnerships.picnic.enabled && (
          <div className="market-card p-7 md:p-9 w-full">
            <div
              className={
                showQuantfury
                  ? "flex flex-col justify-between h-full space-y-6"
                  : "grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-8 items-center"
              }
            >
              {/* Left Column: Brand, Title & Description */}
              <div className={showQuantfury ? "space-y-4" : "md:col-span-7 lg:col-span-7 space-y-4"}>
                <span className="inline-block px-3 py-1 rounded-md bg-[#F59A18]/10 text-[#F59A18] border border-[#F59A18]/30 text-[12px] font-bold uppercase tracking-widest">
                  PUBLICIDADE · LINK DE AFILIADO
                </span>

                {/* Brand Header with Official Symbol */}
                <div className="flex items-center space-x-3.5 pt-1">
                  <div className="relative w-[40px] h-[40px] md:w-[48px] md:h-[48px] shrink-0 bg-[#0E1620] border border-white/[0.12] rounded-xl p-1.5 flex items-center justify-center shadow-inner">
                    <Image
                      src="/brands/picnic-symbol.svg"
                      alt="Símbolo oficial Picnic"
                      width={48}
                      height={48}
                      className="w-full h-full object-contain"
                      priority
                    />
                  </div>
                  <h3 className="font-outfit font-bold text-[28px] text-[#F5F7FA]">
                    Picnic
                  </h3>
                </div>

                {/* Chamada Principal */}
                <h4 className="font-outfit font-bold text-[24px] md:text-[27px] text-[#F5F7FA] leading-[1.2]">
                  Seu dólar, pronto para acompanhar seus planos.
                </h4>

                {/* Descrição */}
                <p className="text-[15px] md:text-[16px] text-[#A9B4C2] leading-[1.6]">
                  Tenha uma conta internacional com cartão Visa aceito em mais de 180 países e gerencie seus dólares com praticidade e controle pelo aplicativo da Picnic.
                </p>
              </div>

              {/* Right Column: 4 Visual Benefits Grid & CTA Button */}
              <div
                className={
                  showQuantfury
                    ? "space-y-5 pt-2"
                    : "md:col-span-5 lg:col-span-5 flex flex-col justify-between space-y-6 h-full"
                }
              >
                {/* 4 Visual Benefits */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="picnic-benefit">
                    <Percent className="h-5 w-5 text-[#F59A18] shrink-0" aria-hidden="true" />
                    <span>Sem IOF</span>
                  </div>

                  <div className="picnic-benefit">
                    <CalendarCheck className="h-5 w-5 text-[#F59A18] shrink-0" aria-hidden="true" />
                    <span>Sem anuidade</span>
                  </div>

                  <div className="picnic-benefit">
                    <CreditCard className="h-5 w-5 text-[#F59A18] shrink-0" aria-hidden="true" />
                    <span>Cartão Visa</span>
                  </div>

                  <div className="picnic-benefit">
                    <Globe className="h-5 w-5 text-[#F59A18] shrink-0" aria-hidden="true" />
                    <span>Aceito em +180 países</span>
                  </div>
                </div>

                {/* Main Action Button */}
                <div className="pt-1">
                  <a
                    href={partnerships.picnic.url}
                    target="_blank"
                    rel="sponsored nofollow noopener noreferrer"
                    aria-label="Conhecer a Picnic (link de afiliado externo)"
                    className="partner-cta w-full inline-flex items-center justify-center space-x-2.5 font-bold text-[15px] focus:outline-none"
                  >
                    <span>Conhecer a Picnic</span>
                    <ExternalLink className="h-4 w-4 shrink-0 text-[#090B0E]" aria-hidden="true" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* CARD 2: Quantfury (Controlled by Feature Flag) */}
        {showQuantfury && (
          <div className="partnership-card p-7 md:p-9 flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              <span className="inline-block px-3 py-1 rounded-md bg-[#F59A18]/10 text-[#F59A18] border border-[#F59A18]/30 text-[12px] font-bold uppercase tracking-widest">
                PUBLICIDADE · CÓDIGO DE INDICAÇÃO
              </span>

              <h3 className="font-outfit font-bold text-[28px] text-[#EEF4FA]">
                Quantfury
              </h3>

              <p className="text-[16px] text-[#D5DDE6] leading-[1.6]">
                Plataforma internacional de negociação de ativos e mercados globais.
              </p>

              {/* Referral Code Field */}
              <div className="p-3.5 rounded-xl bg-[#10151C] border border-white/[0.10] flex items-center justify-between gap-3">
                <div className="space-y-0.5">
                  <span className="text-[11px] text-[#B8C5D1] font-medium uppercase tracking-wider block">
                    Código de indicação
                  </span>
                  <span className="font-mono font-bold text-[16px] text-[#EEF4FA]">
                    {partnerships.quantfury.referralCode}
                  </span>
                </div>

                <button
                  type="button"
                  onClick={handleCopyQuantfuryCode}
                  aria-label="Copiar código de indicação Quantfury"
                  className="inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-lg bg-[#080C11] hover:bg-[#168BFF]/10 text-[#EEF4FA] hover:text-[#168BFF] border border-white/[0.12] hover:border-[#168BFF]/40 text-xs font-semibold transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-[#168BFF]"
                >
                  {copiedQuantfury ? (
                    <>
                      <Check className="h-3.5 w-3.5 text-[#13D69C]" aria-hidden="true" />
                      <span className="text-[#13D69C]">Código copiado</span>
                    </>
                  ) : (
                    <>
                      <Copy className="h-3.5 w-3.5 text-[#B8C5D1]" aria-hidden="true" />
                      <span>Copiar código</span>
                    </>
                  )}
                </button>
              </div>
            </div>

            <div className="pt-2">
              <a
                href={partnerships.quantfury.url}
                target="_blank"
                rel="sponsored nofollow noopener noreferrer"
                aria-label="Visitar site oficial da Quantfury (link externo)"
                className="w-full h-[52px] min-h-[52px] inline-flex items-center justify-center space-x-2.5 px-6 rounded-[10px] bg-[#F59A18] hover:bg-[#FFAC36] text-[#090B0E] font-bold text-[16px] transition-all shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-[#F59A18]"
              >
                <span>Visitar site oficial</span>
                <ExternalLink className="h-4 w-4 shrink-0 text-[#090B0E]" aria-hidden="true" />
              </a>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
