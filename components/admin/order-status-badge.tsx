type Props = {
  status: string | null;
};

const statusMap: Record<string, { label: string; className: string }> = {
  pending_payment: {
    label: "Pendiente",
    className: "bg-amber-100 text-amber-800 ring-1 ring-amber-200",
  },
  paid: {
    label: "Pagado",
    className: "bg-emerald-100 text-emerald-800 ring-1 ring-emerald-200",
  },
  shipped: {
    label: "Enviado",
    className: "bg-blue-100 text-blue-800 ring-1 ring-blue-200",
  },
  delivered: {
    label: "Entregado",
    className: "bg-violet-100 text-violet-800 ring-1 ring-violet-200",
  },
  cancelled: {
    label: "Cancelado",
    className: "bg-red-100 text-red-800 ring-1 ring-red-200",
  },
};

export default function OrderStatusBadge({ status }: Props) {
  const current = statusMap[status || ""] ?? {
    label: status || "Sin estado",
    className: "bg-neutral-100 text-neutral-700 ring-1 ring-neutral-200",
  };

  return (
    <span
      className={`inline-flex items-center rounded-full px-2.5 py-1 text-xs font-medium ${current.className}`}
    >
      {current.label}
    </span>
  );
}