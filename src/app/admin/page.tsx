"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { cmsStore, CMSContentItem } from "@/lib/cms-store";
import {
  FileText,
  Newspaper,
  Calendar,
  FileEdit,
  Clock,
  Users,
  Eye,
  MousePointerClick,
  PlusCircle,
  Image as ImageIcon,
  Home,
  CheckCircle2,
  ExternalLink,
  ShieldCheck,
} from "lucide-react";

export default function AdminDashboardPage() {
  const [items, setItems] = useState<CMSContentItem[]>([]);

  useEffect(() => {
    setItems(cmsStore.getItems());
  }, []);

  const materias = items.filter((i) => i.type === "materia");
  const noticias = items.filter((i) => i.type === "noticia");
  const eventos = items.filter((i) => i.type === "evento");

  const publishedMaterias = materias.filter((i) => i.status === "published").length;
  const publishedNoticias = noticias.filter((i) => i.status === "published").length;
  const publishedEventos = eventos.filter((i) => i.status === "published").length;
  const draftsCount = items.filter((i) => i.status === "draft").length;

  const recentItems = [...items].sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()).slice(0, 5);

  return (
    <div className="space-y-8">
      {/* Header Banner */}
      <div className="p-6 md:p-8 rounded-2xl bg-[#0B0F14] border border-[#EEF4FA]/10 space-y-3">
        <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-md bg-[#F59A18]/10 text-[#F59A18] border border-[#F59A18]/30 text-xs font-bold uppercase tracking-wider">
          <ShieldCheck className="w-4 h-4" />
          <span>Visão Geral do Sistema</span>
        </div>
        <h1 className="font-outfit font-extrabold text-2xl md:text-4xl text-[#F5F7FA] tracking-tight">
          Painel de Controle Editorial & Tecnologia
        </h1>
        <p className="text-xs md:text-sm text-[#AEB8C4] max-w-3xl leading-relaxed">
          Gerencie publicações, matérias, notícias, eventos, mídias e monitore métricas de audiência em tempo real.
        </p>
      </div>

      {/* Primary Overview Stats Grid (4 cols) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Matérias Card */}
        <div className="p-5 rounded-2xl bg-[#0E131A] border border-[#EEF4FA]/10 flex flex-col justify-between space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-[#168BFF]">Matérias</span>
            <div className="p-2 rounded-xl bg-[#168BFF]/10 text-[#168BFF]">
              <FileText className="w-4 h-4" />
            </div>
          </div>
          <div>
            <span className="font-outfit font-extrabold text-3xl text-[#F5F7FA]">{publishedMaterias}</span>
            <span className="text-xs text-[#AEB8C4] block mt-1">Matérias ativas publicadas</span>
          </div>
          <Link href="/admin/materias" className="text-xs text-[#168BFF] hover:underline font-semibold flex items-center gap-1">
            <span>Gerenciar matérias</span> &rarr;
          </Link>
        </div>

        {/* Notícias Card */}
        <div className="p-5 rounded-2xl bg-[#0E131A] border border-[#EEF4FA]/10 flex flex-col justify-between space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-[#F59A18]">Notícias</span>
            <div className="p-2 rounded-xl bg-[#F59A18]/10 text-[#F59A18]">
              <Newspaper className="w-4 h-4" />
            </div>
          </div>
          <div>
            <span className="font-outfit font-extrabold text-3xl text-[#F5F7FA]">{publishedNoticias}</span>
            <span className="text-xs text-[#AEB8C4] block mt-1">Notícias diárias ativas</span>
          </div>
          <Link href="/admin/noticias" className="text-xs text-[#F59A18] hover:underline font-semibold flex items-center gap-1">
            <span>Gerenciar notícias</span> &rarr;
          </Link>
        </div>

        {/* Eventos Card */}
        <div className="p-5 rounded-2xl bg-[#0E131A] border border-[#EEF4FA]/10 flex flex-col justify-between space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-[#18C98B]">Eventos</span>
            <div className="p-2 rounded-xl bg-[#18C98B]/10 text-[#18C98B]">
              <Calendar className="w-4 h-4" />
            </div>
          </div>
          <div>
            <span className="font-outfit font-extrabold text-3xl text-[#F5F7FA]">{publishedEventos}</span>
            <span className="text-xs text-[#AEB8C4] block mt-1">Eventos programados</span>
          </div>
          <Link href="/admin/eventos" className="text-xs text-[#18C98B] hover:underline font-semibold flex items-center gap-1">
            <span>Gerenciar eventos</span> &rarr;
          </Link>
        </div>

        {/* Rascunhos Card */}
        <div className="p-5 rounded-2xl bg-[#0E131A] border border-[#EEF4FA]/10 flex flex-col justify-between space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-[#FFC05A]">Rascunhos</span>
            <div className="p-2 rounded-xl bg-[#FFC05A]/10 text-[#FFC05A]">
              <FileEdit className="w-4 h-4" />
            </div>
          </div>
          <div>
            <span className="font-outfit font-extrabold text-3xl text-[#F5F7FA]">{draftsCount}</span>
            <span className="text-xs text-[#AEB8C4] block mt-1">Em edição ou rascunho</span>
          </div>
          <Link href="/admin/conteudos" className="text-xs text-[#FFC05A] hover:underline font-semibold flex items-center gap-1">
            <span>Ver todos</span> &rarr;
          </Link>
        </div>
      </div>

      {/* Quick Shortcuts Section */}
      <div className="space-y-4">
        <h2 className="font-outfit font-bold text-lg text-[#F5F7FA]">Atalhos Rápidos</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
          <Link
            href="/admin/materias/novo"
            className="p-4 rounded-xl bg-[#0B0F14] hover:bg-[#0E131A] border border-white/10 hover:border-[#168BFF]/40 flex flex-col items-center text-center space-y-2 group transition-all"
          >
            <PlusCircle className="w-5 h-5 text-[#168BFF] group-hover:scale-110 transition-transform" />
            <span className="text-xs font-semibold text-[#F5F7FA]">Nova Matéria</span>
          </Link>

          <Link
            href="/admin/noticias/novo"
            className="p-4 rounded-xl bg-[#0B0F14] hover:bg-[#0E131A] border border-white/10 hover:border-[#F59A18]/40 flex flex-col items-center text-center space-y-2 group transition-all"
          >
            <PlusCircle className="w-5 h-5 text-[#F59A18] group-hover:scale-110 transition-transform" />
            <span className="text-xs font-semibold text-[#F5F7FA]">Nova Notícia</span>
          </Link>

          <Link
            href="/admin/eventos/novo"
            className="p-4 rounded-xl bg-[#0B0F14] hover:bg-[#0E131A] border border-white/10 hover:border-[#18C98B]/40 flex flex-col items-center text-center space-y-2 group transition-all"
          >
            <PlusCircle className="w-5 h-5 text-[#18C98B] group-hover:scale-110 transition-transform" />
            <span className="text-xs font-semibold text-[#F5F7FA]">Novo Evento</span>
          </Link>

          <Link
            href="/admin/midia"
            className="p-4 rounded-xl bg-[#0B0F14] hover:bg-[#0E131A] border border-white/10 hover:border-white/20 flex flex-col items-center text-center space-y-2 group transition-all"
          >
            <ImageIcon className="w-5 h-5 text-[#AEB8C4] group-hover:scale-110 transition-transform" />
            <span className="text-xs font-semibold text-[#F5F7FA]">Enviar Imagem</span>
          </Link>

          <Link
            href="/admin/pagina-inicial"
            className="p-4 rounded-xl bg-[#0B0F14] hover:bg-[#0E131A] border border-white/10 hover:border-white/20 flex flex-col items-center text-center space-y-2 group transition-all"
          >
            <Home className="w-5 h-5 text-[#AEB8C4] group-hover:scale-110 transition-transform" />
            <span className="text-xs font-semibold text-[#F5F7FA]">Página Inicial</span>
          </Link>

          <Link
            href="/"
            target="_blank"
            className="p-4 rounded-xl bg-[#0B0F14] hover:bg-[#0E131A] border border-white/10 hover:border-white/20 flex flex-col items-center text-center space-y-2 group transition-all"
          >
            <ExternalLink className="w-5 h-5 text-[#AEB8C4] group-hover:scale-110 transition-transform" />
            <span className="text-xs font-semibold text-[#F5F7FA]">Visualizar Site</span>
          </Link>
        </div>
      </div>

      {/* Recent Activity Table & System Status (2 cols) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Recent Items (8 cols) */}
        <div className="lg:col-span-8 p-6 rounded-2xl bg-[#0B0F14] border border-[#EEF4FA]/10 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-outfit font-bold text-base text-[#F5F7FA]">Últimas Atualizações Editoriais</h3>
            <Link href="/admin/conteudos" className="text-xs text-[#168BFF] hover:underline font-medium">
              Ver todos &rarr;
            </Link>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-white/10 text-[#AEB8C4]">
                  <th className="pb-3 font-semibold">Título</th>
                  <th className="pb-3 font-semibold">Tipo</th>
                  <th className="pb-3 font-semibold">Status</th>
                  <th className="pb-3 font-semibold">Última edição</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {recentItems.map((item) => (
                  <tr key={item.id} className="hover:bg-white/5">
                    <td className="py-3 font-semibold text-[#F5F7FA] max-w-xs truncate">{item.title}</td>
                    <td className="py-3">
                      <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${
                        item.type === "materia"
                          ? "bg-[#168BFF]/20 text-[#168BFF]"
                          : item.type === "noticia"
                          ? "bg-[#F59A18]/20 text-[#F59A18]"
                          : "bg-[#18C98B]/20 text-[#18C98B]"
                      }`}>
                        {item.type}
                      </span>
                    </td>
                    <td className="py-3">
                      <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${
                        item.status === "published"
                          ? "bg-[#18C98B]/10 text-[#18C98B]"
                          : "bg-[#FFC05A]/10 text-[#FFC05A]"
                      }`}>
                        {item.status}
                      </span>
                    </td>
                    <td className="py-3 text-[#AEB8C4]">
                      {new Date(item.updatedAt).toLocaleDateString("pt-BR")}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* System Integrations Status (4 cols) */}
        <div className="lg:col-span-4 p-6 rounded-2xl bg-[#0B0F14] border border-[#EEF4FA]/10 space-y-5">
          <h3 className="font-outfit font-bold text-base text-[#F5F7FA]">Status das Integrações</h3>

          <div className="space-y-4 text-xs">
            <div className="p-3.5 rounded-xl bg-[#0E131A] border border-white/10 space-y-1.5">
              <div className="flex items-center justify-between">
                <span className="font-semibold text-[#F5F7FA]">Banco & Autenticação</span>
                <span className="px-2 py-0.5 rounded bg-[#18C98B]/20 text-[#18C98B] font-bold text-[10px] uppercase flex items-center gap-1">
                  <CheckCircle2 className="w-3 h-3" /> Ativo
                </span>
              </div>
              <p className="text-[#AEB8C4] text-[11px]">
                Supabase PostgreSQL com Row Level Security (RLS) habilitado.
              </p>
            </div>

            <div className="p-3.5 rounded-xl bg-[#0E131A] border border-white/10 space-y-1.5">
              <div className="flex items-center justify-between">
                <span className="font-semibold text-[#F5F7FA]">Analytics & Audiência</span>
                <span className="px-2 py-0.5 rounded bg-[#F59A18]/20 text-[#F59A18] font-bold text-[10px] uppercase">
                  Aguardando Chave
                </span>
              </div>
              <p className="text-[#AEB8C4] text-[11px]">
                PostHog Analytics configurado e pronto para receber tokens de produção.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
