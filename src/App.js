import React, { Fragment, useState, useEffect } from 'react';
import Formulario from './components/Formulario';
import axios from 'axios';
import Cancion from './components/Cancion';
import Informacion from './components/Informacion';

function App() {

  // definir el state
  const [busquedaletra, guardarBusquedaLetra] = useState({});
  const [letra, guardarLetra] = useState('');
  const [info, guardarInformacion] = useState({});

  useEffect(() => {
    if (Object.keys(busquedaletra).length === 0) return;

    const consultarAPILetra = async () => {
      const { artista, cancion } = busquedaletra;
      const url = `https://api.lyrics.ovh/v1/${artista}/${cancion}`;
      const url2 = `https://www.theaudiodb.com/api/v1/json/1/search.php?s=${artista}`;

      const [letra, informacion] = await Promise.all([
        axios.get(url),
        axios.get(url2)
      ]);

      //const resultado = await axios.get(url);
      //const resultado2 = await axios.get(url2);
      guardarLetra(letra.data.lyrics);
      guardarInformacion(informacion.data.artists[0]);
    };
    consultarAPILetra();
  }, [busquedaletra]);

  return (
    <Fragment>
      <Formulario guardarBusquedaLetra={guardarBusquedaLetra} />

      <div className="container mt-5">
        <div className="row">
          <div className="col-md-6">
            <Informacion info={info} />
          </div>
          <div className="col-md-6">
            <Cancion letra={letra} />
          </div>
        </div>
      </div>
    </Fragment>
  );
}

export default App;
