import { types } from "../../../src/auth/types/types"

describe('Prueba sobre types', () => {

   test('Debe de retornar estos "types.js"', () => {
      expect(types).toEqual({
         login: '[Auth] Login',
         logout: '[Auth] Logout'
      })
   })
   
})