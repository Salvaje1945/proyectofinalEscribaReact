import Titulo from '../Titulo'
import PruebaProductos from '../PruebaProductos'

// function ItemListContainer(greeting) {
//     const { props } = greeting
//     const tituloItemListCont = `${props}`
//     // return <h2>{props}</h2>
//     // return <Titulo titulo = {tituloItemListCont} />
//     return <div>
//                 <Titulo titulo = {tituloItemListCont} />
//                 {greeting.children}
//             </div>

// }

const ItemListContainer = (greeting)=> {
    const { props } = greeting
    const tituloItemListCont = `${props}`
    // return <h2>{props}</h2>
    // return <Titulo titulo = {tituloItemListCont} />
    return <div>
                <div>
                    <Titulo titulo = {tituloItemListCont} />
                </div>
                <div>
                    <PruebaProductos />
                </div>
            </div>

}


export default ItemListContainer