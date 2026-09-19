import { useState } from "react";
import Header from "./components/Header";
import EventoCard from "./components/EventoCard";
import { eventos } from "./data/eventos";
import "./App.css";
import Rodape from "./components/Rodape";
function App() {
  const [busca, setBusca] = useState('');

  const eventosFiltrados = eventos.filter((evento) =>
    evento.titulo.toLowerCase().includes(busca.toLowerCase())
  );

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

      <Rodape />
    </>
  );
}
export default App;