import NavBar from './Components/NavBar';
import ItemListContainer from './Components/ItemListContainer';
//import Lista from './Components/Lista';
//import Titulo from './Components/Titulo';
//import Contador from './Components/Contador'
import { useEffect, useState } from "react";

function App() {
  //const greeting = "Nuestros productos:"
  const [productos, setProductos] = useState([])
  useEffect(() => {
    obtenerProductos()
      .then(productos => {
        setProductos(productos)
      })
      .catch(error => {
        console.error("Ocurrió un error al obtener los productos:", error)
      })
  }, [])

  async function obtenerProductos() {
    const response = await fetch("http://localhost:3001/productos");
    if (!response.ok) {
      throw new Error("No se pudo obtener la lista de productos");
    }
    const productos = await response.json();
    return productos.map(producto => ({
      id: producto.id,
      nombre: producto.nombre,
      descripcion: producto.descripcion,
      stock: producto.stock
    }));
  }

  console.log(productos)

  // useEffect(()=>{
  //   fetch('http://localhost:3001/productos', {
  //     method: 'GET',
  //     headers: {
  //       'content-type': 'application/json'
  //     }
  //   }).then((response)=>{
  //     console.log(response.json())
  //   }).catch(error=>{
  //     console.log(error)
  //   })
  // }, [])

  return (
    <div id="contenedor">
      <header id="cabecera">
        <NavBar />
      </header>
      <main id="contenido">
        {/* <Titulo titulo='Hola, soy un título reutilizable.' /> */}
        <div>
          <ItemListContainer listaProds={productos}/>
          {/* <ItemListContainer props = {greeting}>
            <Contador />
          </ItemListContainer> */}
        </div>
        {/* <div className='contenido__temporal--margenparaeldivdetitulo'>
          <Titulo titulo='Mirate este contador, loco:' />
          <Contador />
        </div> */}
      </main>
      <footer id="pie">
        {/* <Titulo titulo='Hola, soy otro título.' /> */}
        <h3>Soy el pie, y NO tengo olor a pata</h3>
      </footer>
    </div>
  );
}

export default App;
