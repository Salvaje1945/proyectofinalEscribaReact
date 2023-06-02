import ProductoTitulo from '../ProductoTitulo'
import { Link } from 'react-router-dom'

const Lista = (todoList)=> {
    const { lista } = todoList
    const listaOrdenada = [...lista].sort((a, b) => a.nombre.localeCompare(b.nombre))

    return (
        <ul className="contenido__itemlist--cont">
            {listaOrdenada.map((list)=>{
                return (
                    <li className="contenido__item--box" key={list.id}>
                        <Link to={`/productos/${list.id}`}>
                            <div className="contenido__item--box_img-cont"><img src={list.foto} alt={list.nombre} /></div>
                            <ProductoTitulo nombre={list.nombre} />
                            <p>${list.precio}</p>
                        </Link>
                    </li>
                )
            })}
        </ul>
    )
}

export default Lista