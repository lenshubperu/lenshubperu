"use client";

import { useRef, useState } from "react";

type Props = {
  images: string[];
  onChange: (images: string[]) => void;
};

export default function ProductGalleryUploader({ images, onChange }: Props) {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [uploading, setUploading] = useState(false);

  async function uploadOne(file: File) {
    const formData = new FormData();
    formData.append("file", file);

    const res = await fetch("/api/admin/upload-image", {
      method: "POST",
      body: formData,
    });

    const data = await res.json();

    if (!res.ok || !data.success) {
      throw new Error(data.error || "No se pudo subir la imagen");
    }

    return data.imageUrl as string;
  }

  async function handleFiles(files: FileList) {
    setUploading(true);

    try {
      const uploaded: string[] = [];

      for (const file of Array.from(files)) {
        const url = await uploadOne(file);
        uploaded.push(url);
      }

      onChange([...images, ...uploaded]);
    } catch (error) {
      console.error(error);
      alert("Error subiendo una o más imágenes");
    } finally {
      setUploading(false);
    }
  }

  function removeImage(index: number) {
    const next = images.filter((_, i) => i !== index);
    onChange(next);
  }

  function moveLeft(index: number) {
    if (index === 0) return;
    const next = [...images];
    [next[index - 1], next[index]] = [next[index], next[index - 1]];
    onChange(next);
  }

  function moveRight(index: number) {
    if (index === images.length - 1) return;
    const next = [...images];
    [next[index], next[index + 1]] = [next[index + 1], next[index]];
    onChange(next);
  }

  return (
    <div className="space-y-4">
      <button
        type="button"
        onClick={() => inputRef.current?.click()}
        disabled={uploading}
        className="rounded-xl border border-neutral-300 bg-white px-4 py-2 text-sm font-medium text-neutral-700 hover:bg-neutral-50 disabled:opacity-60"
      >
        {uploading ? "Subiendo..." : "Subir varias imágenes"}
      </button>

      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        multiple
        className="hidden"
        onChange={(e) => {
          const files = e.target.files;
          if (files && files.length > 0) {
            handleFiles(files);
          }
        }}
      />

      {images.length > 0 ? (
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
          {images.map((image, index) => (
            <div
              key={`${image}-${index}`}
              className="rounded-2xl border border-neutral-200 bg-white p-2"
            >
              <div className="overflow-hidden rounded-xl border border-neutral-200 bg-neutral-50">
                <div className="aspect-square">
                  <img
                    src={image}
                    alt={`Imagen ${index + 1}`}
                    className="h-full w-full object-cover"
                  />
                </div>
              </div>

              <div className="mt-2 flex flex-wrap gap-2">
                <button
                  type="button"
                  onClick={() => moveLeft(index)}
                  className="rounded-lg border border-neutral-300 px-2 py-1 text-xs"
                >
                  ←
                </button>
                <button
                  type="button"
                  onClick={() => moveRight(index)}
                  className="rounded-lg border border-neutral-300 px-2 py-1 text-xs"
                >
                  →
                </button>
                <button
                  type="button"
                  onClick={() => removeImage(index)}
                  className="rounded-lg border border-red-200 px-2 py-1 text-xs text-red-600"
                >
                  Eliminar
                </button>
              </div>

              <p className="mt-2 truncate text-[11px] text-neutral-500">
                {index === 0 ? "Principal" : `Imagen ${index + 1}`}
              </p>
            </div>
          ))}
        </div>
      ) : null}
    </div>
  );
}