import { useContext, useState, useEffect } from 'react'
import { CartContext } from '../../context/CartContext'

const CartWidget = ({ clase })=> {

    const { consultaDeCarrito, datosDelCarritoExistente } = useContext(CartContext)

    const carritoVerif = consultaDeCarrito()

    const aVerSiSeVe = `${clase} activo`

    const datosCarritoExist = datosDelCarritoExistente()


    //const [estadoCarrito, setEstadoCarrito] = useState(carritoVerif)
    const [visibilidadCarrito, setVisibilidadCarrito] = useState()
    const [verCarritoCant, setVerCarritoCant] = useState(0)

    useEffect(()=> {
        console.log(aVerSiSeVe)
        console.log(datosCarritoExist)
        if(carritoVerif) {
            console.log(datosCarritoExist.totalcant)
            //const laCantidad = datosCarritoExist.totalcant
            setVisibilidadCarrito(aVerSiSeVe)
            setVerCarritoCant(datosCarritoExist.totalcant)
        } else {
            setVisibilidadCarrito(clase)
        }

    }, [])

    useEffect(()=> {
        console.log(aVerSiSeVe)
        if(carritoVerif) {
            //const laCantidad = datosCarritoExist.totalcant
            setVisibilidadCarrito(aVerSiSeVe)
            console.log(datosCarritoExist)
            setVerCarritoCant(datosCarritoExist.totalcant)
        } else {
            setVisibilidadCarrito(clase)
            //setVerCarritoCant(0)
        }

    }, [carritoVerif])

    // useEffect(()=> {

    //     setVerCarritoCant(datosCarritoExist.totalcant)

    // }, [datosCarritoExist])

    console.log(carritoVerif)

    return (
        <div className={visibilidadCarrito}>
            <div className="cabecera__cont--cart_cont">
                <div><i className="bi bi-cart4"></i></div>
                {/* <p>{verCarritoCant}</p> */}
                {carritoVerif && <p>{verCarritoCant}</p>}
            </div>
        </div>
    ) 
}

export default CartWidget