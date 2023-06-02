import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { useState, useEffect } from 'react'
import NavBar from './Components/NavBar'
import CabeceraLoad from './Components/CabeceraLoad'
import PieContainer from './Components/PieContainer'
import Inicio from './Components/Inicio'
import ItemListContainer from './Components/ItemListContainer'
import ItemDetail from './Components/ItemDetail'
import { getCollection } from './utils/getFirestore'

function App() {

  const [categoria, setCategoria] = useState()

  useEffect(() => {
    getCollection('categorias').then((result) => {
      setCategoria(result)
    })
  }, [])

  return (

    <BrowserRouter>

      {categoria ? <NavBar categoria={categoria} /> : <CabeceraLoad />}

      <Routes>

        <Route path='/' element={<Inicio />} />

        <Route path='/catalogo' element={<ItemListContainer />} />

        <Route path='/categoria/:id' element={<ItemListContainer />} />

        <Route path='/productos/:id' element={<ItemDetail />} />

      </Routes>

      <PieContainer />

    </BrowserRouter>

  )
}

export default App
