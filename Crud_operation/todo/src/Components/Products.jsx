import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

const Products = () => {
    const [products, setData] = useState([])
    const [error, setError] = useState(null)
    const [loading, setLoading] = useState(true)
    const navigate = useNavigate()

    useEffect(() => {
        getProducts()
    }, [])

    const getProducts = async () => {
        try {
            const response = await fetch("https://fakestoreapi.com/products")
            if (!response.ok) {
                return console.error("Error in Loading");
            }
            const data = await response.json()
            setData(data)
        } catch (err) {
            setError(err.message)
        } finally {
            setLoading(false)
        }
    }


    
    if (loading) return <p>Loading products...</p>
    if (error) return <p>Error: {error}</p>

    return (
        <div>
            <h1>Products</h1>
            <div className='grid grid-cols-4 bg-blue-100 gap-10 items-center justify-center p-4 '>
                {products.map((product) => (
                    <div key={product.id} className='flex gap-4 flex-col shadow-xl items-center justify-center border border-blue-950 rounded-[20px] h-[450px] p-4 bg-white'>
                        <img src={product.image} alt={product.title} className='w-[180px]' />
                        <h3>{product.title}</h3>
                        <p>${product.price}</p>
                        <button
                        className='border-2 border-blue-950 rounded-3xl py-2 px-10'
                         onClick={() => navigate(`/product/${product.id}`)}>
                            Details
                        </button>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Products