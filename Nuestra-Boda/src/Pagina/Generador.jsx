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

const CLAVE_INVITACION =
  "ARELI-HECTOR-WEDLY-2027-CLAVE-PRIVADA";

/* =========================================
   ENCRIPTACIÓN
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

    if (!Number.isInteger(pases) || pases < 1) {
      setError("Ingresa un número de pases válido.");
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
       * La invitación siempre abre desde la página principal,
       * aunque el generador esté en /generador.
       */
      const urlBase = window.location.origin;

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
        w-full
        overflow-x-hidden
        bg-[#D2E8EF]
        px-3
        py-4
        sm:px-6
        sm:py-10
        lg:px-8
        lg:py-14
      "
    >
      {/* Flores del fondo */}
      <img
        src="/flor-azul-02.png"
        alt=""
        aria-hidden="true"
        className="
          pointer-events-none
          absolute
          -left-24
          -top-20
          z-0
          w-52
          select-none
          opacity-35
          sm:-left-20
          sm:-top-24
          sm:w-80
          sm:opacity-50
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
          -bottom-24
          -right-24
          z-0
          w-60
          select-none
          opacity-30
          sm:-bottom-36
          sm:-right-28
          sm:w-[420px]
          sm:opacity-45
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
          rounded-[22px]
          border
          border-[#75B2D2]
          bg-white/90
          shadow-[0_20px_55px_rgba(8,40,91,0.18)]
          backdrop-blur-md
          sm:rounded-[32px]
          lg:grid-cols-[0.9fr_1.1fr]
          lg:rounded-[42px]
          lg:shadow-[0_30px_80px_rgba(8,40,91,0.2)]
        "
        initial={{
          opacity: 0,
          y: 30,
          scale: 0.98,
        }}
        animate={{
          opacity: 1,
          y: 0,
          scale: 1,
        }}
        transition={{
          duration: 0.7,
          ease: [0.22, 1, 0.36, 1],
        }}
      >
        {/* Portada */}
        <div
          className="
            relative
            h-[300px]
            w-full
            overflow-hidden
            bg-[#08285B]
            min-[430px]:h-[350px]
            sm:h-[470px]
            lg:h-auto
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
              scale: 1.07,
            }}
            animate={{
              scale: 1,
            }}
            transition={{
              duration: 1.4,
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
              px-4
              pb-6
              text-center
              text-white
              sm:px-8
              sm:pb-10
              lg:px-10
              lg:pb-12
            "
          >
            <p
              className="
                text-[9px]
                font-semibold
                uppercase
                tracking-[0.32em]
                text-[#D2E8EF]
                sm:text-[11px]
                sm:tracking-[0.4em]
              "
            >
              Nos casamos
            </p>

            <h1
              className="
                mt-2
                font-['Playfair_Display']
                text-[38px]
                font-normal
                leading-tight
                sm:mt-4
                sm:text-6xl
                lg:text-7xl
              "
            >
              Lady

              <span
                className="
                  mx-2
                  font-['Cedarville_Cursive']
                  text-[#75B2D2]
                  sm:mx-3
                "
              >
                &
              </span>

              Héctor
            </h1>

            <div
              className="
                mx-auto
                mt-3
                flex
                items-center
                justify-center
                gap-2
                sm:mt-6
                sm:gap-3
              "
            >
              <span
                className="
                  h-px
                  w-10
                  bg-[#75B2D2]
                  sm:w-14
                "
              />

              <span
                className="
                  h-1.5
                  w-1.5
                  rotate-45
                  border
                  border-white
                  sm:h-2
                  sm:w-2
                "
              />

              <span
                className="
                  h-px
                  w-10
                  bg-[#75B2D2]
                  sm:w-14
                "
              />
            </div>

            <p
              className="
                mt-3
                text-[10px]
                tracking-[0.12em]
                text-white/80
                sm:mt-6
                sm:text-sm
                sm:tracking-[0.16em]
              "
            >
              Generador de invitaciones
            </p>
          </div>
        </div>

        {/* Panel */}
        <div
          className="
            min-w-0
            px-4
            py-7
            min-[430px]:px-6
            sm:px-9
            sm:py-11
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
                gap-2
                text-[#3196BA]
                lg:justify-start
              "
            >
              <LockKeyhole
                size={17}
                className="shrink-0"
              />

              <p
                className="
                  text-[9px]
                  font-semibold
                  uppercase
                  tracking-[0.22em]
                  sm:text-[11px]
                  sm:tracking-[0.32em]
                "
              >
                Enlace protegido
              </p>
            </div>

            <h2
              className="
                mt-3
                font-['Playfair_Display']
                text-[34px]
                leading-tight
                text-[#08285B]
                sm:mt-4
                sm:text-5xl
              "
            >
              Crear invitación
            </h2>

            <p
              className="
                mx-auto
                mt-3
                max-w-md
                text-sm
                leading-6
                text-black/60
                sm:mt-4
                sm:text-base
                sm:leading-7
                lg:mx-0
              "
            >
              Escribe el nombre del invitado y la cantidad
              de pases que tendrá disponibles.
            </p>
          </div>

          {/* Formulario */}
          <div className="mt-7 space-y-5 sm:mt-9">
            <div>
              <label
                htmlFor="nombre"
                className="
                  mb-2
                  block
                  text-[10px]
                  font-semibold
                  uppercase
                  tracking-[0.14em]
                  text-[#08285B]
                  sm:text-xs
                  sm:tracking-[0.18em]
                "
              >
                Nombre del invitado
              </label>

              <div className="relative">
                <User
                  size={18}
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
                  autoComplete="off"
                  value={nombre}
                  onChange={(evento) => {
                    setNombre(evento.target.value);
                    setEnlaceGenerado("");
                    setError("");
                    setCopiado("");
                  }}
                  placeholder="Ejemplo: Familia Hernández"
                  className="
                    min-h-[52px]
                    w-full
                    rounded-xl
                    border
                    border-[#75B2D2]
                    bg-white
                    py-3
                    pl-11
                    pr-4
                    text-base
                    text-[#08285B]
                    outline-none
                    transition
                    placeholder:text-sm
                    placeholder:text-black/35
                    focus:border-[#245C9B]
                    focus:ring-2
                    focus:ring-[#3196BA]/20
                    sm:min-h-[56px]
                    sm:rounded-2xl
                    sm:pl-12
                    sm:pr-5
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
                  text-[10px]
                  font-semibold
                  uppercase
                  tracking-[0.14em]
                  text-[#08285B]
                  sm:text-xs
                  sm:tracking-[0.18em]
                "
              >
                Número de pases
              </label>

              <div className="relative">
                <Users
                  size={18}
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
                    min-h-[52px]
                    w-full
                    rounded-xl
                    border
                    border-[#75B2D2]
                    bg-white
                    py-3
                    pl-11
                    pr-4
                    text-base
                    text-[#08285B]
                    outline-none
                    transition
                    placeholder:text-sm
                    placeholder:text-black/35
                    focus:border-[#245C9B]
                    focus:ring-2
                    focus:ring-[#3196BA]/20
                    sm:min-h-[56px]
                    sm:rounded-2xl
                    sm:pl-12
                    sm:pr-5
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
                min-h-[54px]
                w-full
                items-center
                justify-center
                gap-2.5
                rounded-full
                bg-[#08285B]
                px-4
                py-3.5
                font-['Playfair_Display']
                text-base
                text-white
                shadow-[0_13px_30px_rgba(8,40,91,0.24)]
                transition
                hover:bg-[#245C9B]
                disabled:cursor-not-allowed
                disabled:opacity-60
                sm:min-h-[58px]
                sm:gap-3
                sm:px-7
                sm:py-4
                sm:text-lg
              "
              whileHover={
                generando
                  ? {}
                  : {
                      scale: 1.015,
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
                      shrink-0
                      animate-spin
                      rounded-full
                      border-2
                      border-white/35
                      border-t-white
                    "
                  />

                  <span>Encriptando invitación...</span>
                </>
              ) : (
                <>
                  <LockKeyhole
                    size={20}
                    className="shrink-0"
                  />

                  <span>Generar enlace</span>
                </>
              )}
            </motion.button>
          </div>

          {/* Resultados */}
          {enlaceGenerado && (
            <motion.div
              className="
                mt-7
                min-w-0
                space-y-6
                border-t
                border-[#75B2D2]/60
                pt-7
                sm:mt-9
                sm:pt-8
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
              {/* Enlace generado */}
              <div className="min-w-0">
                <div
                  className="
                    mb-3
                    flex
                    flex-wrap
                    items-center
                    justify-between
                    gap-2
                  "
                >
                  <div
                    className="
                      flex
                      min-w-0
                      items-center
                      gap-2
                      text-[#08285B]
                    "
                  >
                    <Link2
                      size={18}
                      className="shrink-0"
                    />

                    <h3
                      className="
                        text-[10px]
                        font-semibold
                        uppercase
                        tracking-[0.14em]
                        sm:text-xs
                        sm:tracking-[0.18em]
                      "
                    >
                      Enlace encriptado
                    </h3>
                  </div>

                  {copiado === "enlace" && (
                    <span
                      className="
                        flex
                        shrink-0
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
                    grid
                    min-w-0
                    grid-cols-[minmax(0,1fr)_44px]
                    items-center
                    gap-2
                    rounded-xl
                    border
                    border-[#75B2D2]
                    bg-[#D2E8EF]/55
                    p-2.5
                    sm:grid-cols-[minmax(0,1fr)_48px]
                    sm:rounded-2xl
                    sm:p-3
                  "
                >
                  <p
                    className="
                      min-w-0
                      break-all
                      text-xs
                      leading-5
                      text-[#08285B]
                      sm:text-sm
                      sm:leading-6
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
                      sm:h-12
                      sm:w-12
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

              {/* Vista previa del mensaje */}
              <div className="min-w-0">
                <div
                  className="
                    mb-3
                    flex
                    flex-wrap
                    items-center
                    justify-between
                    gap-2
                  "
                >
                  <div
                    className="
                      flex
                      min-w-0
                      items-center
                      gap-2
                      text-[#08285B]
                    "
                  >
                    <FaWhatsapp
                      size={19}
                      className="shrink-0"
                    />

                    <h3
                      className="
                        text-[10px]
                        font-semibold
                        uppercase
                        tracking-[0.14em]
                        sm:text-xs
                        sm:tracking-[0.18em]
                      "
                    >
                      Mensaje de WhatsApp
                    </h3>
                  </div>

                  {copiado === "mensaje" && (
                    <span
                      className="
                        flex
                        shrink-0
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
                    min-w-0
                    rounded-xl
                    border
                    border-[#75B2D2]
                    bg-white
                    p-3
                    sm:rounded-2xl
                    sm:p-4
                  "
                >
                  <pre
                    className="
                      max-h-[280px]
                      w-full
                      overflow-x-hidden
                      overflow-y-auto
                      whitespace-pre-wrap
                      break-words
                      font-sans
                      text-[13px]
                      leading-6
                      text-black/70
                      sm:max-h-64
                      sm:text-sm
                      sm:leading-7
                    "
                  >
                    {mensajeWhatsApp}
                  </pre>
                </div>
              </div>

              {/* Botones */}
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
                    min-h-[52px]
                    w-full
                    items-center
                    justify-center
                    gap-2.5
                    rounded-full
                    border
                    border-[#08285B]
                    bg-white
                    px-4
                    py-3
                    text-sm
                    font-semibold
                    text-[#08285B]
                    transition
                    hover:bg-[#D2E8EF]
                    sm:min-h-[56px]
                    sm:gap-3
                    sm:px-5
                    sm:py-3.5
                  "
                >
                  {copiado === "mensaje" ? (
                    <Check
                      size={19}
                      className="shrink-0"
                    />
                  ) : (
                    <Copy
                      size={19}
                      className="shrink-0"
                    />
                  )}

                  <span>
                    {copiado === "mensaje"
                      ? "Mensaje copiado"
                      : "Copiar mensaje"}
                  </span>
                </button>

                <button
                  type="button"
                  onClick={abrirWhatsApp}
                  className="
                    flex
                    min-h-[52px]
                    w-full
                    items-center
                    justify-center
                    gap-2.5
                    rounded-full
                    bg-[#3196BA]
                    px-4
                    py-3
                    text-sm
                    font-semibold
                    text-white
                    transition
                    hover:bg-[#245C9B]
                    sm:min-h-[56px]
                    sm:gap-3
                    sm:px-5
                    sm:py-3.5
                  "
                >
                  <FaWhatsapp
                    size={21}
                    className="shrink-0"
                  />

                  <span>Abrir WhatsApp</span>
                </button>
              </div>

              <button
                type="button"
                onClick={limpiarGenerador}
                className="
                  mx-auto
                  flex
                  min-h-[44px]
                  items-center
                  justify-center
                  gap-2
                  px-3
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
                mx-auto
                mt-7
                flex
                max-w-sm
                items-start
                justify-center
                gap-2
                text-center
                text-[11px]
                leading-5
                text-black/45
                sm:mt-8
                sm:items-center
                sm:text-xs
              "
            >
              <Send
                size={15}
                className="mt-0.5 shrink-0 sm:mt-0"
              />

              <span>
                El nombre y los pases no serán visibles en el
                URL.
              </span>
            </div>
          )}
        </div>
      </motion.section>
    </main>
  );
};

export default Generador;