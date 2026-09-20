
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router";
import axios from "axios";


import EventoCard from "../components/EventoCard";
import Rodape from "../components/Rodape";

function Home() {
    const [params, setParams] = useSearchParams();
    const busca = params.get("q") ?? "";
    const [eventos, setEventos] = useState([]);
    const [carregando, setCarregando] = useState(true);
    const [erro, setErro] = useState(false);

    async function carregarEventos() {
        setErro(false);
        setCarregando(true);

        try {
            const resposta = await axios.get("http://localhost:3001/eventos");
            setEventos(resposta.data);
        } catch (excecao) {
            setErro(true);
        } finally {
            setCarregando(false);
        }
    }

    useEffect(() => {
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
            <div className="aviso">
                <p>
                    Não foi possível carregar os eventos.
                    Verifique se a API está no ar.
                </p>

                <button onClick={carregarEventos}>
                    Tentar novamente
                </button>
            </div>
        );
    }

    return (
        <>


            <section className="busca">
                <input
                    type="text"
                    placeholder="Buscar evento pelo título..."
                    value={busca}
                    onChange={(e) => {
                        const texto = e.target.value;

                        if (texto === "") {
                            setParams({});
                        } else {
                            setParams({ q: texto });
                        }
                    }}
                />
            </section>

            {busca !== "" && (
                <button
                    className="limpar-busca"
                    onClick={() => setParams({})}
                >
                    Limpar busca
                </button>
            )}

            {busca !== "" && (
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
                            id={evento.id}
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

export default Home;

