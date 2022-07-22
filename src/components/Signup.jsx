import React from 'react'
import { Link } from 'react-router-dom';

function Signup() {
  return (
    <>
      <form>
        <input type='text' placeholder='Username'/>
        <input type='text' placeholder='Email' />
        <input type='password' placeholder='Password'/>
        <input type='password' placeholder='Password Confirmation' />
        <button>Sign Up</button>
      </form>

      <p>Already have an account? <Link to='/signin'>Log in</Link></p>
    </>
  )
}

export default Signup