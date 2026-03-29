export type ShippingZone = "lima" | "provincia";
export type ShippingType = "regular" | "express";

export function getShippingPrice(
  shippingZone: ShippingZone,
  shippingType: ShippingType
) {
  if (shippingZone === "lima") {
    return shippingType === "express" ? 20 : 12;
  }

  return 16;
}

export function getShippingLabel(
  shippingZone: ShippingZone,
  shippingType: ShippingType
) {
  if (shippingZone === "lima") {
    if (shippingType === "express") {
      return "Envío Express - UrbanoExpress";
    }
    return "Envío Regular - UrbanoExpress";
  }

  return "Envío Regular - Shalom a domicilio";
}

export function getShippingDescription(
  shippingZone: ShippingZone,
  shippingType: ShippingType
) {
  if (shippingZone === "lima") {
    if (shippingType === "express") {
      return "Entrega el mismo día si compras hasta las 4:00 pm. Después de las 4:00 pm sale al día siguiente en el primer turno.";
    }
    return "Entrega de 24 a 72 horas por UrbanoExpress.";
  }

  return "Entrega de 24 a 72 horas por Shalom a domicilio. Número de seguimiento disponible.";
}

export function applyCouponDiscount(subtotal: number, coupon?: string) {
  const normalized = coupon?.trim().toUpperCase();

  if (!normalized) return 0;

  if (normalized === "LENSHUB10") {
    return Math.min(subtotal * 0.1, 100);
  }

  if (normalized === "ENVIOFREE") {
    return 0;
  }

  return 0;
}