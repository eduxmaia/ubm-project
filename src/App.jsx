
import { Routes, Route } from "react-router";
import EventoDetalhe from "./pages/EventoDetalhe";
import Home from "./pages/Home";

import "./App.css";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/eventos/:id" element={<EventoDetalhe />} /> 
    </Routes>
  );
}

export default App;

