import ItemCount from '../ItemCount'
import { useContext, useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { CartContext } from '../../context/CartContext'
import { crearNuevoCarrito, actualizarCarrito, actualizarProductoDeCarrito, eliminarProductoDeCarrito } from '../../utils/crearActualizarCarritos'


const Item = ({ id, nom, desc, cat, pre, stock, pic })=> {

    const { addProductCant, consultaDeCarrito, datosDelCarritoExistente, elUsuario, nuevoCarritoCreado, actualizarCarritoExistente, carritoEliminado } = useContext(CartContext)

    const [valorInicialCount, setValorInicialCount] = useState(0)

    const navegar = useNavigate()

    const idDeUsuario = elUsuario()

    const carritoVerif = consultaDeCarrito()

    const datosCarritoExist = datosDelCarritoExistente()


    useEffect(() => {

        let valorInicio

        actualizarCarritoExistente()

        if(carritoVerif){

            actualizarCarritoExistente()

            const coincidenciaProductoEnCarrito = datosCarritoExist.items.some(item => item.idp === id)

            if(coincidenciaProductoEnCarrito){
                const productoExistenteEnCarrito = datosCarritoExist.items.find(item => item.idp === id)

                valorInicio = productoExistenteEnCarrito.cant

            } else {
                valorInicio = 0
            }  

        } else {
            valorInicio = 0
        }

        setValorInicialCount(valorInicio)
        
        //eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const agregarAlCarrito = (count) => {
        const elementoPrecio = pre * count
        const prodParaAgregar = {
            idp: id,
            idu: idDeUsuario,
            nombre: nom,
            cantidad: count,
            importe: elementoPrecio,
            totalcant: count,
            totalimp: elementoPrecio,
        }

        const prodParaActualizar = {

            idp: id,
            nom: nom,
            cant: count,
            imp: elementoPrecio,

        }

        if(!carritoVerif){

            crearNuevoCarrito(prodParaAgregar).then((result) => {
                console.log(`Se generó el siguiente carrito: ${result}`);
                nuevoCarritoCreado()
                addProductCant(count)
                actualizarCarritoExistente()
                navegar(`/carrito/${result}`)
            }).catch((error) => {
                console.log('Error al crear el carrito:', error);
            })

        } else {
            const cantidadTotal = datosCarritoExist.totalcant + count
            const precioTotal = datosCarritoExist.totalimp + elementoPrecio

            actualizarCarrito('carritos', datosCarritoExist.id, prodParaActualizar, cantidadTotal, precioTotal)

            if(actualizarCarrito){
                addProductCant(cantidadTotal)
                actualizarCarritoExistente()
                navegar(`/carrito/${datosCarritoExist.id}`)
            }
            
        }

    }

    const actualizarProdCarrito = (count) => {

        const exTotalCant = datosCarritoExist.totalcant
        const exTotalImp = datosCarritoExist.totalimp
        const datosItem = datosCarritoExist.items.find(item => item.idp === id)
        const exCant = datosItem.cant
        const exImp = datosItem.imp

        const provTotalCant = exTotalCant - exCant
        const provTotalImp = exTotalImp - exImp

        const newImp = pre * count
        const newTotalCant = provTotalCant + count
        const newTotalImp = provTotalImp + newImp

        const datosActualizacion = {
            cant: count,
            imp: newImp,
            cantTotal: newTotalCant,
            impTotal: newTotalImp,
        }

        actualizarProductoDeCarrito('carritos', datosCarritoExist.id, id, datosActualizacion)

        if(actualizarProductoDeCarrito){
            addProductCant(newTotalCant)
            actualizarCarritoExistente()
            navegar(`/carrito/${datosCarritoExist.id}`)
        }

    }

    const eliminarProdCarrito = () => {

        const exTotalCant = datosCarritoExist.totalcant
        const exTotalImp = datosCarritoExist.totalimp
        const datosItem = datosCarritoExist.items.find(item => item.idp === id)
        const exCant = datosItem.cant
        const exImp = datosItem.imp

        const newTotalCant = exTotalCant - exCant
        const newTotalImp = exTotalImp - exImp

        eliminarProductoDeCarrito('carritos', datosCarritoExist.id, id, newTotalCant, newTotalImp)

        if(eliminarProductoDeCarrito){
            addProductCant(newTotalCant)
            actualizarCarritoExistente()
            if(newTotalCant === 0) {
                carritoEliminado()
                navegar('/carrito/eliminado')
            } else {
                navegar(`/carrito/${datosCarritoExist.id}`)
            }
        }
    }

    return (
        <div className="contenido__itemdetail--cont">
            <nav className="contenido__itemdetail--nav">
                <ul>
                    <li><Link to={'/'} >Inicio</Link> /</li>
                    <li><Link to={'/catalogo'} >Catálogo</Link> /</li>
                    {cat ? <li><Link to={`/categoria/${cat}`}>{cat}</Link></li> : null}
                </ul>
            </nav>
            <div className="contenido__itemdetail--img"><img src={pic} alt={nom} /></div>
            <div className="contenido__itemdetail--txt">
                <h1>{nom}</h1>
                <p className="contenido__itemdetail--txt_desc">{desc}</p>
                <p className="contenido__itemdetail--txt_prec">${pre} x 1({valorInicialCount})</p>
            </div>
            <ItemCount initVal={valorInicialCount} maxCount={stock} onClickAddCart={(e) => agregarAlCarrito(e)} onClickUpdateCart={(e) => actualizarProdCarrito(e)} onClickDeleteCart={() => eliminarProdCarrito()} />
        </div>
    )
}

export default Item