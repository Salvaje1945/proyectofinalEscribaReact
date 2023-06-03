import { useParams } from 'react-router'

const Cart = ()=> {

    const { id } = useParams()

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