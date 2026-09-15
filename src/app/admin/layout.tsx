"use client";

import { useState, useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import AdminSidebar from "@/components/admin/AdminSidebar";
import AdminHeader from "@/components/admin/AdminHeader";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  const isLoginPage = pathname === "/admin/login";

  useEffect(() => {
    if (isLoginPage) {
      setLoading(false);
      return;
    }

    if (typeof window !== "undefined") {
      const isAuth = localStorage.getItem("hdz_admin_authenticated");
      if (!isAuth) {
        router.push("/admin/login");
      } else {
        setLoading(false);
      }
    }
  }, [pathname, isLoginPage, router]);

  useEffect(() => {
    document.title = "Painel Administrativo — HDZ Finance";
    let metaRobots = document.querySelector('meta[name="robots"]');
    if (!metaRobots) {
      metaRobots = document.createElement("meta");
      metaRobots.setAttribute("name", "robots");
      document.head.appendChild(metaRobots);
    }
    metaRobots.setAttribute("content", "noindex,nofollow,noarchive");
  }, []);

  if (isLoginPage) {
    return (
      <div className="min-h-screen bg-[#050709] text-[#F5F7FA] selection:bg-[#168BFF] selection:text-white">
        {children}
      </div>
    );
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-[#050709] flex items-center justify-center text-[#F5F7FA]">
        <div className="flex items-center space-x-3">
          <div className="w-5 h-5 border-2 border-[#168BFF] border-t-transparent rounded-full animate-spin" />
          <span className="text-xs font-semibold uppercase tracking-wider text-[#AEB8C4]">
            Verificando sessão administrativa...
          </span>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#050709] text-[#F5F7FA] selection:bg-[#168BFF] selection:text-white font-sans antialiased">
      <AdminSidebar mobileOpen={mobileOpen} onCloseMobile={() => setMobileOpen(false)} />

      <div className="md:pl-64 flex flex-col min-h-screen">
        <AdminHeader onToggleMobileMenu={() => setMobileOpen(!mobileOpen)} />

        <main className="flex-1 p-4 md:p-8 max-w-7xl w-full mx-auto space-y-8">
          {children}
        </main>
      </div>
    </div>
  );
}
