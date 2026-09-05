import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  FaChevronLeft,
  FaChevronRight,
} from "react-icons/fa";

const IMAGENES = [
  {
    src: "/Carrusel01v.jpeg",
    alt: "Momento de Areli y Héctor 1",
    position: "center 70%",
  },
  {
    src: "/Carrusel02.jpeg",
    alt: "Momento de Areli y Héctor 2",
    position: "center 20%",
  },
  {
    src: "/Carrusel03.jpeg",
    alt: "Momento de Areli y Héctor 3",
    position: "center 30%",
  },
  {
    src: "/Carrusel04.jpeg",
    alt: "Momento de Areli y Héctor 4",
    position: "50% 35%",
  },
  {
    src: "/Carrusel05.jpeg",
    alt: "Momento de Areli y Héctor 5",
    position: "center 70%",
  },
];

const Carousel = () => {
  const [indice, setIndice] = useState(0);
  const [imagenesCargadas, setImagenesCargadas] = useState(false);
  const [pausado, setPausado] = useState(false);

  /* Precarga todas las fotografías */
  useEffect(() => {
    let componenteActivo = true;

    const precargarImagenes = async () => {
      const cargas = IMAGENES.map(
        ({ src }) =>
          new Promise((resolve) => {
            const imagen = new Image();

            imagen.src = src;

            if (imagen.complete) {
              resolve();
              return;
            }

            imagen.onload = resolve;
            imagen.onerror = resolve;
          })
      );

      await Promise.all(cargas);

      if (componenteActivo) {
        setImagenesCargadas(true);
      }
    };

    precargarImagenes();

    return () => {
      componenteActivo = false;
    };
  }, []);

  /* Cambio automático */
  useEffect(() => {
    if (!imagenesCargadas || pausado) return;

    const intervalo = setInterval(() => {
      setIndice((indiceAnterior) => {
        return (indiceAnterior + 1) % IMAGENES.length;
      });
    }, 4500);

    return () => clearInterval(intervalo);
  }, [imagenesCargadas, pausado]);

  const siguienteImagen = () => {
    setIndice((indiceAnterior) => {
      return (indiceAnterior + 1) % IMAGENES.length;
    });
  };

  const imagenAnterior = () => {
    setIndice((indiceAnterior) => {
      return (
        (indiceAnterior - 1 + IMAGENES.length) %
        IMAGENES.length
      );
    });
  };

  const seleccionarImagen = (nuevoIndice) => {
    setIndice(nuevoIndice);
  };

  const formatearNumero = (numero) => {
    return String(numero).padStart(2, "0");
  };

  return (
    <section
      className="
        relative
        isolate
        w-full
        overflow-hidden
        bg-[#D2E8EF]
        px-4
        py-20
        sm:px-6
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
          opacity-55
          sm:-left-16
          sm:-top-28
          sm:w-64
          md:w-[360px]
        "
        initial={{
          opacity: 0,
          x: -35,
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
        src="/flor1.png"
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
          sm:-bottom-30
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
        <div className="mb-11 text-center sm:mb-14">
          <p
            className="
              mb-4
              text-[11px]
              font-semibold
              uppercase
              tracking-[0.35em]
              text-[#3196BA]
              sm:text-xs
            "
          >
            Nuestra historia
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
                bg-[#3196BA]
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
                text-[#08285B]
                sm:text-5xl
                md:text-6xl
              "
            >
              Momentos
            </h2>

            <span
              className="
                h-px
                w-10
                bg-[#3196BA]
                sm:w-20
                md:w-28
              "
            />
          </div>

          <p
            className="
              mx-auto
              mt-6
              max-w-xl
              font-['Playfair_Display']
              text-base
              italic
              leading-7
              text-black/65
              sm:text-lg
            "
          >
            Momentos que nos trajeron hasta aquí...
          </p>
        </div>

        <div
          className="
            mx-auto
            w-full
            max-w-4xl
          "
          onMouseEnter={() => setPausado(true)}
          onMouseLeave={() => setPausado(false)}
          onTouchStart={() => setPausado(true)}
          onTouchEnd={() => setPausado(false)}
        >
          {/* Marco fijo */}
          <div
            className="
              relative
              aspect-[4/5]
              w-full
              overflow-hidden
              rounded-[28px]
              border
              border-[#75B2D2]
              bg-[#08285B]
              shadow-[0_25px_65px_rgba(8,40,91,0.2)]
              sm:aspect-[4/3]
              sm:rounded-[36px]
              md:aspect-[4/3]
            "
          >
            {!imagenesCargadas && (
              <div
                className="
                  absolute
                  inset-0
                  z-20
                  flex
                  items-center
                  justify-center
                  bg-[#08285B]
                "
              >
                <div
                  className="
                    flex
                    flex-col
                    items-center
                    gap-4
                    text-white
                  "
                >
                  <span
                    className="
                      h-10
                      w-10
                      animate-spin
                      rounded-full
                      border-2
                      border-[#75B2D2]/40
                      border-t-white
                    "
                  />

                  <span
                    className="
                      text-xs
                      uppercase
                      tracking-[0.25em]
                    "
                  >
                    Cargando momentos
                  </span>
                </div>
              </div>
            )}

            {/*
             * Todas las imágenes están colocadas una encima de otra.
             * La propiedad objectPosition permite mover cada imagen.
             */}
            {IMAGENES.map((imagen, posicion) => (
              <motion.img
                key={imagen.src}
                src={imagen.src}
                alt={imagen.alt}
                draggable="false"
                className="
                  absolute
                  inset-0
                  h-full
                  w-full
                  select-none
                  object-cover
                "
                style={{
                  objectPosition: imagen.position,
                }}
                initial={false}
                animate={{
                  opacity:
                    imagenesCargadas && posicion === indice
                      ? 1
                      : 0,
                  scale: posicion === indice ? 1 : 1.03,
                }}
                transition={{
                  opacity: {
                    duration: 0.7,
                    ease: "easeInOut",
                  },
                  scale: {
                    duration: 1.1,
                    ease: "easeOut",
                  },
                }}
              />
            ))}

            {/* Oscurecimiento inferior */}
            <div
              className="
                pointer-events-none
                absolute
                inset-x-0
                bottom-0
                z-10
                h-28
                bg-gradient-to-t
                from-[#08285B]/50
                to-transparent
              "
            />

            {/* Contador de fotografías */}
            <div
              className="
                absolute
                bottom-5
                right-5
                z-10
                rounded-full
                border
                border-white/40
                bg-[#08285B]/75
                px-4
                py-2
                text-xs
                font-medium
                tracking-[0.15em]
                text-white
                backdrop-blur-md
              "
            >
              {formatearNumero(indice + 1)}

              <span className="mx-1.5 text-white/45">/</span>

              {formatearNumero(IMAGENES.length)}
            </div>
          </div>

          {/* Botones fuera de la imagen */}
          <div
            className="
              mt-7
              flex
              items-center
              justify-center
              gap-5
              sm:mt-8
              sm:gap-8
            "
          >
            <motion.button
              type="button"
              onClick={imagenAnterior}
              aria-label="Ver fotografía anterior"
              className="
                flex
                h-12
                w-12
                shrink-0
                items-center
                justify-center
                rounded-full
                border
                border-[#08285B]
                bg-[#08285B]
                text-white
                shadow-[0_10px_25px_rgba(8,40,91,0.2)]
                transition-colors
                duration-300
                hover:bg-[#245C9B]
                sm:h-14
                sm:w-14
              "
              whileHover={{
                scale: 1.08,
                x: -2,
              }}
              whileTap={{
                scale: 0.94,
              }}
            >
              <FaChevronLeft size={17} />
            </motion.button>

            {/* Indicadores */}
            <div
              className="
                flex
                min-w-0
                items-center
                justify-center
                gap-2
                sm:gap-3
              "
            >
              {IMAGENES.map((imagen, posicion) => (
                <motion.button
                  key={imagen.src}
                  type="button"
                  onClick={() => seleccionarImagen(posicion)}
                  aria-label={`Ver fotografía ${posicion + 1}`}
                  aria-current={
                    posicion === indice ? "true" : undefined
                  }
                  className="
                    h-2.5
                    rounded-full
                    border-0
                    p-0
                  "
                  animate={{
                    width: posicion === indice ? 34 : 10,
                    backgroundColor:
                      posicion === indice
                        ? "#08285B"
                        : "#75B2D2",
                  }}
                  transition={{
                    duration: 0.3,
                    ease: "easeOut",
                  }}
                />
              ))}
            </div>

            <motion.button
              type="button"
              onClick={siguienteImagen}
              aria-label="Ver siguiente fotografía"
              className="
                flex
                h-12
                w-12
                shrink-0
                items-center
                justify-center
                rounded-full
                border
                border-[#08285B]
                bg-[#08285B]
                text-white
                shadow-[0_10px_25px_rgba(8,40,91,0.2)]
                transition-colors
                duration-300
                hover:bg-[#245C9B]
                sm:h-14
                sm:w-14
              "
              whileHover={{
                scale: 1.08,
                x: 2,
              }}
              whileTap={{
                scale: 0.94,
              }}
            >
              <FaChevronRight size={17} />
            </motion.button>
          </div>
        </div>

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
          <span className="h-px w-12 bg-[#3196BA] sm:w-20" />

          <span
            className="
              h-2
              w-2
              rotate-45
              border
              border-[#08285B]
            "
          />

          <span className="h-px w-12 bg-[#3196BA] sm:w-20" />
        </div>
      </motion.div>
    </section>
  );
};

export default Carousel;