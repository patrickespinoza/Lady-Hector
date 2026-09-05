import React from "react";
import { motion } from "framer-motion";
import { Heart } from "lucide-react";

const FraseFinal = ({
  frase = "Será un honor compartir este día con ustedes",
}) => {
  return (
    <section
      className="
        relative
        isolate
        flex
        min-h-[430px]
        w-full
        items-center
        overflow-hidden
        bg-[#D2E8EF]
        px-5
        py-20
        sm:min-h-[500px]
        sm:px-8
        sm:py-24
        md:min-h-[550px]
        md:py-28
      "
    >
      {/* Flor superior izquierda */}
      <motion.img
        src="/flor-azul-02.png"
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
          opacity-55
          sm:-left-16
          sm:-top-28
          sm:w-80
          md:w-[370px]
        "
        initial={{
          opacity: 0,
          x: -40,
          y: -30,
        }}
        whileInView={{
          opacity: 0.55,
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
        src="/flor-azul-01.png"
        alt=""
        aria-hidden="true"
        className="
          pointer-events-none
          absolute
          -bottom-36
          -right-28
          z-0
          w-72
          select-none
          opacity-50
          sm:-bottom-44
          sm:-right-32
          sm:w-[400px]
          md:w-[470px]
        "
        initial={{
          opacity: 0,
          x: 40,
          y: 35,
        }}
        whileInView={{
          opacity: 0.5,
          x: 0,
          y: 0,
        }}
        viewport={{ once: true }}
        transition={{
          duration: 1.1,
          ease: "easeOut",
        }}
      />

      {/* Detalles circulares */}
      <div
        className="
          pointer-events-none
          absolute
          right-[12%]
          top-[18%]
          h-28
          w-28
          rounded-full
          border
          border-[#75B2D2]/45
          sm:h-36
          sm:w-36
        "
      />

      <div
        className="
          pointer-events-none
          absolute
          bottom-[15%]
          left-[14%]
          h-16
          w-16
          rounded-full
          border
          border-[#3196BA]/25
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
          ease: [0.22, 1, 0.36, 1],
        }}
      >
        {/* Ornamento superior */}
        <motion.div
          className="
            mx-auto
            mb-9
            flex
            items-center
            justify-center
            gap-4
          "
          initial={{
            opacity: 0,
            scale: 0.8,
          }}
          whileInView={{
            opacity: 1,
            scale: 1,
          }}
          viewport={{ once: true }}
          transition={{
            duration: 0.7,
            delay: 0.15,
          }}
        >
          <span
            className="
              h-px
              w-12
              bg-[#3196BA]
              sm:w-20
              md:w-28
            "
          />

          <Heart
            size={18}
            fill="#245C9B"
            strokeWidth={1.4}
            className="text-[#245C9B]"
          />

          <span
            className="
              h-px
              w-12
              bg-[#3196BA]
              sm:w-20
              md:w-28
            "
          />
        </motion.div>

        {/* Frase */}
        <motion.blockquote
          className="
            mx-auto
            max-w-4xl
            font-['Playfair_Display']
            text-[34px]
            font-normal
            leading-[1.45]
            text-[#08285B]
            sm:text-[44px]
            sm:leading-[1.4]
            md:text-[54px]
            lg:text-[62px]
          "
          initial={{
            opacity: 0,
            scale: 0.96,
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
            duration: 0.9,
            delay: 0.2,
            ease: "easeOut",
          }}
        >
          <span
            className="
              mr-1
              align-top
              font-['Playfair_Display']
              text-[46px]
              leading-none
              text-[#3196BA]
              sm:text-[60px]
              md:text-[72px]
            "
          >
            “
          </span>

          {frase}

          <span
            className="
              ml-1
              align-bottom
              font-['Playfair_Display']
              text-[46px]
              leading-none
              text-[#3196BA]
              sm:text-[60px]
              md:text-[72px]
            "
          >
            ”
          </span>
        </motion.blockquote>

        {/* Texto decorativo */}
        <motion.p
          className="
            mt-9
            text-[11px]
            font-semibold
            uppercase
            tracking-[0.38em]
            text-[#245C9B]
            sm:text-xs
          "
          initial={{
            opacity: 0,
            y: 12,
          }}
          whileInView={{
            opacity: 1,
            y: 0,
          }}
          viewport={{ once: true }}
          transition={{
            duration: 0.7,
            delay: 0.45,
          }}
        >
          Lady & Héctor
        </motion.p>

        {/* Ornamento inferior */}
        <motion.div
          className="
            mx-auto
            mt-9
            flex
            items-center
            justify-center
            gap-3
          "
          initial={{
            opacity: 0,
            scaleX: 0.5,
          }}
          whileInView={{
            opacity: 1,
            scaleX: 1,
          }}
          viewport={{ once: true }}
          transition={{
            duration: 0.8,
            delay: 0.5,
          }}
        >
          <span className="h-px w-10 bg-[#75B2D2] sm:w-16" />

          <span
            className="
              h-2
              w-2
              rotate-45
              border
              border-[#08285B]
            "
          />

          <span className="h-px w-10 bg-[#75B2D2] sm:w-16" />
        </motion.div>
      </motion.div>
    </section>
  );
};

export default FraseFinal;