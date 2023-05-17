import { useState } from "react"
//const { useState } = require('react')

export const componenteValidacion = (ComponenteEnvuelto) => {
    const ComponenteValidacion = (props) => {
        const [errors, setErrors] = useState({})

        const formValid = () => {
            const newErrors = {}
            if (!props.formData.nombre) {
                newErrors.nombre = 'Tu nombre es requerido, no re-querido, perri.'
            }
            if (!props.formData.correo) {
                newErrors.correo = 'Necesito tu correo, wacho.'
            }
            setErrors(newErrors)
        }

        return (
            <ComponenteEnvuelto
            {...props}
            errors={errors}
            validarForm={formValid}
            />
        )
    }

    return ComponenteValidacion
}