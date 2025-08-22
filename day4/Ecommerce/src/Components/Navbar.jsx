import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <header className="bg-blue-600 text-white p-4 shadow-md">
      <nav className="flex justify-between items-center container mx-auto">
        <h1 className="text-xl font-bold">My Website</h1>
        <div className="space-x-4">
          <Link to="/" className="hover:text-yellow-300">Home</Link>
          <Link to="/about" className="hover:text-yellow-300">About</Link>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
