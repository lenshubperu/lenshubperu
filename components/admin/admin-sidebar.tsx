"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Package,
  ShoppingBag,
  Users,
  Settings,
} from "lucide-react";

const links = [
  {
    href: "/admin",
    label: "Dashboard",
    icon: LayoutDashboard,
  },
  {
    href: "/admin/pedidos",
    label: "Pedidos",
    icon: ShoppingBag,
  },
  {
    href: "/admin/productos",
    label: "Productos",
    icon: Package,
  },
  {
    href: "/admin/clientes",
    label: "Clientes",
    icon: Users,
  },
  {
    href: "/admin/configuraciones",
    label: "Configuraciones",
    icon: Settings,
  },
];

type Props = {
  onNavigate?: () => void;
  mobile?: boolean;
};

export default function AdminSidebar({ onNavigate, mobile = false }: Props) {
  const pathname = usePathname();

  return (
    <aside
      className={`flex h-full w-full flex-col bg-white ${
        mobile ? "" : "min-h-screen"
      }`}
    >
      {!mobile ? (
        <div className="border-b border-neutral-200 px-5 py-5">
          <p className="text-[11px] font-medium uppercase tracking-[0.22em] text-neutral-400">
            LensHub
          </p>
          <h2 className="mt-2 text-xl font-semibold text-neutral-950">Admin</h2>
          <p className="mt-1 text-sm text-neutral-500">Panel de control</p>
        </div>
      ) : null}

      <nav className="space-y-1 p-3">
        {links.map((link) => {
          const Icon = link.icon;
          const active =
            pathname === link.href ||
            (link.href !== "/admin" && pathname.startsWith(`${link.href}/`));

          return (
            <Link
              key={link.href}
              href={link.href}
              onClick={onNavigate}
              className={`flex items-center gap-3 rounded-2xl px-4 py-3 text-sm font-medium transition ${
                active
                  ? "bg-black text-white shadow-sm"
                  : "text-neutral-700 hover:bg-neutral-100"
              }`}
            >
              <Icon size={18} />
              <span>{link.label}</span>
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}