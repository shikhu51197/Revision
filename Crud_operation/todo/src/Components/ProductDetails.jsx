import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'


const ProductDetails = () => {
    const [product,setProduct] = useState({})
    const [error,setError] = useState(null)
    const [loading,setLoading] = useState(true)
    const {id} = useParams()
    const navigate = useNavigate()

    const getSingleProduct = async()=>{
        try{
            const response = await fetch(`https://fakestoreapi.com/products/${id}`)
            if(!response.ok){
                return <h1>Error</h1>
            }
            const data = await response.json()
            setProduct(data)
        }catch(err){
            console.log(err.message)
        }finally{
            setLoading(false)
        }
    }





    useEffect(()=>{
        getSingleProduct()
    },[])
  return (
    <div className="product-details-container">
      <button className="back-button" onClick={() => navigate(-1)}>
        ← Back
      </button>

      <div className="product-content">
        <img src={product.image} alt={product.title} />
        <div className="product-info">
          <h2>{product.title}</h2>
          <p>{product.description}</p>
          <div className="product-price">$ {product.price}</div>
          <div className="product-category">{product.category}</div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails