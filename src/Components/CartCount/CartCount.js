import { useCount } from '../ItemCount/hook/useCount'
import { useEffect } from 'react'

const CartCount = ({ initVal, maxCount, idp })=> {

    const { count, decrement, increment, reset } = useCount(initVal, 0, maxCount)

    useEffect(()=> {

        if(initVal > 0) {
            reset()
        }

    }, [initVal])

    return (
        <div>
            <div>
                <button onClick={decrement}>
                    -
                </button>
            </div>
            <div>
                <p>{count} - {idp}</p>
            </div>
            <div>
                <button onClick={increment}>
                    +
                </button>
            </div>
        </div>
    )

}

export default CartCount