"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import TipTapEditor from "./TipTapEditor";
import CoverImageUploader from "./CoverImageUploader";
import { cmsStore, CMSContentItem, ContentType, ContentStatus } from "@/lib/cms-store";
import { CATEGORY_LIST } from "@/data/categories";
import {
  Save,
  Send,
  Eye,
  ArrowLeft,
  Search,
  Share2,
  CheckCircle2,
  Clock,
  Sparkles,
  Smartphone,
  Tablet,
  Monitor,
} from "lucide-react";

interface ContentEditorFormProps {
  type: ContentType;
  initialId?: string;
}

export default function ContentEditorForm({ type, initialId }: ContentEditorFormProps) {
  const router = useRouter();

  const [title, setTitle] = useState("");
  const [subtitle, setSubtitle] = useState("");
  const [excerpt, setExcerpt] = useState("");
  const [slug, setSlug] = useState("");
  const [bodyHtml, setBodyHtml] = useState("");
  const [category, setCategory] = useState("economia");
  const [categoryName, setCategoryName] = useState("Economia");
  const [authorName, setAuthorName] = useState("Produção HDZ Finance");
  const [coverImagePath, setCoverImagePath] = useState("/images/materias/ciclos-de-mercado/cover.webp");
  const [coverImageAlt, setCoverImageAlt] = useState("");
  const [featured, setFeatured] = useState(false);
  const [featuredOrder, setFeaturedOrder] = useState(1);
  const [status, setStatus] = useState<ContentStatus>("draft");
  const [publishDate, setPublishDate] = useState(new Date().toISOString().slice(0, 16));
  const [seoTitle, setSeoTitle] = useState("");
  const [seoDescription, setSeoDescription] = useState("");

  const [autosaveStatus, setAutosaveStatus] = useState<"idle" | "saving" | "saved">("idle");
  const [showPreviewModal, setShowPreviewModal] = useState(false);
  const [previewDevice, setPreviewDevice] = useState<"desktop" | "tablet" | "mobile">("desktop");

  const itemIdRef = useRef<string | undefined>(initialId);

  // Load existing data if editing
  useEffect(() => {
    if (initialId) {
      const existing = cmsStore.getItemById(initialId);
      if (existing) {
        setTitle(existing.title || "");
        setSubtitle(existing.subtitle || "");
        setExcerpt(existing.excerpt || "");
        setSlug(existing.slug || "");
        setBodyHtml(existing.bodyHtml || "");
        setCategory(existing.category || "economia");
        setCategoryName(existing.categoryName || "Economia");
        setAuthorName(existing.authorName || "Produção HDZ Finance");
        setCoverImagePath(existing.coverImagePath || "/images/materias/ciclos-de-mercado/cover.webp");
        setCoverImageAlt(existing.coverImageAlt || "");
        setFeatured(existing.featured || false);
        setFeaturedOrder(existing.featuredOrder || 1);
        setStatus(existing.status || "draft");
        setSeoTitle(existing.seoTitle || existing.title || "");
        setSeoDescription(existing.seoDescription || existing.subtitle || "");
        if (existing.publishedAt) {
          setPublishDate(new Date(existing.publishedAt).toISOString().slice(0, 16));
        }
      }
    }
  }, [initialId]);

  // Auto-generate slug from title if slug is empty or creating new
  const handleTitleChange = (val: string) => {
    setTitle(val);
    if (!initialId && (!slug || slug === generateSlug(title))) {
      setSlug(generateSlug(val));
    }
    if (!seoTitle) setSeoTitle(val);
  };

  const generateSlug = (text: string) => {
    return text
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/[^a-z0-9 -]/g, "")
      .replace(/\s+/g, "-")
      .replace(/-+/g, "-")
      .trim();
  };

  const handleCategorySelect = (catSlug: string) => {
    setCategory(catSlug);
    const cat = CATEGORY_LIST.find((c) => c.slug === catSlug);
    if (cat) {
      setCategoryName(cat.name);
    }
  };

  const handleSave = (targetStatus: ContentStatus = status) => {
    if (!title.trim()) {
      alert("Por favor, preencha o título antes de salvar.");
      return;
    }

    if (targetStatus === "published") {
      if (!coverImagePath) {
        alert("Por favor, faça o upload de uma imagem de capa antes de publicar.");
        return;
      }
      if (!coverImageAlt.trim()) {
        alert("Por favor, preencha a descrição da imagem para acessibilidade antes de publicar.");
        return;
      }
    }

    setAutosaveStatus("saving");

    const saved = cmsStore.saveItem({
      id: itemIdRef.current,
      type,
      status: targetStatus,
      title,
      subtitle,
      excerpt: excerpt || subtitle,
      slug: slug || generateSlug(title),
      bodyHtml,
      category,
      categoryName,
      authorName: authorName || "Produção HDZ Finance",
      coverImagePath,
      coverImageAlt: coverImageAlt || title,
      featured,
      featuredOrder,
      seoTitle: seoTitle || title,
      seoDescription: seoDescription || subtitle,
      publishedAt: new Date(publishDate).toISOString(),
    });

    itemIdRef.current = saved.id;
    setStatus(targetStatus);
    setAutosaveStatus("saved");

    setTimeout(() => {
      setAutosaveStatus("idle");
    }, 3000);
  };

  return (
    <div className="space-y-6">
      {/* Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-6 rounded-2xl bg-[#0B0F14] border border-[#EEF4FA]/10">
        <div className="flex items-center space-x-3">
          <button
            type="button"
            onClick={() => router.push(`/admin/${type}s`)}
            className="p-2 rounded-xl bg-[#0E131A] hover:bg-white/10 border border-white/10 text-[#AEB8C4] hover:text-[#F5F7FA] transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
          </button>

          <div>
            <div className="flex items-center space-x-2">
              <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${
                type === "materia" ? "bg-[#168BFF]/20 text-[#168BFF]" : type === "noticia" ? "bg-[#F59A18]/20 text-[#F59A18]" : "bg-[#18C98B]/20 text-[#18C98B]"
              }`}>
                Editor de {type}
              </span>
              {autosaveStatus === "saving" && (
                <span className="text-[11px] text-[#FFC05A] flex items-center gap-1">
                  <Clock className="w-3 h-3 animate-spin" /> Salvando...
                </span>
              )}
              {autosaveStatus === "saved" && (
                <span className="text-[11px] text-[#18C98B] flex items-center gap-1">
                  <CheckCircle2 className="w-3 h-3" /> Salvo!
                </span>
              )}
            </div>
            <h1 className="font-outfit font-extrabold text-xl text-[#F5F7FA] mt-1">
              {initialId ? `Editar ${type}` : `Criar nova ${type}`}
            </h1>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center space-x-2">
          <button
            type="button"
            onClick={() => setShowPreviewModal(true)}
            className="px-3.5 py-2 rounded-xl bg-[#0E131A] hover:bg-[#121720] border border-white/10 text-xs font-semibold text-[#F5F7FA] transition-all flex items-center space-x-1.5"
          >
            <Eye className="w-4 h-4 text-[#168BFF]" />
            <span className="hidden sm:inline">Pré-visualizar</span>
          </button>

          <button
            type="button"
            onClick={() => handleSave("draft")}
            className="px-4 py-2 rounded-xl bg-[#0E131A] hover:bg-[#121720] border border-white/10 text-xs font-bold text-[#F5F7FA] transition-all flex items-center space-x-1.5"
          >
            <Save className="w-4 h-4 text-[#FFC05A]" />
            <span>Salvar Rascunho</span>
          </button>

          <button
            type="button"
            onClick={() => handleSave("published")}
            className="px-5 py-2 rounded-xl bg-[#168BFF] hover:bg-[#3A91FF] text-white text-xs font-extrabold uppercase tracking-wider shadow-lg transition-all flex items-center space-x-1.5"
          >
            <Send className="w-4 h-4" />
            <span>Publicar</span>
          </button>
        </div>
      </div>

      {/* Main Grid: Form Left (8 cols) + Metadata Sidebar (4 cols) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column (8 cols): Title, Subtitle, TipTap Editor, SEO */}
        <div className="lg:col-span-8 space-y-6">
          {/* Main Title & Subtitle */}
          <div className="p-6 rounded-2xl bg-[#0B0F14] border border-white/10 space-y-4">
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-[#AEB8C4] block">Título Principal</label>
              <input
                type="text"
                value={title}
                onChange={(e) => handleTitleChange(e.target.value)}
                placeholder={`Digite o título da ${type}...`}
                className="w-full bg-[#0E131A] border border-white/10 rounded-xl px-4 py-3 font-outfit font-bold text-lg text-[#F5F7FA] placeholder-[#AEB8C4]/40 focus:outline-none focus:border-[#168BFF]"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-[#AEB8C4] block">Subtítulo / Linha de Fina</label>
              <textarea
                rows={2}
                value={subtitle}
                onChange={(e) => {
                  setSubtitle(e.target.value);
                  if (!seoDescription) setSeoDescription(e.target.value);
                }}
                placeholder={`Breve resumo de suporte ao título da ${type}...`}
                className="w-full bg-[#0E131A] border border-white/10 rounded-xl px-4 py-2.5 text-xs text-[#F5F7FA] placeholder-[#AEB8C4]/40 focus:outline-none focus:border-[#168BFF]"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-[#AEB8C4] block">URL Amigável (Slug)</label>
              <div className="flex items-center space-x-2">
                <span className="text-xs text-[#AEB8C4] bg-[#0E131A] px-3 py-2 rounded-xl border border-white/10">
                  /{type}s/
                </span>
                <input
                  type="text"
                  value={slug}
                  onChange={(e) => setSlug(generateSlug(e.target.value))}
                  placeholder="slug-do-conteudo"
                  className="flex-1 bg-[#0E131A] border border-white/10 rounded-xl px-4 py-2 text-xs text-[#F5F7FA] focus:outline-none focus:border-[#168BFF]"
                />
              </div>
            </div>
          </div>

          {/* Upload da Imagem de Capa (Componente Reutilizável) */}
          <CoverImageUploader
            contentId={itemIdRef.current}
            contentType={type}
            currentPath={coverImagePath}
            currentAlt={coverImageAlt}
            contentTitle={title}
            onUploadComplete={(path, alt) => {
              setCoverImagePath(path);
              setCoverImageAlt(alt);
            }}
            onRemove={() => {
              setCoverImagePath("");
              setCoverImageAlt("");
            }}
          />

          {/* TipTap Rich Text Editor */}
          <div className="space-y-2">
            <label className="text-xs font-semibold text-[#AEB8C4] block">Corpo Completo do Conteúdo</label>
            <TipTapEditor content={bodyHtml} onChange={setBodyHtml} />
          </div>

          {/* SEO & Social Sharing Settings */}
          <div className="p-6 rounded-2xl bg-[#0B0F14] border border-white/10 space-y-4">
            <div className="flex items-center space-x-2 text-xs font-bold uppercase tracking-wider text-[#F59A18]">
              <Search className="w-4 h-4" />
              <span>Otimização para SEO & Redes Sociais</span>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-[#AEB8C4] block">Título SEO (Title Tag)</label>
              <input
                type="text"
                value={seoTitle}
                onChange={(e) => setSeoTitle(e.target.value)}
                placeholder="Título otimizado para o Google"
                className="w-full bg-[#0E131A] border border-white/10 rounded-xl px-4 py-2 text-xs text-[#F5F7FA] focus:outline-none focus:border-[#168BFF]"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-[#AEB8C4] block">Meta Meta Description</label>
              <textarea
                rows={2}
                value={seoDescription}
                onChange={(e) => setSeoDescription(e.target.value)}
                placeholder="Resumo que aparecerá nos resultados do Google (máx recomendada: 160 caracteres)"
                className="w-full bg-[#0E131A] border border-white/10 rounded-xl px-4 py-2 text-xs text-[#F5F7FA] focus:outline-none focus:border-[#168BFF]"
              />
            </div>

            {/* Live Google Search Preview Box */}
            <div className="p-4 rounded-xl bg-[#0E131A] border border-white/10 space-y-1 text-xs">
              <span className="text-[10px] text-[#AEB8C4] uppercase font-bold tracking-wider block">Prévia no Google</span>
              <span className="text-[#3A91FF] font-semibold block text-sm hover:underline cursor-pointer">
                {seoTitle || title || "Título da Página"} | HDZ Finance
              </span>
              <span className="text-[#18C98B] block text-[11px]">https://hdzfinance.com.br/{type}s/{slug || "slug"}</span>
              <p className="text-[#AEB8C4] text-[11px] line-clamp-2">
                {seoDescription || subtitle || "Descrição resumida da matéria que aparecerá no mecanismo de busca..."}
              </p>
            </div>
          </div>
        </div>

        {/* Right Column (4 cols): Publishing metadata, Category, Cover Image */}
        <div className="lg:col-span-4 space-y-6">
          {/* Status & Publication Box */}
          <div className="p-6 rounded-2xl bg-[#0B0F14] border border-white/10 space-y-4 text-xs">
            <h3 className="font-outfit font-bold text-sm text-[#F5F7FA]">Publicação & Estado</h3>

            <div className="space-y-1.5">
              <label className="text-[#AEB8C4] font-semibold block">Status</label>
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value as ContentStatus)}
                className="w-full bg-[#0E131A] border border-white/10 text-[#F5F7FA] rounded-xl px-3 py-2 focus:outline-none"
              >
                <option value="draft">Rascunho</option>
                <option value="scheduled">Agendado</option>
                <option value="published">Publicado</option>
                <option value="archived">Arquivado</option>
              </select>
            </div>

            <div className="space-y-1.5">
              <label className="text-[#AEB8C4] font-semibold block">Data de Publicação</label>
              <input
                type="datetime-local"
                value={publishDate}
                onChange={(e) => setPublishDate(e.target.value)}
                className="w-full bg-[#0E131A] border border-white/10 text-[#F5F7FA] rounded-xl px-3 py-2 focus:outline-none"
              />
            </div>

            <div className="pt-2 border-t border-white/10 flex items-center justify-between">
              <span className="text-[#AEB8C4] font-semibold">Destaque na Home</span>
              <input
                type="checkbox"
                checked={featured}
                onChange={(e) => setFeatured(e.target.checked)}
                className="w-4 h-4 accent-[#168BFF] rounded"
              />
            </div>
          </div>

          {/* Category & Author Box */}
          <div className="p-6 rounded-2xl bg-[#0B0F14] border border-white/10 space-y-4 text-xs">
            <h3 className="font-outfit font-bold text-sm text-[#F5F7FA]">Categoria & Autor</h3>

            <div className="space-y-1.5">
              <label className="text-[#AEB8C4] font-semibold block">Categoria</label>
              <select
                value={category}
                onChange={(e) => handleCategorySelect(e.target.value)}
                className="w-full bg-[#0E131A] border border-white/10 text-[#F5F7FA] rounded-xl px-3 py-2 focus:outline-none"
              >
                {CATEGORY_LIST.map((cat) => (
                  <option key={cat.slug} value={cat.slug}>
                    {cat.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="space-y-1.5">
              <label className="text-[#AEB8C4] font-semibold block">Assinatura / Autor</label>
              <input
                type="text"
                value={authorName}
                onChange={(e) => setAuthorName(e.target.value)}
                placeholder="Produção HDZ Finance"
                className="w-full bg-[#0E131A] border border-white/10 text-[#F5F7FA] rounded-xl px-3 py-2 focus:outline-none"
              />
            </div>
          </div>

          {/* Cover Image Summary Side Card */}
          <div className="p-6 rounded-2xl bg-[#0B0F14] border border-white/10 space-y-4 text-xs">
            <div className="flex items-center justify-between">
              <h3 className="font-outfit font-bold text-sm text-[#F5F7FA]">Imagem de Capa</h3>
              {coverImagePath ? (
                <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-[#18C98B]/20 text-[#18C98B] border border-[#18C98B]/30">
                  Carregada
                </span>
              ) : (
                <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-[#F5A524]/20 text-[#F5A524] border border-[#F5A524]/30">
                  Pendente
                </span>
              )}
            </div>

            <div className="relative aspect-[16/9] w-full rounded-xl overflow-hidden bg-[#0E131A] border border-white/10 flex items-center justify-center">
              {coverImagePath ? (
                <Image
                  src={coverImagePath}
                  alt={coverImageAlt || "Prévia da Capa"}
                  fill
                  className="object-cover"
                />
              ) : (
                <div className="text-center p-4 text-[#AEB8C4]/60 space-y-1">
                  <p className="text-xs font-semibold">Sem capa enviada</p>
                  <p className="text-[10px]">Use o campo de upload no centro da página</p>
                </div>
              )}
            </div>

            {coverImageAlt && (
              <div className="p-2.5 rounded-xl bg-[#0E131A] border border-white/10 text-[11px] text-[#AEB8C4] space-y-0.5">
                <span className="text-[10px] uppercase font-bold text-[#FFC05A] block">Texto Alternativo</span>
                <p className="text-[#F5F7FA] line-clamp-2">{coverImageAlt}</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Preview Modal */}
      {showPreviewModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-md">
          <div className="w-full max-w-5xl h-[85vh] bg-[#050709] border border-white/10 rounded-2xl flex flex-col overflow-hidden shadow-2xl">
            {/* Modal Header Bar */}
            <div className="p-4 bg-[#0B0F14] border-b border-white/10 flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <span className="text-xs font-bold uppercase text-[#168BFF]">Pré-visualização</span>
                <span className="text-xs text-[#AEB8C4]">• {title || "Sem Título"}</span>
              </div>

              {/* Device Selector Buttons */}
              <div className="flex items-center space-x-1 bg-[#0E131A] p-1 rounded-xl border border-white/10 text-xs">
                <button
                  type="button"
                  onClick={() => setPreviewDevice("desktop")}
                  className={`p-1.5 rounded-lg flex items-center space-x-1 ${previewDevice === "desktop" ? "bg-[#168BFF] text-white" : "text-[#AEB8C4]"}`}
                >
                  <Monitor className="w-4 h-4" />
                  <span className="hidden sm:inline">Desktop</span>
                </button>
                <button
                  type="button"
                  onClick={() => setPreviewDevice("tablet")}
                  className={`p-1.5 rounded-lg flex items-center space-x-1 ${previewDevice === "tablet" ? "bg-[#168BFF] text-white" : "text-[#AEB8C4]"}`}
                >
                  <Tablet className="w-4 h-4" />
                  <span className="hidden sm:inline">Tablet</span>
                </button>
                <button
                  type="button"
                  onClick={() => setPreviewDevice("mobile")}
                  className={`p-1.5 rounded-lg flex items-center space-x-1 ${previewDevice === "mobile" ? "bg-[#168BFF] text-white" : "text-[#AEB8C4]"}`}
                >
                  <Smartphone className="w-4 h-4" />
                  <span className="hidden sm:inline">Celular</span>
                </button>
              </div>

              <button
                type="button"
                onClick={() => setShowPreviewModal(false)}
                className="px-3 py-1.5 rounded-xl bg-white/10 hover:bg-white/20 text-xs font-bold text-white"
              >
                Fechar
              </button>
            </div>

            {/* Preview Frame */}
            <div className="flex-1 overflow-y-auto p-6 bg-[#050607] flex justify-center">
              <div
                className={`transition-all duration-300 bg-[#050607] text-[#F5F7FA] space-y-6 ${
                  previewDevice === "desktop"
                    ? "w-full max-w-4xl"
                    : previewDevice === "tablet"
                    ? "w-[768px] border border-white/10 rounded-2xl p-6 shadow-xl"
                    : "w-[375px] border border-white/10 rounded-2xl p-4 shadow-xl"
                }`}
              >
                <div className="space-y-3">
                  <span className="px-3 py-1 rounded text-xs font-bold uppercase bg-[#168BFF] text-white">
                    {categoryName}
                  </span>
                  <h1 className="font-outfit font-extrabold text-2xl md:text-4xl text-[#F5F7FA] leading-tight">
                    {title || "Título da Matéria"}
                  </h1>
                  <p className="text-sm md:text-base text-[#AEB8C4] leading-relaxed">
                    {subtitle}
                  </p>
                  <div className="text-xs text-[#AEB8C4] pt-2 border-t border-white/10 flex items-center justify-between">
                    <span>Assinado por {authorName}</span>
                    <span>{new Date(publishDate).toLocaleDateString("pt-BR")}</span>
                  </div>
                </div>

                <div className="relative aspect-[16/9] w-full rounded-2xl overflow-hidden bg-[#0E131A]">
                  <Image src={coverImagePath} alt="Capa" fill className="object-cover" />
                </div>

                <div
                  className="prose prose-invert max-w-none text-sm md:text-base leading-relaxed text-[#F5F7FA]"
                  dangerouslySetInnerHTML={{ __html: bodyHtml || "<p>Seu conteúdo aparecerá aqui...</p>" }}
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
