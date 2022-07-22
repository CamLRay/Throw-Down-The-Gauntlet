import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth} from '../context/AuthContext';

function ProtectedRoute({children}) {
  const { user } = useAuth();

  if (!user){
    return <Navigate to="/signup" />
  }
  return children
}

export default ProtectedRoute