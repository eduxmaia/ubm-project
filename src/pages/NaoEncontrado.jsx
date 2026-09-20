import { Link } from "react-router";
function NaoEncontrado() {
    return (
        <section className="aviso"> {/* mesma moldura dos avisos da Aula 5 */}
            <p>Página não encontrada.</p>
            <Link to="/" className="voltar">Voltar para a lista de eventos</Link>
        </section>
    );
}
export default NaoEncontrado;