import Titulo from '../Titulo'
import Lista from '../Lista'
import { useEffect, useState } from "react";
import { useParams } from "react-router";

const ItemListContainer = ()=> {

    const { id } = useParams()

    const [productos, setProductos] = useState([])
    const [items, setItems] = useState([])
    const [titulo, setTitulo] = useState()

    useEffect(() => {
        obtenerProductos()
          .then(productos => {
            setProductos(productos)
            setItems(productos)
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

    useEffect(() => {
        const getsProductsPromise = new Promise((res, rej) => {
            if(id){
                const productosFiltrados = productos.filter(e => e.categoria === id)
                res(productosFiltrados);
              }
              res(productos)
          });

        getsProductsPromise.then((arrayp) => setItems(arrayp)).catch((err) => console.log(err));
        if(id){
            setTitulo(`${id}:`)
        } else {
            setTitulo('Nuestros productos:')
        }
    }, [id, productos]);

  // productos.map((categ)=> categ.categoria)
  //console.log(productos.map(categ => categ.categoria))

//   const categoriasUnicas = [...new Set(productos.map(categ => categ.categoria))];

//   console.log(categoriasUnicas);

    console.log(items)



    return <main id="contenido">
                <div className="contenido__itemlistcontainer">
                    <Titulo titulo = {titulo} />
                    <Lista lista = {items} />
                </div>
            </main>
}

export default ItemListContainer