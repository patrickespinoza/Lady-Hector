import React, { useMemo, useState } from "react";
import { motion } from "framer-motion";
import {
  Check,
  Copy,
  Link2,
  LockKeyhole,
  RefreshCw,
  Send,
  User,
  Users,
} from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";

/*
 * Debe ser exactamente la misma clave utilizada
 * dentro del componente Confirmacion.jsx.
 */
const CLAVE_INVITACION =
  "ARELI-HECTOR-WEDLY-2027-CLAVE-PRIVADA";

/* =========================================
   UTILIDADES DE ENCRIPTACIÓN
========================================= */

const bytesABase64Url = (bytes) => {
  const binario = Array.from(bytes)
    .map((byte) => String.fromCharCode(byte))
    .join("");

  return window
    .btoa(binario)
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=+$/g, "");
};

const obtenerClaveAES = async () => {
  const codificador = new TextEncoder();

  const hash = await window.crypto.subtle.digest(
    "SHA-256",
    codificador.encode(CLAVE_INVITACION)
  );

  return window.crypto.subtle.importKey(
    "raw",
    hash,
    {
      name: "AES-GCM",
    },
    false,
    ["encrypt"]
  );
};

const encriptarInvitacion = async (nombre, pases) => {
  const clave = await obtenerClaveAES();

  /*
   * Cada enlace recibe un IV diferente para que dos
   * invitaciones con los mismos datos no produzcan
   * exactamente el mismo código.
   */
  const iv = window.crypto.getRandomValues(
    new Uint8Array(12)
  );

  const datos = JSON.stringify({
    nombre: nombre.trim(),
    pases: Number(pases),
  });

  const datosEncriptados =
    await window.crypto.subtle.encrypt(
      {
        name: "AES-GCM",
        iv,
      },
      clave,
      new TextEncoder().encode(datos)
    );

  const resultado = new Uint8Array(
    iv.length + datosEncriptados.byteLength
  );

  resultado.set(iv, 0);

  resultado.set(
    new Uint8Array(datosEncriptados),
    iv.length
  );

  return bytesABase64Url(resultado);
};

/* =========================================
   COMPONENTE
========================================= */

