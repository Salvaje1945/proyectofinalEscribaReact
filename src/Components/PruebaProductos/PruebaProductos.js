import SubTitulo from "../SubTitulo"

const misProductos = []

const PruebaProductos = () => {

    function obtenerProductos() {
        return fetch("http://localhost:3001/productos")
            .then(response => {
                if (!response.ok) {
                    throw new Error("No se pudo obtener la lista de productos");
                }
                return response.json();
            })
            .then(productos => {
                return productos.map(producto => ({
                    id: producto.id,
                    nombre: producto.nombre,
                    descripcion: producto.descripcion,
                    stock: producto.stock
                }));
            });
    }

    obtenerProductos().then(productos => {
        // productos.forEach(producto => {
        //     console.log(producto);
        // });

        for (const producto of productos) {
            misProductos.push(producto)
        }
    }).catch(error => {
        console.error("Ocurrió un error al obtener los productos:", error);
    });

    console.log(misProductos)

    function mostrarProductos() {
        console.log('¿Hola?')
        for(const prod of misProductos){
            const elProd = document.createElement('div')
            elProd.className = 'contenido__pruebaproductos--box'
            elProd.innerHTML = `<p>${prod.nombre}</p>
                                <p>${prod.descripcion}</p>
                                <p>${prod.stock}</p>`
            
            const productoContenedor = document.querySelector('#contenido-pruebaproductos-contenedor')
            console.log('sorongo')
            productoContenedor.appendChild(elProd)
        }
    }

    mostrarProductos()
        

    return <div className="contenido__pruebaproductos">
        <SubTitulo subtitulo='Productos' />
        <div className="contenido__pruebaproductos--cont" id="contenido-pruebaproductos-contenedor">
            {/* <div className="contenido__pruebaproductos--box">Caca</div>
            <div className="contenido__pruebaproductos--box">Culo</div>
            <div className="contenido__pruebaproductos--box">Pedo-pis</div> */}
        </div>
    </div>
}

export default PruebaProductos