import { fireEvent, render, screen } from '@testing-library/react';
import { MemoryRouter, useNavigate } from 'react-router-dom';
import { SearchPage } from '../../../src/heroes/pages/SearchPage';

//El prefijo "mock" es importante. De lo contrario, genera error.
const mockeUseNavigate = jest.fn();

//Sobre escribe la función "useNavigate" para ser usada como un jest.fn(). Las demás se dejan como estaban
jest.mock('react-router-dom', () => ({
   ...jest.requireActual('react-router-dom'),
   useNavigate: () => mockeUseNavigate
}));

describe('Pruebas en <SearchPage />', () => {

   beforeEach(() => jest.clearAllMocks());

   test('Debe de mostrarse correctamente con valores por defecto', () => {
      const {container} = render(
         <MemoryRouter>
            <SearchPage />
         </MemoryRouter>
      )
      expect(container).toMatchSnapshot();
   })

   test('Debe de mostrarse a Batman y el input con el valor del queryString', () => {
      render(
         <MemoryRouter initialEntries={['/search?q=batman']}>
            <SearchPage />
         </MemoryRouter>
      )
      const input = screen.getByRole('textbox');
      expect(input.value).toBe('batman');
      const img = screen.getByRole('img');
      expect(img.src).toContain('/heroes/dc-batman.jpg');
      const alert = screen.getByLabelText('alertLoad');
      expect(alert.style.display).toContain('none');
   })

   test('Debe de mostrar un error si no se encuentra el hero (batman123)', () => {
      render(
         <MemoryRouter initialEntries={['/search?q=batman123']}>
            <SearchPage />
         </MemoryRouter>
      )
      const alert = screen.getByLabelText('alertDanger');
      expect(alert.style.display).toBe('');
   })

   test('Debe de llamar el navigate a la pantalla nueva', () => {
      render(
         <MemoryRouter initialEntries={['/search']}>
            <SearchPage />
         </MemoryRouter>
      )
      const input = screen.getByRole('textbox');
      fireEvent.change(input, {target: {name: 'searchText', value: 'superman'}});
      const form = screen.getByRole('form');
      fireEvent.submit(form);
      expect(mockeUseNavigate).toHaveBeenCalledWith('?q=superman');
   })

})