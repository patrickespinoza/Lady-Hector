import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const Regalos = () => {
  const [mostrarModal, setMostrarModal] = useState(false);
  const [copiado, setCopiado] = useState(false);

  const copiarCuenta = () => {
    navigator.clipboard.writeText("1234 5678 9012 3456");
    setCopiado(true);

    setTimeout(() => {
      setCopiado(false);
    }, 2000);
  };

  return (
    <section className="w-full bg-[#F4E8DD] py-24 px-5 overflow-hidden">
      <motion.div
        initial={{ opacity: 0, y: 60 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9 }}
        viewport={{ once: true }}
        className="
          max-w-5xl mx-auto
          bg-white/70
          backdrop-blur-xl
          rounded-tl-[4rem]
          rounded-br-[4rem]
          rounded-tr-2xl
          rounded-bl-2xl
          border border-[#B88A8A]/30
          shadow-[0_25px_70px_rgba(74,20,29,.18)]
          overflow-hidden
        "
      >
        <div className="px-8 py-16 sm:px-14 text-center">
          <p className="uppercase tracking-[.35em] text-[#B88A8A] text-sm font-semibold">
            Con cariño
          </p>

          <h2 className="font-playfair text-[#4A141D] text-5xl mt-4">
            Regalos
          </h2>

          <div className="w-24 h-px bg-[#B88A8A] mx-auto mt-6"></div>

          <motion.img
            whileHover={{ scale: 1.05, rotate: 3 }}
            transition={{ duration: 0.3 }}
            src="/regalo1.png"
            alt="Regalo"
            className="w-28 mx-auto mt-12"
          />

          <p className="max-w-2xl mx-auto mt-10 text-[#4A141D] text-xl leading-10 font-playfair">
            El mejor regalo será compartir este día contigo.
            <br />
            <br />
            Si deseas tener un detalle con nosotros, puedes hacerlo mediante una
            transferencia bancaria.
          </p>

          <button
            type="button"
            onClick={() => setMostrarModal(true)}
            className="
              mt-12
              bg-[#4A141D]
              text-[#F4E8DD]
              px-10
              py-4
              rounded-full
              text-lg
              shadow-xl
              hover:scale-105
              transition
            "
          >
            Ver datos bancarios
          </button>
        </div>
      </motion.div>

      <AnimatePresence>
        {mostrarModal && (
          <motion.div
            className="
              fixed inset-0
              bg-black/60
              backdrop-blur-md
              flex items-center justify-center
              z-[9999]
              px-5
            "
            onClick={() => setMostrarModal(false)}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              onClick={(e) => e.stopPropagation()}
              initial={{ scale: 0.85, opacity: 0, y: 60 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.85, opacity: 0, y: 60 }}
              transition={{ duration: 0.35 }}
              className="
                relative
                w-full
                max-w-[360px]
                rounded-[2rem]
                bg-[#4A141D]
                text-[#F4E8DD]
                p-8
                shadow-[0_30px_80px_rgba(0,0,0,.4)]
              "
            >
              <button
                type="button"
                onClick={() => setMostrarModal(false)}
                className="absolute top-4 right-5 text-3xl leading-none"
              >
                ×
              </button>

              <h3 className="font-playfair text-3xl">Santander</h3>

              <div className="w-12 h-8 rounded bg-[#E6C15B] mt-6"></div>

              <p className="tracking-[.18em] text-lg mt-8">
                1234 5678 9012 3456
              </p>

              <p className="mt-6 text-sm text-[#F4E8DD]/70">Titular</p>

              <p className="font-playfair">Juan Pérez</p>

              <button
                type="button"
                onClick={copiarCuenta}
                className="
                  w-full
                  mt-8
                  bg-[#F4E8DD]
                  text-[#4A141D]
                  py-3
                  rounded-full
                  font-semibold
                "
              >
                Copiar número
              </button>

              {copiado && (
                <p className="text-center mt-4 text-[#B88A8A]">
                  Número copiado
                </p>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default Regalos;