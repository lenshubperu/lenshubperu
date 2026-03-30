export default function AdminDashboardPage() {
  return (
    <div className="space-y-4 sm:space-y-6">
      <section className="rounded-3xl border border-neutral-200 bg-white p-4 shadow-sm sm:p-8">
        <p className="text-sm text-neutral-500">Dashboard</p>
        <h1 className="mt-2 text-xl font-semibold tracking-tight text-neutral-950 sm:text-3xl">
          Bienvenido al panel admin
        </h1>
        <p className="mt-3 max-w-2xl text-sm leading-6 text-neutral-600">
          Desde aquí podrás gestionar pedidos, productos, clientes y la
          configuración de la tienda.
        </p>
      </section>

      <section className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3 sm:gap-4">
        <div className="rounded-2xl border border-neutral-200 bg-white p-4 shadow-sm sm:p-5">
          <p className="text-sm text-neutral-500">Pedidos</p>
          <p className="mt-2 text-2xl font-semibold text-neutral-950 sm:text-3xl">
            —
          </p>
        </div>

        <div className="rounded-2xl border border-neutral-200 bg-white p-4 shadow-sm sm:p-5">
          <p className="text-sm text-neutral-500">Ventas</p>
          <p className="mt-2 text-2xl font-semibold text-neutral-950 sm:text-3xl">
            —
          </p>
        </div>

        <div className="rounded-2xl border border-neutral-200 bg-white p-4 shadow-sm sm:p-5">
          <p className="text-sm text-neutral-500">Productos</p>
          <p className="mt-2 text-2xl font-semibold text-neutral-950 sm:text-3xl">
            —
          </p>
        </div>
      </section>
    </div>
  );
}