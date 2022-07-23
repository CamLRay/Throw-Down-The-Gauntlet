import './App.css';
import {Routes, Route} from 'react-router-dom';
import Home from './components/Home';
import TournamentControl from './components/TournamentControl';
import TournamentCreate from './components/TournamentCreate/TournamentCreate';
import Koth from './components/Koth';
import { AuthContextProvider } from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import Signin from './components/Signin';
import Signup from './components/Signup';
import Dashboard from './components/Dashboard';


function App() {
  const navStyle = {
    marginTop: '0',
    backgroundColor: 'black'

  }
  return (
    <>
      <AuthContextProvider>
        <div className='App'>
          <div style={navStyle}>Placeholder</div>
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/signup' element ={<Signup />} />
            <Route path='/signin' element ={<Signin />} />
            <Route path='/dashboard' element ={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>} />
            <Route path='/tournament/:id' element={
              <ProtectedRoute>
                <TournamentControl />
              </ProtectedRoute>} />
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
