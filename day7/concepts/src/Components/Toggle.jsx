import React, { useState } from "react";

const Toggle = () => {
  const [isOn, setIsOn] = useState(false);

  return (
    <>
  
      <button
        onClick={() => setIsOn(!isOn)}
        className={`px-6 py-2 rounded-xl text-white ${
          isOn ? "bg-green-500" : "bg-red-500"
        }`}
      >
        {isOn ? "ON" : "OFF"}
      </button>
    </>
  );
};

export default Toggle;
