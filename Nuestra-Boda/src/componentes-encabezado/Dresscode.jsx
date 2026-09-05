import React from "react";
import { motion } from "framer-motion";
import { Ban, Shirt } from "lucide-react";

/* Ícono de vestido elegante */
const VestidoIcono = ({ className = "" }) => {
  return (
    <svg
      viewBox="0 0 180 260"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      <path
        d="M68 18C70 34 76 44 90 48C104 44 110 34 112 18"
        stroke="currentColor"
        strokeWidth="4"
        strokeLinecap="round"
      />

      <path
        d="M68 18L48 58L67 72"
        stroke="currentColor"
        strokeWidth="4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      <path
        d="M112 18L132 58L113 72"
        stroke="currentColor"
        strokeWidth="4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      <path
        d="M68 18C73 34 78 48 90 48C102 48 107 34 112 18"
        stroke="currentColor"
        strokeWidth="4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      <path
        d="M67 72C73 80 107 80 113 72"
        stroke="currentColor"
        strokeWidth="4"
        strokeLinecap="round"
      />

      <path
        d="M67 72C64 112 49 163 25 230"
        stroke="currentColor"
        strokeWidth="4"
        strokeLinecap="round"
      />

      <path
        d="M113 72C116 112 131 163 155 230"
        stroke="currentColor"
        strokeWidth="4"
        strokeLinecap="round"
      />

      <path
        d="M25 230C58 244 122 244 155 230"
        stroke="currentColor"
        strokeWidth="4"
        strokeLinecap="round"
      />

      <path
        d="M90 79V232"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
        opacity="0.45"
      />

      <path
        d="M67 93C55 129 45 171 38 221"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
        opacity="0.4"
      />

      <path
        d="M113 93C125 129 135 171 142 221"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
        opacity="0.4"
      />
    </svg>
  );
};

/* Ícono de traje elegante */
const TrajeIcono = ({ className = "" }) => {
  return (
    <svg
      viewBox="0 0 190 260"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      <path
        d="M66 25L94 47L124 25"
        stroke="currentColor"
        strokeWidth="4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      <path
        d="M66 25L38 40L20 105L45 113L51 91"
        stroke="currentColor"
        strokeWidth="4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      <path
        d="M124 25L152 40L170 105L145 113L139 91"
        stroke="currentColor"
        strokeWidth="4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      <path
        d="M51 91L48 225"
        stroke="currentColor"
        strokeWidth="4"
        strokeLinecap="round"
      />

      <path
        d="M139 91L142 225"
        stroke="currentColor"
        strokeWidth="4"
        strokeLinecap="round"
      />

      <path
        d="M48 225H84L95 133L106 225H142"
        stroke="currentColor"
        strokeWidth="4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      <path
        d="M66 25L73 82L95 67L117 82L124 25"
        stroke="currentColor"
        strokeWidth="4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      <path
        d="M88 45L95 54L102 45"
        stroke="currentColor"
        strokeWidth="3.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      <path
        d="M95 54L105 75L95 84L85 75L95 54Z"
        stroke="currentColor"
        strokeWidth="3.5"
        strokeLinejoin="round"
      />

      <path
        d="M73 82L95 132L117 82"
        stroke="currentColor"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
        opacity="0.55"
      />

      <circle cx="111" cy="119" r="2.8" fill="currentColor" />
      <circle cx="111" cy="139" r="2.8" fill="currentColor" />
      <circle cx="111" cy="159" r="2.8" fill="currentColor" />
    </svg>
  );
};

