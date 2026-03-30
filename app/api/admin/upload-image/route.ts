import { NextRequest, NextResponse } from "next/server";
import { PutObjectCommand } from "@aws-sdk/client-s3";
import { requireAdmin } from "@/lib/auth/admin";
import { r2 } from "@/lib/cloudflare/r2";

function sanitizeFileName(name: string) {
  return name
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9.\-_]/g, "-")
    .replace(/-+/g, "-");
}

export async function POST(request: NextRequest) {
  await requireAdmin();

  try {
    const formData = await request.formData();
    const file = formData.get("file");

    if (!file || !(file instanceof File)) {
      return NextResponse.json(
        { success: false, error: "Archivo inválido" },
        { status: 400 }
      );
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    const bucket = process.env.CLOUDFLARE_R2_BUCKET;

    if (!bucket) {
      return NextResponse.json(
        { success: false, error: "Falta la variable CLOUDFLARE_R2_BUCKET" },
        { status: 500 }
      );
    }

    const timestamp = Date.now();
    const safeName = sanitizeFileName(file.name);

    // Guarda todo bajo /imagenes/productos/...
    const key = `imagenes/productos/${timestamp}-${safeName}`;

    await r2.send(
      new PutObjectCommand({
        Bucket: bucket,
        Key: key,
        Body: buffer,
        ContentType: file.type || "application/octet-stream",
      })
    );

    // Guardamos ruta relativa, no URL absoluta
    const imageUrl = `/${key}`;

    return NextResponse.json({
      success: true,
      key,
      imageUrl,
    });
  } catch (error) {
    console.error("R2 upload error:", error);

    return NextResponse.json(
      { success: false, error: "No se pudo subir la imagen a R2" },
      { status: 500 }
    );
  }
}