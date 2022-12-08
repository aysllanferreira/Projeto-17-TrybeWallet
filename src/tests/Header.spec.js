import React from 'react';
import { screen } from '@testing-library/react';
import Header from '../components/Header';
import { renderWithRedux } from './helpers/renderWith';

describe('Testes do componente Header', () => {
  it('Teste se o email do usuário aparece na tela', () => {
    renderWithRedux(<Header />);
    const email = screen.getByTestId('email-field');
    expect(email).toBeInTheDocument();
    const total = screen.getByTestId('total-field');
    expect(total).toBeInTheDocument();
    expect(total).toHaveTextContent('0');
    const currency = screen.getByTestId('header-currency-field');
    expect(currency).toBeInTheDocument();
  });
});
