import { createContext, useReducer } from "react";
import { cartReducer } from "./CartReducer";

export const CartContext = createContext(null)

// const valorInicial = 

// const stateGlobal = [{ count: 0 }]

const stateGlobal = { AddProductCart: 0 }

export const CartContextProvider = ({ children }) => {

    const [state, dispatch] = useReducer(cartReducer, stateGlobal)
    console.log('estado1', state)

    function addProduct(AddProductCart) {
        console.log('sumaproducto', AddProductCart)
        console.log('estado2', state)
        dispatch({
            type: 'AGREGAR',
            payload: { AddProductCart },
        })
    }

    function restProduct(AddProductCart) {
        console.log('restaproducto', AddProductCart)
        dispatch({
            type: 'RESTAR',
            payload: { AddProductCart },
        })
    }

    function resetProduct(AddProductCart) {
        // console.log('restaproducto', AddProductCart)
        dispatch({
            type: 'RESET',
            payload: { AddProductCart },
        })
    }

    return (
        <CartContext.Provider value={{ AddProductCart: state.AddProductCart, addProduct, restProduct, resetProduct }}>{children}</CartContext.Provider>
    )

}