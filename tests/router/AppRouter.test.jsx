import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { AuthContext } from '../../src/auth';
import { AppRouter } from '../../src/router/AppRouter';

describe('Pruebas en <AppRouter />', () => {

   test('Debe de mostrar el login si no está autenticado', () => {
      const authState = {
         logged: false
      }
      render(
         <AuthContext.Provider value={{ authState }}>
            <MemoryRouter initialEntries={['/marvel']}>
               <AppRouter />
            </MemoryRouter>
         </AuthContext.Provider>
      );
      expect(screen.getAllByText('Login').length).toBe(2);
   })

   test('Debe de mostrar el componente de Marvel si está autenticado', () => {
      const authState = {
         logged: true,
         user: {
            id: 'ABC123',
            name: 'Julián Rodríguez'
         }
      }
      render(
         <AuthContext.Provider value={{ authState }}>
            <MemoryRouter initialEntries={['/login']}>
               <AppRouter />
            </MemoryRouter>
         </AuthContext.Provider>
      );
      expect(screen.getAllByText('Marvel').length).toBeGreaterThanOrEqual(1);
   })

})