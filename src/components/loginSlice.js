/* eslint-disable */
import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

export const loginSlice = createSlice({
  name: 'loginSlice',
  initialState: {
    authenticatedFitbit: false,
    authenticatedStrava: false,
    credentials: {
      userName: '',
      password: '',
      userId: '',
    },
    id: '',
    imageURL: '',
    lastWorkoutDate: 1596836884,
    loginMessage: '',
    loginSuccessful: true,
    profileCreated: 1577385294,
    totalFollowers: 9,
    totalFollowing: 9,
    userInfo: {
      firstName: 'Brian',
      lastName: 'Phair',
      email: 'bsphair@gmail.com',
      height: 67,
      weight: 153,
      location: 'Maryland',
    },
    workoutMetrics: {
      totalNonPedalingWorkouts: 31,
      totalPedalingWorkouts: 203,
      totalWorkouts: 234,
      running: { count: 0 },
      walking: { count: 0 },
      strength: { count: 0 },
      meditation: { count: 0 },
      bootcamp: { count: 0 },
      stretching: { count: 29 },
      cardio: { count: 0 },
      yoga: { count: 1 },
      cycling: { count: 203 },
    }
  },
  reducers: {
    setUserCredentials: (state, action) => {
      state.userName = action.payload.userName;
      state.password = action.payload.password;
    },
    loginFailed: (state, action) => {
      const { payload } = action;
      const { loginMessage } = payload;
      state.loginMessage = loginMessage;
      state.loginSuccessful = false;
    },
    loginSuccessful: (state, action) => {
      const { payload } = action;
      const {
        id,
        authenticatedFitbit,
        authenticatedStrava,
        loginMessage,
        loginSuccessful,
        lastWorkoutDate,
        profileCreated,
        totalFollowers,
        totalFollowing,
        workoutMetrics,
        userInfo,
      } = payload;

      state.id = id;
      state.authenticatedFitbit = authenticatedFitbit;
      state.authenticatedStrava = authenticatedStrava;
      state.loginMessage = loginMessage;
      state.lastWorkoutDate = lastWorkoutDate;
      state.profileCreated = profileCreated
      state.totalFollowers = totalFollowers;
      state.totalFollowing = totalFollowing;
      state.workoutMetrics = workoutMetrics;
      state.userInfo = userInfo;
      state.loginSuccessful = loginSuccessful;
    },
  },
});

export const {
  setUserCredentials,
  loginFailed,
  loginSuccessful,
} = loginSlice.actions;

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
      const jsonData = JSON.parse(res.data);

      const errorMessage = jsonData?.message;

      if (errorMessage) {
        dispatch(loginFailed({
          loginMessage: errorMessage,
        }));
      } else {
        const { user_data } = jsonData;
        const {
          id,
          is_fitbit_authenticated,
          is_strava_authenticated,
          last_workout_at,
          created_at,
          total_followers,
          total_following,
          total_non_pedaling_metric_workouts,
          total_pedaling_metric_workouts,
          total_workouts,
          workout_counts,
          last_name,
          first_name,
          email,
          height,
          weight,
          location,
        } = user_data;

        const tempState = {
          id: id,
          authenticatedFitbit: is_fitbit_authenticated,
          authenticatedStrava: is_strava_authenticated,
          loginMessage: '',
          loginSuccessful: true,
          lastWorkoutDate: last_workout_at,
          profileCreated: created_at,
          totalFollowers: total_followers,
          totalFollowing: total_following,
          workoutMetrics: {
            totalNonPedalingWorkouts: total_non_pedaling_metric_workouts,
            totalPedalingWorkouts: total_pedaling_metric_workouts,
            totalWorkouts: total_workouts,
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
          userInfo: {
            firstName: first_name,
            lastName: last_name,
            email: email,
            height: height,
            weight: weight,
            location: location,
          }
        }

        Object.values(workout_counts).forEach(workout => {
          switch (workout.name) {
            case 'Bootcamp':
              tempState.workoutMetrics.bootcamp.count = workout.count;
              break;
            case 'Strength':
              tempState.workoutMetrics.strength.count = workout.count;
              break;
            case 'Meditation':
              tempState.workoutMetrics.meditation.count = workout.count;
              break;
            case 'Walking':
              tempState.workoutMetrics.walking.count = workout.count;
              break;
            case 'Cycling':
              tempState.workoutMetrics.cycling.count = workout.count;
              break;
            case 'Running':
              tempState.workoutMetrics.running.count = workout.count;
              break;
            case 'Stretching':
              tempState.workoutMetrics.stretching.count = workout.count;
              break;
            case 'Cardio':
              tempState.workoutMetrics.cardio.count = workout.count;
              break;
            case 'Yoga':
              tempState.workoutMetrics.yoga.count = workout.count;
              break;
            default:
              break;
          }
        });

        dispatch(loginSuccessful(tempState))
      }

    });
};

export default loginSlice.reducer;
