import { configureStore } from '@reduxjs/toolkit';
import counterReducer from './counterSlice';


// Configure the Redux store
export const store = configureStore({
  reducer: {
    counter: counterReducer, // Add counter reducer to the store
  },
});


 
