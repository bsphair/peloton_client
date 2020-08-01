import { configureStore } from '@reduxjs/toolkit';
import counterReducer from '../features/counter/counterSlice';
import generalInformationReducer from 'components/loginSlice';

export default configureStore({
  reducer: {
    counter: counterReducer,
    general: generalInformationReducer,
  },
});
