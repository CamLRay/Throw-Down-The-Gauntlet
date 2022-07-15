import './App.css';
import {Routes, Route} from 'react-router-dom';
import Home from './components/Home';
import TournamentControl from './components/TournamentControl';

function App() {
  return (
  <>
  <h1>Throw down the Gauntlet</h1>
  <Routes>
    <Route path='/' element={<Home />} />
    <Route path='/tournaments' element={<TournamentControl />} />
  </Routes>
  </>
  );
}

export default App;
