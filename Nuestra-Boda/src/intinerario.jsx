import Carousel from "./componentes-encabezado/carrusel";
import Portada from "./componentes-encabezado/portada";
import Contador from "./componentes-encabezado/Contador";
import Celebracion from "./componentes-encabezado/Ubicacion";
import Dresscode from "./componentes-encabezado/Dresscode";
import Regalos from "./componentes-encabezado/Regalos";
import Confirmacion from "./componentes-encabezado/Confirmacion";
import Musica from "./componentes-encabezado/musica";
import FraseSeparacion from "./componentes-encabezado/frase";
import FraseFinal from "./componentes-encabezado/Fraseseparacion";


export default function Intinerario() {
  return (
    <div>

      <Musica/>

      <Portada />

      <Contador />

      <FraseSeparacion/>

      <Celebracion />

      <Dresscode />

      <Carousel />

      <Regalos />

      <FraseFinal/>

      <Confirmacion />
    </div>
  );
}