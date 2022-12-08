import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { saveUser } from '../redux/actions';

function Login(props) {
  const [validInput, setValidInput] = useState(true);
  const [user, setUser] = useState({
    email: '',
    password: '',
  });

  const verifyInputs = (email, senha) => {
    const emailRegex = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/g;
    const passLength = 6;
    const passwordRegex = senha.length >= passLength;
    const emailTest = emailRegex.test(email);
    return !!(emailTest && passwordRegex);
  };
  const verifyUser = () => {
    const { email, password } = user;
    const emailIsValid = verifyInputs(email, password);
    if (emailIsValid) {
      setValidInput(false);
      return;
    }
    return setValidInput(true);
  };

  const handleChange = ({ target }) => {
    const { name, value } = target;
    setUser({ ...user, [name]: value });
  };

  const handleClick = () => {
    const { dispatch, history } = props;
    const { email } = user;
    dispatch(saveUser(email));
    history.push('/carteira');
  };

  useEffect(() => {
    verifyUser();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  return (
    <div>
      <input
        onChange={ handleChange }
        type="text"
        name="email"
        data-testid="email-input"
      />

      <input
        onChange={ handleChange }
        type="password"
        name="password"
        data-testid="password-input"
      />

      <button
        disabled={ validInput }
        type="button"
        onClick={ handleClick }
      >
        Entrar

      </button>
    </div>
  );
}

const mapStateToProps = (state) => ({
  user: state.user,
});

Login.propTypes = {
  dispatch: PropTypes.func.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

export default connect(mapStateToProps)(Login);
