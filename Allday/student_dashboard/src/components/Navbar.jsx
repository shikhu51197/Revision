import React from "react";
import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="bg-blue-600 text-white p-4 flex gap-6 shadow-md">
      <Link to="/" className="hover:underline">Dashboard</Link>
      <Link to="/profile" className="hover:underline">Profile</Link>
      <Link to="/contact" className="hover:underline">Contact</Link>
    </nav>
  );
}
