"use client";

import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import { Menu, ExternalLink, LogOut, UserCheck } from "lucide-react";

interface AdminHeaderProps {
  onToggleMobileMenu?: () => void;
}

export default function AdminHeader({ onToggleMobileMenu }: AdminHeaderProps) {
  const router = useRouter();
  const pathname = usePathname();

  const handleLogout = () => {
    if (typeof window !== "undefined") {
      localStorage.removeItem("hdz_admin_authenticated");
    }
    router.push("/admin/login");
  };

  const getBreadcrumbs = () => {
    const parts = pathname.split("/").filter(Boolean);
    if (parts.length <= 1) return [{ label: "Dashboard", href: "/admin" }];

    const crumbs = [{ label: "Dashboard", href: "/admin" }];
    let currentPath = "/admin";

    for (let i = 1; i < parts.length; i++) {
      currentPath += `/${parts[i]}`;
      const name = parts[i].charAt(0).toUpperCase() + parts[i].slice(1);
      crumbs.push({ label: name, href: currentPath });
    }

    return crumbs;
  };

  const breadcrumbs = getBreadcrumbs();

  return (
    <header className="h-16 bg-[#0B0F14] border-b border-[#EEF4FA]/10 px-4 md:px-8 flex items-center justify-between sticky top-0 z-30">
      {/* Left: Mobile Toggle & Breadcrumbs */}
      <div className="flex items-center space-x-3">
        <button
          type="button"
          onClick={onToggleMobileMenu}
          className="p-2 rounded-lg bg-[#0E131A] text-[#F5F7FA] md:hidden border border-white/10 hover:border-[#168BFF]/40"
          aria-label="Abrir menu"
        >
          <Menu className="w-5 h-5" />
        </button>

        <nav aria-label="Breadcrumb" className="hidden sm:flex items-center space-x-2 text-xs text-[#AEB8C4]">
          {breadcrumbs.map((crumb, idx) => (
            <span key={crumb.href} className="flex items-center space-x-2">
              {idx > 0 && <span>/</span>}
              {idx === breadcrumbs.length - 1 ? (
                <span className="font-semibold text-[#F5F7FA]">{crumb.label}</span>
              ) : (
                <Link href={crumb.href} className="hover:text-[#168BFF] transition-colors">
                  {crumb.label}
                </Link>
              )}
            </span>
          ))}
        </nav>
      </div>

      {/* Right: Actions & User Info */}
      <div className="flex items-center space-x-3">
        <div className="hidden lg:flex items-center space-x-2 px-3 py-1.5 rounded-xl bg-[#0E131A] border border-white/10 text-xs">
          <UserCheck className="w-3.5 h-3.5 text-[#18C98B]" />
          <span className="text-[#F5F7FA] font-medium">Henrique Carreto</span>
          <span className="text-[10px] bg-[#F59A18]/20 text-[#FFC05A] border border-[#F59A18]/30 px-1.5 py-0.5 rounded font-bold uppercase">
            Admin
          </span>
        </div>

        <Link
          href="/"
          target="_blank"
          className="flex items-center space-x-1.5 px-3 py-1.5 rounded-xl bg-[#0E131A] hover:bg-[#121720] border border-white/10 hover:border-[#168BFF]/40 text-xs font-semibold text-[#F5F7FA] transition-all"
        >
          <span>Visualizar site</span>
          <ExternalLink className="w-3.5 h-3.5 text-[#168BFF]" />
        </Link>

        <button
          type="button"
          onClick={handleLogout}
          className="flex items-center space-x-1.5 px-3 py-1.5 rounded-xl bg-[#FF5263]/10 hover:bg-[#FF5263]/20 border border-[#FF5263]/30 text-xs font-semibold text-[#FF5263] transition-all"
          title="Sair do painel"
        >
          <LogOut className="w-3.5 h-3.5" />
          <span className="hidden sm:inline">Sair</span>
        </button>
      </div>
    </header>
  );
}
