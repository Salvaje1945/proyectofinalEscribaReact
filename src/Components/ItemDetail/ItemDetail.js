import Titulo from "../Titulo"
import { useParams } from "react-router-dom"

const ItemDetail = (props)=>{

    const { item } = props

    const { id } = useParams()

    console.log(item)

    console.log(id)

    const tituloItem = `Elegiste el item id n°: ${id}`

    return (
        // <div className="contenido__pruebaproductos--box" key={id}>
        //     {/* <div><img src={imgurl} width={100} height={100} /></div> */}
        //     <div >
        //         <p>{nombre}</p>
        //         <p>{descripcion}</p>
        //         <p>{stock}</p>
        //     </div>
        // </div>
        // <li className="contenido__pruebaproductos--box" key={id}>
        //     <p>{nombre}</p>
        //     <p>{descripcion}</p>
        //     <p>{stock}</p>
        // </li>
        <div>
            <Titulo titulo={tituloItem} />
        </div>
    )

}

export default ItemDetail