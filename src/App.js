import { BrowserRouter, Routes, Route } from 'react-router-dom';
import NavBar from './Components/NavBar';
import Inicio from './Components/Inicio';
import ItemListContainer from './Components/ItemListContainer';

function App() {
  

  return (

    <BrowserRouter>
    
      <NavBar />

      <Routes>

        <Route path='/' element={<Inicio />} />

        <Route path='/catalogo' element={<ItemListContainer />} />

        <Route path='/categoria/:id' element={<ItemListContainer />} />

      </Routes>
    
    </BrowserRouter>

  );
}

export default App;
