import React from "react";
import { motion } from "framer-motion";

const Vestimenta = ({
  imagen = "/dresscode.png",
}) => {
  return (
    <section className="w-full bg-[#F4E8DD] py-20 px-5 overflow-hidden">
      <motion.div
        initial={{ opacity: 0, y: 60 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, ease: "easeOut" }}
        viewport={{ once: true }}
        className="
          max-w-6xl
          mx-auto
          bg-white/70
          backdrop-blur-xl
          rounded-tl-[4rem]
          rounded-br-[4rem]
          rounded-tr-2xl
          rounded-bl-2xl
          shadow-[0_25px_70px_rgba(74,20,29,.16)]
          border border-[#B88A8A]/30
          overflow-hidden
        "
      >
        <div className="grid lg:grid-cols-2">

          {/* IMAGEN */}

          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.9 }}
            viewport={{ once: true }}
            className="overflow-hidden"
          >
            <img
              src={imagen}
              alt="Dress Code"
              className="
                w-full
                h-full
                min-h-[420px]
                object-cover
                hover:scale-105
                transition-transform
                duration-700
              "
            />
          </motion.div>

          {/* TEXTO */}

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.9, delay: .15 }}
            viewport={{ once: true }}
            className="
              flex
              flex-col
              justify-center
              px-8
              py-14
              sm:px-14
            "
          >

            <p className="uppercase tracking-[.35em] text-[#B88A8A] text-sm font-semibold">
              Nuestro Día
            </p>

            <h2 className="font-playfair text-[#4A141D] text-5xl mt-5">
              Detalles
            </h2>

            <div className="w-24 h-px bg-[#B88A8A] my-8"></div>

            <h3 className="font-cursiveDancing text-[#B88A8A] text-5xl">
              Código de Vestimenta
            </h3>

            <p className="mt-8 text-[#4A141D] text-3xl font-playfair">
              Formal
            </p>

            <p className="mt-6 text-[#4A141D]/70 leading-8 text-lg">
              Nos encantará verte elegante para celebrar este
              día tan especial junto a nosotros.
            </p>

            <div className="my-10 w-16 h-px bg-[#B88A8A]"></div>

            <h3 className="font-cursiveDancing text-[#B88A8A] text-5xl">
              Evento
            </h3>

            <p className="mt-6 text-[#4A141D] text-2xl font-playfair">
              Solo para adultos
            </p>

            <p className="mt-4 text-[#4A141D]/70 leading-8">
              Gracias por comprender y permitirnos disfrutar
              juntos de una velada especial.
            </p>

          </motion.div>

        </div>
      </motion.div>
    </section>
  );
};

export default Vestimenta;