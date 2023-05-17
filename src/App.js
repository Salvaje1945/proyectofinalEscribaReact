import { BrowserRouter, Routes, Route } from 'react-router-dom';
import NavBar from './Components/NavBar';
import Inicio from './Components/Inicio';
import ItemListContainer from './Components/ItemListContainer';
// import Contador from './Components/Contador'
// import Pepito from './Components/ValidacionForms/Container'
import { useEffect, useState } from "react";

function App() {
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
      categoria: producto.categoria,
      precio: producto.precio,
      stock: producto.stock,
      foto: producto.foto
    }));
  }

  // productos.map((categ)=> categ.categoria)
  //console.log(productos.map(categ => categ.categoria))

  const categoriasUnicas = [...new Set(productos.map(categ => categ.categoria))];

  console.log(categoriasUnicas);

  return (

    <BrowserRouter>
    
      <NavBar />

      <Routes>

        {/* <Route exact path='/' element={<ItemListContainer listaProds={productos}/>}/> */}
        <Route path='/' element={<Inicio />} />

        <Route path='/catalogo' element={<ItemListContainer listaProds={productos}/>} />

        {/* <Route path='/categoria/:categoriaId' element={<ItemListContainer listaCategs={categoriasUnicas}/>} /> */}
        <Route path='/categoria/:categoryId' element={<ItemListContainer listaProds={productos}/>} />

      </Routes>
    
    </BrowserRouter>




    // <div id="contenedor">
    //   <header id="cabecera">
    //     <NavBar />
    //   </header>
    //   <main id="contenido">
    //     <div>
    //       <ItemListContainer listaProds={productos}/>
    //     </div>
    //     <div>
    //       <Contador />
    //     </div>
    //     <div>
    //       <Pepito />
    //     </div>
    //   </main>
    //   <footer id="pie">
    //     <h3>Soy el pie, y NO tengo olor a pata</h3>
    //   </footer>
    // </div>
  );
}

export default App;
