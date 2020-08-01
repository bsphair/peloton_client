/* eslint-disable */
import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

export const loginSlice = createSlice({
  name: 'generalInformation',
  initialState: {
    id: '',
    imageURL: '',
    authenticatedFitbit: false,
    authenticatedStrava: false,
    lastWorkoutDate: 0,
    profileCreated: 0,
    totalFollowers: 0,
    totalFollowing: 0,
    workoutMetrics: {
      totalNonPedalingWorkouts: 0,
      totalPedalingWorkouts: 0,
      totalWorkouts: 0,
      running: { count: 0 },
      walking: { count: 0 },
      strength: { count: 0 },
      meditation: { count: 0 },
      bootcamp: { count: 0 },
      stretching: { count: 0 },
      cardio: { count: 0 },
      yoga: { count: 0 },
      cycling: { count: 0 },
    },
    credentials: {
      userName: '',
      password: '',
      userId: '',
    },
    loginStatus: 0,
    loginMessage: '',
    userInfo: {
      firstName: '',
      lastName: '',
      email: '',
      height: 0,
      weight: 0,
      location: '',
    }
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
      console.log(`Error: ${error}`);
    })
    .then(res => {
      console.log(JSON.parse(res.data));
      const jsonData = JSON.parse(res.data);
    });
};


export default loginSlice.reducer;
