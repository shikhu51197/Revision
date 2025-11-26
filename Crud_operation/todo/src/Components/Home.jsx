import React from 'react'
import { useNavigate } from 'react-router-dom'

const Home = () => {
    const navigate = useNavigate()
    return (
        <div className='pt-[100px] text-red-900  text-center flex flex-col justify-center items-center gap-10'>
            <h1 className='text-[50px] text-blue-950 '>Welcome! To the Zara Fashion</h1>
            <p className='text-[50px]'>Lorem dfjkvbnrjkdgn jbnsdfjbnsdjk jknbndvjks
            </p>
            <button className=' w-[300px] border-2 border-blue-900 px-10 py-2 rounded-2xl'
            onClick={()=>navigate("/products")}
            >View Products</button>
        </div>
    )
}
export default Home