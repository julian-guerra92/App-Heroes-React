import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { AuthContext } from '../../src/auth';
import { PrivateRoute } from '../../src/router/PrivateRoute';


describe('Prueba en <PrivateRoute />', () => {

   test('Debe de mostrar el children si está autenticado', () => {
      Storage.prototype.setItem = jest.fn();
      const authState = {
         logged: true,
         user: { id: 'ABC123', name: 'Julián' }
      }
      render(
         <AuthContext.Provider value={{ authState }}>
            <MemoryRouter initialEntries={['/marvel']}>
               <PrivateRoute>
                  <h1>Ruta Privada</h1>
               </PrivateRoute>
            </MemoryRouter>
         </AuthContext.Provider>
      );
      expect(screen.getByText(`Ruta Privada`)).toBeTruthy();
      expect(localStorage.setItem).toBeCalledWith('lastPath', '/marvel');
   })

})

/*
Esta prueba permite evaluar la renderización de la ruta conforme al contexto al que se encuentra y que el lastPath se haya cargado en el local storage y haya sido llamado posteriormente.
*/