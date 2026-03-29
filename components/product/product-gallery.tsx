"use client";

import Image from "next/image";
import { useState } from "react";

export default function ProductGallery({
  images,
  alt,
}: {
  images: string[];
  alt: string;
}) {
  const [selectedImage, setSelectedImage] = useState(images[0]);

  return (
    <div className="grid gap-6 lg:grid-cols-[96px_1fr]">
      <div className="order-2 flex gap-3 overflow-x-auto lg:order-1 lg:flex-col">
        {images.map((image) => (
          <button
            key={image}
            type="button"
            onClick={() => setSelectedImage(image)}
            className={`relative flex h-24 w-24 shrink-0 items-center justify-center rounded-2xl border transition ${
              selectedImage === image
                ? "border-black"
                : "border-black/10 hover:border-black/20"
            }`}
          >
            <Image
              src={image}
              alt={alt}
              width={72}
              height={72}
              className="max-h-[72px] w-auto object-contain"
            />
          </button>
        ))}
      </div>

      <div className="order-1 lg:order-2">
        <div className="relative flex min-h-[420px] items-center justify-center lg:min-h-[560px]">
          <Image
            src={selectedImage}
            alt={alt}
            width={720}
            height={720}
            priority
            className="max-h-[520px] w-auto object-contain transition duration-300"
          />
        </div>
      </div>
    </div>
  );
}