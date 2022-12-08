import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { GetCurrencies, saveFullExpense } from '../redux/actions';

function WalletForm({ currencies, expenses, dispatch }) {
  const [despesa, setDespesa] = useState({
    id: 0,
    value: '',
    description: '',
    currency: 'USD',
    method: 'Dinheiro',
    tag: 'Alimentação',
  });

  const handleChange = ({ target }) => {
    const { name, value } = target;
    setDespesa({ ...despesa, [name]: value });
  };

  const resetState = () => {
    setDespesa({
      value: '',
      description: '',
      currency: 'USD',
      method: 'Dinheiro',
      tag: 'Alimentação',
    });
  };

  const handleClick = () => {
    const newObj = {
      ...despesa,
      id: expenses.length === 0 ? 0 : expenses[expenses.length - 1].id + 1,
    };
    resetState();
    dispatch(saveFullExpense(newObj));
  };

  useEffect(() => {
    dispatch(GetCurrencies());
  }, [dispatch]);

  return (
    <div>
      <label htmlFor="valor">
        Despesa
        <input
          data-testid="value-input"
          type="number"
          id="valor"
          name="value"
          onChange={ handleChange }
          value={ despesa.value }
        />
      </label>

      <label htmlFor="descricao">
        Descrição
        <input
          data-testid="description-input"
          type="text"
          id="descricao"
          name="description"
          onChange={ handleChange }
          value={ despesa.description }
        />
      </label>

      <label htmlFor="moeda">
        Moeda
        <select
          data-testid="currency-input"
          id="moeda"
          name="currency"
          onChange={ handleChange }
          value={ despesa.currency }
        >
          {currencies.length === 0 ? (
            <option data-testid="fetching" value="carregando">Carregando...</option>
          ) : (currencies.map((currency) => (
            <option key={ currency } value={ currency }>{currency}</option>
          )))}
        </select>
      </label>

      <label htmlFor="metodo">
        Método de pagamento
        <select
          data-testid="method-input"
          id="metodo"
          name="method"
          onChange={ handleChange }
          value={ despesa.method }
        >
          <option value="Dinheiro">Dinheiro</option>
          <option value="Cartão de crédito">Cartão de crédito</option>
          <option value="Cartão de débito">Cartão de débito</option>
        </select>
      </label>

      <label htmlFor="tag">
        Tag
        <select
          data-testid="tag-input"
          id="tag"
          name="tag"
          onChange={ handleChange }
          value={ despesa.tag }
        >
          <option value="Alimentação">Alimentação</option>
          <option value="Lazer">Lazer</option>
          <option value="Trabalho">Trabalho</option>
          <option value="Transporte">Transporte</option>
          <option value="Saúde">Saúde</option>
        </select>
      </label>

      <button
        type="button"
        data-testid="button-add"
        onClick={ handleClick }
      >
        Adicionar despesa

      </button>
    </div>
  );
}

const mapStateToProps = (state) => ({
  currencies: state.wallet.currencies,
  expenses: state.wallet.expenses,
  isEditing: state.wallet.isEditing,
});

WalletForm.propTypes = {
  currencies: PropTypes.arrayOf(PropTypes.string).isRequired,
  dispatch: PropTypes.func.isRequired,
  expenses: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number,
    value: PropTypes.string,
    description: PropTypes.string,
    currency: PropTypes.string,
    method: PropTypes.string,
    tag: PropTypes.string,
  })).isRequired,
};

export default connect(mapStateToProps)(WalletForm);
