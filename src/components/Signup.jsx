import { React, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';


function Signup() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const { createUser } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      if(password !== confirmPassword){
        setError('Passwords do not match');
      } else {
        await createUser(username, email, password);
        navigate('/dashboard', {replace: true});
      }
    } catch (e) {
      console.log(e.message);
    }
  }

  return (
    <>
      <p>{error}</p>
      <form onSubmit={handleSubmit} className="w-full max-w-sm m-auto">
        <div className="flex items-center mb-6 text-center">
          <div className="w-1/3">
            <label htmlFor="username" className="block text-gray-500 font-bold text-right mb-1 pr-4 rounded">Username</label>
          </div>
          <div className="w-2/3">
            <input type='text' id="username" className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-amber-700" placeholder='Username' onChange={(e)=>setUsername(e.target.value)}/>
          </div>
        </div>
        <div className="flex items-center mb-6 text-center">
          <div className="w-1/3">
            <label htmlFor="email-address" className="block text-gray-500 font-bold text-right mb-1 pr-4 rounded">Email address</label>
          </div>
          <div className="w-2/3">
            <input type='email' id="email-address" className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-amber-700" placeholder='Email' onChange={(e)=>setEmail(e.target.value)}/>
          </div>
        </div>
        <div className="flex items-center mb-6 text-center">
          <div className="w-1/3">
            <label htmlFor="password" className="block text-gray-500 font-bold text-right mb-1 pr-4 rounded">Password</label>
          </div>
          <div className='w-2/3'>
            <input type='password' className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-amber-700" id="password" placeholder='Password' onChange={(e)=>setPassword(e.target.value)} />
          </div>
        </div>
        <div className="flex items-center mb-6 text-center">
          <div className="w-1/3"><label htmlFor="confirm-password" className="block text-gray-500 font-bold text-right mb-1 pr-4 rounded">Confirm Password</label></div>
          <div className="w-2/3"><input type='password' className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-amber-700" id="confirm-password" placeholder='Password Confirmation' onChange={(e)=>setConfirmPassword(e.target.value)} /></div>
        </div>
        <div>
          <p>Already have an account? <Link to='/signin'>Log in</Link> </p>
        <button className='bg-amber-700 hover:bg-amber-900 text-white font-bold py-2 px-4 rounded'>Sign Up</button>
        </div>
      </form>

      
      
      
    </>
    
  )
}

export default Signup