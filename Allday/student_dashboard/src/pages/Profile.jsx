import React, { useState } from "react";
import Button from "../components/Button";

export default function Profile() {
  const [formData, setFormData] = useState({ username: "", password: "" });
  const [submittedData, setSubmittedData] = useState(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmittedData(formData);
    setFormData({ username: "", password: "" });
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Profile</h1>
      <form onSubmit={handleSubmit} className="space-y-4 max-w-sm">
        <input
          type="text"
          name="username"
          placeholder="Username"
          className="w-full p-2 border rounded-lg"
          value={formData.username}
          onChange={handleChange}
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          className="w-full p-2 border rounded-lg"
          value={formData.password}
          onChange={handleChange}
        />
        <Button theme="primary" type="submit">Update Profile</Button>
      </form>

      {/* Show Submitted Data */}
      {submittedData && (
        <div className="mt-4 p-4 bg-green-100 border rounded-lg">
          <p><strong>Username:</strong> {submittedData.username}</p>
          <p><strong>Password:</strong> {submittedData.password}</p>
        </div>
      )}
    </div>
  );
}
