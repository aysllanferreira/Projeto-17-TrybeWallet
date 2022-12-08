import React from 'react';
import { screen, waitForElementToBeRemoved } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Wallet from '../pages/Wallet';
import { renderWithRouterAndRedux } from './helpers/renderWith';

describe('Testes do componente Table', () => {
  const desc = 'description-input';
  const tagx = 'tag-input';
  const methodx = 'method-input';
  const valuex = 'value-input';
  const currencyx = 'currency-input';

  it('Adicione items a tabela, edite e atualize', async () => {
    renderWithRouterAndRedux(<Wallet />);
    await waitForElementToBeRemoved(() => screen.getByTestId('fetching'));
    const description = screen.getByTestId(desc);
    const tag = screen.getByTestId(tagx);
    const method = screen.getByTestId(methodx);
    const value = screen.getByTestId(valuex);
    const currency = screen.getByTestId(currencyx);

    const button = screen.getByTestId('button-add');
    const descriptionValue = 'Teste';
    const tagValue = 'Alimentação';
    const methodValue = 'Dinheiro';
    const valueValue = '10';
    const currencyValue = 'USD';

    userEvent.type(description, descriptionValue);
    userEvent.type(tag, tagValue);
    userEvent.type(method, methodValue);
    userEvent.type(value, valueValue);
    userEvent.type(currency, currencyValue);

    userEvent.click(button);

    await waitForElementToBeRemoved(() => screen.getByTestId('my-msg'));
    const editButton = screen.getByTestId('edit-btn');
    userEvent.click(editButton);

    const descriptionEdit = screen.getByTestId(desc);
    const tagEdit = screen.getByTestId(tagx);
    const methodEdit = screen.getByTestId(methodx);
    const valueEdit = screen.getByTestId(valuex);
    const currencyEdit = screen.getByTestId(currencyx);

    const descriptionValueEdit = 'Teste2';
    const tagValueEdit = 'Lazer';
    const methodValueEdit = 'Cartão de crédito';
    const valueValueEdit = '20';
    const currencyValueEdit = 'EUR';

    userEvent.type(descriptionEdit, descriptionValueEdit);
    userEvent.type(tagEdit, tagValueEdit);
    userEvent.type(methodEdit, methodValueEdit);
    userEvent.type(valueEdit, valueValueEdit);
    userEvent.type(currencyEdit, currencyValueEdit);

    userEvent.click(button);
  });

  it('Delete um item da tabela', async () => {
    renderWithRouterAndRedux(<Wallet />);
    await waitForElementToBeRemoved(() => screen.getByTestId('fetching'));
    const description = screen.getByTestId('description-input');
    const tag = screen.getByTestId('tag-input');
    const method = screen.getByTestId('method-input');
    const value = screen.getByTestId('value-input');
    const currency = screen.getByTestId('currency-input');

    const button = screen.getByTestId('button-add');
    const descriptionValue = 'Teste';
    const tagValue = 'Alimentação';
    const methodValue = 'Dinheiro';
    const valueValue = '10';
    const currencyValue = 'USD';

    userEvent.type(description, descriptionValue);
    userEvent.type(tag, tagValue);
    userEvent.type(method, methodValue);
    userEvent.type(value, valueValue);
    userEvent.type(currency, currencyValue);

    userEvent.click(button);

    await waitForElementToBeRemoved(() => screen.getByTestId('my-msg'));
    const deleteButton = screen.getByTestId('delete-btn');
    userEvent.click(deleteButton);
  });
});
