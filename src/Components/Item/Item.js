import ItemCount from '../ItemCount'
// import { useEffect, useState, useContext } from 'react'
import { useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { CartContext } from '../../context/CartContext'


const Item = ({ id, nom, desc, cat, pre, stock, pic })=> {

    const { addProduct, restProduct } = useContext(CartContext)

    const navegar = useNavigate()

    // const [prodOutOfCart, setProdOutOfCart] = useState(true)

    const manejadorCount = (count, accion)=> {
        if(accion === 'sumar'){
            addProduct(count)
        }
        if(accion === 'restar'){
            restProduct(count)
        }
    }

    const agregarAlCarrito = (count) => {
        const prodParaAgregar = {
            idp: id,
            nombre: nom,
            precio: pre,
            cantidad: count,
            total: pre * count,
        }
        // setProdOutOfCart(estado)
        // createOrder(item).then((result) => {
        //     alert(result)
        //     console.log(result)
        // })
        console.log(prodParaAgregar)
        navegar('/carrito/probando-carrito')
    }
    
    // const actualizarCarrito = (count) => {
    //     updateOrder(id, count)
    // }

    return (
        <div className="contenido__itemdetail--cont">
            <nav className="contenido__itemdetail--nav">
                <ul>
                    <li><Link to={'/'} >Inicio</Link> /</li>
                    <li><Link to={'/catalogo'} >Catálogo</Link> /</li>
                    {cat ? <li><Link to={`/categoria/${cat}`}>{cat}</Link></li> : null}
                </ul>
            </nav>
            <div className="contenido__itemdetail--img"><img src={pic} alt={nom} /></div>
            <div className="contenido__itemdetail--txt">
                <h1>{nom}</h1>
                <p className="contenido__itemdetail--txt_desc">{desc}</p>
                <p className="contenido__itemdetail--txt_prec">${pre} x 1</p>
            </div>
            {/* <ItemCount maxCount={stock} onChangeCount={(a, b)=> manejadorCount(a, b)} onClickAddCart={(e) => agregarAlCarrito(e)} onClickUpdateCart={(e) => actualizarCarrito(e)} /> */}
            <ItemCount maxCount={stock} onChangeCount={(a, b)=> manejadorCount(a, b)} onClickAddCart={(e) => agregarAlCarrito(e)} />
        </div>
    )
}

export default Item