export const Formulario = ({ formData, errors, validarForm, onChange }) => {

    function manejoEnvio(evt) {
        evt.preventDefault()
        validarForm && validarForm()
    }

    return (
        <form onSubmit={manejoEnvio}>
            <div>
                <label>Nombre</label>
                <input type='text' name='nombre' value={formData.nombre} onChange={(e) => onChange(e)} />
                {errors && errors.nombre && <div>{errors.nombre}</div>}
            </div>
            <div>
                <label>Correo</label>
                <input type='text' name='correo' value={formData.correo} onChange={(e) => onChange(e)} />
                {errors && errors.correo && <div>{errors.correo}</div>}
            </div>
            <button type='submit'>Enviar</button>
        </form>
    )

}