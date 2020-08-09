/* eslint-disable */
import React, { useState, useEffect } from 'react';
import TextField from '@material-ui/core/TextField';
import { useDispatch, useSelector } from 'react-redux';
import Button from '@material-ui/core/Button';
import { userLogin } from 'components/loginSlice';
import 'components/login.css';
import { useHistory } from "react-router-dom";
import GymImage from 'images/gymImage.jpg';
import Paper from '@material-ui/core/Paper';
import Styled from 'styled-components';
import {
  ThemeProvider,
  createMuiTheme,
} from '@material-ui/core/styles';


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

  const theme = createMuiTheme({
    palette: {
      primary: {
        main: '#0288d1',
      },
    },
  });

  // useEffect(() => {
  //   if (generalState.loginSuccessful) {
  //     history.replace("/home");
  //   } else {
  //     history.replace("/");
  //   }
  // }, [generalState.loginSuccessful]);

  return (
    <div className="login-container">

      <div className="login-login-section">
        <div className="login-login-section-header-section">
          <h1>Peloton Dashboard</h1>
          <p>A dashboard to display your Peloton workout statistics.</p>
        </div>


        <ThemeProvider theme={theme}>
          <TextField
            error={Boolean(loginMessage)}
            id="login-username-textfield"
            className="login-textfield"
            label="Username"
            variant="outlined"
            value={userName}
            onChange={event => setUserName(event.target.value)}
          />
        </ThemeProvider>

        <ThemeProvider theme={theme}>
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
        </ThemeProvider>

        {loginMessage && <div>{loginMessage}</div>}

        <div className="login-login-section-submit-button">
          <Button
            variant="contained"
            color="primary"
            onClick={() => handleSubmit()}
          >
            Login
          </Button>
        </div>
      </div>

      <div className="login-preview-section">
        <img src={GymImage} alt="gym"/>
      </div>

    </div>
  );
};

export default Login;
