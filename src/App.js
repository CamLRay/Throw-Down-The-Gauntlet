import './App.css';
import {Routes, Route} from 'react-router-dom';
import Home from './components/Home';
import TournamentControl from './components/TournamentControl';
import Koth from './components/Koth';

function App() {
  return (
  <>
  <h1>Throw down the Gauntlet</h1>
  <Routes>
    <Route path='/' element={<Home />} />
    <Route path='/tournaments' element={<TournamentControl />} />
    <Route path='/koth' element={<Koth />} />
  </Routes>
  </>
  );
}

export default App;
