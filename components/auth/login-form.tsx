"use client";

import { useState } from "react";
import { createClient } from "@/lib/supabase/browser";
import { useRouter } from "next/navigation";

export default function LoginForm() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();

    setLoading(true);
    setError(null);

    try {
      const supabase = createClient();

      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        throw error;
      }

      router.replace("/admin");
      router.refresh();
    } catch (err: any) {
      console.error(err);

      if (err?.message?.includes("Invalid login credentials")) {
        setError("Correo o contraseña incorrectos.");
      } else {
        setError("No se pudo iniciar sesión.");
      }
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleLogin} className="space-y-4">
      <div>
        <label className="mb-2 block text-sm font-medium text-neutral-700">
          Correo
        </label>
        <input
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="h-12 w-full rounded-xl border border-neutral-300 px-4 text-sm outline-none focus:border-black"
          placeholder="correo@ejemplo.com"
        />
      </div>

      <div>
        <label className="mb-2 block text-sm font-medium text-neutral-700">
          Contraseña
        </label>
        <input
          type="password"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="h-12 w-full rounded-xl border border-neutral-300 px-4 text-sm outline-none focus:border-black"
          placeholder="********"
        />
      </div>

      <button
        type="submit"
        disabled={loading}
        className="h-12 w-full rounded-xl bg-black px-4 text-sm font-medium text-white transition hover:opacity-90 disabled:opacity-60"
      >
        {loading ? "Ingresando..." : "Ingresar"}
      </button>

      {error && <p className="text-sm text-red-600">{error}</p>}
    </form>
  );
}