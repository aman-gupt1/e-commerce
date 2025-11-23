import React from 'react'
import { IoCartOutline } from 'react-icons/io5'
import { useNavigate } from 'react-router-dom'
import { useCart } from '../context/CartContext'

const ProductCard=({product})=>{
  const navigate=useNavigate()
  const {addToCart}=useCart()
  return (
    <div className='border relative border-gray-100 rounded-2xl cursor-pointer hover:scale-105 hover:shadow-2xl transition-all p-2 h-max
       '>
      <img src={product.images[0]} alt="not availble" 
      className='bg-gray-100 aspect-square'
      onClick={()=>navigate(`/product/${product.id}`)}/>  
      <h1 className='line-clamp-1 p-1 font-semibold'>{product.title}</h1>
      <p className='my-1 text-lg text-gray-800 font-bold'>${product.price}</p>
      <button className='bg-red-500 px-3 py-2 text-lg rounded-md text-white
      w-full cursor-pointer flex gap-1 items-center justify-center font-semibold' onClick={()=>addToCart(product)}><IoCartOutline className='w-6 h-6'/> Add to Cart</button>
    </div>
  )
}

export default ProductCard
