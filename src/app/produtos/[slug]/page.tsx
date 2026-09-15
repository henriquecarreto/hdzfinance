import { PRODUCTS } from "@/data/products";
import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import {
  CheckCircle2,
  XCircle,
  ShoppingBag,
  HelpCircle,
  ShieldAlert,
  ArrowLeft,
  Package,
} from "lucide-react";
import type { Metadata } from "next";

interface ProductDetailPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return PRODUCTS.map((p) => ({
    slug: p.slug,
  }));
}

export async function generateMetadata({
  params,
}: ProductDetailPageProps): Promise<Metadata> {
  const { slug } = await params;
  const product = PRODUCTS.find((p) => p.slug === slug);

  if (!product) {
    return {
      title: "Produto Não Encontrado | HDZ Finance",
    };
  }

  return {
    title: `${product.title} | Cursos & Guias HDZ`,
    description: product.shortDescription,
  };
}

export default async function ProductDetailPage({
  params,
}: ProductDetailPageProps) {
  const { slug } = await params;
  const product = PRODUCTS.find((p) => p.slug === slug);

  if (!product) {
    notFound();
  }

  const isAvailable = product.status === "Disponível";

  return (
    <div className="min-h-screen bg-black text-[#F5F7FA] py-8 md:py-12">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Navigation back */}
        <Link
          href="/cursos-e-guias"
          className="inline-flex items-center text-xs text-[#A7AFBA] hover:text-[#F59A18] transition-colors"
        >
          <ArrowLeft className="h-3.5 w-3.5 mr-1" />
          Voltar para todos os cursos e guias
        </Link>

        {/* Hero Card */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 p-6 md:p-8 rounded-2xl bg-[#0B0D10] border border-[#F59A18]/30 items-center">
          <div className="lg:col-span-7 space-y-4">
            <div className="flex items-center space-x-2">
              <span className="px-2.5 py-0.5 rounded text-xs font-bold uppercase tracking-wider bg-[#F59A18] text-[#000000]">
                {product.type}
              </span>
              <span className="px-2.5 py-0.5 rounded text-xs font-medium bg-[#11151A] text-[#C7CDD4] border border-[#252A32]">
                Nível {product.level}
              </span>
            </div>

            <h1 className="font-outfit font-extrabold text-2xl md:text-4xl text-[#F5F7FA] leading-tight">
              {product.title}
            </h1>

            <p className="text-sm md:text-base text-[#A7AFBA] leading-relaxed">
              {product.shortDescription}
            </p>

            <div className="pt-4 border-t border-[#252A32] flex items-center justify-between">
              <div>
                <span className="text-xs text-[#A7AFBA] block uppercase tracking-wider">
                  Investimento Único
                </span>
                <span className="font-outfit font-extrabold text-2xl md:text-3xl text-[#F5F7FA]">
                  {product.priceFormatted || "Consulte"}
                </span>
              </div>

              {isAvailable ? (
                <a
                  href={product.buyUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-6 py-3 rounded-lg bg-[#F59A18] hover:bg-[#FFAC36] text-[#000000] font-outfit font-bold text-sm uppercase tracking-wider transition-all flex items-center space-x-2 shadow-lg active:scale-[0.98]"
                >
                  <ShoppingBag className="h-4 w-4" />
                  <span>Garantir Acesso</span>
                </a>
              ) : (
                <span className="px-5 py-2.5 rounded-lg bg-[#252A32] text-[#A7AFBA] font-outfit font-bold text-xs">
                  Em Breve
                </span>
              )}
            </div>
          </div>

          <div className="lg:col-span-5">
            <div className="relative aspect-[16/9] lg:aspect-[4/3] w-full rounded-xl overflow-hidden bg-[#11151A] border border-[#252A32]">
              <Image
                src={product.coverImage || "/images/materias/ciclos-de-mercado/cover.webp"}
                alt={product.title}
                fill
                className="object-cover"
                priority
              />
            </div>
          </div>
        </div>

        {/* Problem Solved */}
        <section className="p-6 md:p-8 rounded-2xl bg-[#0B0D10] border border-[#252A32] space-y-3">
          <h2 className="font-outfit font-bold text-xl text-[#F59A18] uppercase tracking-wider">
            Qual problema este material resolve?
          </h2>
          <p className="text-sm md:text-base text-[#C7CDD4] leading-relaxed">
            {product.problemSolved}
          </p>
        </section>

        {/* Audience Grid (Para quem é / Para quem NÃO é) */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Target Audience */}
          <div className="p-6 rounded-2xl bg-[#0B0D10] border border-emerald-500/30 space-y-4">
            <div className="flex items-center space-x-2 text-emerald-400 font-outfit font-bold text-lg">
              <CheckCircle2 className="h-5 w-5" />
              <span>Para quem É recomendado</span>
            </div>
            <ul className="space-y-2.5 text-xs md:text-sm text-[#C7CDD4]">
              {product.targetAudience?.map((item, i) => (
                <li key={i} className="flex items-start">
                  <span className="text-emerald-400 font-bold mr-2">•</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Excluded Audience */}
          <div className="p-6 rounded-2xl bg-[#0B0D10] border border-rose-500/30 space-y-4">
            <div className="flex items-center space-x-2 text-rose-400 font-outfit font-bold text-lg">
              <XCircle className="h-5 w-5" />
              <span>Para quem NÃO é recomendado</span>
            </div>
            <ul className="space-y-2.5 text-xs md:text-sm text-[#C7CDD4]">
              {product.excludedAudience?.map((item, i) => (
                <li key={i} className="flex items-start">
                  <span className="text-rose-400 font-bold mr-2">•</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* Included Modules */}
        {product.modules && product.modules.length > 0 && (
          <section className="space-y-6">
            <h2 className="font-outfit font-extrabold text-2xl text-[#F5F7FA]">
              Conteúdo Incluído no Material
            </h2>

            <div className="space-y-4">
              {product.modules.map((mod, idx) => (
                <div
                  key={idx}
                  className="p-5 rounded-xl bg-[#0B0D10] border border-[#252A32] space-y-1.5"
                >
                  <h3 className="font-outfit font-bold text-base text-[#F59A18]">
                    {mod.title}
                  </h3>
                  <p className="text-xs md:text-sm text-[#A7AFBA]">
                    {mod.description}
                  </p>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Deliverables (O que você receberá) */}
        {product.deliverables && product.deliverables.length > 0 && (
          <section className="p-6 md:p-8 rounded-2xl bg-[#11151A] border border-[#252A32] space-y-4">
            <div className="flex items-center space-x-2 font-outfit font-bold text-lg text-[#F5F7FA]">
              <Package className="h-5 w-5 text-[#F59A18]" />
              <span>O que você receberá na sua área de acesso</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs md:text-sm text-[#C7CDD4]">
              {product.deliverables.map((item, i) => (
                <div
                  key={i}
                  className="flex items-center space-x-2 p-3 rounded-lg bg-[#0B0D10] border border-[#252A32]"
                >
                  <CheckCircle2 className="h-4 w-4 text-[#F59A18] shrink-0" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* FAQ Section */}
        {product.faq && product.faq.length > 0 && (
          <section className="space-y-6">
            <div className="flex items-center space-x-2 font-outfit font-bold text-2xl text-[#F5F7FA]">
              <HelpCircle className="h-6 w-6 text-[#F59A18]" />
              <h2>Perguntas Frequentes</h2>
            </div>

            <div className="space-y-4">
              {product.faq.map((item, idx) => (
                <div
                  key={idx}
                  className="p-5 rounded-xl bg-[#0B0D10] border border-[#252A32] space-y-2"
                >
                  <h3 className="font-outfit font-bold text-base text-[#F5F7FA]">
                    {item.question}
                  </h3>
                  <p className="text-xs md:text-sm text-[#A7AFBA] leading-relaxed">
                    {item.answer}
                  </p>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Legal Disclaimer Notice */}
        <div className="p-5 rounded-xl bg-[#0B0D10] border border-[#252A32] text-xs text-[#A7AFBA] space-y-2 flex items-start space-x-3">
          <ShieldAlert className="h-5 w-5 text-[#F59A18] shrink-0 mt-0.5" />
          <div className="space-y-1">
            <strong className="text-[#F5F7FA]">Termos de Aquisição & Aviso Comercial</strong>
            <p className="leading-relaxed">
              Todos os produtos comerciais da HDZ Finance possuem caráter exclusivamente livre, educacional e pedagógico. Os materiais não constituem recomendação de investimento individualizada ou promessa de retorno financeiro. Os links de checkout direcionam para plataformas de pagamento seguras parceiras.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
