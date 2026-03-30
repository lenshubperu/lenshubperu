import LoginForm from "@/components/auth/login-form";

export default function AdminLoginPage() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-neutral-100 px-4">
      <div className="w-full max-w-md rounded-3xl border border-neutral-200 bg-white p-8 shadow-sm">
        <p className="text-sm text-neutral-500">LensHub Admin</p>
        <h1 className="mt-2 text-3xl font-semibold tracking-tight text-neutral-950">
          Iniciar sesión
        </h1>
        <p className="mt-2 text-sm text-neutral-600">
          Ingresa con tu correo y contraseña para acceder al panel.
        </p>

        <div className="mt-6">
          <LoginForm />
        </div>
      </div>
    </main>
  );
}