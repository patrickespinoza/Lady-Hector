import React, { useState } from "react";
import { motion } from "framer-motion";

const Confirmacion = () => {
  const [nombreInvitado, setNombreInvitado] = useState("");
  const [mensajeInvitado, setMensajeInvitado] = useState("");
  const [asistencia, setAsistencia] = useState("");
  const [invitados, setInvitados] = useState("");
  const [error, setError] = useState("");
  const [enviando, setEnviando] = useState(false);
  const [enviado, setEnviado] = useState(false);

  const enviarConfirmacion = async () => {
    if (!nombreInvitado.trim() || !asistencia) {
      setError("Completa tu nombre y confirma tu asistencia.");
      return;
    }

    setError("");
    setEnviando(true);
    setEnviado(false);

    const data = {
      nombre: nombreInvitado,
      asistencia,
      invitados,
      mensaje: mensajeInvitado,
    };

    try {
      await fetch(
        "https://script.google.com/macros/s/AKfycbxklU9PTlqxkcu9pBUfWYhByQZ_7kJWuFENeeQhlEW-C6eh2cVbTK3z2AbMJiWVL1ME/exec",
        {
          method: "POST",
          body: JSON.stringify(data),
        }
      );

      setEnviado(true);

      setNombreInvitado("");
      setMensajeInvitado("");
      setAsistencia("");
      setInvitados("");

      setTimeout(() => {
        setEnviado(false);
      }, 4000);
    } catch (error) {
      console.error("Error:", error);
      setError("Hubo un error al enviar. Intenta nuevamente.");
    } finally {
      setEnviando(false);
    }
  };

  return (
    <section className="w-full bg-[#4A141D] py-24 px-5 overflow-hidden">
      <motion.div
        initial={{ opacity: 0, y: 55 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, ease: "easeOut" }}
        viewport={{ once: true }}
        className="
          max-w-5xl
          mx-auto
          bg-[#F4E8DD]
          rounded-tl-[4rem]
          rounded-br-[4rem]
          rounded-tr-2xl
          rounded-bl-2xl
          overflow-hidden
          shadow-[0_30px_80px_rgba(0,0,0,.35)]
          border
          border-[#B88A8A]/40
        "
      >
        <div className="grid lg:grid-cols-2">
          <div className="relative min-h-[380px] lg:min-h-full overflow-hidden">
            <img
              src="/finalboda.webp"
              alt="Confirmación de asistencia"
              className="absolute inset-0 w-full h-full object-cover"
            />

            <div className="absolute inset-0 bg-gradient-to-t from-[#4A141D]/60 via-transparent to-transparent"></div>

            <div className="absolute bottom-8 left-8 right-8 text-white">
              <p className="font-cursiveDancing text-5xl">
                ¡Te esperamos!
              </p>
              <div className="w-20 h-px bg-[#F4E8DD] mt-5"></div>
            </div>
          </div>

          <div className="px-7 py-12 sm:px-12 sm:py-16">
            <p className="uppercase tracking-[0.35em] text-[#B88A8A] text-xs sm:text-sm font-semibold">
              RSVP
            </p>

            <h2 className="font-playfair text-[#4A141D] text-4xl sm:text-5xl mt-4 leading-tight">
              Confirmar Asistencia
            </h2>

            <p className="mt-5 text-[#4A141D]/70 leading-7">
              Por favor confirma tu asistencia. Nos encantará compartir este día tan especial contigo.
            </p>

            <div className="w-24 h-px bg-[#B88A8A] my-8"></div>

            <div className="space-y-5">
              <input
                type="text"
                placeholder="Nombre y apellido"
                value={nombreInvitado}
                onChange={(e) => setNombreInvitado(e.target.value)}
                className="
                  w-full
                  bg-white/80
                  border
                  border-[#B88A8A]/40
                  rounded-2xl
                  px-5
                  py-4
                  text-[#4A141D]
                  placeholder:text-[#4A141D]/45
                  outline-none
                  focus:ring-2
                  focus:ring-[#4A141D]/40
                "
              />

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <button
                  type="button"
                  onClick={() => setAsistencia("Sí asistiré")}
                  className={`
                    py-4 rounded-2xl border transition duration-300 font-playfair
                    ${
                      asistencia === "Sí asistiré"
                        ? "bg-[#4A141D] text-[#F4E8DD] border-[#4A141D]"
                        : "bg-white/70 text-[#4A141D] border-[#B88A8A]/40 hover:bg-white"
                    }
                  `}
                >
                  Sí asistiré
                </button>

                <button
                  type="button"
                  onClick={() => setAsistencia("No podré asistir")}
                  className={`
                    py-4 rounded-2xl border transition duration-300 font-playfair
                    ${
                      asistencia === "No podré asistir"
                        ? "bg-[#4A141D] text-[#F4E8DD] border-[#4A141D]"
                        : "bg-white/70 text-[#4A141D] border-[#B88A8A]/40 hover:bg-white"
                    }
                  `}
                >
                  No asistiré
                </button>
              </div>

              <input
                type="number"
                min="1"
                placeholder="Número de invitados"
                value={invitados}
                onChange={(e) => setInvitados(e.target.value)}
                className="
                  w-full
                  bg-white/80
                  border
                  border-[#B88A8A]/40
                  rounded-2xl
                  px-5
                  py-4
                  text-[#4A141D]
                  placeholder:text-[#4A141D]/45
                  outline-none
                  focus:ring-2
                  focus:ring-[#4A141D]/40
                "
              />

              <textarea
                placeholder="Mensaje para los novios"
                value={mensajeInvitado}
                onChange={(e) => setMensajeInvitado(e.target.value)}
                rows="4"
                className="
                  w-full
                  bg-white/80
                  border
                  border-[#B88A8A]/40
                  rounded-2xl
                  px-5
                  py-4
                  text-[#4A141D]
                  placeholder:text-[#4A141D]/45
                  outline-none
                  resize-none
                  focus:ring-2
                  focus:ring-[#4A141D]/40
                "
              />

              {error && (
                <p className="text-[#4A141D] bg-[#B88A8A]/20 border border-[#B88A8A]/40 rounded-xl px-4 py-3 text-sm">
                  {error}
                </p>
              )}

              {enviado && (
                <p className="text-[#4A141D] bg-white/70 border border-[#B88A8A]/40 rounded-xl px-4 py-3 text-sm">
                  Confirmación enviada correctamente.
                </p>
              )}

              <button
                type="button"
                onClick={enviarConfirmacion}
                disabled={enviando}
                className="
                  w-full
                  bg-[#4A141D]
                  text-[#F4E8DD]
                  py-4
                  rounded-full
                  font-playfair
                  text-lg
                  shadow-[0_18px_40px_rgba(74,20,29,.35)]
                  hover:bg-[#6B1F2A]
                  hover:scale-[1.02]
                  transition
                  duration-300
                  disabled:opacity-60
                  disabled:cursor-not-allowed
                "
              >
                {enviando ? "Enviando..." : "Enviar Confirmación"}
              </button>
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
};

export default Confirmacion;