import CartWidget from "../CartWidget"
import logo from "./floresya.png"

function NavBar() {
    return <div className="cabecera__cont">
                <nav className="cabecera__cont--nav">
                    <ul>
                        <li><a href="index.html"><img src={logo} alt="Flores Ya" /></a></li>
                        <li><a href="index.html">Inicio</a></li>
                        <li><a href="opcion1.html">Opción 1</a></li>
                        <li><a href="opcion2.html">Opción 2</a></li>
                    </ul>
                </nav>
                <CartWidget />
            </div>
}

export default NavBar