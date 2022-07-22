import { React, useState } from 'react'
import { useAuth } from '../context/AuthContext';
import { Link } from 'react-router-dom'

function Signin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { signIn } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      await signIn(email, password)
    } catch (e) {
      console.log(e.message);
    }
  }

  return (
    <>
      <form onSubmit={handleSubmit}>
        <input type='text' placeholder='Username or email'/>
        <input type='password' placeholder='Password'/>
        <button>Log in</button>
        <p>Don't have an account?</p><Link to='/signup'>Sign Up</Link>
      </form>
    </>
  )
}

export default Signin