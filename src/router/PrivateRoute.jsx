import { useContext } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { AuthContext } from '../auth/context/AuthContext';

export const PrivateRoute = ({ children }) => {

   const { authState } = useContext(AuthContext);
   const { pathname, search } = useLocation();

   const lastPath = pathname + search;
   localStorage.setItem('lastPath', lastPath);

   return (authState.logged)
      ? children
      : <Navigate to="/login" />

}
