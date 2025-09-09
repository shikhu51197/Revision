import React, { useState } from "react";

const Login = () => {
  const [formData, setFormData] = useState({ username: "", password: "" });
  const [submittedData, setSubmittedData] = useState(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmittedData(formData);
    setFormData({ username: "", password: "" }); // clear fields
  };

  return (
    <div className="p-6 flex flex-col items-center gap-6">
      <form onSubmit={handleSubmit} className="space-y-4 w-64">
        <input
          type="text"
          name="username"
          placeholder="Username"
          value={formData.username}
          onChange={handleChange}
          className="w-full px-3 py-2 border rounded-lg"
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          className="w-full px-3 py-2 border rounded-lg"
        />
        <button className="w-full bg-blue-500 text-white py-2 rounded-lg">
          Submit
        </button>
      </form>

      {submittedData && (
        <div className="p-4 border rounded-lg shadow-md w-64 text-center">
          <h2 className="font-bold">Submitted Data</h2>
          <p>Username: {submittedData.username}</p>
          <p>Password: {submittedData.password}</p>
        </div>
      )}
    </div>
  );
};

export default Login;
