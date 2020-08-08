/* eslint-disable */
import React, { useState, useEffect } from 'react';
import TextField from '@material-ui/core/TextField';
import { useDispatch, useSelector } from 'react-redux';
import Button from '@material-ui/core/Button';
import { userLogin } from 'components/loginSlice';
import 'components/login.css';
import { useHistory } from "react-router-dom";

const Login = () => {
  const generalState = useSelector(state => state.general);
  const dispatch = useDispatch();

  const {
    loginMessage,
  } = generalState;

  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = () => {
    if (userName !== '' && password !== '') {
      dispatch(userLogin(userName, password));
    }
  };
  let history = useHistory();

  useEffect(() => {
    if (generalState.loginSuccessful) {
      history.replace("/home");
    } else {
      history.replace("/");
    }
  }, [generalState.loginSuccessful]);

  return (
    <div className="login-container">
      <h1>
        Login to Peloton
      </h1>

      <div>
        <TextField
          error={Boolean(loginMessage)}
          id="login-username-textfield"
          className="login-textfield"
          label="Username"
          variant="outlined"
          value={userName}
          onChange={event => setUserName(event.target.value)}
        />
      </div>

      <div>
        <TextField
          error={Boolean(loginMessage)}
          id="login-password-textfield"
          className="login-textfield"
          label="Password"
          variant="outlined"
          value={password}
          type="password"
          onChange={event => setPassword(event.target.value)}
        />
      </div>

      {loginMessage && <div>{loginMessage}</div>}

      <div>
        <Button
          variant="contained"
          color="primary"
          onClick={() => handleSubmit()}
        >
          Submit
        </Button>
      </div>

    </div>
  );
};

export default Login;
