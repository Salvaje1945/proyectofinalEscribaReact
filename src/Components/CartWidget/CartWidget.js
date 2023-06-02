import { useContext } from 'react'
import { CartContext } from '../../context/CartContext'

const CartWidget = ()=> {

    const { AddProductCart } = useContext(CartContext)

    console.log(AddProductCart)

    return (
        <div className="cabecera__cont--cart_cont">
            <div><i className="bi bi-cart4"></i></div>
            <p>{AddProductCart}</p>
        </div>
    ) 
}

export default CartWidget