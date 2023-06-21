import { createContext, useReducer, useEffect, useState } from 'react'
import { cartReducer } from './CartReducer'
import { getCollection, getCarrito } from '../utils/getFirestore'

export const CartContext = createContext()

const stateGlobal = { CantProductCart: 0 }

const usuarioId = 'VZMeW8qeWSNplaZju9de'

export const CartContextProvider = ({ children }) => {

    const [state, dispatch] = useReducer(cartReducer, stateGlobal)

    const [existeCarrito, setExisteCarrito] = useState(false)

    const [carritoExistente, setCarritoExistente] = useState(null)

    const traerColeccionCarritos = ()=> {
        getCollection('carritos').then((result) => {
            const verificarCarrito = result.some(carrito => carrito.idu === usuarioId)
            setExisteCarrito(verificarCarrito)
        })
    }

    const traerDatosDelCarrito = async () => {
        const documento = await getCarrito('carritos', 'idu', usuarioId);
        if (documento) {
            setCarritoExistente(documento)
            addProductCant(documento.totalcant)
        } else {
            console.log('Documento no encontrado');
        }
    };

    useEffect(() => {
        traerColeccionCarritos()
        traerDatosDelCarrito()
    }, [])

    useEffect(()=> {

        if(existeCarrito){
            actualizameElTocarri()
        } else {
            console.log('no existe carrito')
        }

    }, [existeCarrito])

    function nuevoCarritoCreado() {
        setExisteCarrito(true)
    }

    function carritoEliminado() {
        setCarritoExistente(null)
    }

    function consultaDeCarrito () {
        return existeCarrito
    }

    function datosDelCarritoExistente () {
        return carritoExistente
    }

    const actualizameElTocarri = async () => {
        const documento = await getCarrito('carritos', 'idu', usuarioId);
        setCarritoExistente(documento)
    }

    function actualizarCarritoExistente () {

        getCollection('carritos').then((result) => {
            const verificarCarrito = result.some(carrito => carrito.idu === usuarioId)
            if(verificarCarrito){
                actualizameElTocarri()
            } else {
                setExisteCarrito(verificarCarrito)
            }
        })
    }

    function elUsuario () {
        return usuarioId
    }

    function addProductCant(CantProductCart) {
        dispatch({
            type: 'ACTUALIZAR',
            payload: CantProductCart,
        })
    }

    return (
        <CartContext.Provider value={{ CantProductCart: state.CantProductCart, addProductCant, consultaDeCarrito, datosDelCarritoExistente, elUsuario, nuevoCarritoCreado, actualizarCarritoExistente, carritoEliminado }}>{children}</CartContext.Provider>
    )

}