import { useCount } from "./hook/useCount";
//import { useState, useEffect } from "react";

const ItemCount = ({ precio, maxCount, onChangeCount }) => {

    const { count, decrement, increment } = useCount(0, 0, maxCount)

    let accion

    const sumarProducto = ()=> {

        increment()
        //console.log('A ver qué valor pasa por count: ' + count)
        accion = 'sumar'
        if(count < maxCount){

            onChangeCount(count, accion)

        }
        
    }

    const restarProducto = ()=> {

        decrement()
        //console.log('A ver qué valor pasa por count: ' + count)
        accion = 'restar'
        if(count > 0){
            onChangeCount(count, accion)
        }
        
    }

    return (
        <div className="contenido__itemdetail--act">
            <div className="contenido__itemdetail--act_count">
                <div className="contenido__itemdetail--act_count-stock">
                    <p>Stock: {maxCount - count}</p>
                </div>
                <div className="contenido__itemdetail--act_count-act">
                    <div>
                        <button className="contenido__itemdetail--act_count-act_btn-sumrest" onClick={restarProducto}>
                            -
                        </button>
                        <p>{count}</p>
                        <button className="contenido__itemdetail--act_count-act_btn-sumrest" onClick={sumarProducto}>
                            +
                        </button>
                    </div>
                    <button className="contenido__itemdetail--act_count-act_btn-agregar">
                        Agregar ${precio * count} al carrito
                    </button>
                </div>
            </div>
            {/* ${precio * count} */}


            {/* <div>
                <button onClick={increment}>
                    +
                </button>
                <p>{count}</p>
                <button onClick={decrement}>
                    -
                </button>
            </div>
            <div>
                <button>
                    Agregar al carrito
                </button>
            </div> */}
        </div>
    );
};

export default ItemCount;