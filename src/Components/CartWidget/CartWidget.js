import { useContext, useState, useEffect } from 'react'
import { CartContext } from '../../context/CartContext'
import { Link } from 'react-router-dom'

const CartWidget = ({ clase })=> {

    const { consultaDeCarrito, CantProductCart } = useContext(CartContext)

    const carritoVerif = consultaDeCarrito()

    const aVerSiSeVe = `${clase} activo`

    const [visibilidadCarrito, setVisibilidadCarrito] = useState()

    useEffect(()=> {
        if(carritoVerif) {
            setVisibilidadCarrito(aVerSiSeVe)
        } else {
            setVisibilidadCarrito(clase)
        }
        //eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    useEffect(()=> {
        if(carritoVerif) {
            setVisibilidadCarrito(aVerSiSeVe)
        } else {
            setVisibilidadCarrito(clase)
        }
    }, [carritoVerif])

    return (
        <div className={visibilidadCarrito}>
            {carritoVerif && <Link to={'/carrito/micarrito'}>
                <div className="cabecera__cont--cart_cont">
                    <div><i className="bi bi-cart4"></i></div>
                    <p>{CantProductCart}</p>
                </div>
            </Link>}  
        </div>
    )
}

export default CartWidget