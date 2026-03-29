"use client";

import { useCart } from "@/components/cart-provider";
import { useEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";
import SocioPaymentForm from "@/components/checkout/socio-payment-form";

type UbigeoTree = Array<{
  departamento: string;
  provincias: Array<{ provincia: string; distritos: string[] }>;
}>;

const isLima = (dep: string) => (dep || "").trim().toUpperCase() === "LIMA";

type DocType = "DNI" | "CE" | "PAS";
type ReceiptType = "boleta" | "factura";
type ShippingMode = "regular" | "express";

const shippingCarrier = (dep: string) => (isLima(dep) ? "UrbanoExpress" : "Shalom");

const shippingBase = (dep: string, mode: ShippingMode) => {
  if (!dep) return 0;
  if (isLima(dep)) return mode === "express" ? 20 : 12;
  return 16;
};

export default function CheckoutPage() {
  const { items, subtotal } = useCart();

  const [receiptType, setReceiptType] = useState<ReceiptType>("boleta");

  const [nombres, setNombres] = useState("");
  const [docType, setDocType] = useState<DocType>("DNI");
  const [docNumber, setDocNumber] = useState("");
  const [telefono, setTelefono] = useState("");
  const [email, setEmail] = useState("");

  const [ubigeoTree, setUbigeoTree] = useState<UbigeoTree>([]);
  const [cargandoUbi, setCargandoUbi] = useState(true);
  const [errorUbi, setErrorUbi] = useState<string | null>(null);
  const [departamento, setDepartamento] = useState("");
  const [provincia, setProvincia] = useState("");
  const [distrito, setDistrito] = useState("");
  const [direccion, setDireccion] = useState("");
  const [referencia, setReferencia] = useState("");

  const [ruc, setRuc] = useState("");
  const [agree, setAgree] = useState(false);

  const [coupon, setCoupon] = useState("");
  const [appliedCoupon, setAppliedCoupon] = useState<string | null>(null);
  const [couponMsg, setCouponMsg] = useState<string | null>(null);
  const [showCoupon, setShowCoupon] = useState(false);
  const [discount, setDiscount] = useState(0);

  const [shippingMode, setShippingMode] = useState<ShippingMode>("regular");

  const [msg, setMsg] = useState<string | null>(null);
  const [msgType, setMsgType] = useState<"ok" | "err" | null>(null);
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const orderIdRef = useRef<string | null>(null);
  const [openSocioPay, setOpenSocioPay] = useState(false);
  const [createdOrderId, setCreatedOrderId] = useState<string>("");

  const provincias =
    ubigeoTree.find((d) => d.departamento === departamento)?.provincias || [];

  const distritos =
    provincias.find((p) => p.provincia === provincia)?.distritos || [];

  const envioBase = useMemo(
    () => shippingBase(departamento, shippingMode),
    [departamento, shippingMode]
  );

  useEffect(() => {
    if (departamento && !isLima(departamento) && shippingMode === "express") {
      setShippingMode("regular");
    }
  }, [departamento, shippingMode]);

  const envio = useMemo(() => {
    if (!departamento) return 0;
    return envioBase;
  }, [departamento, envioBase]);

  const carrier = shippingCarrier(departamento);

  useEffect(() => {
    (async () => {
      setCargandoUbi(true);
      setErrorUbi(null);

      try {
        const res = await fetch("/api/ubigeo");
        const json = await res.json();

        if (!json.ok) throw new Error(json.error || "No se pudo cargar ubigeo");

        setUbigeoTree(json.data as UbigeoTree);
      } catch (e: any) {
        setErrorUbi(e?.message || "Error cargando ubigeo");
        setUbigeoTree([]);
      } finally {
        setCargandoUbi(false);
      }
    })();
  }, []);

  useEffect(() => {
    try {
      const raw = localStorage.getItem("checkout-form");
      if (!raw) return;

      const saved = JSON.parse(raw);
      setReceiptType(saved.receiptType ?? "boleta");
      setNombres(saved.nombres ?? "");
      setDocType(saved.docType ?? "DNI");
      setDocNumber(saved.docNumber ?? "");
      setTelefono(saved.telefono ?? "");
      setEmail(saved.email ?? "");
      setDepartamento(saved.departamento ?? "");
      setProvincia(saved.provincia ?? "");
      setDistrito(saved.distrito ?? "");
      setDireccion(saved.direccion ?? "");
      setReferencia(saved.referencia ?? "");
      setRuc(saved.ruc ?? "");
      setAgree(saved.agree ?? false);
      setAppliedCoupon(saved.appliedCoupon ?? null);
      if (saved.shippingMode === "regular" || saved.shippingMode === "express") {
        setShippingMode(saved.shippingMode);
      }
      setDiscount(saved.discount ?? 0);
    } catch {
      // ignore
    }
  }, []);

  useEffect(() => {
    const payload = {
      receiptType,
      nombres,
      docType,
      docNumber,
      telefono,
      email,
      departamento,
      provincia,
      distrito,
      direccion,
      referencia,
      ruc,
      agree,
      appliedCoupon,
      shippingMode,
      discount,
    };

    try {
      localStorage.setItem("checkout-form", JSON.stringify(payload));
    } catch {
      // ignore
    }
  }, [
    receiptType,
    nombres,
    docType,
    docNumber,
    telefono,
    email,
    departamento,
    provincia,
    distrito,
    direccion,
    referencia,
    ruc,
    agree,
    appliedCoupon,
    shippingMode,
    discount,
  ]);

  const validarDocumento = () => {
    const n = docNumber.trim();
    if (docType === "DNI") return /^\d{8}$/.test(n);
    if (docType === "CE") return /^[A-Za-z0-9]{8,12}$/.test(n);
    return /^[A-Za-z0-9]{6,12}$/.test(n);
  };

  const validarTelefono = () => /^\d{9}$/.test(telefono.trim());
  const validarEmail = () => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());
  const validarRUC = () => /^\d{11}$/.test(ruc.trim());

  const faltantes = () => {
    const f: string[] = [];

    if (nombres.trim().length < 3) f.push("Nombres");
    if (!validarDocumento()) {
      f.push(
        docType === "DNI"
          ? "DNI"
          : docType === "CE"
          ? "Carné de extranjería"
          : "Pasaporte"
      );
    }

    if (!validarTelefono()) f.push("Teléfono");
    if (!validarEmail()) f.push("Correo");
    if (!departamento) f.push("Departamento");
    if (!provincia) f.push("Provincia");
    if (!distrito) f.push("Distrito");
    if (direccion.trim().length < 4) f.push("Dirección de entrega");
    if (receiptType === "factura" && !validarRUC()) f.push("RUC (11 dígitos)");
    if (!agree) f.push("Aceptar términos");

    return f;
  };

  const handleDoc = (v: string) => {
    if (docType === "DNI") setDocNumber(v.replace(/\D/g, "").slice(0, 8));
    else setDocNumber(v.replace(/[^a-zA-Z0-9]/g, "").slice(0, 12));
  };

  const handleTel = (v: string) => setTelefono(v.replace(/\D/g, "").slice(0, 9));

  const applyCoupon = async () => {
    const code = coupon.trim().toUpperCase();
    setCouponMsg(null);

    if (!code) {
      setCouponMsg("Ingresa un código.");
      return;
    }

    try {
      const res = await fetch("/api/validate-coupon", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ code, subtotal }),
      });

      const data = await res.json();

      if (!data.ok) {
        setAppliedCoupon(null);
        setDiscount(0);
        setCouponMsg(data.message || "Cupón inválido o expirado.");
        return;
      }

      setAppliedCoupon(data.coupon);
      setDiscount(data.discount);
      setCoupon(code);
      setCouponMsg(`Cupón ${data.coupon} aplicado (-S/ ${data.discount.toFixed(2)})`);
      setShowCoupon(false);
    } catch {
      setCouponMsg("Error validando cupón. Inténtalo nuevamente.");
    }
  };

  const removeCoupon = () => {
    setCoupon("");
    setCouponMsg(null);
    setAppliedCoupon(null);
    setDiscount(0);
  };

  const grandTotal = Math.max(0, subtotal - discount + envio);

  const openSocio = () => {
    const oid = String(orderIdRef.current || `LH-${Date.now()}`);
    setCreatedOrderId(oid);
    setOpenSocioPay(true);
  };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setMsg(null);
    setMsgType(null);

    const f = faltantes();
    if (f.length) {
      setMsg("Faltan: " + f.join(", "));
      setMsgType("err");
      return;
    }

    try {
      setLoading(true);

      const res = await fetch("/api/order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          receiptType,
          nombres,
          docType,
          docNumber,
          ruc: receiptType === "factura" ? ruc : undefined,
          razonSocial: undefined,
          direccionFiscal: undefined,
          telefono,
          email,
          departamento,
          provincia,
          distrito,
          direccion,
          referencia,
          subtotal,
          envio,
          discount,
          total: grandTotal,
          coupon_code: appliedCoupon,
          appliedCoupon,
          carrier,
          shippingMode,
          gateway: "socio",
          cart: items.map((it) => ({
            id: it.id,
            slug: it.slug ?? "",
            name: it.name,
            qty: it.qty,
            price: it.price,
            size: it.size ?? null,
            color: it.color ?? null,
            mainImage: it.mainImage ?? null,
          })),
        }),
      });

      const data = await res.json();
      if (!data.ok) throw new Error(data.error || "Error creando la orden");

      orderIdRef.current = String(data.orderCode);

      try {
        localStorage.setItem("last-order-id", String(data.orderCode));

        const orderSummary = {
          orderId: String(data.orderCode),
          subtotal,
          envio,
          discount,
          total: grandTotal,
          coupon_code: appliedCoupon,
          nombres,
          telefono,
          email,
          direccion,
          referencia,
          departamento,
          provincia,
          distrito,
          shippingMode,
          carrier,
          items: items.map((it) => ({
            id: it.id,
            slug: it.slug ?? "",
            name: it.name,
            qty: it.qty,
            price: it.price,
            size: it.size ?? null,
            color: it.color ?? null,
            mainImage: it.mainImage ?? null,
          })),
        };

        localStorage.setItem("last-order-summary", JSON.stringify(orderSummary));
      } catch {
        // ignore
      }

      setMsg(`✅ Pedido creado (ID: ${data.orderCode}). Ahora completa el pago.`);
      setMsgType("ok");
      openSocio();
    } catch (err: any) {
      setMsg(err?.message || "Error en checkout");
      setMsgType("err");
    } finally {
      setLoading(false);
    }
  };

  if (items.length === 0) {
    return (
      <section className="space-y-2 px-4 py-12 lg:px-10">
        <h2 className="text-2xl font-semibold tracking-tight">Checkout</h2>
        <p className="text-neutral-500">No tienes productos en el carrito.</p>
      </section>
    );
  }

  return (
    <main className="bg-white text-black">
      <section className="mx-auto max-w-7xl px-4 pb-16 pt-8 sm:px-6 lg:px-8 lg:pt-12">
        <div className="max-w-3xl">
          <p className="text-xs uppercase tracking-[0.28em] text-neutral-400">
            Checkout
          </p>
          <h1 className="mt-4 text-4xl font-semibold leading-[0.95] tracking-tight sm:text-5xl lg:text-6xl">
            Finaliza tu compra de forma clara y segura.
          </h1>
          <p className="mt-5 max-w-2xl text-base leading-8 text-neutral-600 sm:text-lg">
            Completa tus datos, elige tu envío y revisa tu pedido antes de continuar al pago.
          </p>
        </div>

        <div className="mt-12 grid gap-14 lg:grid-cols-[1fr_400px]">
          <form id="checkout-form" onSubmit={onSubmit} className="space-y-14">
            <CheckoutSection
              eyebrow="Datos del cliente"
              title="Información principal"
            >
              <div className="grid gap-5 sm:grid-cols-2">
                <Field label="Nombres*" error={submitted && nombres.trim().length < 3 ? "Ingresa tus nombres" : ""}>
                  <input
                    className={inputClass}
                    placeholder="Nombres y apellidos"
                    value={nombres}
                    onChange={(e) => setNombres(e.target.value)}
                    autoComplete="name"
                  />
                </Field>

                <Field label="Teléfono*" error={telefono && !validarTelefono() ? "Número inválido" : ""}>
                  <input
                    className={inputClass}
                    placeholder="9 dígitos"
                    value={telefono}
                    onChange={(e) => handleTel(e.target.value)}
                    inputMode="numeric"
                    maxLength={9}
                  />
                </Field>

                <Field label="Tipo de documento*">
                  <select
                    className={inputClass}
                    value={docType}
                    onChange={(e) => {
                      const t = e.target.value as DocType;
                      setDocType(t);
                      setDocNumber("");
                    }}
                  >
                    <option value="DNI">DNI</option>
                    <option value="CE">Carné de extranjería</option>
                    <option value="PAS">Pasaporte</option>
                  </select>
                </Field>

                <Field label="Número de documento*" error={docNumber && !validarDocumento() ? "Documento inválido" : ""}>
                  <input
                    className={inputClass}
                    value={docNumber}
                    onChange={(e) => handleDoc(e.target.value)}
                    inputMode={docType === "DNI" ? "numeric" : "text"}
                    maxLength={docType === "DNI" ? 8 : 12}
                  />
                </Field>

                <div className="sm:col-span-2">
                  <Field label="Correo*" error={email && !validarEmail() ? "Correo inválido" : ""}>
                    <input
                      className={inputClass}
                      placeholder="tucorreo@dominio.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      type="email"
                    />
                  </Field>
                </div>
              </div>
            </CheckoutSection>

            <CheckoutSection
              eyebrow="Entrega"
              title="Dirección y ubicación"
            >
              <div className="grid gap-5 sm:grid-cols-2">
                <Field label="Departamento*">
                  <select
                    className={inputClass}
                    disabled={cargandoUbi || !!errorUbi}
                    value={departamento}
                    onChange={(e) => {
                      setDepartamento(e.target.value);
                      setProvincia("");
                      setDistrito("");
                    }}
                  >
                    <option value="">
                      {errorUbi
                        ? `Error: ${errorUbi}`
                        : cargandoUbi
                        ? "Cargando departamentos..."
                        : "Selecciona Departamento"}
                    </option>
                    {!cargandoUbi &&
                      !errorUbi &&
                      ubigeoTree.map((d) => (
                        <option key={d.departamento} value={d.departamento}>
                          {d.departamento}
                        </option>
                      ))}
                  </select>
                </Field>

                <Field label="Provincia*">
                  <select
                    className={inputClass}
                    value={provincia}
                    disabled={!departamento}
                    onChange={(e) => {
                      setProvincia(e.target.value);
                      setDistrito("");
                    }}
                  >
                    <option value="">
                      {departamento ? "Selecciona Provincia" : "Elige un departamento"}
                    </option>
                    {provincias.map((p) => (
                      <option key={p.provincia} value={p.provincia}>
                        {p.provincia}
                      </option>
                    ))}
                  </select>
                </Field>

                <Field label="Distrito*">
                  <select
                    className={inputClass}
                    value={distrito}
                    disabled={!provincia}
                    onChange={(e) => setDistrito(e.target.value)}
                  >
                    <option value="">
                      {provincia ? "Selecciona Distrito" : "Elige una provincia"}
                    </option>
                    {distritos.map((d) => (
                      <option key={d} value={d}>
                        {d}
                      </option>
                    ))}
                  </select>
                </Field>

                <Field label="Dirección de entrega*">
                  <input
                    className={inputClass}
                    placeholder="Calle/Jr/Av + número"
                    value={direccion}
                    onChange={(e) => setDireccion(e.target.value)}
                  />
                </Field>

                <div className="sm:col-span-2">
                  <Field label="Referencia (opcional)">
                    <input
                      className={inputClass}
                      placeholder="Frente a parque / cerca a..."
                      value={referencia}
                      onChange={(e) => setReferencia(e.target.value)}
                    />
                  </Field>
                </div>
              </div>
            </CheckoutSection>

            <CheckoutSection eyebrow="Envío" title="Elige tu modalidad">
              <div className="grid gap-4 sm:grid-cols-2">
                <ShippingOption
                  title="Envío regular"
                  description={
                    departamento && isLima(departamento)
                      ? "S/ 12 · 24 a 72 horas · UrbanoExpress"
                      : "S/ 16 · 24 a 72 horas · Shalom a domicilio"
                  }
                  selected={shippingMode === "regular"}
                  onClick={() => setShippingMode("regular")}
                  disabled={!departamento}
                />

                {isLima(departamento) && (
                  <ShippingOption
                    title="Envío express"
                    description="S/ 20 · mismo día hasta las 4 pm · UrbanoExpress"
                    selected={shippingMode === "express"}
                    onClick={() => setShippingMode("express")}
                    disabled={!departamento}
                  />
                )}
              </div>

              <p className="mt-4 text-sm leading-7 text-neutral-500">
                {isLima(departamento)
                  ? shippingMode === "express"
                    ? "Si compras hasta las 4:00 pm, sale el mismo día. Después de las 4:00 pm sale al día siguiente en el primer turno."
                    : "Entrega de 24 a 72 horas por UrbanoExpress."
                  : "Entrega de 24 a 72 horas por Shalom a domicilio. Número de seguimiento disponible."}
              </p>
            </CheckoutSection>

            <CheckoutSection eyebrow="Comprobante" title="Boleta o factura">
              <div className="grid gap-4 sm:grid-cols-2">
                {(["boleta", "factura"] as ReceiptType[]).map((rt) => (
                  <button
                    key={rt}
                    type="button"
                    onClick={() => setReceiptType(rt)}
                    className={`rounded-2xl border px-4 py-4 text-left transition ${
                      receiptType === rt
                        ? "border-black bg-black text-white"
                        : "border-black/10 hover:border-black/20"
                    }`}
                  >
                    <p className="text-sm font-medium">
                      {rt === "boleta" ? "Boleta" : "Factura"}
                    </p>
                    <p className={`mt-1 text-xs ${receiptType === rt ? "text-white/70" : "text-neutral-500"}`}>
                      {rt === "boleta" ? "No requiere RUC" : "Requiere número de RUC"}
                    </p>
                  </button>
                ))}
              </div>

              {receiptType === "factura" && (
                <div className="mt-5 max-w-md">
                  <Field label="RUC*" error={ruc && !validarRUC() ? "RUC inválido" : ""}>
                    <input
                      className={inputClass}
                      placeholder="11 dígitos"
                      value={ruc}
                      onChange={(e) =>
                        setRuc(e.target.value.replace(/\D/g, "").slice(0, 11))
                      }
                      inputMode="numeric"
                      maxLength={11}
                    />
                  </Field>
                </div>
              )}
            </CheckoutSection>

            <CheckoutSection eyebrow="Validación" title="Condiciones">
              <label className="flex items-start gap-3 text-sm leading-7 text-neutral-600">
                <input
                  type="checkbox"
                  checked={agree}
                  onChange={(e) => setAgree(e.target.checked)}
                  className="mt-1"
                />
                Acepto términos y condiciones para procesar mi pedido y continuar con el pago.
              </label>

              {submitted && faltantes().length > 0 && (
                <div className="mt-4 rounded-2xl bg-red-50 px-4 py-3 text-sm text-red-700">
                  Faltan: {faltantes().join(", ")}
                </div>
              )}

              {msg && (
                <div
                  className={`mt-4 rounded-2xl px-4 py-3 text-sm ${
                    msgType === "ok"
                      ? "bg-green-50 text-green-700"
                      : "bg-red-50 text-red-700"
                  }`}
                >
                  {msg}
                </div>
              )}
            </CheckoutSection>
          </form>

          <aside className="lg:sticky lg:top-24 lg:self-start">
            <div>
              <p className="text-xs uppercase tracking-[0.28em] text-neutral-400">
                Resumen
              </p>
              <h2 className="mt-3 text-2xl font-semibold tracking-tight">
                Tu pedido
              </h2>
            </div>

            <div className="mt-8 space-y-5">
              <ul className="space-y-5">
                {items.map((it, idx) => {
                  const price = it.price ?? 0;
                  const lineTotal = price * it.qty;

                  return (
                    <li
                      key={`${it.id}-${it.size ?? "std"}-${it.color ?? "default"}-${idx}`}
                      className="flex items-start justify-between gap-4 border-b border-black/5 pb-5"
                    >
                      <div className="flex min-w-0 items-start gap-4">
                        <div className="relative h-14 w-14 flex-shrink-0">
                          {it.mainImage ? (
                            <Image
                              src={it.mainImage}
                              alt={it.name}
                              fill
                              sizes="56px"
                              className="object-contain"
                            />
                          ) : null}
                        </div>

                        <div className="min-w-0">
                          <p className="line-clamp-2 text-sm font-medium leading-6 text-black">
                            {it.name}
                          </p>

                          {(it.color || it.size) && (
                            <p className="mt-1 text-xs text-neutral-400">
                              {it.color ? `Color: ${it.color}` : ""}
                              {it.color && it.size ? " · " : ""}
                              {it.size ? `Talla: ${it.size}` : ""}
                            </p>
                          )}

                          <p className="mt-1 text-xs text-neutral-400">Cantidad: {it.qty}</p>
                        </div>
                      </div>

                      <p className="whitespace-nowrap text-sm font-semibold text-black">
                        S/ {lineTotal.toFixed(2)}
                      </p>
                    </li>
                  );
                })}
              </ul>

              <div className="pt-2">
                {!appliedCoupon ? (
                  <button
                    type="button"
                    onClick={() => {
                      setShowCoupon(true);
                      setCouponMsg(null);
                    }}
                    className="inline-flex h-11 items-center justify-center rounded-full border border-black/10 px-5 text-sm font-medium text-black transition hover:bg-neutral-50"
                  >
                    Agregar cupón
                  </button>
                ) : (
                  <div className="flex items-center justify-between gap-3 rounded-2xl border border-black/10 px-4 py-3">
                    <div>
                      <p className="text-sm font-medium text-black">{appliedCoupon}</p>
                      <p className="text-xs text-neutral-500">
                        Descuento aplicado: -S/ {discount.toFixed(2)}
                      </p>
                    </div>

                    <button
                      type="button"
                      onClick={removeCoupon}
                      className="text-xs font-medium text-black transition hover:opacity-70"
                    >
                      Quitar
                    </button>
                  </div>
                )}
              </div>

              <div className="space-y-3 border-t border-black/10 pt-6">
                <SummaryRow label="Subtotal" value={`S/ ${subtotal.toFixed(2)}`} />
                <SummaryRow label="Envío" value={`S/ ${envio.toFixed(2)}`} />
                <SummaryRow label="Descuento" value={`- S/ ${discount.toFixed(2)}`} />
                <div className="flex items-center justify-between pt-2 text-lg font-semibold text-black">
                  <span>Total</span>
                  <span>S/ {grandTotal.toFixed(2)}</span>
                </div>
              </div>

              <button
                type="submit"
                form="checkout-form"
                disabled={loading}
                className="inline-flex h-12 w-full items-center justify-center rounded-full bg-black text-sm font-medium text-white transition hover:opacity-90 disabled:cursor-wait disabled:opacity-70"
              >
                {loading ? "Procesando..." : "Continuar al pago"}
              </button>

              <p className="text-xs leading-6 text-neutral-400">
                Tu pedido se registrará primero y luego continuarás con el proceso de pago.
              </p>
            </div>
          </aside>
        </div>
      </section>

      {showCoupon && (
        <div className="fixed inset-0 z-50 flex items-end justify-center sm:items-center">
          <div
            className="absolute inset-0 bg-black/40"
            onClick={() => setShowCoupon(false)}
            aria-hidden="true"
          />
          <div
            role="dialog"
            aria-modal="true"
            aria-label="Agregar cupón"
            className="relative w-full rounded-t-3xl bg-white p-5 shadow-xl sm:m-4 sm:max-w-md sm:rounded-3xl"
          >
            <div className="mb-3 flex items-center justify-between">
              <h3 className="text-lg font-semibold">Cupón de descuento</h3>
              <button
                type="button"
                onClick={() => setShowCoupon(false)}
                className="inline-flex h-9 items-center justify-center rounded-full border border-black/10 px-4 text-sm transition hover:bg-neutral-50"
              >
                Cerrar
              </button>
            </div>

            <p className="mb-4 text-sm leading-7 text-neutral-500">
              Si tienes un cupón, escríbelo aquí para validarlo.
            </p>

            <input
              className={inputClass}
              placeholder="Ingresa tu cupón"
              value={coupon}
              onChange={(e) => setCoupon(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  applyCoupon();
                }
              }}
              autoComplete="off"
            />

            {couponMsg && (
              <p
                className={`mt-3 text-sm ${
                  couponMsg.includes("aplicado") ? "text-green-600" : "text-red-600"
                }`}
              >
                {couponMsg}
              </p>
            )}

            <button
              type="button"
              onClick={applyCoupon}
              className="mt-5 inline-flex h-12 w-full items-center justify-center rounded-full bg-black text-sm font-medium text-white"
            >
              Aplicar cupón
            </button>
          </div>
        </div>
      )}

      <SocioPaymentForm
        total={grandTotal}
        orderId={createdOrderId}
        open={openSocioPay}
        onClose={() => setOpenSocioPay(false)}
      />
    </main>
  );
}

