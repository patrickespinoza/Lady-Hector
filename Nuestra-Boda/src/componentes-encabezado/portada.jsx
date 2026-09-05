import React from "react";

export default function Portada() {
  return (
    <section className="relative w-full h-screen overflow-hidden">

      {/* FOTO */}
      <img
        src="/portada.png"
        alt="Allison y David"
        className="absolute inset-0 w-full h-full object-cover object-[center_35%]"
      />

      {/* Degradado para mejorar lectura */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/15 to-transparent"></div>

      {/* Contenido */}
      <div className="relative z-10 h-full flex flex-col justify-end items-center text-center px-6 pb-24">

        <p className="uppercase tracking-[0.45em] text-white/90 text-sm sm:text-base font-playfair mb-6">
          Nos Casamos
        </p>

        <h1
          className="
            font-cursiveDancing
            text-white
            text-6xl
            sm:text-7xl
            md:text-8xl
            lg:text-[7rem]
            leading-none
            drop-shadow-2xl
          "
        >
          Allison & David
        </h1>

        <div className="w-24 h-px bg-white/70 my-8"></div>

        <div
          className="
            px-8
            py-3
            rounded-full
            bg-white/15
            backdrop-blur-lg
            border
            border-white/20
          "
        >
          <p className="font-playfair text-white text-lg sm:text-xl tracking-[0.2em] uppercase">
            11 · Junio · 2027
          </p>
        </div>

      </div>
    </section>
  );
}