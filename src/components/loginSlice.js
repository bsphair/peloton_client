/* eslint-disable */
import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

export const loginSlice = createSlice({
  name: 'login',
  initialState: {
    userName: '',
    password: '',
  },
  reducers: {
    setUserCredentials: (state, action) => {
      state.userName = action.payload.userName;
      state.password = action.payload.password;
    },
  },
});

export const userLogin = (username, password) => async dispatch => {
  axios({
    method: 'post',
    url: 'http://localhost:10000/login',
    data: {
      username_or_email: username,
      password: password,
    },
    headers: {
      'content-type': 'raw'
    }
  })
    .catch(error => {
      console.log(error);
    })
    .then(res => {
      console.log(res);
      console.log(JSON.parse(res.data));
    });
};


export default loginSlice.reducer;
