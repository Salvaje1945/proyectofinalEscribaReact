

const ItemDetail = (props)=>{

    const { id, nombre, descripcion, stock } = props

    return (
        // <div className="contenido__pruebaproductos--box" key={id}>
        //     {/* <div><img src={imgurl} width={100} height={100} /></div> */}
        //     <div >
        //         <p>{nombre}</p>
        //         <p>{descripcion}</p>
        //         <p>{stock}</p>
        //     </div>
        // </div>
        <li className="contenido__pruebaproductos--box" key={id}>
            <p>{nombre}</p>
            <p>{descripcion}</p>
            <p>{stock}</p>
        </li>
    )

}

export default ItemDetail