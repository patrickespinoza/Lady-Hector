"use client";

import React, { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Music, Pause, Play, Volume2, VolumeX, X } from "lucide-react";

const COLORES = {
  azulMarino: "#08285B",
  azulMedio: "#245C9B",
  azulTurquesa: "#3196BA",
  blanco: "#FFFFFF",
  negro: "#000000",
};

const Musica = () => {
  const audioRef = useRef(null);

  const [mostrarModal, setMostrarModal] = useState(true);
  const [reproduciendo, setReproduciendo] = useState(false);
  const [silenciado, setSilenciado] = useState(false);
  const [cargando, setCargando] = useState(false);

  useEffect(() => {
    const audio = audioRef.current;

    if (!audio) return;

    audio.volume = 0.45;

    const detenerCarga = () => {
      setCargando(false);
    };

    const detectarReproduccion = () => {
      setReproduciendo(true);
      setCargando(false);
    };

    const detectarPausa = () => {
      setReproduciendo(false);
      setCargando(false);
    };

    const detectarFinal = () => {
      setReproduciendo(false);
      setCargando(false);
    };

    audio.addEventListener("playing", detectarReproduccion);
    audio.addEventListener("pause", detectarPausa);
    audio.addEventListener("canplay", detenerCarga);
    audio.addEventListener("ended", detectarFinal);
    audio.addEventListener("error", detenerCarga);

    return () => {
      audio.removeEventListener("playing", detectarReproduccion);
      audio.removeEventListener("pause", detectarPausa);
      audio.removeEventListener("canplay", detenerCarga);
      audio.removeEventListener("ended", detectarFinal);
      audio.removeEventListener("error", detenerCarga);
    };
  }, []);

  const reproducirMusica = async () => {
    const audio = audioRef.current;

    if (!audio) return;

    try {
      setCargando(true);

      audio.muted = false;
      setSilenciado(false);

      await audio.play();

      setReproduciendo(true);
      setMostrarModal(false);
    } catch (error) {
      console.error("No se pudo reproducir la música:", error);

      setCargando(false);
      setMostrarModal(false);
    }
  };

  const continuarSinMusica = () => {
    const audio = audioRef.current;

    if (audio) {
      audio.pause();
      audio.currentTime = 0;
    }

    setCargando(false);
    setReproduciendo(false);
    setMostrarModal(false);
  };

  const alternarReproduccion = async () => {
    const audio = audioRef.current;

    if (!audio || cargando) return;

    if (audio.paused) {
      try {
        setCargando(true);
        await audio.play();
      } catch (error) {
        console.error("No se pudo reproducir la música:", error);
        setCargando(false);
      }
    } else {
      audio.pause();
    }
  };

  const alternarSilencio = () => {
    const audio = audioRef.current;

    if (!audio) return;

    audio.muted = !audio.muted;
    setSilenciado(audio.muted);
  };

  return (
    <>
      <audio
        ref={audioRef}
        src="/musica.mp3"
        loop
        preload="auto"
      />

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
              bg-black/75
              px-5
              py-8
              backdrop-blur-md
            "
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
          >
            <motion.div
              className="
                relative
                w-full
                max-w-[430px]
                overflow-hidden
                rounded-[34px]
                border
                border-white/20
                bg-[#08285B]
                px-7
                pb-9
                pt-11
                text-center
                shadow-[0_30px_90px_rgba(0,0,0,0.45)]
                sm:px-10
                sm:pb-11
                sm:pt-12
              "
              initial={{
                opacity: 0,
                y: 35,
                scale: 0.94,
              }}
              animate={{
                opacity: 1,
                y: 0,
                scale: 1,
              }}
              exit={{
                opacity: 0,
                y: 20,
                scale: 0.96,
              }}
              transition={{
                duration: 0.55,
                ease: "easeOut",
              }}
            >
              {/* Decoración superior sin imágenes */}
              <div
                className="
                  pointer-events-none
                  absolute
                  -right-14
                  -top-14
                  h-40
                  w-40
                  rounded-full
                  border
                  border-white/10
                  bg-[#3196BA]/30
                "
              />

              <div
                className="
                  pointer-events-none
                  absolute
                  -left-12
                  bottom-10
                  h-28
                  w-28
                  rounded-full
                  border
                  border-white/10
                  bg-[#245C9B]/35
                "
              />

              <button
                type="button"
                onClick={continuarSinMusica}
                aria-label="Cerrar ventana de música"
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
                  duration-300
                  hover:scale-105
                  hover:bg-white
                  hover:text-[#08285B]
                "
              >
                <X size={18} strokeWidth={1.7} />
              </button>

              <div className="relative z-[1]">
                <motion.div
                  className="
                    relative
                    mx-auto
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
                    shadow-[0_15px_40px_rgba(49,150,186,0.32)]
                  "
                  animate={{
                    rotate: reproduciendo ? 360 : 0,
                  }}
                  transition={{
                    duration: 8,
                    repeat: reproduciendo ? Infinity : 0,
                    ease: "linear",
                  }}
                >
                  <div
                    className="
                      absolute
                      inset-[8px]
                      rounded-full
                      border
                      border-white/15
                    "
                  />

                  <Music
                    size={35}
                    strokeWidth={1.5}
                    className="relative z-10"
                  />
                </motion.div>

                <div
                  className="
                    mx-auto
                    mb-5
                    flex
                    items-center
                    justify-center
                    gap-3
                  "
                >
                  <span className="h-px w-10 bg-[#3196BA]" />
                  <span className="h-1.5 w-1.5 rotate-45 bg-white" />
                  <span className="h-px w-10 bg-[#3196BA]" />
                </div>

                <p
                  className="
                    mb-3
                    text-[11px]
                    font-medium
                    uppercase
                    tracking-[0.34em]
                    text-[#3196BA]
                  "
                >
                  Una experiencia especial
                </p>

                <h2
                  className="
                    mb-4
                    font-['Playfair_Display']
                    text-[32px]
                    font-normal
                    leading-tight
                    text-white
                    sm:text-[38px]
                  "
                >
                  Música para acompañarte
                </h2>

                <p
                  className="
                    mx-auto
                    mb-8
                    max-w-[320px]
                    text-sm
                    font-light
                    leading-7
                    text-white/75
                  "
                >
                  Hemos preparado una canción especial para acompañarte durante
                  esta invitación.
                </p>

                <div className="flex flex-col gap-3">
                  <button
                    type="button"
                    onClick={reproducirMusica}
                    disabled={cargando}
                    className="
                      flex
                      w-full
                      items-center
                      justify-center
                      gap-3
                      rounded-full
                      border
                      border-[#3196BA]
                      bg-[#3196BA]
                      px-6
                      py-4
                      text-sm
                      font-medium
                      uppercase
                      tracking-[0.16em]
                      text-white
                      shadow-[0_12px_28px_rgba(49,150,186,0.24)]
                      transition
                      duration-300
                      hover:-translate-y-0.5
                      hover:bg-[#245C9B]
                      disabled:cursor-not-allowed
                      disabled:opacity-65
                    "
                  >
                    {cargando ? (
                      <>
                        <span
                          className="
                            h-4
                            w-4
                            animate-spin
                            rounded-full
                            border-2
                            border-white/40
                            border-t-white
                          "
                        />

                        <span>Cargando</span>
                      </>
                    ) : (
                      <>
                        <Play size={17} fill="currentColor" />
                        <span>Escuchar música</span>
                      </>
                    )}
                  </button>

                  <button
                    type="button"
                    onClick={continuarSinMusica}
                    className="
                      w-full
                      rounded-full
                      border
                      border-white/35
                      bg-transparent
                      px-6
                      py-4
                      text-sm
                      font-medium
                      uppercase
                      tracking-[0.14em]
                      text-white
                      transition
                      duration-300
                      hover:border-white
                      hover:bg-white
                      hover:text-[#08285B]
                    "
                  >
                    Continuar sin música
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {!mostrarModal && (
          <motion.div
            className="
              fixed
              bottom-5
              right-5
              z-[9998]
              flex
              items-center
              gap-1
              rounded-full
              border
              border-white/25
              bg-[#08285B]/95
              p-2
              shadow-[0_14px_40px_rgba(0,0,0,0.3)]
              backdrop-blur-md
            "
            initial={{
              opacity: 0,
              y: 25,
              scale: 0.9,
            }}
            animate={{
              opacity: 1,
              y: 0,
              scale: 1,
            }}
            exit={{
              opacity: 0,
              y: 15,
              scale: 0.95,
            }}
            transition={{
              duration: 0.45,
              ease: "easeOut",
            }}
          >
            <button
              type="button"
              onClick={alternarReproduccion}
              disabled={cargando}
              aria-label={
                reproduciendo ? "Pausar música" : "Reproducir música"
              }
              className="
                flex
                h-11
                w-11
                items-center
                justify-center
                rounded-full
                bg-[#3196BA]
                text-white
                transition
                duration-300
                hover:scale-105
                hover:bg-[#245C9B]
                disabled:cursor-not-allowed
                disabled:opacity-70
              "
            >
              {cargando ? (
                <span
                  className="
                    h-4
                    w-4
                    animate-spin
                    rounded-full
                    border-2
                    border-white/40
                    border-t-white
                  "
                />
              ) : reproduciendo ? (
                <Pause size={18} fill="currentColor" />
              ) : (
                <Play size={18} fill="currentColor" />
              )}
            </button>

            <button
              type="button"
              onClick={alternarSilencio}
              aria-label={silenciado ? "Activar sonido" : "Silenciar música"}
              className="
                flex
                h-10
                w-10
                items-center
                justify-center
                rounded-full
                text-white
                transition
                duration-300
                hover:bg-white/15
              "
            >
              {silenciado ? (
                <VolumeX size={19} strokeWidth={1.8} />
              ) : (
                <Volume2 size={19} strokeWidth={1.8} />
              )}
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Musica;