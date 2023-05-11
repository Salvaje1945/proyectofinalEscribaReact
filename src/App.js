import NavBar from './Components/NavBar';
import ItemListContainer from './Components/ItemListContainer';
import Titulo from './Components/Titulo';
import Contador from './Components/Contador'

function App() {
  const greeting = "El gritin' que hay que renderizar, creo."
  return (
    <div id="contenedor">
      <header id="cabecera">
        <NavBar />
      </header>
      <main id="contenido">
        {/* <Titulo titulo='Hola, soy un título reutilizable.' /> */}
        <div>
          <ItemListContainer props = {greeting} />
          {/* <ItemListContainer props = {greeting}>
            <Contador />
          </ItemListContainer> */}
        </div>
        <div className='contenido__temporal--margenparaeldivdetitulo'>
          <Titulo titulo='Mirate este contador, loco:' />
          <Contador />
        </div>
      </main>
      <footer id="pie">
        {/* <Titulo titulo='Hola, soy otro título.' /> */}
        <h3>Soy el pie, y NO tengo olor a pata</h3>
      </footer>
    </div>
  );
}

export default App;
