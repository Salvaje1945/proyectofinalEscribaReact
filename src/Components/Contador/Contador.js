import Titulo from '../Titulo'
import SubTitulo from '../SubTitulo'
import { useContador } from './hook/useContador'
//import { useEffect, useState } from 'react'

const Contador =()=>{
    const {contador, reset, sumar, restar} = useContador(0,0,10)

    const subTituloContador = `Usté lleva ${contador} clics y contando...`

    return (
        <div>
            <Titulo titulo='Contador' />
            <SubTitulo subtitulo={subTituloContador} />
            <div className='contenido__contador--botones'>
                <button className='contenido__contador--btn_aum' onClick={sumar}>
                    Aumentar
                </button>
                <button className='contenido__contador--btn_rest' onClick={restar}>
                    Restar
                </button>
                <button className='contenido__contador--btn_reset' onClick={reset}>
                    Resetear
                </button>
                {/* <button className='contenido__contador--btn_aum' onClick={mostrarContador}>
                    Mostrar
                </button>
                <button className='contenido__contador--btn_rest' onClick={ocultarContador}>
                    Ocultar
                </button> */}
            </div>
        </div>
    )
}

export default Contador