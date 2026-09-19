import Header from "./components/Header";
import EventoCard from "./components/EventoCard";
import { eventos } from "./data/eventos";
import "./App.css";
import Rodape from "./components/Rodape";
function App() {
 return (
 <>
 <Header />
 <main className="lista-eventos">
 {eventos.map((evento) => (
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