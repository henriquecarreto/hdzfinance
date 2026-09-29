"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { Compass, FileText, TrendingUp, Copy, Check } from "lucide-react";
import { YoutubeIcon, InstagramIcon } from "@/components/SocialIcons";
import { cmsStore, SiteSettingsData } from "@/lib/cms-store";

export default function AboutPage() {
  const [settings, setSettings] = useState<SiteSettingsData | null>(null);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    setSettings(cmsStore.getSettings());
  }, []);

  const instagramUrl = settings?.instagramUrl || "https://instagram.com/hdzfinance";
  const youtubeUrl = settings?.youtubeUrl || "https://youtube.com/@hdzfinance";

  // Bitcoin Wallet & QR Code configuration
  const btcAddress = process.env.NEXT_PUBLIC_BITCOIN_WALLET || "bc1qwznl7qym4p6sarqsezhhpyv8dj5353t0hym9w0";
  const btcQrCodeUrl = process.env.NEXT_PUBLIC_BITCOIN_QR_CODE || "/assets/btc-qr.png";
  const btcNetwork = process.env.NEXT_PUBLIC_BITCOIN_NETWORK || "Bitcoin (Rede Principal)";

  const handleCopyAddress = () => {
    if (!btcAddress) return;
    navigator.clipboard.writeText(btcAddress);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <div className="min-h-screen bg-[#000000] text-[#F0F4F8] py-12 md:py-20 selection:bg-[#147BFF] selection:text-white font-sans antialiased">
      <div className="w-[calc(100%-48px)] max-w-[880px] mx-auto space-y-12 md:space-y-16">
        
        {/* ========================================================================= */}
        {/* 1. ABERTURA ALINHADA À ESQUERDA                                          */}
        {/* ========================================================================= */}
        <header className="text-left space-y-4 px-7 sm:px-9 md:px-10">
          {/* Logo & Small Identifier */}
          <div className="inline-flex items-center space-x-3 text-left">
            <div className="relative w-9 h-9 md:w-[38px] md:h-[38px] shrink-0">
              <Image
                src="/assets/hdz-symbol.png"
                alt="Símbolo HDZ Finance"
                fill
                className="object-contain"
                priority
              />
            </div>
            <span className="font-outfit font-extrabold text-2xl md:text-3xl tracking-tight select-none">
              <span className="text-[#FFFFFF]">HDZ</span>{" "}
              <span className="text-[#FA9E1B]">FINANCE</span>
            </span>
          </div>

          {/* Hero Main Title */}
          <h1 className="font-outfit font-extrabold text-[#FFFFFF] tracking-tight leading-[1.15] text-3xl sm:text-4xl md:text-[42px] max-w-2xl">
            Clareza para compreender o dinheiro.{" "}
            <span className="text-[#FA9E1B]">Conhecimento para decidir melhor.</span>
          </h1>

          {/* Supporting Text */}
          <p className="text-[#D0D9E5] leading-[1.8] font-normal text-[16px] md:text-[17.5px] max-w-2xl">
            A HDZ Finance conecta Bitcoin, economia e mercados financeiros para ajudar você a compreender o que está por trás das notícias. Reunimos fatos, contexto e análises independentes em uma linguagem clara, sem perder a profundidade dos temas.
          </p>
        </header>

        {/* ========================================================================= */}
        {/* 2. CARD DE DESTAQUE (NOSSA PERSPECTIVA)                                  */}
        {/* ========================================================================= */}
        <section className="relative p-7 sm:p-9 md:p-10 rounded-2xl bg-[#090C10] border border-white/[0.12] text-left space-y-4 shadow-2xl overflow-hidden group">
          {/* Ultra-Subtle Background Bitcoin Symbol */}
          <div className="absolute -top-10 -right-10 opacity-[0.025] pointer-events-none select-none transition-opacity group-hover:opacity-[0.04]">
            <svg className="w-80 h-80 text-white" viewBox="0 0 24 24" fill="currentColor">
              <path d="M23.638 14.904c-1.602 6.43-8.113 10.34-14.542 8.736C2.668 22.038-1.24 15.527.362 9.097 1.965 2.666 8.477-1.24 14.906.362c6.43 1.603 10.338 8.114 8.732 14.542zm-5.69-3.238c.287-1.92-1.176-2.953-3.177-3.64l.65-2.603-1.583-.395-.632 2.533c-.416-.104-.844-.202-1.27-.3l.638-2.556-1.583-.396-.65 2.604c-.344-.078-.682-.156-1.012-.236l.002-.01-2.184-.545-.421 1.69s1.175.269 1.15.286c.642.16.758.584.739.92l-.74 2.966c.044.011.101.028.164.054l-.168-.042-1.036 4.156c-.078.194-.278.486-.727.375.016.024-1.15-.287-1.15-.287l-.786 1.813 2.06.514c.383.096.759.196 1.13.29l-.657 2.637 1.583.395.65-2.602c.432.117.852.226 1.264.328l-.647 2.593 1.584.395.657-2.63c2.7.511 4.73.305 5.586-2.138.69-1.966-.034-3.1-1.458-3.839 1.038-.24 1.82-.922 2.03-2.332zm-3.633 5.094c-.49 1.965-3.805.903-4.88.636l.87-3.488c1.076.269 4.512.802 4.01 2.852zm.49-5.127c-.446 1.79-3.208.88-4.103.657l.79-3.164c.895.223 3.768.64 3.313 2.507z" />
            </svg>
          </div>

          <span className="text-[12px] font-bold text-[#FA9E1B] uppercase tracking-widest block">
            NOSSA PERSPECTIVA
          </span>

          <h2 className="font-outfit font-extrabold text-[#FFFFFF] text-2xl md:text-3xl leading-snug max-w-2xl">
            Entender o dinheiro é entender as forças que moldam o futuro.
          </h2>

          <p className="text-[#E8EDF3] leading-[1.8] font-normal text-[16px] md:text-[17px] max-w-2xl">
            Inflação, juros, decisões de governos, avanços tecnológicos e mudanças no comportamento dos mercados não acontecem de forma isolada. Nosso trabalho é conectar essas peças e mostrar por que elas importam para quem deseja compreender o presente e pensar com mais clareza sobre o futuro.
          </p>
        </section>

        {/* ========================================================================= */}
        {/* 3. SEÇÃO EDITORIAL (CARD EDITORIAL)                                       */}
        {/* ========================================================================= */}
        <section className="p-7 sm:p-9 md:p-10 rounded-2xl bg-[#090C10] border border-white/[0.12] text-left space-y-4 shadow-xl">
          <h2 className="font-outfit font-extrabold text-2xl md:text-3xl text-[#FFFFFF] tracking-tight leading-snug">
            Do Bitcoin a uma visão mais ampla da economia
          </h2>

          <div className="space-y-4 text-[#E8EDF3] leading-[1.8] font-normal text-[16px] md:text-[17px] max-w-2xl">
            <p>
              O Bitcoin está no centro da nossa cobertura, mas compreendê-lo exige olhar além do preço. Por isso, acompanhamos política monetária, ciclos econômicos, mercados globais, tecnologia e as decisões que afetam o valor do dinheiro. Buscamos explicar as relações entre esses temas, distinguindo acontecimentos de interpretações e incertezas de certezas aparentes.
            </p>
            <p>
              Nossa perspectiva dialoga com a Escola Austríaca de Economia e com as ideias de Ludwig von Mises, Friedrich A. Hayek e Hans-Hermann Hoppe, especialmente nas discussões sobre moeda, incentivos, liberdade econômica e intervenção estatal. Ao estudar o Bitcoin, também consideramos a contribuição de Satoshi Nakamoto e o funcionamento da rede que ele apresentou ao mundo. Essas referências orientam perguntas e análises; cada conteúdo continua sujeito à apuração dos fatos e ao exame das fontes.
            </p>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* 4. CARD DE POSICIONAMENTO                                                 */}
        {/* ========================================================================= */}
        <section className="p-7 sm:p-9 md:p-10 rounded-2xl bg-[#090C10] border border-white/[0.12] text-left space-y-4 shadow-xl">
          <div className="flex items-center space-x-3 text-[#FA9E1B]">
            <Compass className="h-5 w-5 shrink-0 text-[#FA9E1B]" />
            <h3 className="font-outfit font-extrabold text-xl md:text-2xl text-[#FFFFFF]">
              Clareza também significa saber o que não sabemos.
            </h3>
          </div>
          <p className="text-[16px] md:text-[17px] text-[#E8EDF3] leading-[1.8] font-normal max-w-2xl">
            Os mercados mudam, previsões falham e narrativas podem parecer convincentes antes de serem testadas pelos fatos. Por isso, apresentamos o contexto, indicamos as fontes relevantes e tratamos cenários como possibilidades, não como promessas. Queremos que o leitor encontre elementos para construir seu próprio entendimento.
          </p>
        </section>

        {/* ========================================================================= */}
        {/* 5. NOSSOS PRINCÍPIOS EDITORIAIS (3 CARDS EQUILIBRADOS)                     */}
        {/* ========================================================================= */}
        <section className="space-y-6 text-left">
          <h2 className="font-outfit font-bold text-2xl md:text-3xl text-[#FFFFFF] tracking-tight">
            Nossos princípios editoriais
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 md:gap-6 items-stretch">
            {/* Card 1 — Rigor nas fontes */}
            <div className="p-6 rounded-2xl bg-[#090C10] border border-white/[0.12] flex flex-col justify-between space-y-4 h-full group">
              <div className="space-y-3.5">
                <div className="w-10 h-10 rounded-xl bg-[#000000] border border-white/[0.12] flex items-center justify-center text-[#FA9E1B] group-hover:border-[#FA9E1B]/50 transition-colors">
                  <FileText className="h-5 w-5" />
                </div>
                <h3 className="font-outfit font-bold text-base md:text-lg text-[#FFFFFF]">
                  Rigor nas fontes
                </h3>
                <p className="text-[14px] md:text-[15px] text-[#D0D9E5] leading-[1.7] font-normal">
                  Priorizamos dados verificáveis, documentos originais e a distinção entre fatos, hipóteses e opinião. Quando um tema envolve incerteza, ela deve aparecer no texto.
                </p>
              </div>
            </div>

            {/* Card 2 — Independência de análise */}
            <div className="p-6 rounded-2xl bg-[#090C10] border border-white/[0.12] flex flex-col justify-between space-y-4 h-full group">
              <div className="space-y-3.5">
                <div className="w-10 h-10 rounded-xl bg-[#000000] border border-white/[0.12] flex items-center justify-center text-[#FA9E1B] group-hover:border-[#FA9E1B]/50 transition-colors">
                  <Compass className="h-5 w-5" />
                </div>
                <h3 className="font-outfit font-bold text-base md:text-lg text-[#FFFFFF]">
                  Independência de análise
                </h3>
                <p className="text-[14px] md:text-[15px] text-[#D0D9E5] leading-[1.7] font-normal">
                  Examinamos acontecimentos e ideias por seus fundamentos. Nossa leitura não deve depender da popularidade de uma narrativa nem da direção momentânea do mercado.
                </p>
              </div>
            </div>

            {/* Card 3 — Visão de longo prazo */}
            <div className="p-6 rounded-2xl bg-[#090C10] border border-white/[0.12] flex flex-col justify-between space-y-4 h-full group">
              <div className="space-y-3.5">
                <div className="w-10 h-10 rounded-xl bg-[#000000] border border-white/[0.12] flex items-center justify-center text-[#FA9E1B] group-hover:border-[#FA9E1B]/50 transition-colors">
                  <TrendingUp className="h-5 w-5" />
                </div>
                <h3 className="font-outfit font-bold text-base md:text-lg text-[#FFFFFF]">
                  Visão de longo prazo
                </h3>
                <p className="text-[14px] md:text-[15px] text-[#D0D9E5] leading-[1.7] font-normal">
                  Além dos movimentos do dia, buscamos compreender incentivos, mudanças estruturais e consequências que podem levar anos para se revelar.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* 6. APOIE A HDZ FINANCE                                                     */}
        {/* ========================================================================= */}
        <section className="p-7 sm:p-8 md:p-9 rounded-2xl bg-[#090C10] border border-white/[0.12] space-y-6 text-left shadow-xl">
          <div className="grid grid-cols-1 md:grid-cols-[1fr_auto] gap-8 items-center">
            {/* Left Column: Text & Instructions */}
            <div className="space-y-3.5 max-w-xl">
              <span className="text-[12px] font-bold uppercase tracking-widest text-[#FA9E1B] block">
                CONTRIBUIÇÃO VOLUNTÁRIA
              </span>
              <h2 className="font-outfit font-bold text-xl md:text-2xl text-[#FFFFFF]">
                Ajude a manter este projeto em movimento
              </h2>
              <p className="text-[15px] md:text-[16px] text-[#D0D9E5] leading-[1.75] font-normal">
                Produzir conteúdo claro e independente exige pesquisa, tempo e atenção aos detalhes. Se a HDZ Finance ajuda você a compreender melhor o Bitcoin e a economia, poderá apoiar voluntariamente a continuidade do projeto com Bitcoin. Toda contribuição é um gesto de apoio ao conteúdo e não oferece acesso especial, retorno financeiro ou qualquer benefício de investimento.
              </p>

              {/* Display Wallet Address and Copy Button */}
              <div className="space-y-2 pt-3">
                <div className="flex items-center space-x-2">
                  <span className="text-[11px] font-bold text-[#FA9E1B] uppercase tracking-wider">
                    Rede: {btcNetwork}
                  </span>
                </div>

                <div className="p-3 rounded-xl bg-[#000000] border border-white/[0.12] flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <code className="text-[12.5px] md:text-[13.5px] text-[#F0F4F8] font-mono break-all select-all">
                    {btcAddress}
                  </code>
                  <button
                    type="button"
                    onClick={handleCopyAddress}
                    className="inline-flex items-center justify-center space-x-1.5 px-3.5 py-2 rounded-lg bg-[#141A22] hover:bg-[#1E2632] border border-white/[0.15] text-xs font-semibold text-[#FFFFFF] hover:text-[#FA9E1B] transition-colors shrink-0 cursor-pointer"
                    aria-label="Copiar endereço Bitcoin"
                  >
                    {copied ? (
                      <>
                        <Check className="h-3.5 w-3.5 text-emerald-400" />
                        <span className="text-emerald-400 font-semibold">Copiado</span>
                      </>
                    ) : (
                      <>
                        <Copy className="h-3.5 w-3.5 text-[#FA9E1B]" />
                        <span>Copiar endereço</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>

            {/* Right Column: Provided QR Code Image with clean border margin */}
            <div className="flex flex-col items-center justify-center shrink-0 self-center mx-auto md:mx-0">
              <div className="p-3.5 bg-white rounded-2xl shadow-xl">
                <div className="relative w-40 h-40 md:w-44 md:h-44">
                  <Image
                    src={btcQrCodeUrl}
                    alt="QR Code Bitcoin HDZ Finance"
                    fill
                    className="object-contain"
                    unoptimized
                    priority
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* 7. REDES SOCIAIS (FAIXA COMPACTA E LEGÍVEL)                               */}
        {/* ========================================================================= */}
        <section className="py-4 border-t border-white/[0.10] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <h2 className="font-outfit font-bold text-[15.5px] md:text-[17px] text-[#FFFFFF]">
            Continue acompanhando a HDZ Finance
          </h2>

          <div className="flex items-center space-x-6">
            <a
              href={instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram da HDZ Finance"
              className="inline-flex items-center space-x-2 text-[14.5px] text-[#D0D9E5] hover:text-[#FFFFFF] transition-colors focus:outline-none focus:underline group"
            >
              <InstagramIcon className="w-4 h-4 text-[#D0D9E5] group-hover:text-[#FFFFFF] transition-colors shrink-0" />
              <span className="font-medium">Instagram</span>
            </a>

            <a
              href={youtubeUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="YouTube da HDZ Finance"
              className="inline-flex items-center space-x-2 text-[14.5px] text-[#D0D9E5] hover:text-[#FFFFFF] transition-colors focus:outline-none focus:underline group"
            >
              <YoutubeIcon className="w-4 h-4 text-[#D0D9E5] group-hover:text-[#FFFFFF] transition-colors shrink-0" />
              <span className="font-medium">YouTube</span>
            </a>
          </div>
        </section>

      </div>
    </div>
  );
}
