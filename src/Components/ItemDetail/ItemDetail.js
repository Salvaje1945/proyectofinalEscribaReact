//import Titulo from "../Titulo"
import { useParams } from "react-router-dom"
import { useEffect, useState, useContext } from "react"
import { Link } from 'react-router-dom'
import ItemCount from "../ItemCount/ItemCount"
import { CartContext } from "../../context/CartContext"
import { getDocument } from "../../utils/getFirestore";

const ItemDetail = ()=>{

    const { id } = useParams()

    const [producto, setProducto] = useState([])

    const [categ, setCateg] = useState([])

    const { addProduct, restProduct } = useContext(CartContext)

    

    const dameElItem = () => {

        console.log('------------------')
        console.log('PRODUCTO ANTES DE TODA LA COSA:')
        console.log(producto)
        console.log('------------------')

        getDocument('items', `${id}`).then((result)=> {
            console.log('El RESULT DEL PRODUCTO:')
            console.log(result)
            console.log('------------------')
            setProducto(result)

        })

    }

    const dameLaCateg = ()=> {

        getDocument('categorias', `${producto.categoria}`).then((result)=> {
            console.log('El RESULT DE LA CATEGORÍA:')
            console.log(result)
            console.log('------------------')
            setCateg(result)
        })

    }

    useEffect(() => {

        dameElItem()

    }, []);

    useEffect(() => {

        dameLaCateg()

    }, [producto])


    const manejadorCount = (count, accion)=> {

        if(accion === 'sumar'){
            addProduct(count)
        }

        if(accion === 'restar'){
            restProduct(count)
        }

    }

    console.log('------------------')
    console.log('CATEG:')
    console.log(categ)
    console.log('------------------')

    console.log('------------------')
    console.log('MEDIDA DE PRODUCTO:')
    console.log(typeof(producto))
    console.log('------------------')


    return producto ? (
        <main id="contenido" className="item">
            <div className="contenido__itemdetail--cont">
                <nav className="contenido__itemdetail--nav">
                    <ul>
                        <li><Link to={'/'} >Inicio</Link> /</li>
                        <li><Link to={'/catalogo'} >Catálogo</Link> /</li>
                        {categ ? <li><Link to={`/categoria/${categ.categoria}`}>{categ.categoria}</Link></li> : null}
                    </ul>
                </nav>
                <div className="contenido__itemdetail--img"><img src={producto.foto} alt={producto.nombre} /></div>
                <div className="contenido__itemdetail--txt">
                    <h1>{producto.nombre}</h1>
                    <p className="contenido__itemdetail--txt_desc">{producto.descripcion}</p>
                    <p className="contenido__itemdetail--txt_prec">${producto.precio} x Unidad</p>
                </div>
                <ItemCount precio={producto.precio} maxCount={producto.stock} onChangeCount={(a, b)=> manejadorCount(a, b) } />
            </div>
        </main>
    ) : (
        <main id="contenido" className="item">
            <div className="contenido__itemdetail--cont">
                <h1>No pasa nada, che.</h1>
            </div>
        </main>
    );

}

export default ItemDetail