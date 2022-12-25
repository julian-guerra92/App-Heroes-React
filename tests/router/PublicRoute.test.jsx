import { render, screen } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { AuthContext } from '../../src/auth';
import { PublicRoute } from '../../src/router/PublicRoute';

describe('Pruebas en <PublicRoute />', () => {

   test('Si no está autenticado, debe de mostrar el children', () => {
      const authState = {
         logged: false
      }
      render(
         <AuthContext.Provider value={{ authState }}>
            <PublicRoute>
               <h1>Ruta Pública</h1>
            </PublicRoute>
         </AuthContext.Provider>
      );
      expect(screen.getByText(`Ruta Pública`)).toBeTruthy();
   })

   test('Debe de navegar si está autenticado', () => {
      const authState = {
         logged: true,
         user: {
            name: 'Strifer',
            id: 'ABC123'
         }
      }
      render(
         <AuthContext.Provider value={{ authState }}>
            <MemoryRouter initialEntries={['/login']}>
               <Routes>
                  <Route path='login' element={
                     <PublicRoute>
                        <h1>Ruta Pública</h1>
                     </PublicRoute>
                  } />
                  <Route path='marvel' element={<h1>Página Marvel</h1>}></Route>
               </Routes>
            </MemoryRouter>
         </AuthContext.Provider>
      );
      expect(screen.getByText(`Página Marvel`)).toBeTruthy();
   })

})