import { useEffect, useState } from "react";
import axios from 'axios';
import Header from "./components/Header";
import EventoCard from "./components/EventoCard";
import { eventos } from "./data/eventos";
import "./App.css";
import Rodape from "./components/Rodape";
function App() {
  const [busca, setBusca] = useState('');
  const [eventos, setEventos] = useState([]);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState(false);

  useEffect(() => {

    async function carregarEventos() {
      try {

        const resposta = await
          axios.get('http://localhost:3001/eventos');

        setEventos(resposta.data);
      } catch (excecao) {

        setErro(true);
      } finally {

        setCarregando(false);
      }
    }
    carregarEventos();
  }, []);


  const eventosFiltrados = eventos.filter((evento) =>
    evento.titulo.toLowerCase().includes(busca.toLowerCase())
  );

  if (carregando) {
    return <p className="aviso">Carregando eventos...</p>;
  }
  if (erro) {
    return (
      <p className="aviso">
        Não foi possível carregar os eventos.
        Verifique se a API está no ar.
      </p>
    );
  }


  return (
    <>
      <Header />

      <section className="busca">
        <input
          type="text"
          placeholder="Buscar evento pelo título..."
          value={busca}
          onChange={(e) => setBusca(e.target.value)}
        />

      </section>

      {busca !== '' && (
        <button className="limpar-busca" onClick={() => setBusca('')}>
          Limpar busca
        </button>
      )}

      {busca !== '' && (
        <p className="contador">
          {eventosFiltrados.length} evento(s) encontrado(s)
        </p>
      )}


      {eventosFiltrados.length === 0 ? (
        <p className="lista-vazia">
          Nenhum evento encontrado para "{busca}".
        </p>
      ) : (
        <main className="lista-eventos">
          {eventosFiltrados.map((evento) => (
            <EventoCard
              key={evento.id}
              titulo={evento.titulo}
              tipo={evento.tipo}
              data={evento.data}
              local={evento.local}
              vagas={evento.vagas}
              palestrante={evento.palestrante}
            />
          ))}
        </main>
      )}




      <Rodape />
    </>
  );
}
export default App;