//import Titulo from "../Titulo"
import { useParams } from "react-router-dom"
import { useEffect, useState } from "react"
import { Link } from 'react-router-dom'
import ItemCount from "../ItemCount/ItemCount"

const ItemDetail = ()=>{

    const { id } = useParams()

    const [producto, setProducto] = useState([])

    const [changeCount, setChangeCount] = useState("button")

    const handlerChangeCount = () => {
        if (changeCount === 'button'){
            setChangeCount("select")
        } else {
            setChangeCount("button")
        }
        
    }


    useEffect(() => {
        obtenerProductoPorId(id)
            .then(producto => {
                setProducto(producto)
            })
            .catch(error => {
                console.error("Ocurrió un error al obtener los productos:", error)
            })
    }, [id])

    async function obtenerProductoPorId(id) {
        const response = await fetch(`http://localhost:3001/productos?id=${id}`);
        if (!response.ok) {
            throw new Error("No se pudo obtener el producto");
        }
        const [producto] = await response.json();
        return {
            id: producto.id,
            nombre: producto.nombre,
            descripcion: producto.descripcion,
            categoria: producto.categoria,
            precio: producto.precio,
            stock: producto.stock,
            foto: producto.foto
        };
    }

    

    

    //console.log(producto)

    console.log(producto.stock)
    console.log(producto.precio)
    console.log(producto.nombre)

    return (
        <main id="contenido" className="item">
            <div className="contenido__itemdetail--cont">
                <nav className="contenido__itemdetail--nav">
                    <ul>
                        <li><Link to={'/'} >Inicio</Link> /</li>
                        <li><Link to={'/catalogo'} >Catálogo</Link> /</li>
                        <li><Link to={`/categoria/${producto.categoria}`}>{producto.categoria}</Link> /</li>
                    </ul>
                </nav>
                <div className="contenido__itemdetail--img"><img src={producto.foto} alt={producto.nombre} /></div>
                <div className="contenido__itemdetail--txt">
                    <h1>{producto.nombre}</h1>
                    <p className="contenido__itemdetail--txt_desc">{producto.descripcion}</p>
                    <p className="contenido__itemdetail--txt_prec">${producto.precio}</p>
                </div>
                <div className="contenido__itemdetail--act">
                    <div>
                    <input
                        type="button"
                        value="cambiar contador"
                        onClick={handlerChangeCount}
                    />
                    </div>
                    <div><ItemCount type={changeCount} maxCount={producto.stock} /></div>
                </div>
            </div>
        </main>
    )

}

export default ItemDetail