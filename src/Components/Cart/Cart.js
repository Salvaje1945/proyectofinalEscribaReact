import { useParams } from 'react-router'
import CartList from '../CartList'
import { useNavigate } from 'react-router-dom'
import { useEffect, useState, useContext } from 'react'
import { CartContext } from '../../context/CartContext'

const Cart = ()=> {

    const { id } = useParams()

    const { datosDelCarritoExistente } = useContext(CartContext)

    const navegar = useNavigate()

    const datosCarritoExist = datosDelCarritoExistente()

    let miCarrito

    if(id === 'micarrito'){
        miCarrito = datosCarritoExist.id
    } else {
        miCarrito = id
    }

    const [verCarrito, setVerCarrito] = useState(false)

    const [carritoEliminado, setCarritoEliminado] = useState(false)


    useEffect(()=> {

        if(id === 'eliminado') {
            setCarritoEliminado(true)
        } else {
            if(id === 'micarrito'){
                setVerCarrito(true)
            } else {
                setTimeout(() => {
                    setVerCarrito(true)
                }, 2000);
            }
        }
        //eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    useEffect(()=>{

        if(carritoEliminado) {

            setTimeout(() => {
                navegar('/')
            }, 3000);

        }

    }, [carritoEliminado])

    return carritoEliminado ? (
        <main id="contenido" className="item">
            <div className='contenido__cart'>
                <h1>Carrito eliminado con éxito.</h1>
            </div>
        </main>
    ) : (
        <main id="contenido" className="item">
            <div className='contenido__cart'>
                {verCarrito ? <CartList carritoId={miCarrito} /> : <h1>Operación realizada con éxito. Aguarde un instante, por favor.</h1>}
            </div>
        </main>
    )

}

export default Cart