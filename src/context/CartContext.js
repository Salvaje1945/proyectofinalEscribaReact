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
            console.log(result)
            const verificarCarrito = result.some(carrito => carrito.idu === usuarioId)
            console.log(verificarCarrito)
            setExisteCarrito(verificarCarrito)
        })

    }

    const traerDatosDelCarrito = ()=> {

        const fetchDocumento = async () => {
            const documento = await getCarrito('carritos', 'idu', usuarioId);
            if (documento) {
                console.log('El carrito: ', documento);
                console.log('El ID del carrito: ', documento.id)
                
                setCarritoExistente(documento)
                addProductCant(documento.totalcant)
            } else {
                console.log('Documento no encontrado');
            }
        };
        fetchDocumento()

    }

    useEffect(() => {
        
        traerColeccionCarritos()

        // if(existeCarrito){
        //     console.log('existe carrito')
        //     traerDatosDelCarrito()
        // } else {
        //     console.log('no existe carrito')
        // }

    }, [])

    useEffect(()=> {

        if(existeCarrito){
            console.log('existe carrito')
            traerDatosDelCarrito()
        } else {
            console.log('no existe carrito')
        }

    }, [existeCarrito])

    useEffect(()=> {

        console.log('probando qué onda con el estado...', state)

    }, [state])
    

    function nuevoCarritoCreado() {
        setExisteCarrito(true)
        console.log('nuevo carrito creado: ', existeCarrito)
    }

    function consultaDeCarrito () {
        return existeCarrito
    }

    function datosDelCarritoExistente () {
        return carritoExistente
    }

    function actualizarCarritoExistente () {
        console.log('actualizando datos del carrito...')
        traerDatosDelCarrito()
    }

    function elUsuario () {
        return usuarioId
    }

    function addProductCant(CantProductCart) {
        console.log('sumaproducto', CantProductCart)
        console.log('estado2', state)
        dispatch({
            type: 'ACTUALIZAR',
            payload: CantProductCart,
        })
    }

    // function restProductCant(CantProductCart) {
    //     console.log('restaproducto', CantProductCart)
    //     dispatch({
    //         type: 'RESTAR',
    //         payload: { CantProductCart },
    //     })
    // }

    // function resetProductCant(CantProductCart) {
    //     dispatch({
    //         type: 'RESET',
    //         payload: { CantProductCart },
    //     })
    // }

    return (
        <CartContext.Provider value={{ CantProductCart: state.CantProductCart, addProductCant, consultaDeCarrito, datosDelCarritoExistente, elUsuario, nuevoCarritoCreado, actualizarCarritoExistente }}>{children}</CartContext.Provider>
    )

}