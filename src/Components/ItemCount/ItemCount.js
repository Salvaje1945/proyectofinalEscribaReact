import { useCount } from './hook/useCount'
import { useState, useEffect } from 'react'

const ItemCount = ({ maxCount, onChangeCount }) => {

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

    useEffect(()=> {
        if(maxCount === 0){
            setNoStock(true)
        } else {
            if(count === 0){
                sumarProducto()
            }
        }
    }, [])

    useEffect(()=> {
        if(count > 0){
            setBotonActivo(true)
        } else {
            setBotonActivo(false)
        }
    }, [count])

    return (
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
            {!noStock && <div className="contenido__itemdetail--act_cart">
                {botonActivo && <button className="contenido__itemdetail--act_count-act_btn-agregar">
                    AGREGAR ({count}) AL CARRITO
                </button>}
            </div>}
            {noStock && <div className="contenido__itemdetail--act_cart">
                <p>No hay stock de este producto</p>    
            </div>}    
        </div>
    )
}

export default ItemCount