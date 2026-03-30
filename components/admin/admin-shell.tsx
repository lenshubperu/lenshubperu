"use client";

import { useState } from "react";
import { X } from "lucide-react";
import AdminSidebar from "@/components/admin/admin-sidebar";
import AdminHeader from "@/components/admin/admin-header";

type Props = {
  email?: string | null;
  children: React.ReactNode;
};

export default function AdminShell({ email, children }: Props) {
  const [mobileOpen, setMobileOpen] = useState(false);

  function closeMobileMenu() {
    setMobileOpen(false);
  }

  return (
    <div className="min-h-screen bg-neutral-100">
      <div className="hidden min-h-screen lg:grid lg:grid-cols-[280px_1fr]">
        <div className="border-r border-neutral-200 bg-white">
          <AdminSidebar />
        </div>

        <div className="flex min-h-screen min-w-0 flex-col">
          <AdminHeader email={email} onOpenMenu={() => {}} />
          <main className="flex-1 p-6">
            <div className="mx-auto w-full max-w-7xl">{children}</div>
          </main>
        </div>
      </div>

      <div className="lg:hidden">
        <AdminHeader email={email} onOpenMenu={() => setMobileOpen(true)} />

        {mobileOpen ? (
          <div className="fixed inset-0 z-50">
            <button
              type="button"
              aria-label="Cerrar menú"
              className="absolute inset-0 bg-black/45"
              onClick={closeMobileMenu}
            />

            <div className="absolute left-0 top-0 h-full w-[86%] max-w-[320px] overflow-y-auto bg-white shadow-2xl">
              <div className="flex items-center justify-between border-b border-neutral-200 px-4 py-4">
                <div>
                  <p className="text-[11px] uppercase tracking-[0.22em] text-neutral-400">
                    LensHub
                  </p>
                  <p className="mt-1 text-lg font-semibold text-neutral-950">
                    Admin
                  </p>
                </div>

                <button
                  type="button"
                  onClick={closeMobileMenu}
                  className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-neutral-200 text-neutral-700"
                  aria-label="Cerrar menú"
                >
                  <X size={18} />
                </button>
              </div>

              <AdminSidebar onNavigate={closeMobileMenu} mobile />
            </div>
          </div>
        ) : null}

        <main className="px-3 py-4">
          <div className="mx-auto w-full max-w-full">{children}</div>
        </main>
      </div>
    </div>
  );
}