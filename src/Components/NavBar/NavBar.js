import CartWidget from "../CartWidget"
import logo from "./floresya.png"
import { Link } from 'react-router-dom'
import { useState, useEffect } from 'react'

const NavBar = ()=> {

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
        // setMenuDkp(false)
        // setMenuMob(true)
        escritorio = false
        mobil = true
    } else {
        // setMenuDkp(true)
        // setMenuMob(false)
        escritorio = true
        mobil = false
    }

    console.log(anchoPantalla)
    //console.log(mediaQ)

    const [menuDkp, setMenuDkp] = useState(escritorio)
    const [menuMob, setMenuMob] = useState(mobil)
    const [menuAbierto, setMenuAbierto] = useState(false)
    const [menuCerrado, setMenuCerrado] = useState(true)
    const [despAct, setDespAct] = useState('cabecera__nav--desp')

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

    return <header id="cabecera">
                {menuMob && <div className={despAct}>
                    <ul>
                        <li>
                            <div className="cabecera__desp--cart">
                                <CartWidget />
                            </div>
                        </li>
                        <li><Link to={'/'} onClick={()=> setMenuAbierto(false)}>Inicio</Link></li>
                        <li><Link to={'/catalogo'} onClick={()=> setMenuAbierto(false)}>Catálogo</Link></li>
                        <li><Link to={'/categoria/Flores'} onClick={()=> setMenuAbierto(false)}>Flores</Link></li>
                        <li><Link to={'/categoria/Decoración'} onClick={()=> setMenuAbierto(false)}>Decoración</Link></li>
                        <li><Link to={'/categoria/Plantas'} onClick={()=> setMenuAbierto(false)}>Plantas</Link></li>
                        <li><Link to={'/categoria/Insumos'} onClick={()=> setMenuAbierto(false)}>Insumos</Link></li>
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
                                <li><Link to={'/categoria/Flores'}>Flores</Link></li>
                                <li><Link to={'/categoria/Decoración'}>Decoración</Link></li>
                                <li><Link to={'/categoria/Plantas'}>Plantas</Link></li>
                                <li><Link to={'/categoria/Insumos'}>Insumos</Link></li>
                            </ul>
                            <div className="cabecera__cont--cart">
                                <CartWidget />
                            </div>
                        </div>
                    </nav>}
                    {menuMob && <div className="cabcera__cont--btn">{menuCerrado && <i className="bi bi-list" onClick={()=> setMenuCerrado(false)}></i>}{menuAbierto && <i className="bi bi-x-lg" onClick={()=> setMenuAbierto(false)}></i>}</div>}
                </div>
           </header> 
}

export default NavBar