import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";

import Intinerario from "./intinerario";
import Generador from "./Pagina/Generador";

const App = () => {
  const rutaActual = window.location.pathname
    .toLowerCase()
    .replace(/\/+$/, "");

  /*
   * El generador se mostrará únicamente en:
   * https://tu-dominio.vercel.app/generador
   */
  if (rutaActual === "/generador") {
    return <Generador />;
  }

  /*
   * La invitación se mostrará en la ruta principal
   * y conservará el parámetro encriptado ?id=...
   */
  return (
    <main>
      <Intinerario />
    </main>
  );
};

ReactDOM.createRoot(
  document.getElementById("root")
).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);