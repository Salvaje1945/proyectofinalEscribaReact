import Item from '../Item'
import ItemLoad from '../ItemLoad'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router'
import { getDocument } from '../../utils/getFirestore'

const ItemDetail = ()=> {

    const { id } = useParams()

    const [producto, setProducto] = useState([])
    const [categ, setCateg] = useState([])

    useEffect(() => {
        getDocument('items', `${id}`).then((result) => {
            setProducto(result)
        })
    }, [id])

    useEffect(() => {
        if (producto && producto.categoria) {
            getDocument('categorias', `${producto.categoria}`).then((result) => {
                setCateg(result)
            })
        }
    }, [producto])

    return (
        <main id="contenido" className="item">
            {producto.length === 0 ? (
                <ItemLoad />
            ) : (
                <Item
                    id={producto.id}
                    nom={producto.nombre}
                    desc={producto.descripcion}
                    cat={categ.categoria}
                    pre={producto.precio}
                    stock={producto.stock}
                    pic={producto.foto}
                />
            )}
        </main>
    )
}

export default ItemDetail