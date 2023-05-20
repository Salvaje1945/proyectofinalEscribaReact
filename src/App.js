import { BrowserRouter, Routes, Route } from 'react-router-dom';
import NavBar from './Components/NavBar';
import PieContainer from './Components/PieContainer';
import Inicio from './Components/Inicio';
import ItemListContainer from './Components/ItemListContainer';
import ItemDetail from './Components/ItemDetail';

function App() {
  

  return (

    <BrowserRouter>
    
      <NavBar />

      <PieContainer />

      <Routes>

        <Route path='/' element={<Inicio />} />

        <Route path='/catalogo' element={<ItemListContainer />} />

        <Route path='/categoria/:id' element={<ItemListContainer />} />

        <Route path='/productos/:id' element={<ItemDetail />} />

      </Routes>
    
    </BrowserRouter>

  );
}

export default App;
