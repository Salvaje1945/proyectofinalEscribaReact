import CartWidget from "../CartWidget"
import logo from "./floresya.png"
import { Link } from 'react-router-dom'
import { useState, useEffect } from 'react'

const NavBar = ({ categoria })=> {

    function dameElAnchoDePantalla() {
        return Math.max(
            document.documentElement.clientWidth,
            window.innerWidth || 0,
            document.body.clientWidth || 0
        )
    }
    const anchoPantalla = dameElAnchoDePantalla()

    let escritorio
    let mobil

    if(anchoPantalla < 768) {
        escritorio = false
        mobil = true
    } else {
        escritorio = true
        mobil = false
    }

    //console.log(anchoPantalla)

    const [menuDkp, setMenuDkp] = useState(escritorio)
    const [menuMob, setMenuMob] = useState(mobil)
    const [menuAbierto, setMenuAbierto] = useState(false)
    const [menuCerrado, setMenuCerrado] = useState(true)
    const [despAct, setDespAct] = useState('cabecera__nav--desp')

    const cerrarMenu = (evt)=> {
        //console.log(evt)
        setMenuAbierto(false)
    }

    const abrirMenu = (evt)=> {
        setMenuCerrado(false)
    }

    useEffect(()=>{

        if(menuCerrado === false) {
            setMenuAbierto(true)
            setDespAct('cabecera__nav--desp activo')
        }

    }, [menuCerrado])

    useEffect(()=>{

        if(menuAbierto === false) {
            setMenuCerrado(true)
            setDespAct('cabecera__nav--desp')
        }

    }, [menuAbierto])

    useEffect(()=>{

        window.addEventListener('resize', ()=> {
            const anchoDePantalla = dameElAnchoDePantalla()
            
            if(anchoDePantalla > 768){
                setMenuDkp(true)
                setMenuMob(false)
            } else {
                setMenuDkp(false)
                setMenuMob(true)
            }
            
        })

    }, [])

    return (
        <header id="cabecera">
                {menuMob && <div className={despAct}>
                    <ul>
                        <li>
                            <div className="cabecera__desp--cart">
                                <CartWidget />
                            </div>
                        </li>
                        <li><Link to={'/'} onClick={cerrarMenu}>Inicio</Link></li>
                        <li><Link to={'/catalogo'} onClick={cerrarMenu}>Catálogo</Link></li>
                        {categoria.map((cat) => (
                            <li key={cat.id}><Link to={`/categoria/${cat.categoria}`} onClick={cerrarMenu}>{cat.categoria}</Link></li>
                        ))}
                    </ul>
                </div>}
                <div className="cabecera__cont">
                    <div className="cabecera__cont--logo">
                        <Link to={'/'}><img src={logo} alt="Flores Ya" /></Link>
                    </div>
                    {menuDkp && <nav className="cabecera__cont--nav">
                        <div className="cabecera__cont--nav_box">
                            <ul>
                                <li><Link to={'/catalogo'}>Catálogo</Link></li>
                                {categoria.map((cat) => (
                                    <li key={cat.id}><Link to={`/categoria/${cat.categoria}`}>{cat.categoria}</Link></li>
                                ))}
                            </ul>
                            <div className="cabecera__cont--cart">
                                <CartWidget />
                            </div>
                        </div>
                    </nav>}
                    {menuMob && <div className="cabcera__cont--btn">{menuCerrado && <i className="bi bi-list" onClick={abrirMenu}></i>}{menuAbierto && <i className="bi bi-x-lg" onClick={cerrarMenu}></i>}</div>}
                </div>
           </header> 
    )
}

export default NavBar