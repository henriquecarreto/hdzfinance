"use client";

import { useState, useEffect } from "react";
import { cmsStore, SiteSettingsData } from "@/lib/cms-store";
import { Globe, Save, CheckCircle2, Shield, Mail, Share2, FileText } from "lucide-react";

export default function AdminSiteSettingsPage() {
  const [settings, setSettings] = useState<SiteSettingsData>({});
  const [savedSuccess, setSavedSuccess] = useState(false);

  useEffect(() => {
    setSettings(cmsStore.getSettings());
  }, []);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    cmsStore.updateSettings(settings);
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 3000);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="p-6 rounded-2xl bg-[#0B0F14] border border-[#EEF4FA]/10 space-y-2">
        <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-md bg-[#168BFF]/10 text-[#168BFF] border border-[#168BFF]/30 text-xs font-bold uppercase tracking-wider">
          <Globe className="w-4 h-4" />
          <span>Configurações Institucionais</span>
        </div>
        <h1 className="font-outfit font-extrabold text-2xl text-[#F5F7FA]">Informações do Site & Parceiros</h1>
        <p className="text-xs text-[#AEB8C4]">
          Edite links de parceiros (Picnic, Quantfury), dados de contato, redes sociais e páginas jurídicas.
        </p>
      </div>

      <form onSubmit={handleSave} className="space-y-6">
        {/* Partner Links Box */}
        <div className="p-6 rounded-2xl bg-[#0B0F14] border border-white/10 space-y-4">
          <div className="flex items-center space-x-2 text-xs font-bold uppercase tracking-wider text-[#168BFF]">
            <Shield className="w-4 h-4" />
            <span>Links dos Parceiros Oficiais</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
            <div className="space-y-1.5">
              <label className="text-[#AEB8C4] font-semibold block">URL Oficial da Picnic Investment</label>
              <input
                type="text"
                value={settings.picnicUrl || ""}
                onChange={(e) => setSettings({ ...settings, picnicUrl: e.target.value })}
                className="w-full bg-[#0E131A] border border-white/10 text-[#F5F7FA] rounded-xl px-3.5 py-2.5 focus:outline-none focus:border-[#168BFF]"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-[#AEB8C4] font-semibold block">URL Oficial da Quantfury</label>
              <input
                type="text"
                value={settings.quantfuryUrl || ""}
                onChange={(e) => setSettings({ ...settings, quantfuryUrl: e.target.value })}
                className="w-full bg-[#0E131A] border border-white/10 text-[#F5F7FA] rounded-xl px-3.5 py-2.5 focus:outline-none focus:border-[#168BFF]"
              />
            </div>
          </div>
        </div>

        {/* Contact Info Box */}
        <div className="p-6 rounded-2xl bg-[#0B0F14] border border-white/10 space-y-4">
          <div className="flex items-center space-x-2 text-xs font-bold uppercase tracking-wider text-[#F59A18]">
            <Mail className="w-4 h-4" />
            <span>Informações de Contato</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
            <div className="space-y-1.5">
              <label className="text-[#AEB8C4] font-semibold block">E-mail de Contato Comercial</label>
              <input
                type="email"
                value={settings.contactEmail || ""}
                onChange={(e) => setSettings({ ...settings, contactEmail: e.target.value })}
                className="w-full bg-[#0E131A] border border-white/10 text-[#F5F7FA] rounded-xl px-3.5 py-2.5 focus:outline-none focus:border-[#168BFF]"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-[#AEB8C4] font-semibold block">Telefone / WhatsApp</label>
              <input
                type="text"
                value={settings.contactPhone || ""}
                onChange={(e) => setSettings({ ...settings, contactPhone: e.target.value })}
                className="w-full bg-[#0E131A] border border-white/10 text-[#F5F7FA] rounded-xl px-3.5 py-2.5 focus:outline-none focus:border-[#168BFF]"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-[#AEB8C4] font-semibold block">Endereço Sede</label>
              <input
                type="text"
                value={settings.contactAddress || ""}
                onChange={(e) => setSettings({ ...settings, contactAddress: e.target.value })}
                className="w-full bg-[#0E131A] border border-white/10 text-[#F5F7FA] rounded-xl px-3.5 py-2.5 focus:outline-none focus:border-[#168BFF]"
              />
            </div>
          </div>
        </div>

        {/* Social Media Box */}
        <div className="p-6 rounded-2xl bg-[#0B0F14] border border-white/10 space-y-4">
          <div className="flex items-center space-x-2 text-xs font-bold uppercase tracking-wider text-[#18C98B]">
            <Share2 className="w-4 h-4" />
            <span>Redes Sociais Oficiais</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 text-xs">
            <div className="space-y-1.5">
              <label className="text-[#AEB8C4] font-semibold block">X (Twitter)</label>
              <input
                type="text"
                value={settings.twitterUrl || ""}
                onChange={(e) => setSettings({ ...settings, twitterUrl: e.target.value })}
                className="w-full bg-[#0E131A] border border-white/10 text-[#F5F7FA] rounded-xl px-3.5 py-2.5 focus:outline-none focus:border-[#168BFF]"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-[#AEB8C4] font-semibold block">Instagram</label>
              <input
                type="text"
                value={settings.instagramUrl || ""}
                onChange={(e) => setSettings({ ...settings, instagramUrl: e.target.value })}
                className="w-full bg-[#0E131A] border border-white/10 text-[#F5F7FA] rounded-xl px-3.5 py-2.5 focus:outline-none focus:border-[#168BFF]"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-[#AEB8C4] font-semibold block">YouTube</label>
              <input
                type="text"
                value={settings.youtubeUrl || ""}
                onChange={(e) => setSettings({ ...settings, youtubeUrl: e.target.value })}
                className="w-full bg-[#0E131A] border border-white/10 text-[#F5F7FA] rounded-xl px-3.5 py-2.5 focus:outline-none focus:border-[#168BFF]"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-[#AEB8C4] font-semibold block">LinkedIn</label>
              <input
                type="text"
                value={settings.linkedinUrl || ""}
                onChange={(e) => setSettings({ ...settings, linkedinUrl: e.target.value })}
                className="w-full bg-[#0E131A] border border-white/10 text-[#F5F7FA] rounded-xl px-3.5 py-2.5 focus:outline-none focus:border-[#168BFF]"
              />
            </div>
          </div>
        </div>

        {/* Legal & Institutional Pages */}
        <div className="p-6 rounded-2xl bg-[#0B0F14] border border-white/10 space-y-4">
          <div className="flex items-center space-x-2 text-xs font-bold uppercase tracking-wider text-[#FFC05A]">
            <FileText className="w-4 h-4" />
            <span>Textos Institucionais & Páginas Jurídicas</span>
          </div>

          <div className="space-y-4 text-xs">
            <div className="space-y-1.5">
              <label className="text-[#AEB8C4] font-semibold block">Página "Sobre a HDZ Finance"</label>
              <textarea
                rows={3}
                value={settings.aboutText || ""}
                onChange={(e) => setSettings({ ...settings, aboutText: e.target.value })}
                className="w-full bg-[#0E131A] border border-white/10 text-[#F5F7FA] rounded-xl px-3.5 py-2.5 focus:outline-none focus:border-[#168BFF]"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-[#AEB8C4] font-semibold block">Termos de Uso</label>
              <textarea
                rows={3}
                value={settings.termsText || ""}
                onChange={(e) => setSettings({ ...settings, termsText: e.target.value })}
                className="w-full bg-[#0E131A] border border-white/10 text-[#F5F7FA] rounded-xl px-3.5 py-2.5 focus:outline-none focus:border-[#168BFF]"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-[#AEB8C4] font-semibold block">Política de Privacidade (LGPD)</label>
              <textarea
                rows={3}
                value={settings.privacyText || ""}
                onChange={(e) => setSettings({ ...settings, privacyText: e.target.value })}
                className="w-full bg-[#0E131A] border border-white/10 text-[#F5F7FA] rounded-xl px-3.5 py-2.5 focus:outline-none focus:border-[#168BFF]"
              />
            </div>
          </div>
        </div>

        {/* Save Bar */}
        <div className="flex items-center justify-between p-4 rounded-xl bg-[#0B0F14] border border-white/10">
          {savedSuccess ? (
            <span className="text-xs font-semibold text-[#18C98B] flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4" /> Configurações salvas com sucesso!
            </span>
          ) : (
            <span className="text-xs text-[#AEB8C4]">Atualização imediata dos rodapés e páginas institucionais.</span>
          )}

          <button
            type="submit"
            className="px-6 py-2.5 rounded-xl bg-[#168BFF] hover:bg-[#3A91FF] font-outfit font-extrabold text-xs uppercase tracking-wider text-white transition-all shadow-md flex items-center space-x-1.5"
          >
            <Save className="w-4 h-4" />
            <span>Salvar Configurações</span>
          </button>
        </div>
      </form>
    </div>
  );
}
