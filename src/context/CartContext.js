import { createContext, useReducer, useEffect, useState } from 'react'
import { cartReducer } from './CartReducer'
// import { getCollection } from '../../utils/getFirestore'
import { getCollection, getCarrito } from '../utils/getFirestore'
//import { carritoReducer } from './CarritoReducer'

export const CartContext = createContext(null)

// const valorInicial = 

// const stateGlobal = [{ count: 0 }]

const stateGlobal = { CantProductCart: 0 }

//const cartTotal = { TotalCartCant: 0 }

//const estadoCarrito = { CarritoExiste: false }

const carritos = []

const usuarioId = 'VZMeW8qeWSNplaZju9de'

//const [existeCarrito, setExisteCarrito] = useState(false)

//const elementos = [{}]

// const cartState = { NuevoCarrito: [{}] }

export const CartContextProvider = ({ children }) => {

    const [state, dispatch] = useReducer(cartReducer, stateGlobal)

    const [existeCarrito, setExisteCarrito] = useState(false)

    const [carritoExistente, setCarritoExistente] = useState(null)

    useEffect(() => {
        getCollection('carritos').then((result) => {
            console.log(result)
            const verificarCarrito = result.some(carrito => carrito.idu === usuarioId)
            console.log(verificarCarrito)
            setExisteCarrito(verificarCarrito)
            //setCarritoExistente(result)
            //console.log(existeCarrito)
            // if(verificarCarrito) {
            //     setCarritoExistente(result)
            //     console.log(carritoExistente)
            // }
            //console.log(carritoExistente)
        })
        
    }, [])

    useEffect(()=> {

        if(existeCarrito){
            console.log('existe carrito')
            const fetchDocumento = async () => {
                const documento = await getCarrito('carritos', 'idu', usuarioId);
                if (documento) {
                    console.log('El carrito: ', documento);
                    console.log('El ID del carrito: ', documento.id)
                    
                    setCarritoExistente(documento)
                    //console.log(carritoExistente)
                } else {
                    console.log('Documento no encontrado');
                }
                //return documento
            };
            fetchDocumento()
        } else {
            console.log('no existe carrito')
        }

    }, [existeCarrito])

    function nuevoCarritoCreado() {
        setExisteCarrito(true)
        console.log(existeCarrito)
    }

    function consultaDeCarrito () {
        return existeCarrito
    }

    function datosDelCarritoExistente () {
        return carritoExistente
    }

    function elUsuario () {
        return usuarioId
    }



    //console.log('estado1', state)

    //const [carrito, accionCarrito] = useReducer(cartReducer, cartState)

    // function carritoTotalCant(TotalCartCant) {
    //     console.log('el total: ', TotalCartCant)
    //     console.log('el estado total', estadoActual)
    //     const totalShit = e
    //     accionEstado({
    //         type: 'AJUSTARTOTAL',
    //         payload: { TotalCartCant },
    //     })
    // }

    function addProductCant(CantProductCart) {
        console.log('sumaproducto', CantProductCart)
        console.log('estado2', state)
        dispatch({
            type: 'AGREGAR',
            payload: { CantProductCart },
        })
    }

    function restProductCant(CantProductCart) {
        console.log('restaproducto', CantProductCart)
        dispatch({
            type: 'RESTAR',
            payload: { CantProductCart },
        })
    }

    function resetProductCant(CantProductCart) {
        // console.log('restaproducto', CantProductCart)
        dispatch({
            type: 'RESET',
            payload: { CantProductCart },
        })
    }


    function crearCarrito(NuevoElemento) {
        carritos.push(NuevoElemento)
        console.log(carritos)
    }

    function consultaCarritos(usuario) {
        if(carritos.length === 0){
            return false
        } else {
            return carritos.some(elemento => elemento.idu === usuario)
        }
    }



    return (
        // <CartContext.Provider value={{ CantProductCart: state.CantProductCart, TotalCartCant: estadoActual.TotalCartCant, addProductCant, restProductCant, resetProductCant, crearCarrito, carritoTotalCant, consultaCarritos }}>{children}</CartContext.Provider>
        <CartContext.Provider value={{ CantProductCart: state.CantProductCart, addProductCant, restProductCant, resetProductCant, crearCarrito, consultaCarritos, consultaDeCarrito, datosDelCarritoExistente, elUsuario, nuevoCarritoCreado }}>{children}</CartContext.Provider>
    )

}