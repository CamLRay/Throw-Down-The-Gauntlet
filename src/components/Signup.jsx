import { React, useState } from 'react'
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

function Signup() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const { createUser } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      if(password !== confirmPassword){
        setError('Passwords do not match')
      } else {
        await createUser(username, email, password);
      }
    } catch (e) {
      console.log(e.message);
    }
  }

  return (
    <>
      <p>{error}</p>
      <form onSubmit={handleSubmit}>
        <input type='text' placeholder='Username' onChange={(e)=>setUsername(e.target.value)}/>
        <input type='text' placeholder='Email' onChange={(e)=>setEmail(e.target.value)}/>
        <input type='password' placeholder='Password' onChange={(e)=>setPassword(e.target.value)} />
        <input type='password' placeholder='Password Confirmation' onChange={(e)=>setConfirmPassword(e.target.value)} />
        <button>Sign Up</button>
      </form>

      <p>Already have an account? <Link to='/signin'>Log in</Link></p>
    </>
  )
}

export default Signup