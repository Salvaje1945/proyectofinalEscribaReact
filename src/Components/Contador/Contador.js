import SubTitulo from '../SubTitulo'
import { useEffect, useRef, useState } from 'react'

const Contador =()=>{
    const [contador, setContador] = useState(0)
    const [show, setShow] = useState(false)
    const [noCont, setNoCont] = useState(true)
    const textInput = useRef()

    //let siOno = true

    const mostrarContador = ()=> setShow(true)
    const ocultarContador = ()=> setShow(false)
    //const mostrarSumar = ()=> setNoCont(siOno)

    function mostrarSumar(estado){

        setNoCont(estado)

    }

    //const ocultarSumar = ()=> setNoCont(false)

    // const sumarSioNo = (cantidad)=> new Promise((resolve, reject)=>{
    //     if(cantidad <= 20){
    //         siOno = true
    //         resolve(siOno)
    //     }
    //     if(cantidad >= 21){
    //         siOno = false
    //         reject(siOno)
    //     }
        
    // })

    const focusTextInput = ()=> textInput.current.focus()

    const cambiarTextInput = ()=> textInput.current.value = 'A ver qué onda con esto'

    const restar = ()=>{
        if(contador > 0){
            setContador(contador - 1)
        }
    
    }


    // useEffect(()=>{

    //     console.log('Se activó mostrar/ocultar')

    // }, [show])

    useEffect(() => {

        // if(contador <= 20) {
        //     mostrarSumar(true)
        // } else {
        //     mostrarSumar(false)
        // }

        //console.log(contador)

        let siOno

        const sumarSioNo = (cantidad)=> new Promise((resolve, reject)=>{
            if(cantidad <= 20){
                siOno = true
                resolve(siOno)
            }
            if(cantidad >= 21){
                siOno = false
                reject(siOno)
            }
            
        })

        sumarSioNo(contador).then(result =>{
            mostrarSumar(result)
        }).catch(error =>{
            mostrarSumar(error)
        }).finally(()=>{
            console.log('Promesa finalizada, comete esta **** con ensalada.')
        })



    }, [contador])

    const subTituloContador = `Usté lleva ${contador} clics y contando...`

    // const tarea = new Promise((resolve, reject)=>{
    //     // resolve('Esto anda bien')
    //     reject('Error: esto no anda bien.')
    // })

    // const tarea = (edad)=> new Promise((resolve, reject)=>{
    //     console.log(edad)
    //     if(edad >= 18){
    //         resolve('Puede entrar')
    //     } else {
    //         reject('No puede por pubertario')
    //     }
        
        
    // })

    // const tareaDos = ()=> console.log('Esto debería andar. Probemos:')
    // tareaDos()
    // tarea(78).then(result =>{
    //     console.log(result)
    // }).catch(error =>{
    //     console.log(error)
    // })
    

    return (
        <div>
            {show && <SubTitulo subtitulo={subTituloContador} />}
            <div className='contenido__contador--botones'>
                {noCont && <button className='contenido__contador--btn_aum' onClick={()=> setContador(contador + 1)}>
                    Aumentar
                </button>}
                <button className='contenido__contador--btn_rest' onClick={restar}>
                    Restar
                </button>
                <button className='contenido__contador--btn_reset' onClick={()=> setContador(0)}>
                    Resetear
                </button>
                <button className='contenido__contador--btn_aum' onClick={mostrarContador}>
                    Mostrar
                </button>
                <button className='contenido__contador--btn_rest' onClick={ocultarContador}>
                    Ocultar
                </button>
            </div>
            <div><input type="text" ref={textInput} className='contenido__contador--ipt'/></div>
            <div><input type="button" value='Hacé foco en el input.' className='contenido__contador--btn_otro' onClick={focusTextInput} /></div>
            <div><input type="button" value='Agregale texto al input.' className='contenido__contador--btn_otro' onClick={cambiarTextInput} /></div>
        </div>
    )
}

export default Contador