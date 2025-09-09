import React from 'react'
import Home from '../Components/Home'
import About from '../Components/About'
import { Route, Routes } from 'react-router'

const MainRoute = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/about" element={<About/>} />
      </Routes>
    </div>
  )
}

export default MainRoute
