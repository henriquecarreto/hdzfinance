"use client";

import { useState, useEffect } from "react";
import { cmsStore, AuditLogItem } from "@/lib/cms-store";
import {
  ShieldCheck,
  KeyRound,
  Smartphone,
  History,
  Lock,
  CheckCircle2,
  AlertTriangle,
  LogOut,
  Filter,
} from "lucide-react";

export default function AdminSegurancaPage() {
  const [logs, setLogs] = useState<AuditLogItem[]>([]);
  const [mfaEnabled, setMfaEnabled] = useState(false);
  const [currentPass, setCurrentPass] = useState("");
  const [newPass, setNewPass] = useState("");
  const [confirmPass, setConfirmPass] = useState("");
  const [passSuccess, setPassSuccess] = useState(false);
  const [passError, setPassError] = useState("");
  const [actionFilter, setActionFilter] = useState("all");

  useEffect(() => {
    setLogs(cmsStore.getAuditLogs());
  }, []);

  const handlePasswordChange = (e: React.FormEvent) => {
    e.preventDefault();
    setPassError("");
    setPassSuccess(false);

    if (newPass.length < 8) {
      setPassError("A nova senha deve possuir no mínimo 8 caracteres.");
      return;
    }
    if (newPass !== confirmPass) {
      setPassError("A confirmação da senha não coincide com a nova senha.");
      return;
    }

    cmsStore.logAction("password_changed", "profile", "admin");
    setLogs(cmsStore.getAuditLogs());
    setPassSuccess(true);
    setCurrentPass("");
    setNewPass("");
    setConfirmPass("");
  };

  const toggleMfa = () => {
    const nextState = !mfaEnabled;
    setMfaEnabled(nextState);
    cmsStore.logAction(nextState ? "mfa_enabled" : "mfa_disabled", "security", "admin");
    setLogs(cmsStore.getAuditLogs());
  };

  const filteredLogs = logs.filter((log) => actionFilter === "all" || log.action === actionFilter);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="p-6 rounded-2xl bg-[#0B0F14] border border-[#EEF4FA]/10 space-y-2">
        <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-md bg-[#168BFF]/10 text-[#168BFF] border border-[#168BFF]/30 text-xs font-bold uppercase tracking-wider">
          <ShieldCheck className="w-4 h-4" />
          <span>Segurança & Auditoria</span>
        </div>
        <h1 className="font-outfit font-extrabold text-2xl text-[#F5F7FA]">Proteção da Conta & Logs de Acesso</h1>
        <p className="text-xs text-[#AEB8C4]">
          Gerencie senhas, autenticação em dois fatores (MFA), sessões ativas e consulte o histórico de ações administrativas.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Password & MFA (6 cols) */}
        <div className="lg:col-span-6 space-y-6">
          {/* Password Change Box */}
          <form onSubmit={handlePasswordChange} className="p-6 rounded-2xl bg-[#0B0F14] border border-white/10 space-y-4 text-xs">
            <div className="flex items-center space-x-2 font-bold text-sm text-[#F5F7FA]">
              <KeyRound className="w-4 h-4 text-[#168BFF]" />
              <span>Alterar Senha do Administrador</span>
            </div>

            {passSuccess && (
              <div className="p-3 rounded-xl bg-[#18C98B]/10 border border-[#18C98B]/30 text-[#18C98B] flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4" />
                <span>Senha atualizada com sucesso!</span>
              </div>
            )}

            {passError && (
              <div className="p-3 rounded-xl bg-[#FF5263]/10 border border-[#FF5263]/30 text-[#FF5263]">
                {passError}
              </div>
            )}

            <div className="space-y-1.5">
              <label className="text-[#AEB8C4] font-semibold block">Senha Atual</label>
              <input
                type="password"
                required
                value={currentPass}
                onChange={(e) => setCurrentPass(e.target.value)}
                className="w-full bg-[#0E131A] border border-white/10 text-[#F5F7FA] rounded-xl px-3.5 py-2.5 focus:outline-none focus:border-[#168BFF]"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-[#AEB8C4] font-semibold block">Nova Senha</label>
              <input
                type="password"
                required
                value={newPass}
                onChange={(e) => setNewPass(e.target.value)}
                placeholder="Mínimo de 8 caracteres com letras e números"
                className="w-full bg-[#0E131A] border border-white/10 text-[#F5F7FA] rounded-xl px-3.5 py-2.5 focus:outline-none focus:border-[#168BFF]"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-[#AEB8C4] font-semibold block">Confirmar Nova Senha</label>
              <input
                type="password"
                required
                value={confirmPass}
                onChange={(e) => setConfirmPass(e.target.value)}
                className="w-full bg-[#0E131A] border border-white/10 text-[#F5F7FA] rounded-xl px-3.5 py-2.5 focus:outline-none focus:border-[#168BFF]"
              />
            </div>

            <button
              type="submit"
              className="w-full py-2.5 rounded-xl bg-[#168BFF] hover:bg-[#3A91FF] text-white font-extrabold uppercase tracking-wider transition-all shadow-md"
            >
              Atualizar Senha
            </button>
          </form>

          {/* MFA Box */}
          <div className="p-6 rounded-2xl bg-[#0B0F14] border border-white/10 space-y-4 text-xs">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2 font-bold text-sm text-[#F5F7FA]">
                <Smartphone className="w-4 h-4 text-[#F59A18]" />
                <span>Autenticação em Dois Fatores (MFA)</span>
              </div>
              <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${mfaEnabled ? "bg-[#18C98B]/20 text-[#18C98B]" : "bg-[#FF5263]/20 text-[#FF5263]"}`}>
                {mfaEnabled ? "Ativo" : "Desativado"}
              </span>
            </div>

            <p className="text-[#AEB8C4] leading-relaxed">
              Adicione uma camada extra de proteção à sua conta solicitando um código temporário de aplicativo autenticador (Google Authenticator / Authy) a cada login.
            </p>

            <button
              type="button"
              onClick={toggleMfa}
              className={`w-full py-2.5 rounded-xl font-extrabold uppercase tracking-wider transition-all shadow-md ${
                mfaEnabled
                  ? "bg-[#FF5263]/20 text-[#FF5263] border border-[#FF5263]/40 hover:bg-[#FF5263]/30"
                  : "bg-[#F59A18] hover:bg-[#FFC05A] text-[#050709]"
              }`}
            >
              {mfaEnabled ? "Desativar Autenticação em Dois Fatores" : "Ativar Autenticação em Dois Fatores (MFA)"}
            </button>
          </div>
        </div>

        {/* Right Column: Audit Logs (6 cols) */}
        <div className="lg:col-span-6 p-6 rounded-2xl bg-[#0B0F14] border border-white/10 space-y-4 text-xs">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2 font-bold text-sm text-[#F5F7FA]">
              <History className="w-4 h-4 text-[#18C98B]" />
              <span>Log de Auditoria de Ações</span>
            </div>

            <div className="flex items-center space-x-1 bg-[#0E131A] px-2 py-1 rounded-lg border border-white/10">
              <Filter className="w-3 h-3 text-[#168BFF]" />
              <select
                value={actionFilter}
                onChange={(e) => setActionFilter(e.target.value)}
                className="bg-transparent text-[#F5F7FA] text-[11px] focus:outline-none"
              >
                <option value="all">Todas as Ações</option>
                <option value="content_created">Criações</option>
                <option value="content_updated">Edições</option>
                <option value="content_published">Publicações</option>
                <option value="password_changed">Troca de Senha</option>
              </select>
            </div>
          </div>

          <p className="text-[#AEB8C4] text-[11px]">
            Histórico imutável de operações executadas pelos administradores. Senhas e tokens nunca são armazenados.
          </p>

          <div className="divide-y divide-white/5 max-h-[420px] overflow-y-auto pr-1 scrollbar-none">
            {filteredLogs.length === 0 ? (
              <p className="py-8 text-center text-[#AEB8C4]">Nenhum registro de auditoria encontrado para os filtros selecionados.</p>
            ) : (
              filteredLogs.map((log) => (
                <div key={log.id} className="py-3 space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-[#F5F7FA] uppercase tracking-wider text-[11px]">{log.action}</span>
                    <span className="text-[10px] text-[#AEB8C4]">{new Date(log.createdAt).toLocaleString("pt-BR")}</span>
                  </div>
                  <div className="flex items-center justify-between text-[11px] text-[#AEB8C4]">
                    <span>Entidade: {log.entityType} ({log.entityId || "N/A"})</span>
                    <span className="text-[#168BFF]">Ator: Administrador</span>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
