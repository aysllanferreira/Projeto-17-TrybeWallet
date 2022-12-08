// Esse reducer será responsável por tratar o todas as informações relacionadas as despesas
import {
  SET_EXPENSES, SAVE_EXPENSE,
  DELETE_EXPENSE, EDIT_EXPENSE, ALLOW_EDIT,
} from '../actions';

const INITIAL_STATE = {
  currencies: [],
  expenses: [],
  isFetching: false,
  isEditing: false,
  getEdit: 0,
};

const wallet = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case SET_EXPENSES:
    return {
      ...state,
      currencies: action.payload,
    };
  case SAVE_EXPENSE:
    return {
      ...state,
      expenses: [...state.expenses, action.payload],
    };
  case DELETE_EXPENSE:
    return {
      ...state,
      expenses: state.expenses
        .filter((expense) => expense.description !== action.payload),
    };
  case EDIT_EXPENSE:
    return {
      ...state,
      expenses: state.expenses.map((expense) => {
        if (expense.description === action.payload.newDesc) {
          return {
            ...expense,
            value: action.payload.value,
            currency: action.payload.currency,
            method: action.payload.method,
            tag: action.payload.tag,
            description: action.payload.description,
          };
        }
        return expense;
      }),
    };
  case ALLOW_EDIT:
    return {
      ...state,
      isEditing: action.payload,
      getEdit: action.payload,
    };
  default:
    return state;
  }
};

export default wallet;
