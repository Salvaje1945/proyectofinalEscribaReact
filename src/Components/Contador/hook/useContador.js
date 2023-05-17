import { useState } from "react"
export const useContador = (inicial = 0,min,max)=> {
    if(inicial < min || inicial > max) inicial = min
    const [contador, setContador] = useState(inicial)

    const reset = ()=> {
        setContador(inicial)
    }

    const sumar = ()=> {
        if(contador < max) setContador((prev)=> prev + 1)
    }

    const restar = ()=> {
        if(contador > min) setContador((prev)=> prev - 1)
    }

    return {contador, reset, sumar, restar}
}