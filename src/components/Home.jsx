import {Link} from 'react-router-dom';
import Dashboard from './Dashboard';
import { useAuth } from '../context/AuthContext';
import { ChevronDownIcon } from '@heroicons/react/solid';

const Home = () =>{
  const { user } = useAuth();


  if(user){
  return <Dashboard />;
  } else {
    return(
      <div className="h-screen bg-gradient-to-t from-neutral-900 to-amber-900/30 flex text-center">
        <div className='mx-auto mt-20'>
          <h1 className='text-2xl font-bold text-white'>Fighting Tournaments Made Easy</h1>
          <p className='mb-5'>A tournament manager built specifically for foam fighting.</p>
          <Link to="/tournament/new" className='bg-amber-600 text-white p-1 m-5 rounded'>Create Tournament <ChevronDownIcon className='w-6 m-auto inline' /></Link>
        </div>
      </div> 
      )     
  }
}

export default Home;