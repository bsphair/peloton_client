/* eslint-disable */
import React, { useState, useEffect } from 'react';
import TextField from '@material-ui/core/TextField';
import { useDispatch, useSelector } from 'react-redux';
import Button from '@material-ui/core/Button';
import {
  userLogin,
} from 'components/loginSlice';
import 'components/login.css';

const Login = () => {
  const dispatch = useDispatch();

  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = () => {
    if (userName !== '' && password !== '') {
      dispatch(userLogin(userName, password));
    }
  };

  return (
    <div className="login-container">
      <h1>
        Login to Peloton
      </h1>

      <div>
        <TextField
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
          id="login-password-textfield"
          className="login-textfield"
          label="Password"
          variant="outlined"
          value={password}
          type="password"
          onChange={event => setPassword(event.target.value)}
        />
      </div>

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
