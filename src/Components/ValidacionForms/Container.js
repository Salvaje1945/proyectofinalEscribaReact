import { useState } from "react"
import { componenteValidacion } from "./ComponenteValidacion"
import { Formulario } from "./Formulario"

const FormularioComponenteValidacion = componenteValidacion (Formulario)

const Container = ()=>{
    
    const [formData, setFormData] = useState({
        nombre:'',
        correo:''
    })

    function manejoCambio(evt){
        setFormData({
            ...formData,
            [evt.target.name]: evt.target.value
        })
    }

    return(
        <div>
            <FormularioComponenteValidacion formData={formData} onChange={manejoCambio}/>
        </div>
    )
}

export default Container