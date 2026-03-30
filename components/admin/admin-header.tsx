"use client";

import { Menu } from "lucide-react";
import LogoutButton from "@/components/auth/logout-button";

type Props = {
  email?: string | null;
  onOpenMenu: () => void;
};

export default function AdminHeader({ email, onOpenMenu }: Props) {
  return (
    <header className="sticky top-0 z-30 border-b border-neutral-200 bg-white/95 backdrop-blur">
      <div className="flex h-16 items-center justify-between gap-3 px-3 sm:px-6">
        <div className="flex min-w-0 items-center gap-3">
          <button
            type="button"
            onClick={onOpenMenu}
            className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-neutral-200 text-neutral-700 lg:hidden"
            aria-label="Abrir menú"
          >
            <Menu size={20} />
          </button>

          <div className="min-w-0">
            <p className="text-xs text-neutral-500 sm:text-sm">
              Panel administrativo
            </p>
            <p className="truncate text-sm font-medium text-neutral-900">
              {email || "Administrador"}
            </p>
          </div>
        </div>

        <div className="shrink-0">
          <LogoutButton compact />
        </div>
      </div>
    </header>
  );
}