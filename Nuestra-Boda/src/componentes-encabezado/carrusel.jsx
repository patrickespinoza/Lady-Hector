import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

const Carousel = () => {
  const images = [
    "/carrusel01.jpeg",
    "/carusel02.jpeg",
    "/carusel03.jpeg",
    "/carusel04.jpeg",
    "/carusel05.jpeg",
  ];

  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % images.length);
    }, 4500);

    return () => clearInterval(interval);
  }, []);

  const nextImage = () => {
    setIndex((prev) => (prev + 1) % images.length);
  };

  const prevImage = () => {
    setIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  return (
    <section className="w-full bg-[#F4E8DD] py-20 px-5 overflow-hidden">
      <motion.div
        initial={{ opacity: 0, y: 60 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: .9 }}
        viewport={{ once: true }}
        className="max-w-6xl mx-auto"
      >
        <div className="text-center mb-12">

          <p className="uppercase tracking-[.35em] text-[#B88A8A] text-sm font-semibold">
            Nuestra Historia
          </p>

          <h2 className="font-playfair text-[#4A141D] text-5xl mt-4">
            Momentos
          </h2>

          <div className="w-24 h-px bg-[#B88A8A] mx-auto mt-6"></div>

        </div>

        <div
          className="
            relative
            max-w-4xl
            mx-auto
            rounded-[2.5rem]
            overflow-hidden
            bg-white
            shadow-[0_25px_70px_rgba(74,20,29,.18)]
            border
            border-[#B88A8A]/30
          "
        >
          <AnimatePresence mode="wait">
            <motion.img
              key={index}
              src={images[index]}
              alt=""
              initial={{ opacity: 0, scale: 1.08 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: .8 }}
              className="
                w-full
                h-[420px]
                sm:h-[550px]
                md:h-[650px]
                object-cover
              "
            />
          </AnimatePresence>

          {/* Botón izquierda */}

          <button
            onClick={prevImage}
            className="
              absolute
              left-5
              top-1/2
              -translate-y-1/2
              w-12
              h-12
              rounded-full
              bg-[#4A141D]/90
              text-white
              flex
              items-center
              justify-center
              hover:scale-110
              transition
            "
          >
            <FaChevronLeft size={20} />
          </button>

          {/* Botón derecha */}

          <button
            onClick={nextImage}
            className="
              absolute
              right-5
              top-1/2
              -translate-y-1/2
              w-12
              h-12
              rounded-full
              bg-[#4A141D]/90
              text-white
              flex
              items-center
              justify-center
              hover:scale-110
              transition
            "
          >
            <FaChevronLeft size={20} />
          </button>

          {/* Indicadores */}

          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-3">
            {images.map((_, i) => (
              <motion.div
                key={i}
                animate={{
                  width: index === i ? 34 : 10,
                  backgroundColor:
                    index === i ? "#4A141D" : "#B88A8A",
                }}
                transition={{ duration: .3 }}
                className="h-2 rounded-full"
              />
            ))}
          </div>
        </div>
      </motion.div>
    </section>
  );
};

export default Carousel;