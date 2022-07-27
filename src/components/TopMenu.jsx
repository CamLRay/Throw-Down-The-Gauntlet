import { React, useState } from 'react'
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';

import { useAuth } from '../context/AuthContext';
import logo from '../assets/android-chrome-192x192.png'
import { Link } from 'react-router-dom';

function TopMenu() {
  const [anchorEl, setAnchorEl] = useState(null);
  const [signedIn, setSignedIn] = useState(true);
  const open = Boolean(anchorEl);
  const { logout, user } = useAuth();
  

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const logoff = () => {
    setAnchorEl(null);
    logout();
  }


  return (
    <>
      <div className='bg-slate-800 min-h-fit w-screen flex justify-between p-3 pr-5'>
        <Link to="/"><img className='w-8' src={logo} alt='logo' /></Link>
        <h1 className='text-2xl font-bold text-amber-500'>Throw Down The Gauntlet</h1>
        
        {user ? <button onClick={handleClick} className='bg-amber-500 text-amber-50 w-fit rounded p-1 shadow-lg hover:bg-amber-600'>{user.displayName}</button> : <div className='text-white'><Link to="/signin">Log in</Link> <Link to="/signup" className='bg-amber-600 p-1 rounded'>Sign Up</Link></div> }
        </div>
        <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
      >
        
        <MenuItem onClick={handleClose}>Profile</MenuItem>
        <Link to="/dashboard"><MenuItem onClick={handleClose}>Dashboard</MenuItem></Link>
        <MenuItem onClick={logoff}>{user ?  "Sign Out" : "Sign In"}</MenuItem>
        
      </Menu>
      </>
  );
}

export default TopMenu