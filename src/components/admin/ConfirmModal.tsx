"use client";

import { AlertTriangle, X } from "lucide-react";

interface ConfirmModalProps {
  isOpen: boolean;
  title: string;
  message: string;
  confirmText?: string;
  cancelText?: string;
  isDestructive?: boolean;
  onConfirm: () => void;
  onCancel: () => void;
}

export default function ConfirmModal({
  isOpen,
  title,
  message,
  confirmText = "Confirmar",
  cancelText = "Cancelar",
  isDestructive = true,
  onConfirm,
  onCancel,
}: ConfirmModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="w-full max-w-md bg-[#0B0F14] border border-white/10 rounded-2xl shadow-2xl overflow-hidden p-6 space-y-5">
        <div className="flex items-start justify-between">
          <div className="flex items-center space-x-3">
            <div className={`p-2.5 rounded-xl border ${isDestructive ? "bg-[#FF5263]/10 border-[#FF5263]/30 text-[#FF5263]" : "bg-[#F59A18]/10 border-[#F59A18]/30 text-[#F59A18]"}`}>
              <AlertTriangle className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-outfit font-bold text-lg text-[#F5F7FA]">{title}</h3>
            </div>
          </div>
          <button
            onClick={onCancel}
            className="p-1 rounded-lg text-[#AEB8C4] hover:text-[#F5F7FA] hover:bg-white/10 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <p className="text-sm text-[#AEB8C4] leading-relaxed">{message}</p>

        <div className="flex items-center justify-end space-x-3 pt-2">
          <button
            type="button"
            onClick={onCancel}
            className="px-4 py-2 rounded-xl bg-[#0E131A] hover:bg-[#121720] border border-white/10 text-xs font-semibold text-[#F5F7FA] transition-all"
          >
            {cancelText}
          </button>
          <button
            type="button"
            onClick={onConfirm}
            className={`px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider text-white transition-all shadow-md ${
              isDestructive
                ? "bg-[#FF5263] hover:bg-[#FF384D]"
                : "bg-[#168BFF] hover:bg-[#3A91FF]"
            }`}
          >
            {confirmText}
          </button>
        </div>
      </div>
    </div>
  );
}
