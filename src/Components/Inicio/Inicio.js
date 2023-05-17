import Titulo from "../Titulo"
import SubTitulo from "../SubTitulo"

const Inicio = ()=>{
    return <main id="contenido">
        <section>
            <Titulo titulo={'Esta es la página de inicio'} />
            <SubTitulo subtitulo={'Y estoy probando cosas de navegación.'} />
        </section>
    </main>
}

export default Inicio