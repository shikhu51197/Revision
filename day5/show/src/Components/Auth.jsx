
import React, { useState } from "react";

function Auth() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [submit, setSubmit] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmit({ name, email });
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <h1 className="text-xl font-bold mb-4 text-blue-600">Authentication Form👋 </h1>

      <form onSubmit={handleSubmit} className="bg-white p-4 rounded shadow w-72">
        <input
          type="text"
          placeholder="Enter name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full p-2 border rounded mb-2"
        />
        <input
          type="email"
          placeholder="Enter email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-2 border rounded mb-2"
        />
        <button
          type="submit"
          className="w-full bg-green-500 text-white py-2 rounded"
        >
          Submit
        </button>
      </form>

      {submit && (
        <div className="mt-4 p-3 bg-green-100 rounded w-72">
          <p><strong>Name:</strong> {submit.name}</p>
          <p><strong>Email:</strong> {submit.email}</p>
        </div>
      )}
    </div>
  );
}

export default Auth;
