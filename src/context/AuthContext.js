import {createContext, useContext, useEffect, useState } from 'react'
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged
} from 'firebase/auth'
import {auth} from '../firebase-config';

const UserContext = createContext();

export const AuthContextProvier = () => {
  return(
    <UserContext.Provider value={}>

    </UserContext.Provider>
  )
}