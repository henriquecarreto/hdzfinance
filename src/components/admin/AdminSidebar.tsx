"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  FileText,
  Newspaper,
  Calendar,
  Image as ImageIcon,
  Home,
  Globe,
  BarChart3,
  ShieldCheck,
  FolderTree,
} from "lucide-react";

interface AdminSidebarProps {
  mobileOpen?: boolean;
  onCloseMobile?: () => void;
}

export default function AdminSidebar({ mobileOpen, onCloseMobile }: AdminSidebarProps) {
  const pathname = usePathname();

  const navItems = [
    { label: "Dashboard", href: "/admin", icon: LayoutDashboard },
    { label: "Todos os Conteúdos", href: "/admin/conteudos", icon: FolderTree },
    { label: "Matérias", href: "/admin/materias", icon: FileText },
    { label: "Notícias", href: "/admin/noticias", icon: Newspaper },
    { label: "Eventos", href: "/admin/eventos", icon: Calendar },
    { label: "Biblioteca de Mídia", href: "/admin/midia", icon: ImageIcon },
    { label: "Página Inicial", href: "/admin/pagina-inicial", icon: Home },
    { label: "Institucional & Site", href: "/admin/site", icon: Globe },
    { label: "Audiência & Analytics", href: "/admin/audiencia", icon: BarChart3 },
    { label: "Segurança & Logs", href: "/admin/seguranca", icon: ShieldCheck },
  ];

  return (
    <>
      {/* Backdrop for Mobile */}
      {mobileOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/70 md:hidden backdrop-blur-sm"
          onClick={onCloseMobile}
        />
      )}

      {/* Sidebar Container */}
      <aside
        className={`fixed top-0 bottom-0 left-0 z-50 w-64 bg-[#050709] border-r border-[#EEF4FA]/10 flex flex-col transition-transform duration-300 md:translate-x-0 ${
          mobileOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
        }`}
      >
        {/* Brand Logo Header */}
        <div className="h-16 px-6 border-b border-[#EEF4FA]/10 flex items-center justify-between">
          <Link href="/admin" className="flex items-center space-x-2">
            <span className="font-outfit font-black text-lg tracking-wider text-[#F5F7FA]">
              HDZ <span className="text-[#F59A18]">ADMIN</span>
            </span>
          </Link>
          <span className="text-[10px] font-bold uppercase tracking-widest text-[#168BFF] bg-[#168BFF]/10 border border-[#168BFF]/30 px-2 py-0.5 rounded">
            v1.0
          </span>
        </div>

        {/* Navigation Links */}
        <nav className="flex-1 overflow-y-auto p-4 space-y-1 scrollbar-none">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive =
              item.href === "/admin"
                ? pathname === "/admin"
                : pathname.startsWith(item.href);

            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={onCloseMobile}
                className={`flex items-center space-x-3 px-3.5 py-2.5 rounded-xl text-xs font-medium transition-all ${
                  isActive
                    ? "bg-[#168BFF]/15 text-[#168BFF] font-semibold border border-[#168BFF]/30 shadow-sm"
                    : "text-[#AEB8C4] hover:bg-[#0B0F14] hover:text-[#F5F7FA]"
                }`}
              >
                <Icon className={`w-4 h-4 shrink-0 ${isActive ? "text-[#168BFF]" : "text-[#AEB8C4]"}`} />
                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>

        {/* Bottom Footer Info */}
        <div className="p-4 border-t border-[#EEF4FA]/10 text-[11px] text-[#AEB8C4]/70 space-y-1 bg-[#0B0F14]/50">
          <p className="font-medium text-[#F5F7FA]">HDZ Finance CMS</p>
          <p>Painel Administrativo Seguro</p>
        </div>
      </aside>
    </>
  );
}
