import Link from "next/link";
import Image from "next/image";
import { Product } from "@/types";
import { CheckCircle2, ArrowRight } from "lucide-react";

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const isAvailable = product.status === "Disponível";

  return (
    <div className="flex flex-col rounded-2xl bg-[#0D1117] hover:bg-[#121720] border border-white/[0.08] hover:border-[#F59A18]/40 transition-all duration-300 overflow-hidden group h-full justify-between">
      <div>
        <div className="relative aspect-[16/9] w-full overflow-hidden bg-[#050607]">
          <Image
            src={product.coverImage || "/images/materias/ciclos-de-mercado/cover.webp"}
            alt={product.title}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-500"
          />
          <div className="absolute top-3 left-3 z-10 flex gap-2">
            <span className="px-2.5 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-[#F59A18] text-[#000000]">
              {product.type}
            </span>
            {product.level && (
              <span className="px-2 py-0.5 rounded text-[10px] font-medium bg-[#050607]/80 text-[#C7CDD4] backdrop-blur-sm">
                {product.level}
              </span>
            )}
          </div>

          {!isAvailable && (
            <div className="absolute top-3 right-3 z-10">
              <span className="px-2.5 py-0.5 rounded text-[10px] font-semibold bg-[#050607]/80 text-[#9BA5B3] border border-white/[0.08]">
                Em breve
              </span>
            </div>
          )}
        </div>

        <div className="p-6 space-y-4">
          <div className="space-y-2">
            <h3 className="font-outfit font-extrabold text-lg md:text-xl text-[#F5F7FA] group-hover:text-[#FFAC36] transition-colors leading-snug">
              {product.title}
            </h3>

            <p className="text-xs md:text-sm text-[#9BA5B3] line-clamp-2 leading-relaxed font-normal">
              {product.shortDescription}
            </p>
          </div>

          {product.benefits && product.benefits.length > 0 && (
            <div className="space-y-2 pt-3 border-t border-white/[0.08]">
              <span className="text-[10px] font-bold text-[#F59A18] uppercase tracking-wider block">
                Destaques:
              </span>
              <ul className="space-y-1.5">
                {product.benefits.slice(0, 2).map((benefit, idx) => (
                  <li key={idx} className="flex items-start text-xs text-[#C7CDD4]">
                    <CheckCircle2 className="h-3.5 w-3.5 mr-2 text-[#F59A18] shrink-0 mt-0.5" />
                    <span className="line-clamp-1">{benefit}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>

      <div className="p-6 pt-0 space-y-4">
        <div className="flex items-center justify-between border-t border-white/[0.08] pt-4">
          <div>
            <span className="text-[10px] text-[#9BA5B3] block uppercase tracking-wider font-medium">
              Investimento
            </span>
            <span className="font-outfit font-extrabold text-lg text-[#F5F7FA]">
              {product.priceFormatted || "Consulte"}
            </span>
          </div>
        </div>

        <Link
          href={`/produtos/${product.slug}`}
          className="w-full flex items-center justify-center space-x-2 py-3 px-4 rounded-xl font-outfit font-bold text-xs uppercase tracking-wider bg-[#F59A18] text-[#000000] hover:bg-[#FFAC36] transition-all shadow-md active:scale-[0.98]"
        >
          <span>Conhecer o produto</span>
          <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
    </div>
  );
}
