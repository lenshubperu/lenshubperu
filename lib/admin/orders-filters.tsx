type Props = {
  q: string;
  status: string;
};

export default function OrdersFilters({ q, status }: Props) {
  return (
    <form className="grid gap-3 rounded-3xl border border-neutral-200 bg-white p-4 shadow-sm md:grid-cols-[1.5fr_220px_140px]">
      <input
        type="text"
        name="q"
        defaultValue={q}
        placeholder="Buscar por orden, nombre, DNI, email o teléfono"
        className="h-11 rounded-xl border border-neutral-300 px-4 text-sm outline-none focus:border-black"
      />

      <select
        name="status"
        defaultValue={status}
        className="h-11 rounded-xl border border-neutral-300 px-4 text-sm outline-none focus:border-black"
      >
        <option value="all">Todos los estados</option>
        <option value="pending_payment">Pendiente de pago</option>
        <option value="paid">Pagado</option>
        <option value="shipped">Enviado</option>
        <option value="delivered">Entregado</option>
        <option value="cancelled">Cancelado</option>
      </select>

      <button
        type="submit"
        className="h-11 rounded-xl bg-black px-4 text-sm font-medium text-white transition hover:opacity-90"
      >
        Buscar
      </button>
    </form>
  );
}