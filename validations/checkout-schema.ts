import { z } from "zod";

export const checkoutSchema = z
  .object({
    nombres: z.string().min(3, "Ingresa tus nombres"),
    documentType: z.enum(["dni", "ce", "passport"]),
    telefono: z.string().min(6, "Ingresa un teléfono válido"),
    correo: z.string().email("Ingresa un correo válido"),
    departamento: z.string().min(2, "Ingresa el departamento"),
    provincia: z.string().min(2, "Ingresa la provincia"),
    distrito: z.string().min(2, "Ingresa el distrito"),
    direccion: z.string().min(5, "Ingresa la dirección de entrega"),
    referencia: z.string().optional(),
    shippingZone: z.enum(["lima", "provincia"]),
    shippingType: z.enum(["regular", "express"]),
    receiptType: z.enum(["boleta", "factura"]),
    ruc: z.string().optional(),
    coupon: z.string().optional(),
  })
  .superRefine((data, ctx) => {
    if (data.shippingZone === "provincia" && data.shippingType === "express") {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Para provincia solo está disponible envío regular",
        path: ["shippingType"],
      });
    }

    if (data.receiptType === "factura" && !data.ruc?.trim()) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Ingresa el RUC para factura",
        path: ["ruc"],
      });
    }
  });

export type CheckoutFormValues = z.infer<typeof checkoutSchema>;