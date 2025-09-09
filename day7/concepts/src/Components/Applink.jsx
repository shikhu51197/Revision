
import {Link } from "react-router-dom";


function Applink() {
  return (
    <>
      <header className="flex gap-6 bg-blue-500 text-white p-4">
        <Link to="/">Home</Link>
        <Link to="/about">About</Link>
        <Link to="/contact">Contact</Link>
      </header>
    </>
  );
}

export default Applink;
