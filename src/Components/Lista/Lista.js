

const Lista = (todoList)=> {
    const { lista } = todoList

    return (

        <div className="contenido__pruebaproductos--cont" id="contenido-pruebaproductos-contenedor">
            {lista.map((list)=>{
                return (
                    <div className="contenido__pruebaproductos--box" key={list.id}>
                        <p>Nombre: {list.nombre}</p>
                        <p>Descripción: {list.descripcion}</p>
                        <p>Stock: {list.stock}</p>
                    </div>
                )
            })}
        </div>



    )


}

export default Lista