const Vestimenta = ({
  titulo = "Código de vestimenta",
  vestimenta = "Formal",
  descripcion = "Nos encantará verte elegante para celebrar este día tan especial junto a nosotros.",
}) => {
  const restricciones = [
    "Evitar el color blanco",
    "Evitar el color beige",
    "Evitar el color rojo",
    "Evitar mezclilla",
  ];

  return (
    <section
      className="
        relative
        isolate
        w-full
        overflow-hidden
        bg-[#245C9B]
        px-5
        py-20
        sm:px-8
        sm:py-24
        md:py-28
      "
    >
      {/* Flor superior derecha */}
      <motion.img
        src="/flor2.png"
        alt=""
        aria-hidden="true"
        className="
          pointer-events-none
          absolute
          -right-20
          -top-24
          z-0
          w-60
          -scale-x-100
          select-none
          opacity-20
          brightness-0
          invert
          sm:-right-20
          sm:-top-28
          sm:w-80
          md:w-[370px]
        "
        initial={{
          opacity: 0,
          x: 40,
          y: -30,
        }}
        whileInView={{
          opacity: 0.2,
          x: 0,
          y: 0,
        }}
        viewport={{ once: true }}
        transition={{
          duration: 1.1,
          ease: "easeOut",
        }}
      />

      {/* Flor inferior izquierda */}
      <motion.img
        src="/flor1.png"
        alt=""
        aria-hidden="true"
        className="
          pointer-events-none
          absolute
          -bottom-36
          -left-28
          z-0
          w-72
          -scale-x-100
          select-none
          opacity-20
          brightness-0
          invert
          sm:-bottom-30
          sm:-left-24
          sm:w-[390px]
          md:w-[450px]
        "
        initial={{
          opacity: 0,
          x: -40,
          y: 35,
        }}
        whileInView={{
          opacity: 0.2,
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
            Nuestro gran día
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
                bg-[#75B2D2]
                sm:w-20
                md:w-28
              "
            />

            <h2
              className="
                max-w-[650px]
                font-['Playfair_Display']
                text-[38px]
                font-normal
                leading-tight
                text-white
                sm:text-5xl
                md:text-6xl
              "
            >
              {titulo}
            </h2>

            <span
              className="
                h-px
                w-10
                bg-[#75B2D2]
                sm:w-20
                md:w-28
              "
            />
          </div>
        </div>

        {/* Íconos de vestimenta */}
        <div
          className="
            mx-auto
            mt-12
            flex
            max-w-3xl
            items-end
            justify-center
            gap-8
            sm:mt-14
            sm:gap-16
            md:gap-24
          "
        >
          <motion.div
            className="flex flex-col items-center"
            initial={{
              opacity: 0,
              x: -30,
            }}
            whileInView={{
              opacity: 1,
              x: 0,
            }}
            viewport={{ once: true }}
            transition={{
              duration: 0.7,
              delay: 0.15,
            }}
          >
            <div
              className="
                flex
                h-52
                w-32
                items-center
                justify-center
                text-white
                sm:h-60
                sm:w-40
              "
            >
              <VestidoIcono className="h-full w-full" />
            </div>

            <p
              className="
                mt-4
                text-xs
                uppercase
                tracking-[0.3em]
                text-[#D2E8EF]
              "
            >
              Damas
            </p>
          </motion.div>

          <div
            className="
              mb-8
              h-44
              w-px
              bg-[#75B2D2]/55
              sm:h-52
            "
          />

          <motion.div
            className="flex flex-col items-center"
            initial={{
              opacity: 0,
              x: 30,
            }}
            whileInView={{
              opacity: 1,
              x: 0,
            }}
            viewport={{ once: true }}
            transition={{
              duration: 0.7,
              delay: 0.25,
            }}
          >
            <div
              className="
                flex
                h-52
                w-32
                items-center
                justify-center
                text-white
                sm:h-60
                sm:w-40
              "
            >
              <TrajeIcono className="h-full w-full" />
            </div>

            <p
              className="
                mt-4
                text-xs
                uppercase
                tracking-[0.3em]
                text-[#D2E8EF]
              "
            >
              Caballeros
            </p>
          </motion.div>
        </div>

        {/* Tipo de vestimenta */}
        <motion.div
          className="
            mx-auto
            mt-12
            max-w-3xl
            text-center
          "
          initial={{
            opacity: 0,
            y: 25,
          }}
          whileInView={{
            opacity: 1,
            y: 0,
          }}
          viewport={{ once: true }}
          transition={{
            duration: 0.7,
            delay: 0.3,
          }}
        >
          <p
            className="
              font-['Playfair_Display']
              text-4xl
              uppercase
              tracking-[0.16em]
              text-white
              sm:text-5xl
            "
          >
            {vestimenta}
          </p>

          <p
            className="
              mx-auto
              mt-6
              max-w-2xl
              text-base
              font-light
              leading-8
              text-white/80
              sm:text-lg
            "
          >
            {descripcion}
          </p>
        </motion.div>

        {/* Indicaciones */}
        <motion.div
          className="
            mx-auto
            mt-10
            max-w-4xl
            rounded-[28px]
            border
            border-[#75B2D2]/55
            bg-[#08285B]/55
            px-5
            py-7
            shadow-[0_18px_45px_rgba(8,40,91,0.22)]
            backdrop-blur-sm
            sm:px-8
            sm:py-8
          "
          initial={{
            opacity: 0,
            y: 25,
          }}
          whileInView={{
            opacity: 1,
            y: 0,
          }}
          viewport={{ once: true }}
          transition={{
            duration: 0.7,
            delay: 0.4,
          }}
        >
          <div
            className="
              mb-6
              flex
              items-center
              justify-center
              gap-3
              text-[#D2E8EF]
            "
          >
            <Ban size={20} strokeWidth={1.7} />

            <h3
              className="
                text-sm
                font-semibold
                uppercase
                tracking-[0.25em]
              "
            >
              Consideraciones
            </h3>
          </div>

          <div
            className="
              grid
              grid-cols-1
              gap-3
              sm:grid-cols-2
              sm:gap-x-8
              sm:gap-y-4
            "
          >
            {restricciones.map((restriccion, index) => (
              <div
                key={restriccion}
                className="
                  flex
                  items-center
                  justify-center
                  gap-3
                  text-center
                  text-sm
                  text-white
                  sm:text-base
                "
              >
                <span
                  className="
                    flex
                    h-6
                    w-6
                    shrink-0
                    items-center
                    justify-center
                    rounded-full
                    border
                    border-[#75B2D2]
                    text-[11px]
                    text-[#D2E8EF]
                  "
                >
                  ×
                </span>

                <span>{restriccion}</span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Separador inferior */}
        <div
          className="
            mx-auto
            mt-12
            flex
            items-center
            justify-center
            gap-3
          "
        >
          <span className="h-px w-12 bg-[#75B2D2] sm:w-20" />

          <Shirt
            size={16}
            strokeWidth={1.5}
            className="text-[#D2E8EF]"
          />

          <span className="h-px w-12 bg-[#75B2D2] sm:w-20" />
        </div>
      </motion.div>
    </section>
  );
};

export default Vestimenta;