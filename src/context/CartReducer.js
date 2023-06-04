export const cartReducer = (state, action) => {

    switch (action.type) {
        
        case "AGREGAR":
            return { CantProductCart: state.CantProductCart + 1 }
        case "RESTAR":
            return { CantProductCart: state.CantProductCart - 1 }
        case "RESET":
            return { CantProductCart: 0 }
        // case "CREAR":
        //     return { NuevoCarrito: [{
        //         usuario: 
        //     }] }
        // case "CREAR":
        //     return { NuevoCarrito: state.NuevoCarrito }
        
        default:
            return state
    }

}