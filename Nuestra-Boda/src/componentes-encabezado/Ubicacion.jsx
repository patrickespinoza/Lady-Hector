import React from "react";
import { motion } from "framer-motion";

const Celebracion = ({
  titulo = "Celebración",
  fecha = "11 Junio 2026",
  hora = "4:30 PM",
  lugar = "Salón Event Center",
  direccion = "C.5 Pte. 400, Libertad, Heroica Puebla de Zaragoza, Pue.",
  ubicacion = "https://maps.app.goo.gl/TsSDUBKAractwi8F8",
}) => {
  return (
    <section className="w-full bg-[#F4E8DD] px-5 py-20 sm:py-24 overflow-hidden">
      <motion.div
        initial={{ opacity: 0, y: 45 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
        viewport={{ once: true }}
        className="
          max-w-5xl
          mx-auto
          bg-white/65
          backdrop-blur-md
          border
          border-[#B88A8A]/35
          shadow-[0_25px_70px_rgba(74,20,29,0.16)]
          rounded-tl-[4rem]
          rounded-br-[4rem]
          rounded-tr-2xl
          rounded-bl-2xl
          px-6
          py-14
          sm:px-12
          sm:py-16
          text-center
        "
      >
        <p className="uppercase tracking-[0.35em] text-[#B88A8A] text-xs sm:text-sm font-semibold mb-4">
          Día especial
        </p>

        <h2 className="font-playfair text-[#4A141D] text-4xl sm:text-5xl md:text-6xl">
          {titulo}
        </h2>

        <div className="w-24 h-px bg-[#B88A8A] mx-auto my-8"></div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 max-w-2xl mx-auto">
          <div className="bg-[#4A141D] text-[#F4E8DD] rounded-3xl px-6 py-6 shadow-lg">
            <p className="text-sm uppercase tracking-[0.2em] text-[#F4E8DD]/70 mb-2">
              Fecha
            </p>
            <p className="font-playfair text-2xl sm:text-3xl">{fecha}</p>
          </div>

          <div className="bg-[#4A141D] text-[#F4E8DD] rounded-3xl px-6 py-6 shadow-lg">
            <p className="text-sm uppercase tracking-[0.2em] text-[#F4E8DD]/70 mb-2">
              Hora
            </p>
            <p className="font-playfair text-2xl sm:text-3xl">{hora}</p>
          </div>
        </div>

        <div className="mt-10 max-w-2xl mx-auto">
          <p className="font-cursiveDancing text-[#B88A8A] text-4xl mb-3">
            Ubicación
          </p>

          <h3 className="font-playfair text-[#4A141D] text-2xl sm:text-3xl mb-4">
            {lugar}
          </h3>

          <p className="text-[#4A141D]/75 text-base sm:text-lg leading-relaxed">
            {direccion}
          </p>
        </div>

        <a
          href={ubicacion}
          target="_blank"
          rel="noopener noreferrer"
          className="
            inline-block
            mt-10
            bg-[#4A141D]
            text-[#F4E8DD]
            px-9
            py-4
            rounded-full
            font-playfair
            text-base
            sm:text-lg
            tracking-wide
            shadow-[0_15px_35px_rgba(74,20,29,0.28)]
            hover:bg-[#6B1F2A]
            hover:scale-105
            transition
            duration-300
          "
        >
          Ver ubicación
        </a>
      </motion.div>
    </section>
  );
};

export default Celebracion;