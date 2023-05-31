import placeholder from './productosload_placeholder.jpg'

const ProductosLoad = ()=> {

    return (
        <ul className="contenido__itemlist--cont">
            <li className="contenido__item--box">
                <div className="contenido__item--box_img-cont">
                    <img src={placeholder} alt="Cargando..." />
                </div>
                <div className='contenido__item--load_tit'></div>
                <div className='contenido__item--load_p'></div>
            </li>
            <li className="contenido__item--box">
                <div className="contenido__item--box_img-cont">
                    <img src={placeholder} alt="Cargando..." />
                </div>
                <div className='contenido__item--load_tit'></div>
                <div className='contenido__item--load_p'></div>
            </li>
            <li className="contenido__item--box">
                <div className="contenido__item--box_img-cont">
                    <img src={placeholder} alt="Cargando..." />
                </div>
                <div className='contenido__item--load_tit'></div>
                <div className='contenido__item--load_p'></div>
            </li>
            <li className="contenido__item--box">
                <div className="contenido__item--box_img-cont">
                    <img src={placeholder} alt="Cargando..." />
                </div>
                <div className='contenido__item--load_tit'></div>
                <div className='contenido__item--load_p'></div>
            </li>
        </ul>
    )

}

export default ProductosLoad