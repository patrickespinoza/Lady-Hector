import React, { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import {
  CheckCircle2,
  LockKeyhole,
  MessageSquare,
  User,
  Users,
} from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";

const SCRIPT_URL =
  "https://script.google.com/macros/s/AKfycbyRpc3x9KBCP44j1Mcw9zqzPsQthnlcja6DPqb_20wbyFQ9Lw7SnGPLSVxYDdFrV0gj/exec";

const WHATSAPP = "522293467670";

/*
 * Esta clave debe ser idéntica en el generador.
 * Puedes cambiarla, pero debes cambiarla en ambos componentes.
 */
const CLAVE_INVITACION =
  "ARELI-HECTOR-WEDLY-2027-CLAVE-PRIVADA";

/* Convierte Base64 URL a bytes */
const base64UrlABytes = (texto) => {
  let base64 = texto
    .replace(/-/g, "+")
    .replace(/_/g, "/");

  while (base64.length % 4 !== 0) {
    base64 += "=";
  }

  const binario = window.atob(base64);

  return Uint8Array.from(
    binario,
    (caracter) => caracter.charCodeAt(0)
  );
};

/* Crea la clave AES a partir del texto secreto */
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
    ["decrypt"]
  );
};

/* Desencripta el parámetro id */
const desencriptarInvitacion = async (idEncriptado) => {
  if (!idEncriptado) {
    throw new Error("El enlace no contiene información.");
  }

  const contenido = base64UrlABytes(idEncriptado);

  /*
   * Los primeros 12 bytes corresponden al vector IV.
   * El resto contiene la información encriptada.
   */
  const iv = contenido.slice(0, 12);
  const datosEncriptados = contenido.slice(12);

  const clave = await obtenerClaveAES();

  const datosDesencriptados =
    await window.crypto.subtle.decrypt(
      {
        name: "AES-GCM",
        iv,
      },
      clave,
      datosEncriptados
    );

  const texto = new TextDecoder().decode(
    datosDesencriptados
  );

  const datos = JSON.parse(texto);

  const nombre = String(datos.nombre || "").trim();
  const pases = Number.parseInt(datos.pases, 10);

  if (
    !nombre ||
    !Number.isFinite(pases) ||
    pases < 1
  ) {
    throw new Error(
      "Los datos de la invitación no son válidos."
    );
  }

  return {
    nombre,
    pases,
  };
};

