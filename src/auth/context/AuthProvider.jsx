import { useReducer } from "react"
import { AuthContext } from "./AuthContext"
import { authReducer } from "./authReducer"

import { types } from "../types/types"

const init = () => {
   const user = JSON.parse(localStorage.getItem('user'));
   return {
      logged: !!user,
      user: user
   }
}

export const AuthProvider = ({ children }) => {

   const [authState, dispath] = useReducer(authReducer, {}, init);

   const login = (name = '') => {
      const user = { id: 'ABC123', name: name }
      const action = { type: types.login, payload: user }
      localStorage.setItem('user', JSON.stringify(user));
      dispath(action);
   }

   const logout = () => {
      localStorage.removeItem('user');
      const action = { type: types.logout };
      dispath(action);
   }

   return (
      <AuthContext.Provider value={{
         authState,
         login: login,
         logout: logout,
      }}>
         {children}
      </AuthContext.Provider>
   )
}
