import ItemCount from '../ItemCount'
import { useContext, useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { CartContext } from '../../context/CartContext'
import { crearNuevoCarrito, actualizarCarrito, actualizarProductoDeCarrito, eliminarProductoDeCarrito } from '../../utils/crearActualizarCarritos'
// import { getCarrito } from '../../utils/getFirestore'


const Item = ({ id, nom, desc, cat, pre, stock, pic })=> {

    const { addProductCant, consultaDeCarrito, datosDelCarritoExistente, elUsuario, nuevoCarritoCreado, actualizarCarritoExistente } = useContext(CartContext)

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

            console.log('Componente Items, datos del carrito existente primer renderizado: ', datosCarritoExist)

            console.log('Componente Items, items del carrito existente: ', datosCarritoExist.items)

            const coincidenciaProductoEnCarrito = datosCarritoExist.items.some(item => item.idp === id)

            console.log(coincidenciaProductoEnCarrito)

            if(coincidenciaProductoEnCarrito){
                const productoExistenteEnCarrito = datosCarritoExist.items.find(item => item.idp === id)

                console.log('el producto coincidente: ', productoExistenteEnCarrito)

                console.log('la cantidad del producto coinc...: ', productoExistenteEnCarrito.cant)
                console.log(typeof productoExistenteEnCarrito.cant)

                valorInicio = productoExistenteEnCarrito.cant

                console.log('A ver si se cambió el puto valor inicial: ', valorInicio)

            } else {
                valorInicio = 0
            }  

        } else {
            valorInicio = 0
        }

        console.log('valor inicial después de todos los condicionales: ', valorInicio)

        setValorInicialCount(valorInicio)
        
        //eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const manejadorCount = (count, accion)=> {
        if(accion === 'sumar'){
            //addProductCant(count)
            console.log(`sumado ${count} producto`)
        }
        if(accion === 'restar'){
            //restProductCant(count)
            console.log(`restado ${count} producto`)
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
        console.log('qué onda con carritoverif: ', carritoVerif)

        if(!carritoVerif){

            crearNuevoCarrito(prodParaAgregar).then((result)=> {
                console.log(`se generó el siguiente carrito: ${result}`)
            })
            nuevoCarritoCreado()
            addProductCant(count)
            actualizarCarritoExistente()

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

            actualizarCarrito('carritos', datosCarritoExist.id, prodParaActualizar, cantidadTotal, precioTotal)

            if(actualizarCarrito){
                console.log('actualizado...')
                addProductCant(cantidadTotal)

                //actualizarCarritoExistente()
            } else {
                console.log('¿Qué onda?')
            }
            
        }

        navegar('/carrito/probando-carrito')
    }

    const actualizarProdCarrito = (count) => {

        console.log('actualizar este item con esta cantidad: ', count)

        console.log('Datos del carrito: ', datosCarritoExist)

        console.log('Items del carrito: ', datosCarritoExist.items)

        // DATOS VIEJOS

        console.log('DATOS VIEJOS: ')

        const exTotalCant = datosCarritoExist.totalcant
        console.log('Vieja cantidad total: ', exTotalCant)
        const exTotalImp = datosCarritoExist.totalimp
        console.log('Viejo importe total: ', exTotalImp)
        const datosItem = datosCarritoExist.items.find(item => item.idp === id)
        console.log('Datos del producto: ', datosItem)
        const exCant = datosItem.cant
        console.log('Vieja cantidad del item: ', exCant)
        const exImp = datosItem.imp
        console.log('Viejo importe del item: ', exImp)

        // ********************

        // CÁLCULOS

        console.log('CÁLCULOS: ')

        const provTotalCant = exTotalCant - exCant
        console.log('Cantidad total sin este item: ', provTotalCant)
        const provTotalImp = exTotalImp - exImp
        console.log('Importe total sin este item: ', provTotalImp)

        // ********************

        // NUEVOS DATOS

        console.log('NUEVOS DATOS: ')

        // const newCant = count

        const newImp = pre * count
        console.log('Nuevo importe del item: ', newImp)
        const newTotalCant = provTotalCant + count
        console.log('Nueva cantidad total del carrito: ', newTotalCant)
        const newTotalImp = provTotalImp + newImp
        console.log('Nuevo importe total del carrito: ', newTotalImp)

        // ********************

        const datosActualizacion = {
            cant: count,
            imp: newImp,
            cantTotal: newTotalCant,
            impTotal: newTotalImp,
        }

        actualizarProductoDeCarrito('carritos', datosCarritoExist.id, id, datosActualizacion)

        if(actualizarProductoDeCarrito){
            console.log('actualizando...')
            addProductCant(newTotalCant)
            navegar('/carrito/probando-carrito')
        } else {
            console.log('¿Qué onda?')
        }

    }

    const eliminarProdCarrito = () => {

        console.log('eliminar el siguiente producto: ', id)

        // DATOS VIEJOS

        console.log('DATOS VIEJOS: ')

        const exTotalCant = datosCarritoExist.totalcant
        console.log('Vieja cantidad total: ', exTotalCant)
        const exTotalImp = datosCarritoExist.totalimp
        console.log('Viejo importe total: ', exTotalImp)
        const datosItem = datosCarritoExist.items.find(item => item.idp === id)
        console.log('Datos del producto: ', datosItem)
        const exCant = datosItem.cant
        console.log('Vieja cantidad del item: ', exCant)
        const exImp = datosItem.imp
        console.log('Viejo importe del item: ', exImp)

        // ********************

        // CÁLCULOS

        console.log('NUEVOS DATOS: ')

        const newTotalCant = exTotalCant - exCant
        console.log('Cantidad total sin este item: ', newTotalCant)
        const newTotalImp = exTotalImp - exImp
        console.log('Importe total sin este item: ', newTotalImp)

        // ********************

        eliminarProductoDeCarrito('carritos', datosCarritoExist.id, id, newTotalCant, newTotalImp)

        if(eliminarProductoDeCarrito){
            console.log('eliminando...')
            addProductCant(newTotalCant)
            navegar('/carrito/probando-carrito')
        } else {
            console.log('¿Qué onda?')
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
            {/* <ItemCount maxCount={stock} onChangeCount={(a, b)=> manejadorCount(a, b)} onClickAddCart={(e) => agregarAlCarrito(e)} onClickUpdateCart={(e) => actualizarCarrito(e)} /> */}
            <ItemCount initVal={valorInicialCount} maxCount={stock} onChangeCount={(a, b)=> manejadorCount(a, b)} onClickAddCart={(e) => agregarAlCarrito(e)} onClickUpdateCart={(e) => actualizarProdCarrito(e)} onClickDeleteCart={() => eliminarProdCarrito()} />
        </div>
    )
}

export default Item