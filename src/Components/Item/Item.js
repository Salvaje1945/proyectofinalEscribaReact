import ItemCount from '../ItemCount'
import { useContext } from 'react'
// import { useContext, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { CartContext } from '../../context/CartContext'
import { crearNuevoCarrito, actualizarCarrito } from '../../utils/crearActualizarCarritos'
// import { getCarrito } from '../../utils/getFirestore'


const Item = ({ id, nom, desc, cat, pre, stock, pic })=> {

    const { addProductCant, restProductCant, consultaDeCarrito, datosDelCarritoExistente, elUsuario, nuevoCarritoCreado } = useContext(CartContext)


    const navegar = useNavigate()

    const idDeUsuario = elUsuario()

    const carritoVerif = consultaDeCarrito()

    const datosCarritoExist = datosDelCarritoExistente()


    // useEffect(() => {

    //     console.log(datosCarritoExist.id)
    //     console.log(datosCarritoExist.totalcant)

    //     console.log(productosEnCarritoExist)

    //     setCarritoExistItems(...productosEnCarritoExist)

    //     //console.log(productosEnCarritoExist.cant)
        
    //     //eslint-disable-next-line react-hooks/exhaustive-deps
    // }, [])

    

    //const usuarioId = 'VZMeW8qeWSNplaZju9de'

    // const [existeCarrito, setExisteCarrito] = useState()

    // useEffect(() => {
    //     getCollection('carritos').then((result) => {
    //         console.log(result)
    //         const verificarCarrito = result.some(carrito => carrito.idu === usuarioId)
    //         //console.log(verificarCarrito)
    //         setExisteCarrito(verificarCarrito)
    //         //console.log(existeCarrito)
    //       })
    // }, [])

    // console.log(existeCarrito)

    // const [prodOutOfCart, setProdOutOfCart] = useState(true)

    const manejadorCount = (count, accion)=> {
        if(accion === 'sumar'){
            addProductCant(count)
        }
        if(accion === 'restar'){
            restProductCant(count)
        }
    }

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

        

        
        console.log(prodParaAgregar)

        if(!carritoVerif){

            crearNuevoCarrito(prodParaAgregar).then((result)=> {
                console.log(`se generó el siguiente carrito: ${result}`)
            })
            nuevoCarritoCreado()

        } else {
            const cantidadTotal = datosCarritoExist.totalcant + count
            const precioTotal = datosCarritoExist.totalimp + elementoPrecio

            console.log('--------------')
            console.log('supuesta cantidad total: ', cantidadTotal)
            console.log('--------------')
            console.log('cantidad del carrito: ', datosCarritoExist.totalcant)
            console.log('--------------')
            console.log('contador: ', count)
            console.log('--------------')
            // datosCarritoExist.id

            actualizarCarrito('carritos', datosCarritoExist.id, prodParaActualizar, cantidadTotal, precioTotal);
            
            
        }

        //crearCarrito(prodParaAgregar)
        // crearNuevoCarrito(prodParaAgregar).then((result)=> {
        //     console.log(`se generó el siguiente carrito: ${result}`)
        // })
        //carritoTotalCant(count)
        navegar('/carrito/probando-carrito')
    }
    
    // const actualizarCarrito = (count) => {
    //     updateOrder(id, count)
    // }

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
                <p className="contenido__itemdetail--txt_prec">${pre} x 1</p>
            </div>
            {/* <ItemCount maxCount={stock} onChangeCount={(a, b)=> manejadorCount(a, b)} onClickAddCart={(e) => agregarAlCarrito(e)} onClickUpdateCart={(e) => actualizarCarrito(e)} /> */}
            <ItemCount maxCount={stock} onChangeCount={(a, b)=> manejadorCount(a, b)} onClickAddCart={(e) => agregarAlCarrito(e)} />
        </div>
    )
}

export default Item