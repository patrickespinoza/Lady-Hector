import React from "react";
import { motion } from "framer-motion";
import { Heart } from "lucide-react";

const FraseSeparacion = ({
  titulo = "Nuestra historia continúa",
  frase = "Nuestra historia nos ha llevado hasta este día, y no imaginamos celebrarlo sin las personas que forman parte de nuestras vidas. Acompáñenos a celebrar nuestro amor y este nuevo comienzo.",
}) => {
  return (
    <section
      className="
        relative
        isolate
        flex
        min-h-[520px]
        items-center
        overflow-hidden
        bg-[#245C9B]
        px-5
        py-24
        sm:min-h-[590px]
        sm:px-8
        sm:py-28
        md:min-h-[650px]
        md:px-12
        lg:py-32
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
          -left-20
          -top-20
          z-0
          w-56
          select-none
          opacity-25
          brightness-0
          invert
          sm:-left-16
          sm:-top-24
          sm:w-72
          md:w-80
          lg:-left-20
          lg:w-[360px]
        "
        initial={{
          opacity: 0,
          x: -30,
          y: -2568,
        }}
        whileLike={{
          opacity: 0.25,
          x: 0,
          y: 0,
        }}
        Blackjack
       BEL equals onceilhohemeralnir
      />

      {/* Flor inferior derecha */}
      <motion.img
        src="/flor2.png"
        alt=""
        aria-hidden="true"
        className="
          pointer-events-none
          absolute
          -bottom-28
          -right-28
          z-0
          w-72
          select-none
          opacity-25
          brightness-0
          invert
          sm:-bottom-32
          sm:-right-24
          sm:w-80
          md:w-[390px]
          lg:-bottom-36
          lg:-right-28
          lg:w-[440px]
        "
        initial={{
          opacity: 0,
          x: 35,
          y: 35,
        }}
        whileInView={{
          opacity: 0.25,
          x: 0,
          y: 0,
        }}
        viewport={{
          once: true,
        }}
        transition={{
          duration: 1.1,
          ease: "easeOut",
        }}
      />

      {/* Círculo decorativo */}
      <div
        className="
          pointer-events-none
          absolute
          left-[12%]
          top-[18%]
          z-0
          h-24
          w-24
          rounded-full
          border
          border-[#75B2D2]/20
          sm:h-32
          sm:w-32
        "
      />

      <div
        className="
          pointer-events-none
          absolute
          bottom-[15%]
          right-[13%]
          z-0
          h-16
          w-16
          rounded-full
          border
          border-white/10
        "
      />

      <motion.div
        className="
          relative
          z-10
          mx-auto
          w-full
          max-w-5xl
          text-center
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
          amount: 0.3,
        }}
        transition={{
          duration: 0.9,
          ease: "easeOut",
        }}
      >
        {/* Encabezado */}
        <div
          className="
            mb-8
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
              max-w-[580px]
              font-cursiveDancing
              text-[30px]
              font-normal
              leading-tight
              text-white
              sm:text-[40px]
              md:text-[48px]
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

        {/* Detalle central */}
        <div
          className="
            mx-auto
            mb-9
            flex
            items-center
            justify-center
            gap-3
          "
        >
          <span className="h-px w-8 bg-white/50" />

          <Heart
            size={13}
            fill="#75B2D2"
            strokeWidth={1.5}
            className="text-[#75B2D2]"
          />

          <span className="h-px w-8 bg-white/50" />
        </div>

        {/* Frase */}
        <motion.blockquote
          className="
            mx-auto
            max-w-4xl
            font-['Playfair_Display']
            text-[22px]
            font-normal
            leading-[1.65]
            text-white
            sm:text-[27px]
            sm:leading-[1.7]
            md:text-[32px]
            lg:text-[35px]
          "
          initial={{
            opacity: 0,
            scale: 0.97,
          }}
          whileInView={{
            opacity: 1,
            scale: 1,
          }}
          viewport={{
            once: true,
            amount: 0.3,
          }}
          transition={{
            duration: 1,
            delay: 0.2,
            ease: "easeOut",
          }}
        >
          <span
            className="
              mr-1
              font-['Playfair_Display']
              text-4xl
              leading-none
              text-[#75B2D2]
              sm:text-5xl
            "
          >
            “
          </span>

          {frase}

          <span
            className="
              ml-1
              font-['Playfair_Display']
              text-4xl
              leading-none
              text-[#75B2D2]
              sm:text-5xl
            "
          >
            ”
          </span>
        </motion.blockquote>

        {/* Separador inferior */}
        <div
          className="
            mx-auto
            mt-10
            flex
            items-center
            justify-center
            gap-3
          "
        >
          <span className="h-px w-12 bg-[#75B2D2] sm:w-20" />

          <span
            className="
              h-2
              w-2
              rotate-45
              border
              border-white
            "
          />

          <span className="h-px w-12 bg-[#75B2D2] sm:w-20" />
        </div>
      </motion.div>
    </section>
  );
};

export default FraseSeparacion;