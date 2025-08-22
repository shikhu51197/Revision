
import React, { useState } from "react";

function Counter() {
  const [count, setCount] = useState(0);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-2xl font-bold mb-4 text-blue-600">Counter App</h1>

      <p className="text-xl mb-4">Count: {count}</p>

      <div className="space-x-2">
        <button
          onClick={() => setCount(count + 1)}
          className="px-4 py-2 bg-green-500 text-white rounded-lg shadow hover:bg-green-600"
        >
          Increment
        </button>

        <button
          onClick={() => setCount(count - 1)}
          className="px-4 py-2 bg-red-500 text-white rounded-lg shadow hover:bg-red-600"
        >
          Decrement
        </button>

        <button
          onClick={() => setCount(0)}
          className="px-4 py-2 bg-gray-500 text-white rounded-lg shadow hover:bg-gray-600"
        >
          Reset
        </button>
      </div>
    </div>
  );
}

export default Counter;
