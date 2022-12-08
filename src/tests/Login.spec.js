import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import { renderWithRouterAndRedux } from './helpers/renderWith';

describe('Testes do arquivo App.js', () => {
  it('Teste se a página principal da aplicação é renderizada na rota "/"', () => {
    const { store } = renderWithRouterAndRedux(<App />);
    const emailInput = screen.getByTestId('email-input');
    userEvent.type(emailInput, 'teste@teste.com');
    const password = screen.getByTestId('password-input');
    userEvent.type(password, '123456');
    const button = screen.getByRole('button');
    userEvent.click(button);
    const { user: { email } } = store.getState();
    expect(email).toBe('teste@teste.com');
  });
});
