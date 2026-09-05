"use client";

import React, { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Music, Pause, Play, Volume2, VolumeX, X } from "lucide-react";

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
    };

    audio.addEventListener("playing", detectarReproduccion);
    audio.addEventListener("pause", detectarPausa);
    audio.addEventListener("canplay", detenerCarga);
    audio.addEventListener("error", detenerCarga);

    return () => {
      audio.removeEventListener("playing", detectarReproduccion);
      audio.removeEventListener("pause", detectarPausa);
      audio.removeEventListener("canplay", detenerCarga);
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

    setReproduciendo(false);
    setMostrarModal(false);
  };

  const alternarReproduccion = async () => {
    const audio = audioRef.current;

    if (!audio) return;

    if (audio.paused) {
      try {
        setCargando(true);
        await audio.play();
        setReproduciendo(true);
      } catch (error) {
        console.error("No se pudo reproducir la música:", error);
        setCargando(false);
      }
    } else {
      audio.pause();
      setReproduciendo(false);
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
              bg-black/65
              px-5
              backdrop-blur-sm
            "
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="
                relative
                w-full
                max-w-[420px]
                overflow-hidden
                rounded-tl-[42px]
                rounded-br-[42px]
                border
                border-[#b89b5e]/40
                bg-[#f8f5ef]
                px-7
                py-10
                text-center
                shadow-[0_25px_70px_rgba(0,0,0,0.35)]
                sm:px-10
                sm:py-12
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
              <button
                type="button"
                onClick={continuarSinMusica}
                aria-label="Cerrar ventana de música"
                className="
                  absolute
                  right-5
                  top-5
                  flex
                  h-9
                  w-9
                  items-center
                  justify-center
                  rounded-full
                  border
                  border-[#b89b5e]/30
                  bg-white/70
                  text-[#5e6650]
                  transition
                  hover:scale-105
                  hover:bg-white
                "
              >
                <X size={17} />
              </button>

              <motion.div
                className="
                  mx-auto
                  mb-6
                  flex
                  h-20
                  w-20
                  items-center
                  justify-center
                  rounded-full
                  border
                  border-[#b89b5e]/35
                  bg-white
                  text-[#b89b5e]
                  shadow-[0_10px_30px_rgba(184,155,94,0.18)]
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
                <Music size={31} strokeWidth={1.5} />
              </motion.div>

              <p
                className="
                  mb-3
                  text-xs
                  uppercase
                  tracking-[0.32em]
                  text-[#b89b5e]
                "
              >
                Una experiencia especial
              </p>

              <h2
                className="
                  mb-4
                  font-['Playfair_Display']
                  text-3xl
                  font-medium
                  text-[#5e6650]
                  sm:text-4xl
                "
              >
                Música para acompañarte
              </h2>

              <p
                className="
                  mx-auto
                  mb-8
                  max-w-[310px]
                  text-sm
                  leading-7
                  text-[#5e6650]/75
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
                    bg-[#5e6650]
                    px-6
                    py-4
                    text-sm
                    uppercase
                    tracking-[0.16em]
                    text-white
                    transition
                    hover:-translate-y-0.5
                    hover:bg-[#4f5744]
                    disabled:cursor-not-allowed
                    disabled:opacity-70
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
                      Cargando
                    </>
                  ) : (
                    <>
                      <Play size={17} fill="currentColor" />
                      Escuchar música
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
                    border-[#b89b5e]/45
                    bg-transparent
                    px-6
                    py-4
                    text-sm
                    uppercase
                    tracking-[0.14em]
                    text-[#5e6650]
                    transition
                    hover:bg-white
                  "
                >
                  Continuar sin música
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {!mostrarModal && (
        <motion.div
          className="
            fixed
            bottom-5
            right-5
            z-[9998]
            flex
            items-center
            gap-2
            rounded-full
            border
            border-[#b89b5e]/35
            bg-[#f8f5ef]/95
            p-2
            shadow-[0_12px_35px_rgba(0,0,0,0.18)]
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
          transition={{
            duration: 0.45,
          }}
        >
          <button
            type="button"
            onClick={alternarReproduccion}
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
              bg-[#5e6650]
              text-white
              transition
              hover:scale-105
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
              text-[#b89b5e]
              transition
              hover:bg-white
            "
          >
            {silenciado ? (
              <VolumeX size={19} />
            ) : (
              <Volume2 size={19} />
            )}
          </button>
        </motion.div>
      )}
    </>
  );
};

export default Musica;