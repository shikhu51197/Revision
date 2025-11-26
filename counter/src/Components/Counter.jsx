import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { increment, decrement, incrementByAmount, reset } from '../store/counterSlice';

const Counter = () => {
  // Get the counter value from Redux store
  const count = useSelector((state) => state.counter.value);
  
  // Get dispatch function to dispatch actions
  const dispatch = useDispatch();
  
  // Local state for custom increment amount
  const [incrementAmount, setIncrementAmount] = useState('');

  // Handle increment by custom amount
  const handleIncrementByAmount = () => {
    const amount = Number(incrementAmount);
    if (!isNaN(amount)) {
      dispatch(incrementByAmount(amount));
      setIncrementAmount('');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">Redux Counter</h1>
          <p className="text-gray-600">Learn Redux with React</p>
        </div>

        {/* Counter Display */}
        <div className="bg-gradient-to-r from-blue-500 to-indigo-600 rounded-xl p-8 mb-8 text-center">
          <p className="text-white text-sm font-semibold mb-2 uppercase tracking-wide">Current Count</p>
          <div className="text-6xl font-bold text-white">{count}</div>
        </div>

        {/* Basic Controls */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          <button
            onClick={() => dispatch(decrement())}
            disabled={count === 0}
            className={`${
              count === 0
                ? 'bg-red-300 cursor-not-allowed'
                : 'bg-red-500 hover:bg-red-600 hover:scale-105 active:scale-95'
            } text-white font-semibold py-3 px-6 rounded-lg transition-all duration-200 transform shadow-lg`}
          >
            Decrement (-)
          </button>
          <button
            onClick={() => dispatch(increment())}
            className="bg-green-500 hover:bg-green-600 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-200 transform hover:scale-105 active:scale-95 shadow-lg"
          >
            Increment (+)
          </button>
        </div>

        {/* Reset Button */}
        <button
          onClick={() => dispatch(reset())}
          className="w-full bg-gray-500 hover:bg-gray-600 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-200 transform hover:scale-105 active:scale-95 shadow-lg mb-6"
        >
          Reset to Zero
        </button>

        {/* Custom Increment */}
        <div className="border-t pt-6">
          <p className="text-gray-700 font-semibold mb-3 text-center">Increment by Custom Amount</p>
          <div className="flex gap-2">
            <input
              type="number"
              value={incrementAmount}
              onChange={(e) => setIncrementAmount(e.target.value)}
              placeholder="Enter amount"
              className="flex-1 border-2 border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
            />
            <button
              onClick={handleIncrementByAmount}
              className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-6 rounded-lg transition-all duration-200 transform hover:scale-105 active:scale-95 shadow-lg"
            >
              Add
            </button>
          </div>
        </div>

        {/* Info Section */}
        <div className="mt-8 p-4 bg-blue-50 rounded-lg border border-blue-200">
          <p className="text-sm text-gray-700 text-center">
            <span className="font-semibold">How it works:</span> This counter uses Redux Toolkit to manage state.
            Click buttons to dispatch actions that update the store!
          </p>
        </div>
      </div>
    </div>
  );
};

export default Counter;

