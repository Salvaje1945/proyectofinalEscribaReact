import ItemDetail from "../ItemDetail"
import ProductoTitulo from '../ProductoTitulo'
import { useEffect, useState } from "react";
import { Link } from 'react-router-dom'

const Lista = (todoList)=> {
    const { lista } = todoList
    const [mostrarLista, setMostrarLista] = useState(true)
    const [mostrarItem, setMostrarItem] = useState(false)
    const [itemElegido, setItemElegido] = useState(0)

    //let itemID

    // function mostrarDetalleItem(elItem) {
    //     // console.log(elItem)
    //     // setMostrarLista(false)
    //     // setMostrarItem(true)
    //     const itemID = elItem
    //     // console.log(itemID)
    //     return itemID
    // } 

    useEffect(()=>{
        if(itemElegido === 0){
            setMostrarLista(true)
            setMostrarItem(false)
        } else {
            setMostrarLista(false)
            setMostrarItem(true)
        }
    }, [itemElegido])

    return (

        <div>
            {mostrarLista && <ul className="contenido__itemlist--cont">
                {lista.map((list)=>{
                    return (
                        <li className="contenido__item--box" key={list.id}>
                            <Link to={`/productos/${list.id}`} onClick={()=> setItemElegido(list.id)}>
                                <div className="contenido__item--box_img-cont"><img src={list.foto} alt={list.nombre} /></div>
                                <ProductoTitulo nombre={list.nombre} />
                                <p>${list.precio}</p>
                            </Link>
                        </li>
                    )
                })}
            </ul>}
            {mostrarItem && <div>
                <ItemDetail item={itemElegido}/>
                {/* <p onClick={()=> setItemElegido(0)}>Ver todos</p> */}
            </div>}
        </div>



    )


}

/* <ItemDetail item={itemElegido} /> */

export default Lista