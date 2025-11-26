import { createSlice } from '@reduxjs/toolkit';

// Initial state for the counter
const initialState = {
  value: 0,
};

// Create a slice with reducers and actions
const counterSlice = createSlice({
  name: 'counter', // Name of the slice
  initialState,    // Initial state
  reducers: {
    // Increment action
    increment: (state) => {
      state.value += 1; 
    },
    // Decrement action
    decrement: (state) => {
      state.value -= 1;
    },
    // Increment by amount action
    incrementByAmount: (state, action) => {
      state.value += action.payload;
    },
    // Reset action
    reset: (state) => {
      state.value = 0;
    },
  },
});


// Export actions for use in components
export const { increment, decrement, incrementByAmount, reset } = counterSlice.actions;

// Export the reducer to be used in the store
export default counterSlice.reducer;

