import CartWidget from "../CartWidget"
import logo from "./floresya.png"
import { Link } from 'react-router-dom'

function NavBar() {
    return <header id="cabecera">
                <div className="cabecera__cont">
                    <nav className="cabecera__cont--nav">
                        <ul>
                            <li><Link to={'/'}><img src={logo} alt="Flores Ya" /></Link></li>
                            <li><Link to={'/catalogo'}>Catálogo</Link></li>
                            <li><Link to={'/categoria/Flores'}>Flores</Link></li>
                            <li><Link to={'/categoria/Decoración'}>Decoración</Link></li>
                            <li><Link to={'/categoria/Plantas'}>Plantas</Link></li>
                            <li><Link to={'/categoria/Insumos'}>Insumos</Link></li>
                        </ul>
                    </nav>
                    <CartWidget />
                </div>
           </header> 
}

export default NavBar