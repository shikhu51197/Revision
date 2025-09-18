import React from "react";

export default function Button({ children, theme = "primary", onClick, type = "button" }) {
  const base = "px-4 py-2 rounded-lg font-semibold shadow-md focus:outline-none";
  const styles = {
    primary: "bg-blue-500 text-white hover:bg-blue-600",
    secondary: "bg-gray-500 text-white hover:bg-gray-600",
    danger: "bg-red-500 text-white hover:bg-red-600",
  };

  return (
    <button onClick={onClick} type={type} className={`${base} ${styles[theme]}`}>
      {children}
    </button>
  );
}
