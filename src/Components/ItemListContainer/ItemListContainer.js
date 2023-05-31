import Titulo from '../Titulo'
import ProductosLoad from '../ProductosLoad/';
import Lista from '../Lista'
import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { getCollection } from "../../utils/getFirestore";

const ItemListContainer = ()=> {

    const { id } = useParams()

    const [productos, setProductos] = useState([])
    const [categs, setCategs] = useState([])
    const [items, setItems] = useState([])
    const [titulo, setTitulo] = useState()

    const getListItem = () => {
        getCollection("items").then((result) => {
            console.log('El RESULT DE PRODUCTOS:')
            console.log(result)
            console.log('------------------')
            setProductos(result)
            setItems(result)
            
        })

        getCollection('categorias').then((result) => {
            console.log('El RESULT DE CATEGORÍAS:')
            console.log(result)
            console.log('------------------')
            setCategs(result)
        })
    }

    // const getListCategs = () => {
    //     getCollection('categorias').then((result) => {
    //         console.log('El RESULT DE CATEGORÍAS:')
    //         console.log(result)
    //         console.log('------------------')
    //         setCategs(result)
    //     })
    // }

    useEffect(() => {
        getListItem()
        // getListCategs()
    }, []);

    useEffect(() =>{
        const getsProductsPromise = new Promise((res, rej) => {

            if(id){

                const catsIds = categs.filter(cat => cat.categoria === id)
                console.log('catsIds CRUDO: ' + catsIds)
                const catId = catsIds.map((cat)=> cat.id)
                console.log('el ID de la CAT: ' + catId)
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

    // useEffect(() => {
    //     getListItem.then((res) => {
    //         const producto = res.lesprods;
    //         if (id) {
    //             const productoFiltrado = producto.filter(
    //                 (prod) => prod.category == categoryId || categoryId == 0
    //             );
    //             setProduct(productoFiltrado);
    //             return;
    //         }
    //         setProductos(producto);
    //     });
    //     if (id) {
    //         setTitulo(`${id}:`)
    //     } else {
    //         setTitulo('Nuestros productos:')
    //     }
    // }, [id, productos, categs]);

    // useEffect(() => {
    //     const getsProductsPromise = new Promise((res, rej) => {
            
    //         if (id) {
    //             const catsIds = categs.filter(cat => cat.categoria === id)
    //             console.log('catsIds CRUDO: ' + catsIds)
    //             const catId = catsIds.map((cat)=> cat.id)
    //             console.log('el ID de la CAT: ' + catId)
                
    //             const productosFiltrados = productos.filter(e => e.categoria === catId)
    //             console.log('PRODUCTOS FILTRADOS: ' + productosFiltrados)
    //             res(productosFiltrados);
    //         }
    //         res(productos)
    //     });

    //     getsProductsPromise.then((arrayp) => setItems(arrayp)).catch((err) => console.log(err));
        
    //     if (id) {
    //         setTitulo(`${id}:`)
    //     } else {
    //         setTitulo('Nuestros productos:')
    //     }
    // }, [id, productos, categs]);



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
    );
    
    // return (
    //     <main id="contenido">
    //             <div className="contenido__itemlistcontainer">
    //                 <Titulo titulo = {titulo} />
    //                 <Lista lista = {items} />
    //             </div>
    //         </main>
    // )
}

export default ItemListContainer