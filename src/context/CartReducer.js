export const cartReducer = (state, action) => {
    console.log(action)
    console.log(state)
    console.log(action.payload)
    switch (action.type) {
        
        case "ACTUALIZAR":
            return { CantProductCart: action.payload }
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