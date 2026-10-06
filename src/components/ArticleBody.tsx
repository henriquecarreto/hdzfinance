import DOMPurify from "isomorphic-dompurify";
import { Article } from "@/types";
import { AlertCircle, ExternalLink } from "lucide-react";

interface ArticleBodyProps {
  article: Article;
}

export default function ArticleBody({ article }: ArticleBodyProps) {
  const sanitizedContent = DOMPurify.sanitize(article.content || "");

  return (
    <article className="max-w-3xl mx-auto py-8 space-y-8">
      {/* Editorial Content */}
      <div
        className="font-lora text-[#F5F7FA] text-base md:text-lg leading-relaxed space-y-6 [&>h2]:font-outfit [&>h2]:font-bold [&>h2]:text-2xl [&>h2]:md:text-3xl [&>h2]:text-[#F5F7FA] [&>h2]:pt-4 [&>h2]:pb-2 [&>h3]:font-outfit [&>h3]:font-semibold [&>h3]:text-xl [&>h3]:text-[#F5F7FA] [&>p]:leading-loose [&>ul]:list-disc [&>ul]:pl-6 [&>ul]:space-y-2 [&>ul]:my-4 [&>blockquote]:border-l-4 [&>blockquote]:border-[#147BFF] [&>blockquote]:pl-4 [&>blockquote]:italic [&>blockquote]:text-[#C7CDD4]"
        dangerouslySetInnerHTML={{ __html: sanitizedContent }}
      />

      {/* Sources Section */}
      {article.sources && article.sources.length > 0 && (
        <div className="p-4 rounded-xl bg-[#0B0D10] border border-[#252A32] space-y-2 text-xs text-[#A7AFBA]">
          <span className="font-semibold text-[#F5F7FA] block">
            Fontes e Documentos Consultados:
          </span>
          <ul className="space-y-1">
            {article.sources.map((src, i) => (
              <li key={i}>
                <a
                  href={src.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#147BFF] hover:underline inline-flex items-center"
                >
                  {src.name}
                  <ExternalLink className="h-3 w-3 ml-1" />
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Tags */}
      {article.tags && article.tags.length > 0 && (
        <div className="flex flex-wrap gap-2 pt-4 border-t border-[#252A32]">
          <span className="text-xs text-[#A7AFBA] self-center mr-2">Tags:</span>
          {article.tags.map((tag) => (
            <span
              key={tag}
              className="px-3 py-1 rounded-full text-xs font-medium bg-[#0B0D10] text-[#C7CDD4] border border-[#252A32]"
            >
              #{tag}
            </span>
          ))}
        </div>
      )}

      {/* Mandatory Legal Warning */}
      <div className="p-5 rounded-xl bg-[#11151A] border-l-4 border-[#F59A18] text-xs text-[#A7AFBA] space-y-1 flex items-start space-x-3">
        <AlertCircle className="h-5 w-5 text-[#F59A18] shrink-0 mt-0.5" />
        <div>
          <strong className="text-[#F5F7FA] block">Aviso Legal Editorial</strong>
          <p className="leading-relaxed">
            Este conteúdo possui finalidade exclusivamente informativa e educacional e não representa recomendação de investimento.
          </p>
        </div>
      </div>
    </article>
  );
}
