import { authReducer, types } from '../../../src/auth';

describe('Pruebas en el authReducer', () => {

   test('Debe de retornar el estado por defecto', () => {
      const state = authReducer({ logged: false }, {});
      expect(state).toEqual({ logged: false });
   })

   test('Debe de llamar el login, autenticar y establecer usuario por defecto', () => {
      const action = {
         type: types.login,
         payload: {
            name: 'Juan',
            id: '123'
         }
      }
      const state = authReducer({ logged: false }, action);
      expect(state).toEqual({
         logged: true,
         user: action.payload
      })
   })

   test('Debe de retornar el estado por defecto', () => {
      const state = {
         logged: true,
         user: {id: '123', name: 'Juan'}
      }
      const action = {
         type: types.logout
      }
      const newState = authReducer(state, action);
      expect(newState).toEqual({
         logged: false,
         user: null
      })
   })

})