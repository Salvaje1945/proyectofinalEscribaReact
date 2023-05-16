import ItemDetail from '../ItemDetail'
import Titulo from '../Titulo'
//import PruebaProductos from '../PruebaProductos'
//import ItemDetail from '../ItemDetail'
//import { useEffect, useState } from "react";

const ItemListContainer = (props)=> {
    const { listaProds } = props
    const tituloItemListCont = 'Nuestros productos:'

    //const [productos, setProductos] = useState([])

    // useEffect(() => {
    //     obtenerProductos()
    //         .then(productos => {
    //             setProductos(productos)
    //         })
    //         .catch(error => {
    //             console.error("Ocurrió un error al obtener los productos:", error)
    //         })
    // }, [])

    // function obtenerProductos() {
    //     return fetch("http://localhost:3001/productos")
    //         .then(response => {
    //             if (!response.ok) {
    //                 throw new Error("No se pudo obtener la lista de productos");
    //             }
    //             return response.json();
    //         })
    //         .then(productos => {
    //             return productos.map(producto => ({
    //                 id: producto.id,
    //                 nombre: producto.nombre,
    //                 descripcion: producto.descripcion,
    //                 stock: producto.stock
    //             }));
    //         });
    // }

    return <div>
                <div className="contenido__pruebaproductos">
                    <Titulo titulo = {tituloItemListCont} />
                    <ul className="contenido__pruebaproductos--cont" id="contenido-pruebaproductos-contenedor">
                        {listaProds.map((item)=>{
                            return <ItemDetail {...item}/>
                        })}
                    </ul>
                    {/* {props.children} */}
                </div>
                {/* <div>
                    <PruebaProductos />
                </div> */}
                {/* <div>
                    <ItemDetail />
                </div> */}
            </div>

}

export default ItemListContainer