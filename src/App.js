import './App.css';
import {Routes, Route} from 'react-router-dom';
import Koth from './components/Koth';

function App() {
  return (
  <>
  <Routes>
    <Route path='/koth' element={<Koth />} />
  </Routes>
    <h1>Throw down the Gauntlet</h1>
  </>
  );
}

export default App;
