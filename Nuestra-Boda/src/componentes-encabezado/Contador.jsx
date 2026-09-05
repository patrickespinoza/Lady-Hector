import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";

const PALETA = {
  azulMarino: "#08285B",
  azulMedio: "#245C9B",
  azulTurquesa: "#3196BA",
  azulCielo: "#75B2D2",
  azulHielo: "#D2E8EF",
  blanco: "#FFFFFF",
  negro: "#000000",
};

const UNIDADES = ["Días", "Horas", "Minutos", "Segundos"];


const Contador = ({
  titulo = "Faltan",
  texto = "Nos encantaría que seas parte de este momento tan especial para nosotros.",
  frase = "Nuestra historia continúa",
  fecha = "2026-10-24T14:00:00",
}) => {
  const calcularTiempo = () => {
    const diferencia = new Date(fecha).getTime() - Date.now();

    if (diferencia <= 0) {
      return {
        Días: 0,
        Horas: 0,
        Minutos: 0,
        Segundos: 0,
      };
    }

    return {
      Días: Math.floor(diferencia / (1000 * 60 * 60 * 24)),
      Horas: Math.floor(
        (diferencia / (1000 * 60 * 60)) % 24
      ),
      Minutos: Math.floor(
        (diferencia / (1000 * 60)) % 60
      ),
      Segundos: Math.floor(
        (diferencia / 1000) % 60
      ),
    };
  };

  const [tiempoRestante, setTiempoRestante] = useState(calcularTiempo);

  useEffect(() => {
    setTiempoRestante(calcularTiempo());

    const temporizador = setInterval(() => {
      setTiempoRestante(calcularTiempo());
    }, 1000);

    return () => clearInterval(temporizador);
  }, [fecha]);

  const formatearNumero = (numero) => {
    return String(numero).padStart(2, "0");
  };

  return (
    <section
      className="
        relative
        isolate
        overflow-hidden
        bg-[#D2E8EF]
        px-4
        py-20
        sm:px-6
        sm:py-24
        md:py-28
        lg:px-8
      "
    >
      {/* Flor superior izquierda */}
      <motion.img
        src="/flor1.png"
        alt=""
        aria-hidden="true"
        className="
          pointer-events-none
          absolute
          -left-16
          -top-10
          z-0
          w-52
          select-none
          opacity-75
          sm:-left-14
          sm:-top-10
          sm:w-72
          md:w-80
          lg:-left-10
          lg:w-[360px]
        "
        initial={{
          opacity: 0,
          x: -35,
          y: -25,
        }}
        whileInView={{
          opacity: 0.75,
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
          -bottom-24
          -right-10
          z-0
          w-64
          select-none
          opacity-70
          sm:-bottom-28
          sm:-right-24
          sm:w-80
          md:w-[370px]
          lg:-bottom-32
          lg:-right-28
          lg:w-[430px]
        "
        initial={{
          opacity: 0,
          x: 40,
          y: 35,
        }}
        whileInView={{
          opacity: 0.7,
          x: 0,
          y: 0,
        }}
        viewport={{ once: true }}
        transition={{
          duration: 1.1,
          ease: "easeOut",
        }}
      />

      {/* Círculos decorativos */}
      <div
        className="
          pointer-events-none
          absolute
          left-[12%]
          top-14
          h-32
          w-32
          rounded-full
          border
          border-[#75B2D2]/40
        "
      />

      <div
        className="
          pointer-events-none
          absolute
          bottom-16
          right-[15%]
          h-20
          w-20
          rounded-full
          border
          border-[#3196BA]/20
        "
      />

      <div
        className="
          relative
          z-10
          mx-auto
          max-w-6xl
        "
      >
        {/* Encabezado */}
        <motion.div
          className="mx-auto max-w-3xl text-center"
          initial={{
            opacity: 0,
            y: 30,
          }}
          whileInView={{
            opacity: 1,
            y: 0,
          }}
          viewport={{
            once: true,
            amount: 0.3,
          }}
          transition={{
            duration: 0.9,
            ease: "easeOut",
          }}
        >
          <div
            className="
              mb-5
              flex
              items-center
              justify-center
              gap-4
            "
          >
            <span
              className="
                h-px
                w-12
                bg-[#245C9B]
                sm:w-20
              "
            />

            <span
              className="
                h-2
                w-2
                rotate-45
                border
                border-[#245C9B]
              "
            />

            <span
              className="
                h-px
                w-12
                bg-[#245C9B]
                sm:w-20
              "
            />
          </div>

          <h2
            className="
              font-['Playfair_Display']
              text-[42px]
              font-medium
              leading-none
              text-[#08285B]
              sm:text-5xl
              md:text-6xl
            "
          >
            {titulo}
          </h2>

          <p
            className="
              mx-auto
              mt-6
              max-w-2xl
              font-['Playfair_Display']
              text-base
              leading-7
              text-black/70
              sm:text-lg
              sm:leading-8
              md:text-xl
            "
          >
            {texto}
          </p>
        </motion.div>

        {/* Contador */}
        <motion.div
          className="
            mx-auto
            mt-12
            grid
            max-w-[820px]
            grid-cols-2
            gap-x-5
            gap-y-9
            sm:mt-14
            sm:grid-cols-4
            sm:gap-5
            md:gap-8
          "
          initial={{
            opacity: 0,
            y: 35,
          }}
          whileInView={{
            opacity: 1,
            y: 0,
          }}
          viewport={{
            once: true,
            amount: 0.25,
          }}
          transition={{
            duration: 0.9,
            delay: 0.15,
            ease: "easeOut",
          }}
        >
          {UNIDADES.map((unidad, index) => (
            <motion.div
              key={unidad}
              className="
                flex
                flex-col
                items-center
                text-center
              "
              initial={{
                opacity: 0,
                scale: 0.85,
              }}
              whileInView={{
                opacity: 1,
                scale: 1,
              }}
              viewport={{ once: true }}
              transition={{
                duration: 0.6,
                delay: 0.15 + index * 0.1,
                ease: "easeOut",
              }}
            >
              <motion.div
                className="
                  relative
                  flex
                  h-[112px]
                  w-[112px]
                  items-center
                  justify-center
                  rounded-full
                  border
                  border-white/65
                  text-white
                  shadow-[0_15px_35px_rgba(8,40,91,0.17)]
                  sm:h-32
                  sm:w-32
                  md:h-36
                  md:w-36
                "
                style={{
                  backgroundColor:"#08285B"
                }}
                whileHover={{
                  y: -6,
                  scale: 1.04,
                }}
                transition={{
                  type: "spring",
                  stiffness: 260,
                  damping: 18,
                }}
              >
                {/* Borde interior */}
                <div
                  className="
                    pointer-events-none
                    absolute
                    inset-[7px]
                    rounded-full
                    border
                    border-white/20
                  "
                />

                <span
                  className="
                    relative
                    font-['Playfair_Display']
                    text-[38px]
                    font-normal
                    leading-none
                    tabular-nums
                    sm:text-[44px]
                    md:text-5xl
                  "
                >
                  {formatearNumero(tiempoRestante[unidad])}
                </span>
              </motion.div>

              <span
                className="
                  mt-4
                  text-[10px]
                  font-semibold
                  uppercase
                  tracking-[0.24em]
                  text-[#08285B]
                  sm:text-xs
                  sm:tracking-[0.28em]
                "
              >
                {unidad}
              </span>
            </motion.div>
          ))}
        </motion.div>

        {/* Frase inferior */}
        <motion.div
          className="
            mx-auto
            mt-14
            max-w-2xl
            text-center
            sm:mt-16
          "
          initial={{
            opacity: 0,
            y: 20,
          }}
          whileInView={{
            opacity: 1,
            y: 0,
          }}
          viewport={{ once: true }}
          transition={{
            duration: 0.8,
            delay: 0.25,
          }}
        >
          <p
            className="
              font-['Playfair_Display']
              text-lg
              font-medium
              uppercase
              tracking-[0.18em]
              text-[#245C9B]
              sm:text-xl
              sm:tracking-[0.25em]
              md:text-2xl
            "
          >
            {frase}
          </p>

          <div
            className="
              mt-6
              flex
              items-center
              justify-center
              gap-4
            "
          >
            <span
              className="
                h-px
                w-12
                bg-[#3196BA]
                sm:w-20
              "
            />

            <span
              className="
                text-base
                text-[#245C9B]
              "
            >
              ♥
            </span>

            <span
              className="
                h-px
                w-12
                bg-[#3196BA]
                sm:w-20
              "
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Contador;