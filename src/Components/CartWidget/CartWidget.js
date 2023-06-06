import { useContext, useState, useEffect } from 'react'
import { CartContext } from '../../context/CartContext'

const CartWidget = ({ clase })=> {

    const { consultaDeCarrito, CantProductCart } = useContext(CartContext)

    const carritoVerif = consultaDeCarrito()

    const aVerSiSeVe = `${clase} activo`

    //const datosCarritoExist = datosDelCarritoExistente()


    //const [estadoCarrito, setEstadoCarrito] = useState(carritoVerif)
    const [visibilidadCarrito, setVisibilidadCarrito] = useState()
    // const [verCarritoCant, setVerCarritoCant] = useState()

    useEffect(()=> {
        // console.log(aVerSiSeVe)
        console.log(carritoVerif)
        if(carritoVerif) {
            //console.log(datosCarritoExist.totalcant)
            //const laCantidad = datosCarritoExist.totalcant
            setVisibilidadCarrito(aVerSiSeVe)
            // if(datosCarritoExist != null){
            //     setVerCarritoCant(datosCarritoExist.totalcant)
            // }
        } else {
            setVisibilidadCarrito(clase)
        }

    }, [])

    useEffect(()=> {
        //console.log(aVerSiSeVe)
        console.log(carritoVerif)
        if(carritoVerif) {
            //const laCantidad = datosCarritoExist.totalcant
            setVisibilidadCarrito(aVerSiSeVe)
            // console.log(datosCarritoExist)
            // setVerCarritoCant(datosCarritoExist)
            // if(datosCarritoExist != null){
            //     setVerCarritoCant(datosCarritoExist.totalcant)
            // }
        } else {
            setVisibilidadCarrito(clase)
            //setVerCarritoCant(0)
        }

    }, [carritoVerif])

    // useEffect(()=> {

    //     setVerCarritoCant(datosCarritoExist.totalcant)

    // }, [datosCarritoExist])

    // console.log(carritoVerif)

    return (
        <div className={visibilidadCarrito}>
            <div className="cabecera__cont--cart_cont">
                <div><i className="bi bi-cart4"></i></div>
                {/* <p>{verCarritoCant}</p> */}
                {carritoVerif && <p>{CantProductCart}</p>}
            </div>
        </div>
    ) 
}

export default CartWidget