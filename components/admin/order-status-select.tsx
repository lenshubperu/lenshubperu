"use client";

import { useTransition } from "react";
import { updateOrderStatus } from "@/app/admin/(panel)/pedidos/actions";

type Props = {
  orderId: number;
  currentStatus: string;
};

const options = [
  { value: "pending_payment", label: "Pendiente" },
  { value: "paid", label: "Pagado" },
  { value: "shipped", label: "Enviado" },
  { value: "delivered", label: "Entregado" },
  { value: "cancelled", label: "Cancelado" },
];

export default function OrderStatusSelect({
  orderId,
  currentStatus,
}: Props) {
  const [isPending, startTransition] = useTransition();

  return (
    <form
      action={(formData) => {
        startTransition(async () => {
          await updateOrderStatus(formData);
        });
      }}
      className="flex items-center gap-2"
    >
      <input type="hidden" name="orderId" value={orderId} />

      <select
        name="status"
        defaultValue={currentStatus}
        disabled={isPending}
        onChange={(e) => {
          const form = e.currentTarget.form;
          if (form) form.requestSubmit();
        }}
        className="h-10 rounded-xl border border-neutral-300 bg-white px-3 text-sm outline-none focus:border-black disabled:opacity-60"
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>

      <span className="text-xs text-neutral-500">
        {isPending ? "Guardando..." : ""}
      </span>
    </form>
  );
}