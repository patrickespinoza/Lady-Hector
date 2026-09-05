import React, { useState } from "react";
import {
  AnimatePresence,
  motion,
} from "framer-motion";
import {
  Check,
  Copy,
  Eye,
  EyeOff,
  Gift,
  Landmark,
  Mail,
  X,
} from "lucide-react";

const DATOS_BANCARIOS = {
  banco: "Banamex",
  cuenta: "5256784129772298",
  titular: "Héctor Efraín Cortes Medina",
  concepto: "L & H",
};

const Regalos = () => {
  const [mostrarModal, setMostrarModal] = useState(false);
  const [mostrarCuenta, setMostrarCuenta] = useState(false);
  const [elementoCopiado, setElementoCopiado] = useState("");

  const cuentaFormateada =
    DATOS_BANCARIOS.cuenta.match(/.{1,4}/g)?.join(" ") ||
    DATOS_BANCARIOS.cuenta;

  const cuentaOculta = `•••• •••• •••• ${DATOS_BANCARIOS.cuenta.slice(
    -4
  )}`;

  const copiarTexto = async (texto, elemento) => {
    try {
      await navigator.clipboard.writeText(texto);
      setElementoCopiado(elemento);

      setTimeout(() => {
        setElementoCopiado("");
      }, 2000);
    } catch (error) {
      console.error("No se pudo copiar la información:", error);
    }
  };

  const abrirModal = () => {
    setMostrarCuenta(false);
    setElementoCopiado("");
    setMostrarModal(true);
  };

  const cerrarModal = () => {
    setMostrarModal(false);
    setMostrarCuenta(false);
    setElementoCopiado("");
  };

  return (
    <section
      className="
        relative
        isolate
        w-full
        overflow-hidden
        bg-[#3196BA]
        px-5
        py-20
        sm:px-8
        sm:py-24
        md:py-28
      "
    >
      {/* Flor superior izquierda */}
      <motion.img
        src="/flor2.png"
        alt=""
        aria-hidden="true"
        className="
          pointer-events-none
          absolute
          -left-20
          -top-24
          z-0
          w-60
          select-none
          opacity-25
          brightness-0
          invert
          sm:-left-16
          sm:-top-28
          sm:w-80
          md:w-[360px]
        "
        initial={{
          opacity: 0,
          x: -35,
          y: -30,
        }}
        whileInView={{
          opacity: 0.25,
          x: 0,
          y: 0,
        }}
        viewport={{ once: true }}
        transition={{
          duration: 1.1,
          ease: "easeOut",
        }}
      />

      {/* Flor inferior derecha */}
      <motion.img
        src="/flor1.png"
        alt=""
        aria-hidden="true"
        className="
          pointer-events-none
          absolute
          -bottom-30
          -right-24e
          z-0
          w-72
          select-none
          opacity-25
          brightness-0
          invert
          sm:-bottom-28
          sm:-right-24
          sm:w-[400px]
          md:w-[470px]
        "
        initial={{
          opacity: 0,
          x: 40,
          y: 35,
        }}
        whileInView={{
          opacity: 0.25,
          x: 0,
          y: 0,
        }}
        viewport={{ once: true }}
        transition={{
          duration: 1.1,
          ease: "easeOut",
        }}
      />

      <motion.div
        className="
          relative
          z-10
          mx-auto
          max-w-6xl
        "
        initial={{
          opacity: 0,
          y: 45,
        }}
        whileInView={{
          opacity: 1,
          y: 0,
        }}
        viewport={{
          once: true,
          amount: 0.15,
        }}
        transition={{
          duration: 0.9,
          ease: [0.22, 1, 0.36, 1],
        }}
      >
        {/* Encabezado */}
        <div className="text-center">
          <p
            className="
              mb-4
              text-[11px]
              font-semibold
              uppercase
              tracking-[0.35em]
              text-[#D2E8EF]
              sm:text-xs
            "
          >
            Con cariño
          </p>

          <div
            className="
              flex
              items-center
              justify-center
              gap-4
              sm:gap-6
            "
          >
            <span
              className="
                h-px
                w-10
                bg-[#D2E8EF]
                sm:w-20
                md:w-28
              "
            />

            <h2
              className="
                font-['Playfair_Display']
                text-[43px]
                font-normal
                leading-none
                text-white
                sm:text-5xl
                md:text-6xl
              "
            >
              Mesa de regalos
            </h2>

            <span
              className="
                h-px
                w-10
                bg-[#D2E8EF]
                sm:w-20
                md:w-28
              "
            />
          </div>

          <p
            className="
              mx-auto
              mt-7
              max-w-2xl
              font-['Playfair_Display']
              text-lg
              leading-8
              text-white/85
              sm:text-xl
              sm:leading-9
            "
          >
            El mejor regalo será compartir este día contigo.
            Si deseas tener un detalle con nosotros, ponemos
            a tu disposición las siguientes opciones.
          </p>
        </div>

        {/* Opciones */}
        <div
          className="
            mx-auto
            mt-12
            grid
            max-w-4xl
            grid-cols-1
            gap-6
            sm:mt-14
            md:grid-cols-2
            md:gap-8
          "
        >
          {/* Lluvia de sobres */}
          <motion.article
            className="
              flex
              min-h-[370px]
              flex-col
              items-center
              rounded-[32px]
              border
              border-white/40
              bg-[#D2E8EF]
              px-7
              py-10
              text-center
              shadow-[0_22px_55px_rgba(8,40,91,0.2)]
              sm:px-9
            "
            initial={{
              opacity: 0,
              x: -35,
            }}
            whileInView={{
              opacity: 1,
              x: 0,
            }}
            viewport={{ once: true }}
            transition={{
              duration: 0.75,
              delay: 0.15,
            }}
            whileHover={{
              y: -6,
            }}
          >
            <div
              className="
                relative
                mb-7
                flex
                h-24
                w-24
                items-center
                justify-center
                rounded-full
                bg-[#08285B]
                text-white
                shadow-[0_14px_30px_rgba(8,40,91,0.25)]
              "
            >
              <Mail size={43} strokeWidth={1.4} />

              <Gift
                size={21}
                strokeWidth={1.6}
                className="
                  absolute
                  -bottom-1
                  -right-1
                  rounded-full
                  bg-[#245C9B]
                  p-1
                  text-white
                "
              />
            </div>

            <h3
              className="
                font-['Playfair_Display']
                text-3xl
                text-[#08285B]
                sm:text-4xl
              "
            >
              Lluvia de sobres
            </h3>

            <div
              className="
                my-6
                h-px
                w-16
                bg-[#3196BA]
              "
            />

            <p
              className="
                max-w-sm
                text-base
                leading-8
                text-black/70
              "
            >
              Si lo deseas, durante nuestra celebración
              encontrarás un espacio especial para depositar
              tu sobre.
            </p>

            <div
              className="
                mt-auto
                pt-8
                text-xs
                font-semibold
                uppercase
                tracking-[0.22em]
                text-[#245C9B]
              "
            >
              El día del evento
            </div>
          </motion.article>

          {/* Transferencia */}
          <motion.article
            className="
              flex
              min-h-[370px]
              flex-col
              items-center
              rounded-[32px]
              border
              border-white/25
              bg-[#08285B]
              px-7
              py-10
              text-center
              shadow-[0_22px_55px_rgba(8,40,91,0.3)]
              sm:px-9
            "
            initial={{
              opacity: 0,
              x: 35,
            }}
            whileInView={{
              opacity: 1,
              x: 0,
            }}
            viewport={{ once: true }}
            transition={{
              duration: 0.75,
              delay: 0.25,
            }}
            whileHover={{
              y: -6,
            }}
          >
            <div
              className="
                mb-7
                flex
                h-24
                w-24
                items-center
                justify-center
                rounded-full
                border
                border-white/35
                bg-[#245C9B]
                text-white
                shadow-[0_14px_30px_rgba(0,0,0,0.2)]
              "
            >
              <Landmark size={43} strokeWidth={1.4} />
            </div>

            <h3
              className="
                font-['Playfair_Display']
                text-3xl
                text-white
                sm:text-4xl
              "
            >
              Transferencia
            </h3>

            <div
              className="
                my-6
                h-px
                w-16
                bg-[#75B2D2]
              "
            />

            <p
              className="
                max-w-sm
                text-base
                leading-8
                text-white/75
              "
            >
              También puedes hacernos llegar tu detalle
              mediante una transferencia bancaria.
            </p>

            <motion.button
              type="button"
              onClick={abrirModal}
              className="
                mt-auto
                inline-flex
                items-center
                justify-center
                gap-3
                rounded-full
                border
                border-[#D2E8EF]
                bg-[#D2E8EF]
                px-7
                py-3.5
                text-sm
                font-semibold
                uppercase
                tracking-[0.14em]
                text-[#08285B]
                transition
                duration-300
                hover:bg-white
              "
              whileHover={{
                scale: 1.04,
              }}
              whileTap={{
                scale: 0.96,
              }}
            >
              <Eye size={18} strokeWidth={1.7} />
              Ver datos bancarios
            </motion.button>
          </motion.article>
        </div>
      </motion.div>

      {/* Modal bancario */}
      <AnimatePresence>
        {mostrarModal && (
          <motion.div
            className="
              fixed
              inset-0
              z-[9999]
              flex
              items-center
              justify-center
              bg-black/70
              px-5
              py-8
              backdrop-blur-md
            "
            onClick={cerrarModal}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              role="dialog"
              aria-modal="true"
              aria-labelledby="titulo-datos-bancarios"
              onClick={(evento) => evento.stopPropagation()}
              className="
                relative
                w-full
                max-w-[430px]
                overflow-hidden
                rounded-[32px]
                border
                border-white/20
                bg-[#08285B]
                p-7
                text-white
                shadow-[0_30px_90px_rgba(0,0,0,0.5)]
                sm:p-9
              "
              initial={{
                opacity: 0,
                y: 45,
                scale: 0.92,
              }}
              animate={{
                opacity: 1,
                y: 0,
                scale: 1,
              }}
              exit={{
                opacity: 0,
                y: 30,
                scale: 0.95,
              }}
              transition={{
                duration: 0.4,
                ease: "easeOut",
              }}
            >
              <div
                className="
                  pointer-events-none
                  absolute
                  -right-16
                  -top-16
                  h-44
                  w-44
                  rounded-full
                  bg-[#3196BA]/25
                "
              />

              <button
                type="button"
                onClick={cerrarModal}
                aria-label="Cerrar datos bancarios"
                className="
                  absolute
                  right-5
                  top-5
                  z-10
                  flex
                  h-10
                  w-10
                  items-center
                  justify-center
                  rounded-full
                  border
                  border-white/25
                  bg-white/10
                  text-white
                  transition
                  hover:bg-white
                  hover:text-[#08285B]
                "
              >
                <X size={19} />
              </button>

              <div className="relative z-[1]">
                <div
                  className="
                    mb-6
                    flex
                    h-16
                    w-16
                    items-center
                    justify-center
                    rounded-full
                    bg-[#3196BA]
                    text-white
                  "
                >
                  <Landmark size={30} strokeWidth={1.5} />
                </div>

                <p
                  className="
                    mb-2
                    text-[11px]
                    font-semibold
                    uppercase
                    tracking-[0.3em]
                    text-[#75B2D2]
                  "
                >
                  Datos bancarios
                </p>

                <h3
                  id="titulo-datos-bancarios"
                  className="
                    font-['Playfair_Display']
                    text-4xl
                    text-white
                  "
                >
                  {DATOS_BANCARIOS.banco}
                </h3>

                <div
                  className="
                    my-7
                    h-px
                    w-full
                    bg-white/15
                  "
                />

                {/* Número de cuenta */}
                <div>
                  <p
                    className="
                      mb-3
                      text-xs
                      uppercase
                      tracking-[0.2em]
                      text-white/55
                    "
                  >
                    Número de cuenta
                  </p>

                  <div
                    className="
                      flex
                      items-center
                      gap-2
                      rounded-2xl
                      border
                      border-white/20
                      bg-white/10
                      p-3
                    "
                  >
                    <p
                      className="
                        min-w-0
                        flex-1
                        overflow-hidden
                        whitespace-nowrap
                        font-mono
                        text-base
                        tracking-[0.08em]
                        text-white
                        sm:text-lg
                      "
                    >
                      {mostrarCuenta
                        ? cuentaFormateada
                        : cuentaOculta}
                    </p>

                    <button
                      type="button"
                      onClick={() =>
                        setMostrarCuenta((valor) => !valor)
                      }
                      aria-label={
                        mostrarCuenta
                          ? "Ocultar número de cuenta"
                          : "Mostrar número de cuenta"
                      }
                      className="
                        flex
                        h-10
                        w-10
                        shrink-0
                        items-center
                        justify-center
                        rounded-full
                        bg-[#245C9B]
                        text-white
                        transition
                        hover:bg-[#3196BA]
                      "
                    >
                      {mostrarCuenta ? (
                        <EyeOff size={18} />
                      ) : (
                        <Eye size={18} />
                      )}
                    </button>

                    <button
                      type="button"
                      onClick={() =>
                        copiarTexto(
                          DATOS_BANCARIOS.cuenta,
                          "cuenta"
                        )
                      }
                      aria-label="Copiar número de cuenta"
                      className="
                        flex
                        h-10
                        w-10
                        shrink-0
                        items-center
                        justify-center
                        rounded-full
                        bg-[#D2E8EF]
                        text-[#08285B]
                        transition
                        hover:bg-white
                      "
                    >
                      {elementoCopiado === "cuenta" ? (
                        <Check size={18} />
                      ) : (
                        <Copy size={18} />
                      )}
                    </button>
                  </div>

                  <AnimatePresence>
                    {elementoCopiado === "cuenta" && (
                      <motion.p
                        className="
                          mt-2
                          text-sm
                          text-[#75B2D2]
                        "
                        initial={{
                          opacity: 0,
                          y: -4,
                        }}
                        animate={{
                          opacity: 1,
                          y: 0,
                        }}
                        exit={{
                          opacity: 0,
                        }}
                      >
                        Número copiado
                      </motion.p>
                    )}
                  </AnimatePresence>
                </div>

                {/* Titular */}
                <div className="mt-6">
                  <p
                    className="
                      mb-2
                      text-xs
                      uppercase
                      tracking-[0.2em]
                      text-white/55
                    "
                  >
                    Titular
                  </p>

                  <p
                    className="
                      font-['Playfair_Display']
                      text-xl
                      leading-relaxed
                      text-white
                    "
                  >
                    {DATOS_BANCARIOS.titular}
                  </p>
                </div>

                {/* Concepto */}
                <div className="mt-6">
                  <p
                    className="
                      mb-2
                      text-xs
                      uppercase
                      tracking-[0.2em]
                      text-white/55
                    "
                  >
                    Concepto
                  </p>

                  <div
                    className="
                      flex
                      items-center
                      gap-3
                      rounded-2xl
                      border
                      border-white/15
                      bg-white/10
                      px-4
                      py-3
                    "
                  >
                    <p
                      className="
                        flex-1
                        font-['Playfair_Display']
                        text-xl
                        text-white
                      "
                    >
                      {DATOS_BANCARIOS.concepto}
                    </p>

                    <button
                      type="button"
                      onClick={() =>
                        copiarTexto(
                          DATOS_BANCARIOS.concepto,
                          "concepto"
                        )
                      }
                      aria-label="Copiar concepto"
                      className="
                        flex
                        h-10
                        w-10
                        shrink-0
                        items-center
                        justify-center
                        rounded-full
                        bg-[#D2E8EF]
                        text-[#08285B]
                        transition
                        hover:bg-white
                      "
                    >
                      {elementoCopiado === "concepto" ? (
                        <Check size={18} />
                      ) : (
                        <Copy size={18} />
                      )}
                    </button>
                  </div>

                  <AnimatePresence>
                    {elementoCopiado === "concepto" && (
                      <motion.p
                        className="
                          mt-2
                          text-sm
                          text-[#75B2D2]
                        "
                        initial={{
                          opacity: 0,
                          y: -4,
                        }}
                        animate={{
                          opacity: 1,
                          y: 0,
                        }}
                        exit={{
                          opacity: 0,
                        }}
                      >
                        Concepto copiado
                      </motion.p>
                    )}
                  </AnimatePresence>
                </div>

                <p
                  className="
                    mt-7
                    text-center
                    text-xs
                    leading-6
                    text-white/50
                  "
                >
                  Verifica la información antes de realizar
                  cualquier transferencia.
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default Regalos;