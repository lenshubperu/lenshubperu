"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

const words = ["capturar", "crear", "filmar", "explorar"];

const heroImages = [
  "/hero-camera.jpg",
  "/hero-camera-2.jpg",
  "/hero-camera-3.jpg",
];

const getColor = (index: number) => {
  const colors = [
    "from-black to-neutral-500",
    "from-indigo-600 to-blue-400",
    "from-pink-500 to-orange-400",
    "from-emerald-500 to-teal-400",
  ];

  return colors[index % colors.length];
};

function HeroCarousel() {
  const [currentImage, setCurrentImage] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % heroImages.length);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="-mt-10 w-full lg:-mt-14">
      <div className="relative h-[260px] w-full sm:h-[320px] lg:h-[430px]">
        {heroImages.map((src, index) => (
          <Image
            key={src}
            src={src}
            alt={`Producto destacado LensHub ${index + 1}`}
            fill
            priority={index === 0}
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 42vw"
            className={`object-contain transition-opacity duration-1000 ease-in-out ${
              index === currentImage ? "opacity-100" : "opacity-0"
            }`}
          />
        ))}
      </div>
    </div>
  );
}

export default function Hero() {
  const [wordIndex, setWordIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  const currentWord = words[wordIndex];
  const displayedText = currentWord.slice(0, charIndex);

  useEffect(() => {
    let timeout: ReturnType<typeof setTimeout>;

    const typingSpeed = isDeleting ? 70 : 140;
    const pauseWhenFull = 2200;
    const pauseWhenEmpty = 500;

    if (!isDeleting && charIndex < currentWord.length) {
      timeout = setTimeout(() => {
        setCharIndex((prev) => prev + 1);
      }, typingSpeed);
    } else if (!isDeleting && charIndex === currentWord.length) {
      timeout = setTimeout(() => {
        setIsDeleting(true);
      }, pauseWhenFull);
    } else if (isDeleting && charIndex > 0) {
      timeout = setTimeout(() => {
        setCharIndex((prev) => prev - 1);
      }, typingSpeed);
    } else if (isDeleting && charIndex === 0) {
      timeout = setTimeout(() => {
        setIsDeleting(false);
        setWordIndex((prev) => (prev + 1) % words.length);
      }, pauseWhenEmpty);
    }

    return () => clearTimeout(timeout);
  }, [charIndex, currentWord, isDeleting]);

  return (
    <section className="mx-auto max-w-7xl px-4 pb-10 pt-4 sm:px-6 lg:px-8 lg:pt-8">
      <div className="grid items-center gap-12 lg:grid-cols-2">
        <div className="max-w-2xl">
          <span className="inline-flex rounded-full border border-black/10 px-4 py-1 text-sm text-neutral-600">
            Tienda online y presencial en Lima
          </span>

          <h1 className="mt-6 max-w-[12ch] text-5xl font-semibold leading-[0.95] tracking-tight text-black sm:text-6xl lg:text-7xl">
            Cámaras, drones y equipos que elevan tu forma de{" "}
            <span
              className={`inline-flex min-w-[9ch] items-center font-semibold tracking-tight bg-gradient-to-r ${getColor(
                wordIndex
              )} bg-clip-text text-transparent`}
            >
              {displayedText}
              <span className="ml-1 inline-block h-[0.9em] w-[2px] animate-pulse bg-black opacity-70" />
            </span>
            .
          </h1>

          <p className="mt-6 max-w-xl text-lg leading-8 text-neutral-600">
            Descubre productos de Fujifilm, Instax, Canon, DJI y más, con una
            experiencia de compra moderna, clara y confiable.
          </p>

          <div className="mt-8">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
              <Link
                href="/productos"
                className="inline-flex min-h-[56px] items-center justify-center rounded-2xl bg-black px-7 py-3 text-sm font-medium text-white shadow-[0_10px_30px_rgba(0,0,0,0.12)] transition duration-300 hover:-translate-y-0.5 hover:opacity-90"
              >
                Ver productos
              </Link>

             <a
  href="https://wa.me/51928297040?text=Hola%2C%20vengo%20de%20la%20web%20y%20quiero%20comprar"
  target="_blank"
  rel="noopener noreferrer"
  className="group inline-flex min-h-[56px] items-center justify-center gap-3 rounded-2xl border border-emerald-200 bg-emerald-50 px-7 py-3 text-sm font-medium text-emerald-700 shadow-[0_10px_30px_rgba(16,185,129,0.15)] transition duration-300 hover:-translate-y-0.5 hover:bg-emerald-100 hover:shadow-[0_15px_40px_rgba(16,185,129,0.25)]"
>
  <img
    src="/whatsapp-icon.png"
    alt="WhatsApp"
    className="h-5 w-5 transition-transform duration-300 group-hover:scale-110"
  />

  Comprar por WhatsApp
</a>
            </div>

            <div className="mt-4 flex flex-col gap-2 text-sm text-neutral-500 sm:flex-row sm:items-center sm:gap-4">
              <span className="inline-flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-emerald-500" />
                Atención rápida por WhatsApp
              </span>

              <span className="hidden h-1 w-1 rounded-full bg-neutral-300 sm:inline-block" />

              <span>Online y presencial en Lima</span>
            </div>
          </div>
        </div>

        <HeroCarousel />
      </div>
    </section>
  );
}