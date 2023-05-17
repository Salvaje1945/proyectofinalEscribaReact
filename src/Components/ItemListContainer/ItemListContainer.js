import Titulo from '../Titulo'
import Lista from '../Lista'
//import ItemDetail from '../ItemDetail'
//import PruebaProductos from '../PruebaProductos'
//import ItemDetail from '../ItemDetail'
import { useEffect, useState } from "react";
import { useParams } from "react-router";

const ItemListContainer = (props)=> {
    const { listaProds } = props

    console.log(listaProds)

    const { id } = useParams()

    console.log(id)

    const tituloItemListCont = 'Nuestros productos:'

    const [productos, setProductos] = useState([]);
  
    useEffect(() => {
        const getsProductsPromise = new Promise((res, rej) => {
            if(id){
                const productosFiltrados = listaProds.filter(e => e.categoria === id)
                res(productosFiltrados);
              }
              res(listaProds)
          });

        getsProductsPromise.then((arrayp) => setProductos(arrayp)).catch((err) => console.log(err));
    }, [id]);

  



    return <main id="contenido">
                <div>
                    <div className="contenido__itemlistcontainer">
                        <Titulo titulo = {tituloItemListCont} />
                        <Lista lista = {productos} />
                    </div>
                </div>
            </main>
}

export default ItemListContainer