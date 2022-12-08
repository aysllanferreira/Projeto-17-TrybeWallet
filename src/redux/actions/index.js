// Coloque aqui suas actions

const SAVE_USER = 'SAVE_USER';
const START_FETCH = 'START_FETCH';
const END_FETCH = 'END_FETCH';
const SET_EXPENSES = 'SET_EXPENSES';
const SAVE_EXPENSE = 'SAVE_EXPENSE';
const DELETE_EXPENSE = 'DELETE_EXPENSE';
const EDIT_EXPENSE = 'EDIT_EXPENSE';
const ALLOW_EDIT = 'ALLOW_EDIT';

const saveUser = (payload) => ({
  type: SAVE_USER,
  payload,
});

const startFetchCurrencies = () => ({
  type: 'START_FETCH',
});

const endFetchCurrencies = () => ({
  type: 'END_FETCH',
});

const setExpenses = (payload) => ({
  type: 'SET_EXPENSES',
  payload,
});

const GetCurrencies = () => async (dispatch) => {
  const endpoint = 'https://economia.awesomeapi.com.br/json/all';
  const currencies = await fetch(endpoint);
  const currenciesJson = await currencies.json();
  const finalRes = Object.keys(currenciesJson).filter((currency) => currency !== 'USDT');
  dispatch(setExpenses(finalRes));
};

const saveExpense = (payload) => ({
  type: 'SAVE_EXPENSE',
  payload,
});

const saveFullExpense = (expense) => async (dispatch) => {
  const endpoint = 'https://economia.awesomeapi.com.br/json/all';
  const currencies = await fetch(endpoint);
  const currenciesJson = await currencies.json();
  const exchangeRates = currenciesJson;
  const newExpense = { ...expense, exchangeRates: { ...exchangeRates } };
  dispatch(saveExpense(newExpense));
};

const addExpense = (payload) => async (dispatch) => {
  dispatch(saveExpense(payload));
};

const DeleteExpense = (payload) => ({
  type: 'DELETE_EXPENSE',
  payload,
});

const EditExpense = (payload) => ({
  type: 'EDIT_EXPENSE',
  payload,
});

const allowEdit = (payload) => ({
  type: 'ALLOW_EDIT',
  payload,
});

export {
  SAVE_USER,
  START_FETCH,
  END_FETCH,
  SET_EXPENSES,
  SAVE_EXPENSE,
  DELETE_EXPENSE,
  EDIT_EXPENSE,
  ALLOW_EDIT,
  saveUser,
  startFetchCurrencies,
  endFetchCurrencies,
  setExpenses,
  GetCurrencies,
  saveExpense,
  addExpense,
  saveFullExpense,
  DeleteExpense,
  EditExpense,
  allowEdit,
};
