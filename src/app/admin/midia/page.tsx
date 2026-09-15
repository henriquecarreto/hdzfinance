"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { cmsStore, MediaAssetItem } from "@/lib/cms-store";
import ConfirmModal from "@/components/admin/ConfirmModal";
import {
  Image as ImageIcon,
  Upload,
  Search,
  Copy,
  Trash2,
  Check,
  FileImage,
} from "lucide-react";

export default function AdminMidiaPage() {
  const [assets, setAssets] = useState<MediaAssetItem[]>([]);
  const [search, setSearch] = useState("");
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [newUrlInput, setNewUrlInput] = useState("");
  const [newFilenameInput, setNewFilenameInput] = useState("");
  const [deleteTargetId, setDeleteTargetId] = useState<string | null>(null);

  useEffect(() => {
    setAssets(cmsStore.getMediaAssets());
  }, []);

  const handleAddMedia = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newUrlInput.trim()) return;

    cmsStore.addMediaAsset({
      storagePath: `content-media/uploads/${Date.now()}-${newFilenameInput || "imagem"}`,
      publicUrl: newUrlInput.trim(),
      originalFilename: newFilenameInput.trim() || "imagem-upload.jpg",
      mimeType: "image/webp",
      fileSize: 150000,
      altText: newFilenameInput || "Imagem de mídia HDZ",
    });

    setNewUrlInput("");
    setNewFilenameInput("");
    setAssets(cmsStore.getMediaAssets());
  };

  const handleCopyUrl = (url: string, id: string) => {
    navigator.clipboard.writeText(url);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleDeleteConfirm = () => {
    if (deleteTargetId) {
      cmsStore.deleteMediaAsset(deleteTargetId);
      setDeleteTargetId(null);
      setAssets(cmsStore.getMediaAssets());
    }
  };

  const filteredAssets = assets.filter(
    (a) =>
      a.originalFilename.toLowerCase().includes(search.toLowerCase()) ||
      a.publicUrl.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="p-6 rounded-2xl bg-[#0B0F14] border border-[#EEF4FA]/10 space-y-2">
        <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-md bg-[#168BFF]/10 text-[#168BFF] border border-[#168BFF]/30 text-xs font-bold uppercase tracking-wider">
          <ImageIcon className="w-4 h-4" />
          <span>Biblioteca de Mídia</span>
        </div>
        <h1 className="font-outfit font-extrabold text-2xl text-[#F5F7FA]">Mídia & Arquivos Otimizados</h1>
        <p className="text-xs text-[#AEB8C4]">
          Gerencie imagens publicadas, capas de matérias e arquivos de suporte armazenados no Supabase Storage.
        </p>
      </div>

      {/* Upload Form Box */}
      <div className="p-6 rounded-2xl bg-[#0B0F14] border border-white/10 space-y-4">
        <h3 className="font-outfit font-bold text-sm text-[#F5F7FA]">Adicionar Nova Mídia por URL / Upload</h3>
        <form onSubmit={handleAddMedia} className="grid grid-cols-1 md:grid-cols-12 gap-3 text-xs">
          <div className="md:col-span-6 space-y-1">
            <label className="text-[#AEB8C4] font-semibold">URL da Imagem / Arquivo</label>
            <input
              type="text"
              required
              value={newUrlInput}
              onChange={(e) => setNewUrlInput(e.target.value)}
              placeholder="https://sua-cdn.com/imagem.webp ou /images/materias/..."
              className="w-full bg-[#0E131A] border border-white/10 text-[#F5F7FA] rounded-xl px-3.5 py-2.5 focus:outline-none focus:border-[#168BFF]"
            />
          </div>

          <div className="md:col-span-4 space-y-1">
            <label className="text-[#AEB8C4] font-semibold">Nome do Arquivo</label>
            <input
              type="text"
              value={newFilenameInput}
              onChange={(e) => setNewFilenameInput(e.target.value)}
              placeholder="capa-ouro-prata.webp"
              className="w-full bg-[#0E131A] border border-white/10 text-[#F5F7FA] rounded-xl px-3.5 py-2.5 focus:outline-none focus:border-[#168BFF]"
            />
          </div>

          <div className="md:col-span-2 flex items-end">
            <button
              type="submit"
              className="w-full py-2.5 rounded-xl bg-[#168BFF] hover:bg-[#3A91FF] text-white font-bold text-xs uppercase tracking-wider flex items-center justify-center space-x-1.5 shadow-md transition-all"
            >
              <Upload className="w-4 h-4" />
              <span>Registrar</span>
            </button>
          </div>
        </form>
      </div>

      {/* Search Bar */}
      <div className="p-4 rounded-xl bg-[#0B0F14] border border-white/10 flex items-center justify-between">
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-[#AEB8C4] absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Pesquisar por nome de arquivo..."
            className="w-full bg-[#0E131A] border border-white/10 rounded-xl pl-10 pr-4 py-2 text-xs text-[#F5F7FA] placeholder-[#AEB8C4]/40 focus:outline-none focus:border-[#168BFF]"
          />
        </div>
      </div>

      {/* Media Grid */}
      {filteredAssets.length === 0 ? (
        <div className="p-12 text-center rounded-2xl bg-[#0B0F14] border border-white/10 space-y-3">
          <FileImage className="w-10 h-10 text-[#AEB8C4] mx-auto opacity-40" />
          <p className="text-xs text-[#AEB8C4]">Nenhuma mídia encontrada na biblioteca. Utilize o formulário acima para cadastrar imagens.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {filteredAssets.map((asset) => (
            <div
              key={asset.id}
              className="p-3 rounded-2xl bg-[#0B0F14] border border-white/10 space-y-3 flex flex-col justify-between group"
            >
              <div className="space-y-2">
                <div className="relative aspect-[16/9] w-full rounded-xl overflow-hidden bg-[#0E131A] border border-white/10">
                  <Image src={asset.publicUrl} alt={asset.altText || "Mídia"} fill className="object-cover group-hover:scale-105 transition-transform duration-300" />
                </div>
                <div className="space-y-0.5">
                  <span className="font-outfit font-bold text-xs text-[#F5F7FA] block truncate">{asset.originalFilename}</span>
                  <span className="text-[10px] text-[#AEB8C4] block">{asset.mimeType} • {(asset.fileSize / 1024).toFixed(0)} KB</span>
                </div>
              </div>

              <div className="flex items-center justify-between pt-2 border-t border-white/10 text-xs">
                <button
                  type="button"
                  onClick={() => handleCopyUrl(asset.publicUrl, asset.id)}
                  className="flex items-center space-x-1 text-[#168BFF] hover:underline text-[11px] font-semibold"
                >
                  {copiedId === asset.id ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-[#18C98B]" />
                      <span className="text-[#18C98B]">Copiado!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span>Copiar URL</span>
                    </>
                  )}
                </button>

                <button
                  type="button"
                  onClick={() => setDeleteTargetId(asset.id)}
                  className="p-1.5 rounded-lg bg-white/5 hover:bg-[#FF5263]/20 text-[#AEB8C4] hover:text-[#FF5263] transition-colors"
                  title="Excluir mídia"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      <ConfirmModal
        isOpen={Boolean(deleteTargetId)}
        title="Excluir Mídia"
        message="Tem certeza que deseja excluir esta imagem da biblioteca? Verifique se ela não está em uso por algum conteúdo publicado."
        confirmText="Excluir Mídia"
        onConfirm={handleDeleteConfirm}
        onCancel={() => setDeleteTargetId(null)}
      />
    </div>
  );
}
