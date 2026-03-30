"use client";

import { useRef, useState } from "react";

type Props = {
  value: string;
  onChange: (url: string) => void;
};

export default function ProductImageUploader({ value, onChange }: Props) {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [uploading, setUploading] = useState(false);

  async function handleFileChange(file: File) {
    setUploading(true);

    try {
      const formData = new FormData();
      formData.append("file", file);

      const res = await fetch("/api/admin/upload-image", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        alert(data.error || "No se pudo subir la imagen");
        return;
      }

      onChange(data.imageUrl);
    } catch (error) {
      console.error(error);
      alert("Error subiendo imagen");
    } finally {
      setUploading(false);
    }
  }

  return (
    <div className="space-y-3">
      <div className="relative overflow-hidden rounded-2xl border border-neutral-200 bg-neutral-50">
        <div className="relative aspect-square w-full">
          {value ? (
  <img
    src={value}
    alt="Preview"
    className="h-full w-full object-cover"
  />
) : (
            <div className="flex h-full items-center justify-center text-sm text-neutral-400">
              Sin imagen
            </div>
          )}
        </div>
      </div>

      <div className="flex flex-col gap-2 sm:flex-row">
        <button
          type="button"
          onClick={() => inputRef.current?.click()}
          disabled={uploading}
          className="rounded-xl border border-neutral-300 bg-white px-4 py-2 text-sm font-medium text-neutral-700 hover:bg-neutral-50 disabled:opacity-60"
        >
          {uploading ? "Subiendo..." : "Subir imagen"}
        </button>

        {value ? (
          <button
            type="button"
            onClick={() => onChange("")}
            className="rounded-xl border border-red-200 bg-white px-4 py-2 text-sm font-medium text-red-600 hover:bg-red-50"
          >
            Quitar imagen
          </button>
        ) : null}
      </div>

      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={(e) => {
          const file = e.target.files?.[0];
          if (file) {
            handleFileChange(file);
          }
        }}
      />
    </div>
  );
}