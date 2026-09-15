"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { cmsStore, CMSContentItem, ContentType } from "@/lib/cms-store";
import ConfirmModal from "@/components/admin/ConfirmModal";
import {
  FileText,
  Search,
  Filter,
  Plus,
  Edit,
  Trash2,
  Archive,
  Copy,
  ExternalLink,
} from "lucide-react";

export default function AdminConteudosPage() {
  const [items, setItems] = useState<CMSContentItem[]>([]);
  const [search, setSearch] = useState("");
  const [selectedType, setSelectedType] = useState<string>("all");
  const [selectedStatus, setSelectedStatus] = useState<string>("all");
  const [deleteTargetId, setDeleteTargetId] = useState<string | null>(null);

  useEffect(() => {
    setItems(cmsStore.getItems());
  }, []);

  const filteredItems = items.filter((item) => {
    const matchesSearch = item.title.toLowerCase().includes(search.toLowerCase()) || item.slug.includes(search);
    const matchesType = selectedType === "all" || item.type === selectedType;
    const matchesStatus = selectedStatus === "all" || item.status === selectedStatus;
    return matchesSearch && matchesType && matchesStatus;
  });

  const handleDuplicate = (id: string) => {
    const item = cmsStore.getItemById(id);
    if (item) {
      cmsStore.saveItem({
        ...item,
        id: undefined,
        title: `${item.title} (Cópia)`,
        slug: `${item.slug}-copia-${Date.now().toString().slice(-4)}`,
        status: "draft",
      });
      setItems(cmsStore.getItems());
    }
  };

  const handleArchive = (id: string) => {
    cmsStore.archiveItem(id);
    setItems(cmsStore.getItems());
  };

  const handleDeleteConfirm = () => {
    if (deleteTargetId) {
      cmsStore.deleteItem(deleteTargetId);
      setDeleteTargetId(null);
      setItems(cmsStore.getItems());
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-6 rounded-2xl bg-[#0B0F14] border border-[#EEF4FA]/10">
        <div>
          <h1 className="font-outfit font-extrabold text-2xl text-[#F5F7FA]">Todos os Conteúdos</h1>
          <p className="text-xs text-[#AEB8C4] mt-1">Gerenciamento centralizado de Matérias, Notícias e Eventos.</p>
        </div>

        <div className="flex items-center space-x-2">
          <Link
            href="/admin/materias/novo"
            className="px-4 py-2.5 rounded-xl bg-[#168BFF] hover:bg-[#3A91FF] text-white text-xs font-bold uppercase tracking-wider flex items-center space-x-1.5 shadow-md transition-all"
          >
            <Plus className="w-4 h-4" />
            <span>Nova Matéria</span>
          </Link>
          <Link
            href="/admin/noticias/novo"
            className="px-4 py-2.5 rounded-xl bg-[#F59A18] hover:bg-[#FFC05A] text-[#050709] text-xs font-bold uppercase tracking-wider flex items-center space-x-1.5 shadow-md transition-all"
          >
            <Plus className="w-4 h-4" />
            <span>Nova Notícia</span>
          </Link>
        </div>
      </div>

      {/* Filter & Search Bar */}
      <div className="p-4 rounded-xl bg-[#0B0F14] border border-white/10 flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-[#AEB8C4] absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Pesquisar por título ou slug..."
            className="w-full bg-[#0E131A] border border-white/10 rounded-xl pl-10 pr-4 py-2 text-xs text-[#F5F7FA] placeholder-[#AEB8C4]/40 focus:outline-none focus:border-[#168BFF]"
          />
        </div>

        <div className="flex items-center space-x-3 text-xs">
          <div className="flex items-center space-x-1.5">
            <Filter className="w-3.5 h-3.5 text-[#168BFF]" />
            <span className="text-[#AEB8C4]">Tipo:</span>
            <select
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value)}
              className="bg-[#0E131A] border border-white/10 text-[#F5F7FA] rounded-lg px-2.5 py-1.5 focus:outline-none"
            >
              <option value="all">Todos os tipos</option>
              <option value="materia">Matéria</option>
              <option value="noticia">Notícia</option>
              <option value="evento">Evento</option>
            </select>
          </div>

          <div className="flex items-center space-x-1.5">
            <span className="text-[#AEB8C4]">Status:</span>
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="bg-[#0E131A] border border-white/10 text-[#F5F7FA] rounded-lg px-2.5 py-1.5 focus:outline-none"
            >
              <option value="all">Todos os status</option>
              <option value="published">Publicados</option>
              <option value="draft">Rascunhos</option>
              <option value="archived">Arquivados</option>
            </select>
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="rounded-2xl bg-[#0B0F14] border border-[#EEF4FA]/10 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="bg-[#0E131A] border-b border-white/10 text-[#AEB8C4]">
                <th className="p-4 font-semibold">Conteúdo</th>
                <th className="p-4 font-semibold">Tipo</th>
                <th className="p-4 font-semibold">Categoria</th>
                <th className="p-4 font-semibold">Status</th>
                <th className="p-4 font-semibold">Data</th>
                <th className="p-4 font-semibold text-right">Ações</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {filteredItems.map((item) => (
                <tr key={item.id} className="hover:bg-white/5 transition-colors">
                  <td className="p-4 max-w-sm">
                    <span className="font-outfit font-bold text-sm text-[#F5F7FA] block truncate">{item.title}</span>
                    <span className="text-[11px] text-[#AEB8C4] block truncate">/{item.type}s/{item.slug}</span>
                  </td>

                  <td className="p-4">
                    <span className={`px-2.5 py-1 rounded text-[10px] font-bold uppercase ${
                      item.type === "materia"
                        ? "bg-[#168BFF]/20 text-[#168BFF]"
                        : item.type === "noticia"
                        ? "bg-[#F59A18]/20 text-[#F59A18]"
                        : "bg-[#18C98B]/20 text-[#18C98B]"
                    }`}>
                      {item.type}
                    </span>
                  </td>

                  <td className="p-4 text-[#AEB8C4]">
                    {item.categoryName || item.category}
                  </td>

                  <td className="p-4">
                    <span className={`px-2.5 py-1 rounded text-[10px] font-bold uppercase ${
                      item.status === "published"
                        ? "bg-[#18C98B]/15 text-[#18C98B]"
                        : item.status === "draft"
                        ? "bg-[#FFC05A]/15 text-[#FFC05A]"
                        : "bg-[#FF5263]/15 text-[#FF5263]"
                    }`}>
                      {item.status}
                    </span>
                  </td>

                  <td className="p-4 text-[#AEB8C4]">
                    {new Date(item.publishedAt).toLocaleDateString("pt-BR")}
                  </td>

                  <td className="p-4 text-right">
                    <div className="flex items-center justify-end space-x-2">
                      <Link
                        href={`/admin/${item.type}s/${item.id}`}
                        className="p-1.5 rounded-lg bg-white/5 hover:bg-[#168BFF]/20 text-[#AEB8C4] hover:text-[#168BFF] transition-colors"
                        title="Editar"
                      >
                        <Edit className="w-4 h-4" />
                      </Link>

                      <Link
                        href={`/${item.type}s/${item.slug}`}
                        target="_blank"
                        className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-[#AEB8C4] hover:text-[#F5F7FA] transition-colors"
                        title="Visualizar no site público"
                      >
                        <ExternalLink className="w-4 h-4" />
                      </Link>

                      <button
                        onClick={() => handleDuplicate(item.id)}
                        className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-[#AEB8C4] hover:text-[#F5F7FA] transition-colors"
                        title="Duplicar"
                      >
                        <Copy className="w-4 h-4" />
                      </button>

                      <button
                        onClick={() => handleArchive(item.id)}
                        className="p-1.5 rounded-lg bg-white/5 hover:bg-[#F59A18]/20 text-[#AEB8C4] hover:text-[#F59A18] transition-colors"
                        title="Arquivar"
                      >
                        <Archive className="w-4 h-4" />
                      </button>

                      <button
                        onClick={() => setDeleteTargetId(item.id)}
                        className="p-1.5 rounded-lg bg-white/5 hover:bg-[#FF5263]/20 text-[#AEB8C4] hover:text-[#FF5263] transition-colors"
                        title="Excluir"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <ConfirmModal
        isOpen={Boolean(deleteTargetId)}
        title="Excluir Conteúdo"
        message="Tem certeza que deseja excluir este conteúdo? Esta ação é permanente e removerá o item do sistema."
        confirmText="Excluir Definitivamente"
        onConfirm={handleDeleteConfirm}
        onCancel={() => setDeleteTargetId(null)}
      />
    </div>
  );
}
