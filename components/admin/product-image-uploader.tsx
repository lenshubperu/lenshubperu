"use client";

import { useRef, useState } from "react";
import Image from "next/image";

type Props = {
  value: string;
  onChange: (url: string) => void;
};

export default function ProductImageUploader({ value, onChange }: Props) {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [uploading, setUploading] = useState(false);

  async function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      setUploading(true);

      const formData = new FormData();
      formData.append("file", file);

      const res = await fetch("/api/admin/upload-image", {
        method: "POST",
        body: formData,
      });

      const text = await res.text();
      console.log("UPLOAD RAW RESPONSE:", text);

      let data: { url?: string; error?: string } = {};

      try {
        data = JSON.parse(text);
      } catch {
        throw new Error("La API no devolvió JSON válido");
      }

      if (!res.ok) {
        throw new Error(data.error || "No se pudo subir la imagen");
      }

      if (!data.url) {
        throw new Error("La API no devolvió la URL de la imagen");
      }

      onChange(data.url);
      alert("Imagen subida correctamente");
    } catch (error) {
      console.error("Upload frontend error:", error);
      alert(
        error instanceof Error
          ? error.message
          : "No se pudo subir la imagen"
      );
    } finally {
      setUploading(false);
      if (inputRef.current) {
        inputRef.current.value = "";
      }
    }
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-3">
        <input
          ref={inputRef}
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          className="hidden"
          id="product-image-input"
        />

        <button
          type="button"
          onClick={() => inputRef.current?.click()}
          disabled={uploading}
          className="inline-flex h-11 items-center justify-center rounded-xl border border-neutral-300 bg-white px-4 text-sm font-medium text-neutral-700 transition hover:bg-neutral-50 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {uploading ? "Subiendo..." : "Subir imagen"}
        </button>
      </div>

      <div className="overflow-hidden rounded-2xl border border-neutral-200 bg-neutral-50">
        {value ? (
          <div className="relative aspect-[4/3] w-full">
            <Image
              src={value}
              alt="Preview"
              fill
              className="object-cover"
              unoptimized
            />
          </div>
        ) : (
          <div className="flex aspect-[4/3] items-center justify-center text-sm text-neutral-500">
            Aún no hay imagen
          </div>
        )}
      </div>

      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full rounded-xl border border-neutral-300 px-3 py-2 text-sm"
        placeholder="URL final de la imagen"
      />
    </div>
  );
}