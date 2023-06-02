import imagencarga from './itemload_placeholder.jpg'

const ItemLoad = ()=> {

    return (
        <div className="contenido__itemdetail--load">
            <div className="contenido__itemdetail--nav"></div>
            <div className="contenido__itemdetail--img">
                <img src={imagencarga} alt="Cargando..." />
            </div>
            <div className="contenido__itemdetail--txt">
                <div className='contenido__itemdetail--load_h1'></div>
            </div>
            <div className="contenido__itemdetail--act"></div>
        </div>
    )

}

export default ItemLoad