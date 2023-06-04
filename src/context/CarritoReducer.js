export const carritoReducer = (estadoActual, action) => {

    switch (action.type) {
        
        case "AJUSTARTOTAL":
            return { TotalCartCant: estadoActual.TotalCartCant + 1 }
        // case "CREAR":
        //     return { NuevoCarrito: [{
        //         usuario: 
        //     }] }
        // case "CREAR":
        //     return { NuevoCarrito: state.NuevoCarrito }
        
        default:
            return estadoActual
    }

}