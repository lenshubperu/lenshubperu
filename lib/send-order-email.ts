import { resend } from "./resend";

type PendingItem = {
  id: string | number;
  slug?: string;
  name: string;
  qty: number;
  price: number | null;
  size?: string | null;
  color?: string | null;
  mainImage?: string | null;
};

type SendOrderPendingEmailProps = {
  email: string;
  nombres: string;
  telefono?: string;
  orderCode: string;
  subtotal: number;
  envio: number;
  discount: number;
  total: number;
  couponCode?: string | null;
  direccion: string;
  referencia?: string | null;
  departamento: string;
  provincia: string;
  distrito: string;
  shippingMode: string;
  carrier: string;
  items: PendingItem[];
};

function escapeHtml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

function money(value: number) {
  return `S/ ${Number(value || 0).toFixed(2)}`;
}

function capitalize(value: string) {
  if (!value) return value;
  return value.charAt(0).toUpperCase() + value.slice(1);
}

function toAbsoluteImageUrl(image?: string | null) {
  if (!image) return null;

  if (image.startsWith("http://") || image.startsWith("https://")) {
    return image;
  }

  const siteUrl =
    process.env.NEXT_PUBLIC_SITE_URL ||
    process.env.SITE_URL ||
    "https://lenshubperu.com";

  return `${siteUrl}${image.startsWith("/") ? image : `/${image}`}`;
}

