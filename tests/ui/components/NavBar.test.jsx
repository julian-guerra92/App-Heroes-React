import { fireEvent, render, screen } from '@testing-library/react';
import { MemoryRouter, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../../src/auth';
import { Navbar } from '../../../src/ui';

//El prefijo "mock" es importante. De lo contrario, genera error.
const mockeUseNavigate = jest.fn();

//Sobre escribe la función "useNavigate" para ser usada como un jest.fn(). Las demás se dejan como estaban
jest.mock('react-router-dom', () => ({
   ...jest.requireActual('react-router-dom'),
   useNavigate: () => mockeUseNavigate
}));

describe('Pruebas en <NavBar />', () => {

   const logout = jest.fn();
   const authState = {
      logged: true,
      user: {
         id: 'ABC123',
         name: 'Julián Rodríguez'
      }
   }

   beforeEach(() => jest.clearAllMocks());

   test('Debe de mostrar el nombre del usuario', () => {
      render(
         <AuthContext.Provider value={{ authState }}>
            <MemoryRouter initialEntries={['/marvel']}>
               <Navbar />
            </MemoryRouter>
         </AuthContext.Provider>
      );
      expect(screen.getByText('Julián Rodríguez')).toBeTruthy();
   })

   test('Debe de llamar el logout y navigate cuando se hace click en el botón ', () => {
      render(
         <AuthContext.Provider value={{ authState, logout }}>
            <MemoryRouter initialEntries={['/marvel']}>
               <Navbar />
            </MemoryRouter>
         </AuthContext.Provider>
      );
      const buttonElement = screen.getByRole('button');
      fireEvent.click(buttonElement);
      expect(logout).toHaveBeenCalled();
      expect(mockeUseNavigate).toHaveBeenCalledWith("/login", {"replace": true});
   })

})