const Confirmacion = () => {
  const [nombreInvitado, setNombreInvitado] = useState("");
  const [pasesPermitidos, setPasesPermitidos] = useState(0);

  const [mensajeInvitado, setMensajeInvitado] = useState("");
  const [asistencia, setAsistencia] = useState("");
  const [invitados, setInvitados] = useState("");

  const [cargandoInvitacion, setCargandoInvitacion] =
    useState(true);

  const [errorEnlace, setErrorEnlace] = useState("");
  const [error, setError] = useState("");
  const [enviando, setEnviando] = useState(false);

  useEffect(() => {
    let componenteActivo = true;

    const cargarDatosInvitado = async () => {
      try {
        const parametros = new URLSearchParams(
          window.location.search
        );

        const idEncriptado = parametros.get("id");

        const datos = await desencriptarInvitacion(
          idEncriptado
        );

        if (!componenteActivo) return;

        setNombreInvitado(datos.nombre);
        setPasesPermitidos(datos.pases);
        setErrorEnlace("");
      } catch (error) {
        console.error(
          "No fue posible desencriptar la invitación:",
          error
        );

        if (!componenteActivo) return;

        setNombreInvitado("");
        setPasesPermitidos(0);
        setErrorEnlace(
          "Este enlace no es válido o fue modificado. Solicita tu enlace personalizado a los novios."
        );
      } finally {
        if (componenteActivo) {
          setCargandoInvitacion(false);
        }
      }
    };

    cargarDatosInvitado();

    return () => {
      componenteActivo = false;
    };
  }, []);

  const opcionesInvitados = useMemo(() => {
    return Array.from(
      {
        length: pasesPermitidos,
      },
      (_, indice) => indice + 1
    );
  }, [pasesPermitidos]);

  const enlaceValido =
    Boolean(nombreInvitado) &&
    pasesPermitidos > 0 &&
    !errorEnlace;

  const seleccionarAsistencia = (respuesta) => {
    setAsistencia(respuesta);
    setError("");

    if (respuesta === "No podré asistir") {
      setInvitados("0");
    } else {
      setInvitados("");
    }
  };

  const enviarConfirmacion = async (evento) => {
    evento.preventDefault();

    if (!enlaceValido) {
      setError(
        "No podemos enviar la confirmación porque el enlace no es válido."
      );
      return;
    }

    if (!asistencia) {
      setError("Selecciona si podrás acompañarnos.");
      return;
    }

    if (
      asistencia === "Sí asistiré" &&
      (!invitados ||
        Number(invitados) < 1 ||
        Number(invitados) > pasesPermitidos)
    ) {
      setError(
        `Selecciona una cantidad válida. Tienes ${pasesPermitidos} ${
          pasesPermitidos === 1
            ? "pase disponible"
            : "pases disponibles"
        }.`
      );

      return;
    }

    setError("");
    setEnviando(true);

    const cantidadConfirmada =
      asistencia === "Sí asistiré"
        ? Number(invitados)
        : 0;

    const mensajeLimpio = mensajeInvitado.trim();

    const datos = {
      nombre: nombreInvitado,
      asistencia,
      invitados: cantidadConfirmada,
      invitadosConfirmados: cantidadConfirmada,
      numeroPases: pasesPermitidos,
      pases: pasesPermitidos,
      mensaje: mensajeLimpio,
    };

    const textoWhatsApp = [
      "💍 *Confirmación de asistencia*",
      "",
      `*Nombre:* ${nombreInvitado}`,
      `*Asistencia:* ${asistencia}`,
      `*Pases asignados:* ${pasesPermitidos}`,
      `*Personas confirmadas:* ${cantidadConfirmada}`,
      mensajeLimpio
        ? `*Mensaje:* ${mensajeLimpio}`
        : "*Mensaje:* Sin mensaje",
    ].join("\n");

    const enlaceWhatsApp =
      `https://wa.me/${WHATSAPP}?text=${encodeURIComponent(
        textoWhatsApp
      )}`;

    try {
      /*
       * Primero registra la respuesta en Google Sheets.
       */
      await fetch(SCRIPT_URL, {
        method: "POST",
        mode: "no-cors",
        headers: {
          "Content-Type": "text/plain;charset=utf-8",
        },
        body: JSON.stringify(datos),
      });

      /*
       * Después abre WhatsApp.
       */
      window.location.href = enlaceWhatsApp;
    } catch (error) {
      console.error(
        "Error al enviar la confirmación:",
        error
      );

      setError(
        "No fue posible registrar tu confirmación. Intenta nuevamente."
      );

      setEnviando(false);
    }
  };

  return (
    <section
      className="
        relative
        isolate
        w-full
        overflow-hidden
        bg-[#D2E8EF]
        px-5
        py-20
        sm:px-8
        sm:py-24
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

      <motion.div
        className="
          relative
          z-10
          mx-auto
          w-full
          max-w-3xl
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
        <div className="mb-10 text-center">
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
            RSVP
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
            <span className="h-px w-10 bg-[#3196BA] sm:w-20" />

            <h2
              className="
                max-w-xl
                font-['Playfair_Display']
                text-[38px]
                font-normal
                leading-tight
                text-[#08285B]
                sm:text-5xl
                md:text-6xl
              "
            >
              Confirma tu asistencia
            </h2>

            <span className="h-px w-10 bg-[#3196BA] sm:w-20" />
          </div>

          <p
            className="
              mx-auto
              mt-6
              max-w-xl
              text-base
              leading-8
              text-black/65
              sm:text-lg
            "
          >
            Nos encantará compartir este día tan especial
            contigo. Por favor, envíanos tu confirmación.
          </p>
        </div>

        <motion.form
          onSubmit={enviarConfirmacion}
          className="
            rounded-[32px]
            border
            border-[#75B2D2]
            bg-white/80
            px-5
            py-8
            shadow-[0_25px_65px_rgba(8,40,91,0.16)]
            backdrop-blur-md
            sm:px-9
            sm:py-10
            md:px-12
          "
          initial={{
            opacity: 0,
            scale: 0.97,
          }}
          whileInView={{
            opacity: 1,
            scale: 1,
          }}
          viewport={{ once: true }}
          transition={{
            duration: 0.8,
            delay: 0.15,
          }}
        >
          {cargandoInvitacion ? (
            <div
              className="
                flex
                min-h-[300px]
                flex-col
                items-center
                justify-center
                text-[#08285B]
              "
            >
              <span
                className="
                  h-11
                  w-11
                  animate-spin
                  rounded-full
                  border-2
                  border-[#75B2D2]
                  border-t-[#08285B]
                "
              />

              <p
                className="
                  mt-5
                  text-xs
                  uppercase
                  tracking-[0.25em]
                "
              >
                Abriendo invitación
              </p>
            </div>
          ) : (
            <div className="space-y-6">
              {/* Nombre desencriptado */}
              <div>
                <label
                  htmlFor="nombre-invitado"
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
                  Invitado
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
                    id="nombre-invitado"
                    type="text"
                    value={
                      nombreInvitado ||
                      "Enlace sin información"
                    }
                    readOnly
                    className="
                      w-full
                      cursor-not-allowed
                      rounded-2xl
                      border
                      border-[#75B2D2]
                      bg-[#D2E8EF]/60
                      py-4
                      pl-12
                      pr-5
                      font-medium
                      text-[#08285B]
                      outline-none
                    "
                  />
                </div>
              </div>

              {/* Pases desencriptados */}
              <div
                className="
                  flex
                  items-center
                  gap-4
                  rounded-2xl
                  border
                  border-[#75B2D2]
                  bg-[#D2E8EF]/50
                  px-5
                  py-4
                "
              >
                <div
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
                  "
                >
                  <LockKeyhole size={19} />
                </div>

                <div>
                  <p
                    className="
                      text-xs
                      uppercase
                      tracking-[0.17em]
                      text-[#245C9B]
                    "
                  >
                    Pases asignados
                  </p>

                  <p
                    className="
                      mt-1
                      font-['Playfair_Display']
                      text-xl
                      text-[#08285B]
                    "
                  >
                    {pasesPermitidos > 0
                      ? `${pasesPermitidos} ${
                          pasesPermitidos === 1
                            ? "persona"
                            : "personas"
                        }`
                      : "Sin pases asignados"}
                  </p>
                </div>
              </div>

              {errorEnlace ? (
                <p
                  className="
                    rounded-2xl
                    border
                    border-[#245C9B]/30
                    bg-[#D2E8EF]
                    px-5
                    py-4
                    text-sm
                    leading-6
                    text-[#08285B]
                  "
                >
                  {errorEnlace}
                </p>
              ) : (
                <>
                  {/* Asistencia */}
                  <fieldset disabled={enviando}>
                    <legend
                      className="
                        mb-3
                        text-xs
                        font-semibold
                        uppercase
                        tracking-[0.18em]
                        text-[#08285B]
                      "
                    >
                      ¿Podrás acompañarnos?
                    </legend>

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
                          seleccionarAsistencia(
                            "Sí asistiré"
                          )
                        }
                        className={`
                          flex
                          items-center
                          justify-center
                          gap-2
                          rounded-2xl
                          border
                          px-5
                          py-4
                          font-['Playfair_Display']
                          text-lg
                          transition
                          ${
                            asistencia === "Sí asistiré"
                              ? "border-[#08285B] bg-[#08285B] text-white"
                              : "border-[#75B2D2] bg-white text-[#08285B]"
                          }
                        `}
                      >
                        {asistencia === "Sí asistiré" && (
                          <CheckCircle2 size={18} />
                        )}

                        Sí asistiré
                      </button>

                      <button
                        type="button"
                        onClick={() =>
                          seleccionarAsistencia(
                            "No podré asistir"
                          )
                        }
                        className={`
                          flex
                          items-center
                          justify-center
                          gap-2
                          rounded-2xl
                          border
                          px-5
                          py-4
                          font-['Playfair_Display']
                          text-lg
                          transition
                          ${
                            asistencia ===
                            "No podré asistir"
                              ? "border-[#245C9B] bg-[#245C9B] text-white"
                              : "border-[#75B2D2] bg-white text-[#08285B]"
                          }
                        `}
                      >
                        {asistencia ===
                          "No podré asistir" && (
                          <CheckCircle2 size={18} />
                        )}

                        No asistiré
                      </button>
                    </div>
                  </fieldset>

                  {/* Invitados limitados */}
                  {asistencia === "Sí asistiré" && (
                    <motion.div
                      initial={{
                        opacity: 0,
                        height: 0,
                      }}
                      animate={{
                        opacity: 1,
                        height: "auto",
                      }}
                    >
                      <label
                        htmlFor="numero-invitados"
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
                        Personas que asistirán
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

                        <select
                          id="numero-invitados"
                          value={invitados}
                          onChange={(evento) => {
                            setInvitados(
                              evento.target.value
                            );
                            setError("");
                          }}
                          disabled={enviando}
                          className="
                            w-full
                            appearance-none
                            rounded-2xl
                            border
                            border-[#75B2D2]
                            bg-white
                            py-4
                            pl-12
                            pr-10
                            text-[#08285B]
                            outline-none
                            focus:border-[#245C9B]
                            focus:ring-2
                            focus:ring-[#3196BA]/20
                          "
                        >
                          <option value="">
                            Selecciona una cantidad
                          </option>

                          {opcionesInvitados.map(
                            (cantidad) => (
                              <option
                                key={cantidad}
                                value={cantidad}
                              >
                                {cantidad}{" "}
                                {cantidad === 1
                                  ? "persona"
                                  : "personas"}
                              </option>
                            )
                          )}
                        </select>

                        <span
                          className="
                            pointer-events-none
                            absolute
                            right-4
                            top-1/2
                            -translate-y-1/2
                            text-[#245C9B]
                          "
                        >
                          ▾
                        </span>
                      </div>
                    </motion.div>
                  )}

                  {/* Mensaje */}
                  <div>
                    <label
                      htmlFor="mensaje-invitado"
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
                      Mensaje para los novios
                    </label>

                    <div className="relative">
                      <MessageSquare
                        size={19}
                        className="
                          pointer-events-none
                          absolute
                          left-4
                          top-5
                          text-[#245C9B]
                        "
                      />

                      <textarea
                        id="mensaje-invitado"
                        value={mensajeInvitado}
                        onChange={(evento) =>
                          setMensajeInvitado(
                            evento.target.value
                          )
                        }
                        disabled={enviando}
                        placeholder="Escribe un mensaje especial"
                        rows={4}
                        className="
                          w-full
                          resize-none
                          rounded-2xl
                          border
                          border-[#75B2D2]
                          bg-white
                          py-4
                          pl-12
                          pr-5
                          text-[#08285B]
                          outline-none
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
                    type="submit"
                    disabled={enviando}
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
                      shadow-[0_16px_35px_rgba(8,40,91,0.28)]
                      transition
                      hover:bg-[#245C9B]
                      disabled:cursor-not-allowed
                      disabled:opacity-50
                    "
                    whileHover={
                      enviando
                        ? {}
                        : {
                            scale: 1.02,
                            y: -2,
                          }
                    }
                    whileTap={
                      enviando
                        ? {}
                        : {
                            scale: 0.98,
                          }
                    }
                  >
                    {enviando ? (
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

                        Guardando y abriendo WhatsApp...
                      </>
                    ) : (
                      <>
                        <FaWhatsapp size={23} />
                        Enviar confirmación
                      </>
                    )}
                  </motion.button>
                </>
              )}
            </div>
          )}
        </motion.form>
      </motion.div>
    </section>
  );
};

export default Confirmacion;