const Generador = ({
  imagenPortada = "/portada.jpg",
}) => {
  const [nombre, setNombre] = useState("");
  const [numeroPases, setNumeroPases] = useState("");

  const [enlaceGenerado, setEnlaceGenerado] =
    useState("");

  const [error, setError] = useState("");
  const [generando, setGenerando] = useState(false);

  const [copiado, setCopiado] = useState("");

  const mensajeWhatsApp = useMemo(() => {
    if (!enlaceGenerado) return "";

    const pases = Number(numeroPases);

    return [
      `Hola, ${nombre.trim()} 💙`,
      "",
      "Tenemos el gusto de invitarte a celebrar nuestra boda.",
      "",
      `Tu invitación incluye ${pases} ${
        pases === 1 ? "pase" : "pases"
      }.`,
      "",
      "Puedes consultar todos los detalles y confirmar tu asistencia en el siguiente enlace:",
      "",
      enlaceGenerado,
      "",
      "Con cariño,",
      "Lady & Héctor",
    ].join("\n");
  }, [enlaceGenerado, nombre, numeroPases]);

  const generarEnlace = async () => {
    const nombreLimpio = nombre.trim();
    const pases = Number(numeroPases);

    if (!nombreLimpio) {
      setError("Escribe el nombre del invitado.");
      return;
    }

    if (
      !Number.isInteger(pases) ||
      pases < 1
    ) {
      setError(
        "Ingresa un número de pases válido."
      );
      return;
    }

    if (!window.crypto?.subtle) {
      setError(
        "Este navegador no permite generar enlaces encriptados."
      );
      return;
    }

    setError("");
    setGenerando(true);
    setCopiado("");
    setEnlaceGenerado("");

    try {
      const id = await encriptarInvitacion(
        nombreLimpio,
        pases
      );

      /*
       * Genera el enlace hacia la página principal.
       * Aunque el generador esté en /generador,
       * la invitación se abrirá desde la raíz.
       */
      const urlBase = `${window.location.origin}/}`;

      const enlace =
        `${urlBase}/?id=${encodeURIComponent(id)}`;

      setEnlaceGenerado(enlace);
    } catch (error) {
      console.error(
        "No se pudo generar la invitación:",
        error
      );

      setError(
        "No fue posible generar el enlace. Intenta nuevamente."
      );
    } finally {
      setGenerando(false);
    }
  };

  const copiarTexto = async (texto, tipo) => {
    if (!texto) return;

    try {
      await navigator.clipboard.writeText(texto);

      setCopiado(tipo);

      setTimeout(() => {
        setCopiado("");
      }, 2000);
    } catch (error) {
      console.error(
        "No se pudo copiar el contenido:",
        error
      );

      setError(
        "No fue posible copiar automáticamente."
      );
    }
  };

  const limpiarGenerador = () => {
    setNombre("");
    setNumeroPases("");
    setEnlaceGenerado("");
    setError("");
    setCopiado("");
  };

  const abrirWhatsApp = () => {
    if (!mensajeWhatsApp) return;

    const enlaceWhatsApp =
      `https://wa.me/?text=${encodeURIComponent(
        mensajeWhatsApp
      )}`;

    window.open(
      enlaceWhatsApp,
      "_blank",
      "noopener,noreferrer"
    );
  };

  return (
    <main
      className="
        relative
        isolate
        min-h-screen
        overflow-hidden
        bg-[#D2E8EF]
        px-4
        py-10
        sm:px-6
        sm:py-14
        lg:px-8
      "
    >
      {/* Flores decorativas */}
      <img
        src="/flor-azul-02.png"
        alt=""
        aria-hidden="true"
        className="
          pointer-events-none
          absolute
          -left-20
          -top-24
          z-0
          w-64
          select-none
          opacity-50
          sm:w-80
          lg:w-[390px]
        "
      />

      <img
        src="/flor-azul-01.png"
        alt=""
        aria-hidden="true"
        className="
          pointer-events-none
          absolute
          -bottom-36
          -right-28
          z-0
          w-80
          select-none
          opacity-45
          sm:w-[420px]
          lg:w-[500px]
        "
      />

      <motion.section
        className="
          relative
          z-10
          mx-auto
          grid
          w-full
          max-w-6xl
          overflow-hidden
          rounded-[32px]
          border
          border-[#75B2D2]
          bg-white/85
          shadow-[0_30px_80px_rgba(8,40,91,0.2)]
          backdrop-blur-md
          lg:grid-cols-[0.9fr_1.1fr]
          lg:rounded-[42px]
        "
        initial={{
          opacity: 0,
          y: 40,
          scale: 0.98,
        }}
        animate={{
          opacity: 1,
          y: 0,
          scale: 1,
        }}
        transition={{
          duration: 0.8,
          ease: [0.22, 1, 0.36, 1],
        }}
      >
        {/* Portada de los novios */}
        <div
          className="
            relative
            min-h-[390px]
            overflow-hidden
            bg-[#08285B]
            sm:min-h-[500px]
            lg:min-h-full
          "
        >
          <motion.img
            src={imagenPortada}
            alt="Lady y Héctor"
            className="
              absolute
              inset-0
              h-full
              w-full
              object-cover
              object-center
            "
            initial={{
              scale: 1.08,
            }}
            animate={{
              scale: 1,
            }}
            transition={{
              duration: 1.5,
              ease: "easeOut",
            }}
          />

          <div
            className="
              absolute
              inset-0
              bg-gradient-to-t
              from-[#08285B]
              via-[#08285B]/35
              to-[#08285B]/10
            "
          />

          <div
            className="
              absolute
              inset-x-0
              bottom-0
              z-10
              px-6
              pb-9
              text-center
              text-white
              sm:px-10
              sm:pb-12
            "
          >
            <p
              className="
                text-[11px]
                font-semibold
                uppercase
                tracking-[0.4em]
                text-[#D2E8EF]
              "
            >
              Nos casamos
            </p>

            <h1
              className="
                mt-4
                font-['Playfair_Display']
                text-5xl
                font-normal
                leading-tight
                sm:text-6xl
                lg:text-7xl
              "
            >
              Lady
              <span
                className="
                  mx-3
                  font-['Cedarville_Cursive']
                  text-[#75B2D2]
                "
              >
                &
              </span>
              Héctor
            </h1>

            <div
              className="
                mx-auto
                mt-6
                flex
                items-center
                justify-center
                gap-3
              "
            >
              <span className="h-px w-14 bg-[#75B2D2]" />

              <span
                className="
                  h-2
                  w-2
                  rotate-45
                  border
                  border-white
                "
              />

              <span className="h-px w-14 bg-[#75B2D2]" />
            </div>

            <p
              className="
                mt-6
                text-sm
                tracking-[0.16em]
                text-white/80
              "
            >
              Generador de invitaciones
            </p>
          </div>
        </div>

        {/* Panel del generador */}
        <div
          className="
            px-5
            py-9
            sm:px-9
            sm:py-12
            lg:px-12
            lg:py-14
          "
        >
          <div className="text-center lg:text-left">
            <div
              className="
                flex
                items-center
                justify-center
                gap-3
                text-[#3196BA]
                lg:justify-start
              "
            >
              <LockKeyhole size={18} />

              <p
                className="
                  text-[11px]
                  font-semibold
                  uppercase
                  tracking-[0.32em]
                "
              >
                Enlace protegido
              </p>
            </div>

            <h2
              className="
                mt-4
                font-['Playfair_Display']
                text-4xl
                text-[#08285B]
                sm:text-5xl
              "
            >
              Crear invitación
            </h2>

            <p
              className="
                mt-4
                leading-7
                text-black/60
              "
            >
              Escribe el nombre del invitado y la cantidad
              de pases que tendrá disponibles.
            </p>
          </div>

          {/* Formulario */}
          <div className="mt-9 space-y-5">
            <div>
              <label
                htmlFor="nombre"
                className="
                  mb-2
                  block
                  text-xs
                  font-semibold
                  uppercase
                  tracking-[0.18em]
                  text-[#08285B]
                "
              >
                Nombre del invitado
              </label>

              <div className="relative">
                <User
                  size={19}
                  className="
                    pointer-events-none
                    absolute
                    left-4
                    top-1/2
                    -translate-y-1/2
                    text-[#245C9B]
                  "
                />

                <input
                  id="nombre"
                  type="text"
                  value={nombre}
                  onChange={(evento) => {
                    setNombre(evento.target.value);
                    setEnlaceGenerado("");
                    setError("");
                    setCopiado("");
                  }}
                  placeholder="Ejemplo: Familia Hernández"
                  className="
                    w-full
                    rounded-2xl
                    border
                    border-[#75B2D2]
                    bg-white
                    py-4
                    pl-12
                    pr-5
                    text-[#08285B]
                    outline-none
                    transition
                    placeholder:text-black/35
                    focus:border-[#245C9B]
                    focus:ring-2
                    focus:ring-[#3196BA]/20
                  "
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="numero-pases"
                className="
                  mb-2
                  block
                  text-xs
                  font-semibold
                  uppercase
                  tracking-[0.18em]
                  text-[#08285B]
                "
              >
                Número de pases
              </label>

              <div className="relative">
                <Users
                  size={19}
                  className="
                    pointer-events-none
                    absolute
                    left-4
                    top-1/2
                    -translate-y-1/2
                    text-[#245C9B]
                  "
                />

                <input
                  id="numero-pases"
                  type="number"
                  min="1"
                  inputMode="numeric"
                  value={numeroPases}
                  onChange={(evento) => {
                    setNumeroPases(evento.target.value);
                    setEnlaceGenerado("");
                    setError("");
                    setCopiado("");
                  }}
                  placeholder="Ejemplo: 2"
                  className="
                    w-full
                    rounded-2xl
                    border
                    border-[#75B2D2]
                    bg-white
                    py-4
                    pl-12
                    pr-5
                    text-[#08285B]
                    outline-none
                    transition
                    placeholder:text-black/35
                    focus:border-[#245C9B]
                    focus:ring-2
                    focus:ring-[#3196BA]/20
                  "
                />
              </div>
            </div>

            {error && (
              <motion.p
                role="alert"
                className="
                  rounded-xl
                  border
                  border-[#245C9B]/30
                  bg-[#D2E8EF]
                  px-4
                  py-3
                  text-sm
                  leading-6
                  text-[#08285B]
                "
                initial={{
                  opacity: 0,
                  y: -5,
                }}
                animate={{
                  opacity: 1,
                  y: 0,
                }}
              >
                {error}
              </motion.p>
            )}

            <motion.button
              type="button"
              onClick={generarEnlace}
              disabled={generando}
              className="
                flex
                w-full
                items-center
                justify-center
                gap-3
                rounded-full
                bg-[#08285B]
                px-7
                py-4
                font-['Playfair_Display']
                text-lg
                text-white
                shadow-[0_15px_35px_rgba(8,40,91,0.25)]
                transition
                hover:bg-[#245C9B]
                disabled:cursor-not-allowed
                disabled:opacity-60
              "
              whileHover={
                generando
                  ? {}
                  : {
                      scale: 1.02,
                      y: -2,
                    }
              }
              whileTap={
                generando
                  ? {}
                  : {
                      scale: 0.98,
                    }
              }
            >
              {generando ? (
                <>
                  <span
                    className="
                      h-5
                      w-5
                      animate-spin
                      rounded-full
                      border-2
                      border-white/35
                      border-t-white
                    "
                  />

                  Encriptando invitación...
                </>
              ) : (
                <>
                  <LockKeyhole size={20} />
                  Generar enlace
                </>
              )}
            </motion.button>
          </div>

          {/* Resultado */}
          {enlaceGenerado && (
            <motion.div
              className="
                mt-9
                space-y-6
                border-t
                border-[#75B2D2]/60
                pt-8
              "
              initial={{
                opacity: 0,
                y: 20,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              transition={{
                duration: 0.5,
              }}
            >
              {/* Enlace */}
              <div>
                <div
                  className="
                    mb-3
                    flex
                    items-center
                    justify-between
                    gap-4
                  "
                >
                  <div
                    className="
                      flex
                      items-center
                      gap-2
                      text-[#08285B]
                    "
                  >
                    <Link2 size={18} />

                    <h3
                      className="
                        text-xs
                        font-semibold
                        uppercase
                        tracking-[0.18em]
                      "
                    >
                      Enlace encriptado
                    </h3>
                  </div>

                  {copiado === "enlace" && (
                    <span
                      className="
                        flex
                        items-center
                        gap-1
                        text-xs
                        text-[#245C9B]
                      "
                    >
                      <Check size={15} />
                      Copiado
                    </span>
                  )}
                </div>

                <div
                  className="
                    flex
                    items-center
                    gap-2
                    rounded-2xl
                    border
                    border-[#75B2D2]
                    bg-[#D2E8EF]/55
                    p-3
                  "
                >
                  <p
                    className="
                      min-w-0
                      flex-1
                      truncate
                      text-sm
                      text-[#08285B]
                    "
                  >
                    {enlaceGenerado}
                  </p>

                  <button
                    type="button"
                    onClick={() =>
                      copiarTexto(
                        enlaceGenerado,
                        "enlace"
                      )
                    }
                    aria-label="Copiar enlace"
                    className="
                      flex
                      h-11
                      w-11
                      shrink-0
                      items-center
                      justify-center
                      rounded-full
                      bg-[#08285B]
                      text-white
                      transition
                      hover:bg-[#245C9B]
                    "
                  >
                    {copiado === "enlace" ? (
                      <Check size={19} />
                    ) : (
                      <Copy size={19} />
                    )}
                  </button>
                </div>
              </div>

              {/* Mensaje */}
              <div>
                <div
                  className="
                    mb--3
                    flex
                    items-center
                    justify-between
                    gap-4
                  "
                >
                  <div
                    className="
                      flex
                      items-center
                      gap-2
                      text-[#08285B]
                    "
                  >
                    <FaWhatsapp size={19} />

                    <h3
                      className="
                        text-xs
                        font-semibold
                        uppercase
                        tracking-[0.18em]
                      "
                    >
                      Mensaje de WhatsApp
                    </h3>
                  </div>

                  {copiado === "mensaje" && (
                    <span
                      className="
                        flex
                        items-center
                        gap-1
                        text-xs
                        text-[#245C9B]
                      "
                    >
                      <Check size={15} />
                      Copiado
                    </span>
                  )}
                </div>

                <div
                  className="
                    rounded-2xl
                    border
                    border-[#75B2D2]
                    bg-white
                    p-4
                  "
                >
                  <pre
                    className="
                      max-h-64
                      overflow-y-auto
                      whitespace-pre-wrap
                      break-words
                      font-sans
                      text-sm
                      leading-7
                      text-black/70
                    "
                  >
                    {mensajeWhatsApp}
                  </pre>
                </div>
              </div>

              {/* Acciones */}
              <div
                className="
                  grid
                  grid-cols-1
                  gap-3
                  sm:grid-cols-2
                "
              >
                <button
                  type="button"
                  onClick={() =>
                    copiarTexto(
                      mensajeWhatsApp,
                      "mensaje"
                    )
                  }
                  className="
                    flex
                    items-center
                    justify-center
                    gap-3
                    rounded-full
                    border
                    border-[#08285B]
                    bg-white
                    px-5
                    py-3.5
                    font-semibold
                    text-[#08285B]
                    transition
                    hover:bg-[#D2E8EF]
                  "
                >
                  {copiado === "mensaje" ? (
                    <Check size={19} />
                  ) : (
                    <Copy size={19} />
                  )}

                  Copiar mensaje
                </button>

                <button
                  type="button"
                  onClick={abrirWhatsApp}
                  className="
                    flex
                    items-center
                    justify-center
                    gap-3
                    rounded-full
                    bg-[#3196BA]
                    px-5
                    py-3.5
                    font-semibold
                    text-white
                    transition
                    hover:bg-[#245C9B]
                  "
                >
                  <FaWhatsapp size={21} />
                  Abrir WhatsApp
                </button>
              </div>

              <button
                type="button"
                onClick={limpiarGenerador}
                className="
                  mx-auto
                  flex
                  items-center
                  justify-center
                  gap-2
                  text-sm
                  font-semibold
                  text-[#245C9B]
                  transition
                  hover:text-[#08285B]
                "
              >
                <RefreshCw size={16} />
                Crear otra invitación
              </button>
            </motion.div>
          )}

          {!enlaceGenerado && (
            <div
              className="
                mt-8
                flex
                items-center
                justify-center
                gap-2
                text-center
                text-xs
                leading-5
                text-black/45
              "
            >
              <Send size={15} />

              El nombre y los pases no serán visibles en el URL.
            </div>
          )}
        </div>
      </motion.section>
    </main>
  );
};

export default Generador;