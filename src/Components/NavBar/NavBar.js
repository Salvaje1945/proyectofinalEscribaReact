import CartWidget from '../CartWidget'
import logo from './floresya.png'
import { Link } from 'react-router-dom'
import { useState, useEffect, useContext } from 'react'
import { CartContext } from '../../context/CartContext'

const NavBar = ({ categoria })=> {

    const { resetProductCant, consultaCarritos } = useContext(CartContext)

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

    const [menuDkp, setMenuDkp] = useState(escritorio)
    const [menuMob, setMenuMob] = useState(mobil)
    const [menuAbierto, setMenuAbierto] = useState(false)
    const [menuCerrado, setMenuCerrado] = useState(true)
    const [despAct, setDespAct] = useState('cabecera__nav--desp')

    const cerrarMenu = ()=> {
        setMenuAbierto(false)
    }

    const abrirMenu = ()=> {
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

    const verCarritos = ()=> {
        const resultCarrito = consultaCarritos('VZMeW8qeWSNplaZju9de')
        console.log(resultCarrito)
        if(!resultCarrito){
            resetProductCant()
        }
    }

    return (
        <header id="cabecera">
            {menuMob && <div className={despAct}>
                <ul>
                    <li>
                        <CartWidget clase={'cabecera__desp--cart'} />
                    </li>
                    <li><Link to={'/'} onClick={(e)=> {verCarritos()
                        cerrarMenu()
                        e.stopPropagation()}}>Inicio</Link></li>
                    <li><Link to={'/catalogo'} onClick={(e)=> {verCarritos()
                        cerrarMenu()
                        e.stopPropagation()}}>Catálogo</Link></li>
                    {categoria.map((cat) => (
                        <li key={cat.id}><Link to={`/categoria/${cat.categoria}`} onClick={(e)=> {verCarritos()
                        cerrarMenu()
                        e.stopPropagation()}}>{cat.categoria}</Link></li>
                    ))}
                </ul>
            </div>}
            <div className="cabecera__cont">
                <div className="cabecera__cont--logo">
                    <Link to={'/'} onClick={verCarritos}><img src={logo} alt="Flores Ya" /></Link>
                </div>
                {menuDkp && <nav className="cabecera__cont--nav">
                    <div className="cabecera__cont--nav_box">
                        <ul>
                            <li><Link to={'/catalogo'} onClick={verCarritos}>Catálogo</Link></li>
                            {categoria.map((cat) => (
                                <li key={cat.id}><Link to={`/categoria/${cat.categoria}`} onClick={verCarritos}>{cat.categoria}</Link></li>
                            ))}
                        </ul>
                        <CartWidget clase={'cabecera__cont--cart'} />
                    </div>
                </nav>}
                {menuMob && <div className="cabcera__cont--btn">{menuCerrado && <i className="bi bi-list" onClick={abrirMenu}></i>}{menuAbierto && <i className="bi bi-x-lg" onClick={cerrarMenu}></i>}</div>}
            </div>
        </header> 
    )
}

export default NavBar