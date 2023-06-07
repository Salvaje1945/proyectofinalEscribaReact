import { useCount } from './hook/useCount'
import { useState, useEffect } from 'react'

const ItemCount = ({ initVal, maxCount, onChangeCount, onClickAddCart, onClickUpdateCart, onClickDeleteCart }) => {
    console.log('INITVAL: ')
    console.log(initVal)
    console.log(typeof initVal)
    console.log('*********************************')
    console.log('MAXCOUNT: ')
    console.log(maxCount)
    console.log(typeof maxCount)
    console.log('*********************************')

    const { count, decrement, increment, reset } = useCount(initVal, 0, maxCount)

    const [botonActivo, setBotonActivo] = useState(false)

    const [botonActualizar, setBotonActualizar] = useState(false)
    
    const [botonEliminar, setBotonEliminar] = useState(false)

    const [noStock, setNoStock] = useState(false)

    console.log('COUNT: ')
    console.log(count)
    console.log(typeof count)
    console.log('*********************************')

    let accion

    const sumarProducto = ()=> {
        increment()
        accion = 'sumar'
        if(count < maxCount){

            onChangeCount(count, accion)

        }
    }

    const restarProducto = ()=> {
        decrement()
        accion = 'restar'
        if(count > 0){
            onChangeCount(count, accion)
        }
    }

    const agregarAlCarrito = () => {
        onClickAddCart(count)
    }

    const actualizameElCarrito = () => {
        onClickUpdateCart(count)
    }

    const eliminarDelCarrito = () => {
        onClickDeleteCart()
    }

    const sinEstoc = ()=> {
        if(maxCount === 0){
            setNoStock(true)
        } else {
            if(count === 0){
                sumarProducto()
            }
        }
    }

    useEffect(()=> {
        sinEstoc()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    useEffect(()=> {
        if(count > 0){
            if(initVal > 0) {
                setBotonActualizar(true)
                setBotonEliminar(false)
            } else {
                setBotonActivo(true)
            }
            
        } else {
            if(initVal > 0){
                setBotonActualizar(false)
                setBotonEliminar(true)
            }
            setBotonActivo(false)
        }
    }, [count])

    useEffect(()=> {

        if(initVal > 0) {
            reset()
            setBotonActivo(false)
            setBotonActualizar(true)
        }

    }, [initVal])

    return noStock ? (
        <div className="contenido__itemdetail--act">
            <p>No hay stock de este producto</p>
        </div>
    ) : (
        <div className="contenido__itemdetail--act">
            <div className="contenido__itemdetail--act_count">
                <div>
                    <button className="contenido__itemdetail--act_count-act_btn-sumrest" onClick={restarProducto}>
                        -
                    </button>
                    <p>{count}</p>
                    <button className="contenido__itemdetail--act_count-act_btn-sumrest" onClick={sumarProducto}>
                        +
                    </button>
                </div>
            </div>
            <div className="contenido__itemdetail--act_cart">
                {botonActivo && <button className="contenido__itemdetail--act_count-act_btn-agregar" onClick={agregarAlCarrito}>
                    AGREGAR ({count}) AL CARRITO
                </button>}
                {botonActualizar && <button className="contenido__itemdetail--act_count-act_btn-agregar" onClick={actualizameElCarrito}>
                    ACTUALIZAR ({count}) EL CARRITO
                </button>}
                {botonEliminar && <button className="contenido__itemdetail--act_count-act_btn-agregar" onClick={eliminarDelCarrito}>
                    ELIMINAR DEL CARRITO
                </button>}
            </div>
        </div>
    )
}

export default ItemCount