import React from 'react';
import { screen, waitForElementToBeRemoved } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import WalletForm from '../components/WalletForm';
import { renderWithRedux } from './helpers/renderWith';

describe('Testes do componente WalletForm', () => {
  it('', async () => {
    renderWithRedux(<WalletForm />);
    await waitForElementToBeRemoved(() => screen.getByTestId('fetching'));
    const valueInput = screen.getByTestId('value-input');
    const descriptionInput = screen.getByTestId('description-input');
    const currencyInput = screen.getByTestId('currency-input');
    const methodInput = screen.getByTestId('method-input');
    const tagInput = screen.getByTestId('tag-input');
    const button = screen.getByRole('button');

    userEvent.type(valueInput, '10');
    userEvent.type(descriptionInput, 'Teste');
    userEvent.type(currencyInput, 'USD');
    userEvent.type(methodInput, 'Dinheiro');
    userEvent.type(tagInput, 'Alimentação');
    userEvent.click(button);
  });
});
