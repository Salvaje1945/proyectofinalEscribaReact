import { useCount } from './hook/useCount'
import { useState, useEffect } from 'react'

const ItemCount = ({ maxCount, onChangeCount, onClickAddCart }) => {

    const { count, decrement, increment } = useCount(0, 0, maxCount)

    const [botonActivo, setBotonActivo] = useState(false)

    const [noStock, setNoStock] = useState(false)

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
            setBotonActivo(true)
        } else {
            setBotonActivo(false)
        }
    }, [count])

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
            </div>
        </div>
    )
}

export default ItemCount