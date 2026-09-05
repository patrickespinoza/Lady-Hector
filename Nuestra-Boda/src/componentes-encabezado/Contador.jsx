import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";

const Contador = ({
  titulo = "¡Estás invitado!",
  texto = "Nos encantaría que seas parte de este momento tan especial para nosotros.",
  frase = "¡Falta poco!",
  fecha = "2027-07-11T00:00:00",
}) => {
  const calculateTime = () => {
    const difference = +new Date(fecha) - +new Date();

    if (difference > 0) {
      return {
        Días: Math.floor(difference / (1000 * 60 * 60 * 24)),
        Horas: Math.floor((difference / (1000 * 60 * 60)) % 24),
        Minutos: Math.floor((difference / 1000 / 60) % 60),
        Segundos: Math.floor((difference / 1000) % 60),
      };
    }

    return {};
  };

  const [timeLeft, setTimeLeft] = useState(calculateTime());

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTime());
    }, 1000);

    return () => clearInterval(timer);
  }, [fecha]);

  return (
    <section className="relative overflow-hidden bg-[#4A141D] py-24 px-6">

      {/* Decoración */}
      <div className="absolute -top-36 -left-24 w-[450px] h-[450px] bg-[#B88A8A]/20 rounded-full blur-3xl"></div>

      <div className="absolute -bottom-40 -right-24 w-[380px] h-[380px] bg-[#F4E8DD]/10 rounded-full blur-3xl"></div>

      <div className="relative max-w-6xl mx-auto">

        <motion.div
          initial={{ opacity: 0, y: 35 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <h2 className="font-cursiveDancing text-[#F4E8DD] text-5xl sm:text-6xl md:text-7xl">
            {titulo}
          </h2>

          <p className="mt-8 text-[#F8F2ED] text-lg sm:text-2xl md:text-3xl font-playfair max-w-3xl mx-auto leading-relaxed">
            {texto}
          </p>

          <div className="w-24 h-[2px] bg-[#B88A8A] mx-auto my-10"></div>

          <p className="font-playfair italic text-[#F4E8DD] text-2xl sm:text-3xl">
            {frase}
          </p>
        </motion.div>

        {/* CONTADOR */}

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9 }}
          viewport={{ once: true }}
          className="
            mt-16
            max-w-4xl
            mx-auto
            bg-[#F4E8DD]
            rounded-[2rem]
            shadow-[0_25px_70px_rgba(0,0,0,.35)]
            p-8
          "
        >

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">

            {Object.keys(timeLeft).map((item) => (

              <motion.div
                key={item}
                whileHover={{ y: -5, scale: 1.04 }}
                className="flex flex-col items-center"
              >

                <div
                  className="
                    w-20
                    h-20
                    sm:w-24
                    sm:h-24
                    rounded-full
                    bg-[#4A141D]
                    text-[#F4E8DD]
                    flex
                    items-center
                    justify-center
                    text-3xl
                    sm:text-4xl
                    font-bold
                    shadow-xl
                  "
                >
                  {timeLeft[item]}
                </div>

                <span className="mt-4 uppercase tracking-[0.18em] text-[#4A141D] text-sm font-semibold">
                  {item}
                </span>

              </motion.div>

            ))}

          </div>

        </motion.div>

      </div>

    </section>
  );
};

export default Contador;