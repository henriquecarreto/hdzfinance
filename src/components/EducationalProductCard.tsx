import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { EducationalProduct } from "@/data/products";

interface EducationalProductCardProps {
  product: EducationalProduct;
}

export default function EducationalProductCard({ product }: EducationalProductCardProps) {
  const formatPrice = (price: number | null) => {
    if (price === null || price === undefined) return null;
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(price);
  };

  const formattedPrice = formatPrice(product.price);

  return (
    <div className="educational-product-card p-6 flex flex-col justify-between">
      <div className="space-y-4 flex-1 flex flex-col">
        {/* Cover Image Area (Vertical Portrait Format) */}
        <div className="relative aspect-[4/5] w-full rounded-xl overflow-hidden border border-white/[0.08] bg-[#070B10] shrink-0 group">
          {product.image ? (
            <Image
              src={product.image}
              alt={product.title}
              fill
              className="object-cover transition-transform duration-300 group-hover:scale-[1.02]"
              sizes="(max-width: 700px) 100vw, (max-width: 1024px) 50vw, 33vw"
            />
          ) : (
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none">
              <div className="w-full h-full opacity-10 bg-[radial-gradient(#F59A18_1px,transparent_1px)] [background-size:16px_16px]" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#070B10] via-transparent to-transparent opacity-80" />
            </div>
          )}
        </div>

        {/* Content Body */}
        <div className="space-y-3 flex-1 flex flex-col">
          {/* Category Tag */}
          <div>
            <span className="inline-block px-3 py-1 rounded-md text-[11px] font-extrabold uppercase tracking-wider bg-[#F59A18]/10 text-[#F59A18] border border-[#F59A18]/30">
              {product.category}
            </span>
          </div>

          {/* Title */}
          <h3 className="font-outfit font-bold text-lg md:text-xl text-[#F5F7FA] leading-snug">
            {product.title}
          </h3>

          {/* Price (Rendered strictly ONLY when defined) */}
          {formattedPrice && (
            <div className="pt-1">
              <span className="font-outfit font-extrabold text-xl text-[#F5F7FA] tracking-tight">
                {formattedPrice}
              </span>
            </div>
          )}

          {/* Short Summary (Rendered strictly ONLY when defined) */}
          {product.summary && (
            <p className="text-xs md:text-sm text-[#9BA5B3] leading-relaxed font-normal">
              {product.summary}
            </p>
          )}
        </div>
      </div>

      {/* Footer Action Button */}
      <div className="pt-6 mt-auto">
        {product.salesPageReady ? (
          <Link
            href={product.salesPagePath}
            className="product-card-action group"
          >
            <span>Conhecer o produto</span>
            <ArrowRight className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1" />
          </Link>
        ) : (
          <button
            type="button"
            disabled
            aria-disabled="true"
            className="product-card-action"
          >
            <span>Página em preparação</span>
          </button>
        )}
      </div>
    </div>
  );
}