function CheckoutSection({
  eyebrow,
  title,
  children,
}: {
  eyebrow: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="border-t border-black/10 pt-8 first:border-t-0 first:pt-0">
      <p className="text-xs uppercase tracking-[0.28em] text-neutral-400">{eyebrow}</p>
      <h2 className="mt-3 text-2xl font-semibold tracking-tight text-black">{title}</h2>
      <div className="mt-6">{children}</div>
    </section>
  );
}

function Field({
  label,
  error,
  children,
}: {
  label: string;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <label className="block">
      <span className="mb-2 block text-sm font-medium text-black">{label}</span>
      {children}
      {error ? <p className="mt-2 text-xs text-red-600">{error}</p> : null}
    </label>
  );
}

function ShippingOption({
  title,
  description,
  selected,
  onClick,
  disabled,
}: {
  title: string;
  description: string;
  selected: boolean;
  onClick: () => void;
  disabled?: boolean;
}) {
  return (
    <button
      type="button"
      disabled={disabled}
      onClick={onClick}
      className={`rounded-2xl border px-4 py-4 text-left transition ${
        selected
          ? "border-black bg-black text-white"
          : "border-black/10 hover:border-black/20"
      } ${disabled ? "cursor-not-allowed opacity-50" : ""}`}
    >
      <p className="text-sm font-medium">{title}</p>
      <p className={`mt-1 text-xs leading-6 ${selected ? "text-white/70" : "text-neutral-500"}`}>
        {description}
      </p>
    </button>
  );
}

function SummaryRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between text-sm text-neutral-500">
      <span>{label}</span>
      <span className="font-medium text-black">{value}</span>
    </div>
  );
}

const inputClass =
  "h-12 w-full rounded-2xl border border-black/10 bg-white px-4 text-sm outline-none transition focus:border-black/20";