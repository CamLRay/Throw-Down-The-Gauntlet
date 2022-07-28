import './App.css';
import {Routes, Route} from 'react-router-dom';
import Home from './components/Home';
import TournamentControl from './components/TournamentControl';
import TournamentCreate from './components/TournamentCreate/TournamentCreate';
import Koth from './components/BracketControl/Koth';
import { AuthContextProvider } from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import Signin from './components/Signin';
import Signup from './components/Signup';
import Dashboard from './components/Dashboard';
import Navigation from './components/TopMenu';
import AddPlayers from './components/AddPlayers';
import Standings from './components/Standings';
import BracketControl from './components/BracketControl/BracketControl';



function App() {
  return (
    <>
      <AuthContextProvider>
        <div className='App'>
          <Navigation />
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/signup' element ={<Signup />} />
            <Route path='/signin' element ={<Signin />} />
            <Route path='/dashboard' element ={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>} />
            <Route exact path='/tournament/:tournyId' element={
              <ProtectedRoute>
                <TournamentControl />
              </ProtectedRoute>}>
                <Route path='' element={<ProtectedRoute><BracketControl /></ProtectedRoute>} />
                <Route path="standings" element={<ProtectedRoute><Standings /></ProtectedRoute>}></Route>
                <Route path="players" element={<ProtectedRoute><AddPlayers /></ProtectedRoute>}></Route>
            </Route>
              <Route path='/tournament/new' element={
              <ProtectedRoute>
                <TournamentCreate />
              </ProtectedRoute>} />   
            <Route path='/koth' element={
                <ProtectedRoute>
                  <Koth />
                </ProtectedRoute>} />
          </Routes>
        </div>
      </AuthContextProvider>
    </>
  
  );
}

export default App;
