import { useContext } from 'react'
import { CartContext } from '../../context/CartContext'
import { Link } from 'react-router-dom'

const CartList = ({ carritoId })=> {

    const { datosDelCarritoExistente } = useContext(CartContext)

    const datosCarritoExist = datosDelCarritoExistente()


    return (
        <div className="contenido__cart--cont">
            <nav className="cart__cont--nav">
                <ul>
                    <li><Link to={'/'} >Inicio</Link> /</li>
                    <li><Link to={'/catalogo'} >Catálogo</Link> /</li>
                    <li><Link to={`/carrito/${carritoId}`}>Mi Carrito</Link></li>
                </ul>
            </nav>
            <div className='cart__cont-list'>
                {datosCarritoExist.items.map((prod)=>{
                    return (
                        <ul key={prod.idp}>
                            <li>{prod.cant}</li>
                            <li>{prod.nom}</li>
                            <li>{prod.imp}</li>
                            <li><Link to={`/productos/${prod.idp}`}><i className='bi bi-pencil-fill'></i></Link></li>
                            <li><i className='bi bi-trash3-fill'></i></li>
                        </ul>
                    )
                })}
            </div>
            
        </div>

    )

}

export default CartList