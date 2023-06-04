import { useParams } from 'react-router'
// import { useContext } from 'react'
// import { CartContext } from '../../context/CartContext'

const Cart = ()=> {

    const { id } = useParams()

    //const { crearCarrito } = useContext(CartContext)

    //console.log(crearCarrito)

    return (
        <main id="contenido" className="item">
            <div className="contenido__itemdetail--cont">
                <h1>Hola, soy tu carrito de compras, perri.</h1>
                <p>{id}</p>
            </div>
        </main>
    )

}

export default Cart