import {createContext, useContext, useEffect, useState } from 'react'
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  updateProfile,
} from 'firebase/auth'
import {auth} from '../firebase-config';

const UserContext = createContext();

export const AuthContextProvider = ({children}) => {
  const [user, setUser] = useState({})

  const createUser = (username, email, password) => {
    createUserWithEmailAndPassword(auth, email, password)
      .then(userCredential => {
        updateProfile(userCredential.user, {displayName: username})
      })
    
  };

  const signIn = (email, password) => {
    return signInWithEmailAndPassword(auth, email, password);
  }

  const logout = () => {
    return signOut(auth)
  }

  useEffect(()=> {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if(currentUser){
        setUser(currentUser);
      } else {
        setUser(false);
      }
    })
    return () => {
      unsubscribe();
    }
  },[]);



  return(
    <UserContext.Provider value={{createUser, user, logout, signIn}}>
      {children}
    </UserContext.Provider>
  )
};

export const useAuth = () => {
  return useContext(UserContext)
}