export async function sendOrderPendingEmail({
  email,
  nombres,
  telefono,
  orderCode,
  subtotal,
  envio,
  discount,
  total,
  couponCode,
  direccion,
  referencia,
  departamento,
  provincia,
  distrito,
  shippingMode,
  carrier,
  items,
}: SendOrderPendingEmailProps) {
  const safeName = escapeHtml(nombres || "Cliente");
  const safeOrderCode = escapeHtml(orderCode);
  const safeEmail = escapeHtml(email);
  const safeTelefono = escapeHtml(telefono || "No registrado");
  const safeDireccion = escapeHtml(direccion || "");
  const safeReferencia = escapeHtml(referencia || "Sin referencia");
  const safeUbicacion = escapeHtml(
    `${departamento}, ${provincia}, ${distrito}`
  );
  const safeShipping = escapeHtml(
    `${capitalize(shippingMode || "")} · ${carrier || ""}`.trim()
  );
  const safeCoupon = escapeHtml(couponCode || "No aplicado");

  const itemsHtml = (items || [])
    .map((item) => {
      const imageUrl = toAbsoluteImageUrl(item.mainImage);
      const lineTotal = Number(item.price || 0) * Number(item.qty || 0);

      return `
        <tr>
          <td style="padding: 16px 0; border-bottom: 1px solid #f1f1f1;">
            <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
              <tr>
                <td width="84" valign="top" style="padding-right: 14px;">
                  ${
                    imageUrl
                      ? `<img
                          src="${escapeHtml(imageUrl)}"
                          alt="${escapeHtml(item.name || "Producto")}"
                          width="72"
                          height="72"
                          style="display:block; width:72px; height:72px; object-fit:contain; border-radius:12px; background:#f5f5f5;"
                        />`
                      : `<div style="width:72px; height:72px; border-radius:12px; background:#f5f5f5;"></div>`
                  }
                </td>

                <td valign="top" style="font-family: Arial, sans-serif;">
                  <div style="font-size:15px; line-height:22px; color:#111111; font-weight:600;">
                    ${escapeHtml(item.name || "Producto")}
                  </div>

                  ${
                    item.color || item.size
                      ? `<div style="margin-top:6px; font-size:12px; line-height:18px; color:#777777;">
                          ${item.color ? `Color: ${escapeHtml(item.color)}` : ""}
                          ${item.color && item.size ? " · " : ""}
                          ${item.size ? `Talla: ${escapeHtml(item.size)}` : ""}
                        </div>`
                      : ""
                  }

                  <div style="margin-top:6px; font-size:12px; line-height:18px; color:#666666;">
                    Cantidad: ${Number(item.qty || 0)}
                  </div>
                </td>

                <td valign="top" align="right" style="font-family: Arial, sans-serif; white-space:nowrap;">
                  <div style="font-size:14px; line-height:22px; color:#111111; font-weight:700;">
                    ${money(lineTotal)}
                  </div>
                </td>
              </tr>
            </table>
          </td>
        </tr>
      `;
    })
    .join("");

  const html = `
    <div style="margin:0; padding:0; background:#ffffff;">
      <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#ffffff;">
        <tr>
          <td align="center" style="padding: 32px 16px;">
            <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width: 760px; margin:0 auto; font-family: Arial, sans-serif; color:#111111;">
              
              <tr>
                <td style="padding-bottom: 24px;">
                  <div style="font-size:11px; letter-spacing:0.28em; text-transform:uppercase; color:#9ca3af;">
                    Pago en proceso
                  </div>

                  <div style="margin-top:16px; font-size:38px; line-height:42px; font-weight:700; color:#111111;">
                    Tu pago está siendo revisado.
                  </div>

                  <div style="margin-top:20px; font-size:16px; line-height:28px; color:#5f6368; max-width:680px;">
                    Tu operación fue enviada correctamente, pero tu pedido todavía
                    <strong style="color:#111111;"> no está confirmado</strong>.
                    Primero tu banco debe aprobar el pago. Cuando eso ocurra, te enviaremos
                    la confirmación por <strong style="color:#111111;">correo electrónico</strong> y
                    <strong style="color:#111111;"> WhatsApp</strong>.
                  </div>
                </td>
              </tr>

              <tr>
                <td style="padding: 28px 0 0 0; border-top:1px solid #eaeaea;">
                  <div style="font-size:11px; letter-spacing:0.28em; text-transform:uppercase; color:#9ca3af;">
                    Estado actual
                  </div>

                  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin-top:18px;">
                    <tr>
                      <td valign="top" style="padding:0 8px 0 0;">
                        <div style="border:1px solid #eaeaea; border-radius:20px; padding:18px;">
                          <div style="font-size:14px; font-weight:600; color:#111111;">Pago recibido</div>
                          <div style="margin-top:10px; font-size:13px; line-height:22px; color:#6b7280;">
                            Tu solicitud de pago fue enviada correctamente.
                          </div>
                        </div>
                      </td>

                      <td valign="top" style="padding:0 8px;">
                        <div style="border:1px solid #eaeaea; border-radius:20px; padding:18px;">
                          <div style="font-size:14px; font-weight:600; color:#111111;">Tu banco está revisando tu pago</div>
                          <div style="margin-top:10px; font-size:13px; line-height:22px; color:#6b7280;">
                            La aprobación depende de la validación de tu entidad bancaria.
                          </div>
                        </div>
                      </td>

                      <td valign="top" style="padding:0 0 0 8px;">
                        <div style="border:1px solid #eaeaea; border-radius:20px; padding:18px;">
                          <div style="font-size:14px; font-weight:600; color:#111111;">Orden confirmada</div>
                          <div style="margin-top:10px; font-size:13px; line-height:22px; color:#6b7280;">
                            Te avisaremos por email y WhatsApp cuando el pago sea aprobado.
                          </div>
                        </div>
                      </td>
                    </tr>
                  </table>
                </td>
              </tr>

              <tr>
                <td style="padding: 28px 0 0 0; border-top:1px solid #eaeaea; margin-top:28px;">
                  <div style="font-size:11px; letter-spacing:0.28em; text-transform:uppercase; color:#9ca3af;">
                    Qué sigue ahora
                  </div>

                  <div style="margin-top:18px; font-size:14px; line-height:28px; color:#5f6368;">
                    1. Tu banco está revisando tu pago.<br />
                    2. Una vez nos apruebe tu pago <strong style="color:#111111;">confirmaremos tu orden</strong>.<br />
                    3. Te enviaremos la confirmación a tu <strong style="color:#111111;">correo</strong> y <strong style="color:#111111;">WhatsApp</strong>.<br />
                    4. Después prepararemos tu pedido y continuará a despacho según el método de envío elegido.
                  </div>
                </td>
              </tr>

              <tr>
                <td style="padding: 28px 0 0 0; border-top:1px solid #eaeaea;">
                  <div style="font-size:11px; letter-spacing:0.28em; text-transform:uppercase; color:#9ca3af;">
                    Resumen de tu compra
                  </div>

                  <div style="margin-top:12px; font-size:26px; line-height:32px; font-weight:700; color:#111111;">
                    Detalles del pedido
                  </div>

                  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin-top:24px;">
                    <tr>
                      <td style="padding:0 0 10px 0;">
                        <div style="font-size:11px; letter-spacing:0.18em; text-transform:uppercase; color:#9ca3af;">Código de orden</div>
                        <div style="margin-top:8px; font-size:15px; line-height:24px; color:#111111;">${safeOrderCode}</div>
                      </td>
                      <td style="padding:0 0 10px 0;">
                        <div style="font-size:11px; letter-spacing:0.18em; text-transform:uppercase; color:#9ca3af;">Estado</div>
                        <div style="margin-top:8px; font-size:15px; line-height:24px; color:#111111;">Pago en proceso</div>
                      </td>
                      <td style="padding:0 0 10px 0;">
                        <div style="font-size:11px; letter-spacing:0.18em; text-transform:uppercase; color:#9ca3af;">Medio de pago</div>
                        <div style="margin-top:8px; font-size:15px; line-height:24px; color:#111111;">Tarjeta</div>
                      </td>
                    </tr>
                  </table>

                  <div style="margin-top:28px; font-size:18px; font-weight:700; color:#111111;">
                    Productos
                  </div>

                  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin-top:12px;">
                    ${itemsHtml}
                  </table>

                  <div style="margin-top:28px; font-size:18px; font-weight:700; color:#111111;">
                    Datos del cliente
                  </div>

                  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin-top:12px;">
                    <tr>
                      <td style="padding:0 16px 14px 0;">
                        <div style="font-size:11px; letter-spacing:0.18em; text-transform:uppercase; color:#9ca3af;">Cliente</div>
                        <div style="margin-top:8px; font-size:15px; line-height:24px; color:#111111;">${safeName}</div>
                      </td>
                      <td style="padding:0 0 14px 0;">
                        <div style="font-size:11px; letter-spacing:0.18em; text-transform:uppercase; color:#9ca3af;">Teléfono</div>
                        <div style="margin-top:8px; font-size:15px; line-height:24px; color:#111111;">${safeTelefono}</div>
                      </td>
                    </tr>
                    <tr>
                      <td style="padding:0 16px 14px 0;">
                        <div style="font-size:11px; letter-spacing:0.18em; text-transform:uppercase; color:#9ca3af;">Correo</div>
                        <div style="margin-top:8px; font-size:15px; line-height:24px; color:#111111;">${safeEmail}</div>
                      </td>
                      <td style="padding:0 0 14px 0;">
                        <div style="font-size:11px; letter-spacing:0.18em; text-transform:uppercase; color:#9ca3af;">Cupón</div>
                        <div style="margin-top:8px; font-size:15px; line-height:24px; color:#111111;">${safeCoupon}</div>
                      </td>
                    </tr>
                  </table>

                  <div style="margin-top:28px; font-size:18px; font-weight:700; color:#111111;">
                    Dirección de entrega
                  </div>

                  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin-top:12px;">
                    <tr>
                      <td style="padding:0 16px 14px 0;">
                        <div style="font-size:11px; letter-spacing:0.18em; text-transform:uppercase; color:#9ca3af;">Ubicación</div>
                        <div style="margin-top:8px; font-size:15px; line-height:24px; color:#111111;">${safeUbicacion}</div>
                      </td>
                      <td style="padding:0 0 14px 0;">
                        <div style="font-size:11px; letter-spacing:0.18em; text-transform:uppercase; color:#9ca3af;">Dirección</div>
                        <div style="margin-top:8px; font-size:15px; line-height:24px; color:#111111;">${safeDireccion}</div>
                      </td>
                    </tr>
                    <tr>
                      <td style="padding:0 16px 14px 0;">
                        <div style="font-size:11px; letter-spacing:0.18em; text-transform:uppercase; color:#9ca3af;">Referencia</div>
                        <div style="margin-top:8px; font-size:15px; line-height:24px; color:#111111;">${safeReferencia}</div>
                      </td>
                      <td style="padding:0 0 14px 0;">
                        <div style="font-size:11px; letter-spacing:0.18em; text-transform:uppercase; color:#9ca3af;">Envío</div>
                        <div style="margin-top:8px; font-size:15px; line-height:24px; color:#111111;">${safeShipping}</div>
                      </td>
                    </tr>
                  </table>
                </td>
              </tr>

              <tr>
                <td style="padding-top: 28px;">
                  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border-top:1px solid #eaeaea; padding-top:20px;">
                    <tr>
                      <td style="font-size:14px; line-height:24px; color:#6b7280;">Subtotal</td>
                      <td align="right" style="font-size:14px; line-height:24px; font-weight:600; color:#111111;">${money(subtotal)}</td>
                    </tr>
                    <tr>
                      <td style="font-size:14px; line-height:24px; color:#6b7280;">Envío</td>
                      <td align="right" style="font-size:14px; line-height:24px; font-weight:600; color:#111111;">${money(envio)}</td>
                    </tr>
                    <tr>
                      <td style="font-size:14px; line-height:24px; color:#6b7280;">Descuento</td>
                      <td align="right" style="font-size:14px; line-height:24px; font-weight:600; color:#111111;">- ${money(discount)}</td>
                    </tr>
                    <tr>
                      <td style="padding-top:10px; font-size:18px; line-height:28px; font-weight:700; color:#111111;">Total pagado</td>
                      <td align="right" style="padding-top:10px; font-size:18px; line-height:28px; font-weight:700; color:#111111;">${money(total)}</td>
                    </tr>
                  </table>
                </td>
              </tr>

              <tr>
                <td style="padding-top: 28px;">
                  <table role="presentation" cellpadding="0" cellspacing="0">
                    <tr>
                      <td style="padding-right:12px;">
                        <a
                          href="https://lenshubperu.com/productos"
                          style="display:inline-block; height:48px; line-height:48px; padding:0 22px; border-radius:999px; background:#111111; color:#ffffff; text-decoration:none; font-size:14px; font-weight:600;"
                        >
                          Seguir comprando
                        </a>
                      </td>

                      <td>
                        <a
                          href="https://lenshubperu.com/contacto"
                          style="display:inline-block; height:48px; line-height:48px; padding:0 22px; border-radius:999px; background:#ffffff; color:#111111; text-decoration:none; font-size:14px; font-weight:600; border:1px solid #e5e7eb;"
                        >
                          Contactar soporte
                        </a>
                      </td>
                    </tr>
                  </table>
                </td>
              </tr>

              <tr>
                <td style="padding-top: 28px;">
                  <div style="font-size:13px; line-height:24px; color:#6b7280;">
                    LensHub Perú · Tu banco está revisando tu pago. Apenas tengamos la aprobación, confirmaremos tu orden y te avisaremos por correo y WhatsApp.
                  </div>
                </td>
              </tr>

            </table>
          </td>
        </tr>
      </table>
    </div>
  `;

  try {
    await resend.emails.send({
      from: "LensHub Perú <ventas@lenshubperu.com>",
      to: email,
      subject: `Tu pago está en proceso · Pedido ${orderCode}`,
      html,
    });
  } catch (error) {
    console.error("Error enviando email pending:", error);
  }
}