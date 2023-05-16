import SubTitulo from "../SubTitulo"
//import ItemDetail from "../ItemDetail";
import { useEffect, useState } from "react";

function PruebaProductos() {

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

    function obtenerProductos() {
        return fetch("http://localhost:3001/productos")
            .then(response => {
                if (!response.ok) {
                    throw new Error("No se pudo obtener la lista de productos");
                }
                return response.json();
            })
            .then(productos => {
                return productos.map(producto => ({
                    id: producto.id,
                    nombre: producto.nombre,
                    descripcion: producto.descripcion,
                    stock: producto.stock
                }));
            });
    }

    return <div className="contenido__pruebaproductos">
                <SubTitulo subtitulo='Productos' />
                <div className="contenido__pruebaproductos--cont" id="contenido-pruebaproductos-contenedor">
                    {productos.map(producto => (
                        <div className="contenido__pruebaproductos--box" key={producto.id}>
                            <p>ID: {producto.id}</p>
                            <p>Nombre: {producto.nombre}</p>
                            <p>Descripción: {producto.descripcion}</p>
                            <p>Stock: {producto.stock}</p>
                        </div>
                    ))}
                </div>
            </div>
}

export default PruebaProductos