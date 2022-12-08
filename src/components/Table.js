import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { DeleteExpense, allowEdit } from '../redux/actions';

function Table({ expenses, dispatch, isEditing, setDesc }) {
  const DeleteExpenses = ({ target }) => {
    const getName = target.parentNode.parentNode.firstChild.innerHTML;
    dispatch(DeleteExpense(getName));
  };

  const EditExpenses = ({ target }) => {
    dispatch(allowEdit(!isEditing));
    setDesc(target.parentNode.parentNode.firstChild.innerHTML);
  };

  return (
    <div>
      <table data-testid="my-table">
        <thead>
          <tr>
            <th data-testid="my-desc">Descrição</th>
            <th data-testid="my-tag">Tag</th>
            <th data-testid="my-pay">Método de pagamento</th>
            <th data-testid="my-value">Valor</th>
            <th data-testid="my-coin">Moeda</th>
            <th data-testid="my-cambio">Câmbio utilizado</th>
            <th data-testid="my-convert">Valor convertido</th>
            <th data-testid="my-convers">Moeda de conversão</th>
            <th data-testid="my-delete">Editar/Excluir</th>
          </tr>
        </thead>
        <tbody>
          {expenses.length === 0 ? (
            <tr>
              <td data-testid="my-msg">Nenhuma despesa cadastrada</td>
            </tr>
          ) : (expenses.map(({
            id, description, tag, method, value, exchangeRates, currency,
          }) => (
            <tr key={ id }>
              <td>{description}</td>
              <td>{tag}</td>
              <td>{method}</td>
              <td>{(+value).toFixed(2)}</td>
              <td>{exchangeRates[currency].name}</td>
              <td>{`R$ ${(+exchangeRates[currency].ask).toFixed(2)}`}</td>
              <td>{`R$ ${(+(value) * exchangeRates[currency].ask).toFixed(2)}`}</td>
              <td>Real</td>
              <td>
                <button
                  data-testid="edit-btn"
                  type="button"
                  id={ description }
                  onClick={ EditExpenses }
                >
                  Editar

                </button>
                <button
                  onClick={ DeleteExpenses }
                  data-testid="delete-btn"
                  type="button"
                  id={ id }
                >
                  Excluir

                </button>
              </td>
            </tr>
          )))}
        </tbody>
      </table>
    </div>
  );
}

const mapStateToProps = (state) => ({
  expenses: state.wallet.expenses,
  isEditing: state.wallet.isEditing,
});

Table.propTypes = {
  expenses: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  dispatch: PropTypes.func.isRequired,
  isEditing: PropTypes.bool.isRequired,
  setDesc: PropTypes.func.isRequired,
};

export default connect(mapStateToProps)(Table);
