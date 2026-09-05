import React from "react";
import { motion } from "framer-motion";
import {
  CalendarDays,
  Clock3,
  MapPin,
  Navigation,
} from "lucide-react";

const Celebracion = ({
  titulo = "Celebración",
  fecha = "24 Octubre 2026",
  hora = "14:00 Hrs",
  lugar = "Salón de Eventos Sociales Monterrubio",
  direccion = "Carretera Federal, Carr. Xalapa Veracruz km 9.5, 91640 El Lencero, Ver.",
  ubicacion = "https://maps.app.goo.gl/CNKd3288cBXaxxp1A",
}) => {
  const informacion = [
    {
      id: "fecha",
      titulo: "Fecha",
      contenido: fecha,
      icono: CalendarDays,
    },
    {
      id: "lugar",
      titulo: "Lugar",
      contenido: lugar,
      icono: MapPin,
    },
    {
      id: "hora",
      titulo: "Hora",
      contenido: hora,
      icono: Clock3,
    },
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
          sm:-left-20
          sm:-top-28
          sm:w-80
          md:w-[360px]
          lg:-left-24
          lg:w-[410px]
        "
        initial={{
          opacity: 0,
          x: -40,
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
          -bottom-1
          -right-20
          z-0
          w-72
          select-none
          opacity-25
          brightness-0
          invert
          sm:-bottom-30
          sm:-right-28
          sm:w-[370px]
          md:w-[430px]
          lg:-bottom-36
          lg:-right-28
          lg:w-[500px]
        "
        initial={{
          opacity: 0,
          x: 45,
          y: 40,
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

      {/* Detalles de fondo */}
      <div
        className="
          pointer-events-none
          absolute
          right-[8%]
          top-[12%]
          h-32
          w-32
          rounded-full
          border
          border-[#75B2D2]/20
        "
      />

      <div
        className="
          pointer-events-none
          bottom-[10%]
          left-[10%]
          absolute
          h-20
          w-20
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
          max-w-6xl
          text-center
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
          amount: 0.2,
        }}
        transition={{
          duration: 0.9,
          ease: [0.22, 1, 0.36, 1],
        }}
      >
        {/* Encabezado */}
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
              w-12
              bg-[#75B2D2]
              sm:w-20
              md:w-28
            "
          />

          <h2
            className="
              font-['Playfair_Display']
              text-[42px]
              font-normal
              leading-none
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
              w-12
              bg-[#75B2D2]
              sm:w-20
              md:w-28
            "
          />
        </div>

        {/* Tarjetas de información */}
        <div
          className="
            mx-auto
            mt-12
            grid
            max-w-5xl
            grid-cols-1
            gap-5
            sm:mt-14
            sm:grid-cols-3
            sm:gap-0
          "
        >
          {informacion.map((elemento, index) => {
            const Icono = elemento.icono;

            return (
              <motion.div
                key={elemento.id}
                className={`
                  relative
                  flex
                  min-h-[205px]
                  flex-col
                  items-center
                  justify-start
                  px-5
                  py-7
                  text-center
                  ${
                    index !== informacion.length - 1
                      ? "sm:border-r sm:border-[#75B2D2]/50"
                      : ""
                  }
                `}
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
                  duration: 0.65,
                  delay: index * 0.12,
                  ease: "easeOut",
                }}
              >
                <motion.div
                  className="
                    mb-5
                    flex
                    h-[72px]
                    w-[72px]
                    items-center
                    justify-center
                    rounded-full
                    border
                    border-[#D2E8EF]/65
                    bg-[#08285B]
                    text-white
                    shadow-[0_12px_30px_rgba(8,40,91,0.3)]
                  "
                  whileHover={{
                    scale: 1.08,
                    y: -4,
                  }}
                  transition={{
                    duration: 0.25,
                  }}
                >
                  <Icono size={31} strokeWidth={1.4} />
                </motion.div>

                <p
                  className="
                    mb-3
                    text-[11px]
                    font-semibold
                    uppercase
                    tracking-[0.28em]
                    text-[#D2E8EF]
                  "
                >
                  {elemento.titulo}
                </p>

                <p
                  className={`
                    font-['Playfair_Display']
                    leading-relaxed
                    text-white
                    ${
                      elemento.id === "lugar"
                        ? "max-w-[270px] text-xl sm:text-[21px]"
                        : "text-2xl sm:text-[26px]"
                    }
                  `}
                >
                  {elemento.contenido}
                </p>
              </motion.div>
            );
          })}
        </div>

        {/* Dirección */}
        <motion.div
          className="
            mx-auto
            mt-7
            max-w-3xl
            border-t
            border-[#75B2D2]/45
            px-4
            pt-8
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
            duration: 0.7,
            delay: 0.25,
          }}
        >
          <p
            className="
              mx-auto
              max-w-2xl
              text-sm
              font-light
              leading-7
              text-white/80
              sm:text-base
              sm:leading-8
            "
          >
            {direccion}
          </p>
        </motion.div>

        {/* Botón */}
        <motion.a
          href={ubicacion}
          target="_blank"
          rel="noopener noreferrer"
          className="
            mx-auto
            mt-9
            inline-flex
            items-center
            justify-center
            gap-3
            rounded-full
            border
            border-white
            bg-[#D2E8EF]
            px-8
            py-4
            text-sm
            font-semibold
            uppercase
            tracking-[0.17em]
            text-[#08285B]
            shadow-[0_15px_35px_rgba(8,40,91,0.28)]
            transition
            duration-300
            hover:border-[#75B2D2]
            hover:bg-white
          "
          whileHover={{
            scale: 1.04,
            y: -3,
          }}
          whileTap={{
            scale: 0.97,
          }}
        >
          <Navigation size={18} strokeWidth={1.8} />
          Ver ubicación
        </motion.a>

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

export default Celebracion;