import React from 'react'
import Home from '../Components/Home'
import About from '../Components/About'
import { Routes, Route } from "react-router-dom";
const Mainroutes = () => {
  return (
    <div className="flex-grow p-6">    
                <Routes>
                  <Route path="/" element={<Home/>} />
                  <Route path="/about" element={<About />} />
                </Routes>
    </div>
  )
}

export default Mainroutes
