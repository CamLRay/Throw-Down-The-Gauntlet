import './App.css';
import {Routes, Route} from 'react-router-dom';
import Home from './components/Home';
import TournamentControl from './components/TournamentControl';
import Koth from './components/Koth';
import { AuthContextProvider } from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import Signin from './components/Signin';
import Signup from './components/Signup';
import Dashboard from './components/Dashboard';

function App() {
  return (
    <>
      <AuthContextProvider>
        <div className='App'>
          <h1>Throw down the Gauntlet</h1>
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/signup' element ={<Signup />} />
            <Route path='/signin' element ={<Signin />} />
            <Route path='/dashboard' element ={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>} />
            <Route path='/tournaments' element={
              <ProtectedRoute>
                <TournamentControl />
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
