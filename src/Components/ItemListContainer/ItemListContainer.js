import Titulo from '../Titulo'
import ProductosLoad from '../ProductosLoad/'
import Lista from '../Lista'
import { useEffect, useState, useContext } from 'react'
import { CartContext } from '../../context/CartContext'
import { useParams } from 'react-router'
import { getCollection } from '../../utils/getFirestore'

const ItemListContainer = ()=> {

    const { id } = useParams()

    const { consultaDeCarrito, datosDelCarritoExistente } = useContext(CartContext)

    // console.log(consultaDeCarrito())



    const [productos, setProductos] = useState([])
    const [categs, setCategs] = useState([])
    const [items, setItems] = useState([])
    const [titulo, setTitulo] = useState()

    const getListItem = () => {
        getCollection('items').then((result) => {
            setProductos(result)
            setItems(result)
        })
        getCollection('categorias').then((result) => {
            setCategs(result)
        })
    }

    useEffect(() => {
        getListItem()
        console.log(consultaDeCarrito())
        console.log(datosDelCarritoExistente())
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    useEffect(() =>{
        const getsProductsPromise = new Promise((res, rej) => {
            if(id){
                const catsIds = categs.filter(cat => cat.categoria === id)
                const catId = catsIds.map((cat)=> cat.id)
                const productosFiltrados = productos.filter(e => e.categoria === `${catId}`)
                res(productosFiltrados)
            }
            res(productos)
        })
        getsProductsPromise.then((arrayp) => setItems(arrayp)).catch((err) => console.log(err))
        if(id){
            setTitulo(`${id}:`)
        } else {
            setTitulo('Nuestros productos:')
        }
    }, [id, productos, categs])

    return items.length > 0 ? (
        <main id="contenido">
            <div className="contenido__itemlistcontainer">
                <Titulo titulo={titulo} />
                <Lista lista={items} />
            </div>
        </main>
    ) : (
        <main id="contenido">
            <div className="contenido__itemlistcontainer--load">
                <div className='itemlistcontainer__load--titulo'></div>
                <ProductosLoad />
            </div>
        </main>
    )
}

export default ItemListContainer