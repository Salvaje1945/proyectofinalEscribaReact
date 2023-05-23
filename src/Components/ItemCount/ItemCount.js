import { useCount } from "./hook/useCount";

const ItemCount = ({ type, maxCount }) => {
    //document.q
    //const stock = maxCount
    //console.log(stock)
    const { count, decrement, increment } = useCount(1, 1, maxCount);
    //console.log(count)
    const options = Array.from({ length: maxCount }, (_, index) => index + 1)

    return (
        <div>
            {type === "button" && (
                <div>
                    <button onClick={increment}>
                        +
                    </button>
                    <p>{count}</p>
                    <button onClick={decrement}>
                        -
                    </button>
                </div>
            )}
            {type === "select" && (
                <select>
                    {options.map((option) => (
                        <option key={option} value={option}>
                            {option}
                        </option>
                    ))}
                </select>
            )}
            <div>
                <button>
                    Agregar al carrito
                </button>
            </div>
        </div>
    );
};

export default ItemCount;