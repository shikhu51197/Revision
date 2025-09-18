import React from "react";

export default function StudentCard({ student: { name, age, grade } }) {
  return (
    <div className="border rounded-xl p-4 bg-white shadow-md mb-4">
      <h2 className="text-lg font-bold">{name}</h2>
      <p>Age: {age}</p>
      <p>Grade: {grade}</p>
    </div>
  );
}
