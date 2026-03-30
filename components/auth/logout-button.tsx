"use client";

import { createClient } from "@/lib/supabase/browser";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { LogOut } from "lucide-react";

type Props = {
  compact?: boolean;
};

export default function LogoutButton({ compact = false }: Props) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  async function handleLogout() {
    setLoading(true);

    const supabase = createClient();
    await supabase.auth.signOut();

    router.replace("/admin/login");
    router.refresh();
  }

  if (compact) {
    return (
      <button
        onClick={handleLogout}
        disabled={loading}
        className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-neutral-300 bg-white text-neutral-700 transition hover:bg-neutral-50 disabled:opacity-60 sm:hidden"
        aria-label="Cerrar sesión"
      >
        <LogOut size={18} />
      </button>
    );
  }

  return (
    <>
      <button
        onClick={handleLogout}
        disabled={loading}
        className="hidden h-10 items-center justify-center rounded-xl border border-neutral-300 bg-white px-4 text-sm font-medium text-neutral-700 transition hover:bg-neutral-50 disabled:opacity-60 sm:inline-flex"
      >
        {loading ? "Saliendo..." : "Cerrar sesión"}
      </button>

      <button
        onClick={handleLogout}
        disabled={loading}
        className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-neutral-300 bg-white text-neutral-700 transition hover:bg-neutral-50 disabled:opacity-60 sm:hidden"
        aria-label="Cerrar sesión"
      >
        <LogOut size={18} />
      </button>
    </>
  );
}