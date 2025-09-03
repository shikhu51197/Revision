import React from "react";

const UserCard = ({ name, age, email }) => {
  return (
    <div className="border p-4 m-2 rounded shadow-md w-64">
      <h2 className="text-xl font-bold">{name}</h2>
      <p>Age: {age}</p>
      <p>Email: {email}</p>
    </div>
  );
};

export default UserCard;
