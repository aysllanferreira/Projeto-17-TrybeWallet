import React from 'react';
import { screen, waitForElementToBeRemoved } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Wallet from '../pages/Wallet';
import { renderWithRedux } from './helpers/renderWith';

describe('Testes do arquivo Wallet.js', () => {
  it('Cadastra nova despesa e renderiza na tabela', async () => {
    renderWithRedux(<Wallet />);
    const description = screen.getByTestId('description-input');
    const tag = screen.getByTestId('tag-input');
    const method = screen.getByTestId('method-input');
    const value = screen.getByTestId('value-input');
    const currency = screen.getByTestId('currency-input');
    const button = screen.getByTestId('button-add');

    userEvent.type(description, 'Café');
    userEvent.type(tag, 'Alimentação');
    userEvent.type(method, 'Dinheiro');
    userEvent.type(value, '10');
    userEvent.type(currency, 'USD');
    userEvent.click(button);

    await waitForElementToBeRemoved(() => screen.getByText(/Nenhuma despesa cadastrada/gi));

    const table = screen.getByTestId('my-table');
    expect(table).toBeInTheDocument();
    expect(table).toHaveTextContent('Café');
    expect(table).toHaveTextContent('Alimentação');
    expect(table).toHaveTextContent('Dinheiro');
    // expect(table).toHaveTextContent('52.36');
  });
});
