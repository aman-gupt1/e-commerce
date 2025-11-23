import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import Loading from "../assets/Loading4.webm"
import axios from 'axios'
import { ChevronLeft } from 'lucide-react'
import ProductListView from '../components/ProductListView'
const CategoryProduct=()=>{
    const params=useParams()
    const category=params.category
    const navigate=useNavigate()
    const [searchData, setSearchData]=useState([])
    const getFilterData= async()=>{
        try{
            const res= await axios.get("https://dummyjson.com/products?limit=150")
            const data=res.data.products;

            // filter data category vise 
            const filter=data.filter(item=>item.category.includes(category))
            setSearchData(filter)
        } catch(error){
            console.log(error)
        }
    }
    useEffect(()=>{
        getFilterData();
        window.scrollTo(0,0)
    },[])
  return (
    <div>
      {
        searchData.length >0 ?(
            <div className='max-w-6xl mx-auto mt-10 mb-10 px-4'>
              <button onClick={()=>navigate('/')} className='bg-gray-800 mb-5 text-white px-3 py-1 rounded-md cursor-pointer flex gap-1 items-center'><ChevronLeft/>
              Check</button> 
              {
               searchData.map((product, index)=>{
                 return <ProductListView key={index} product={product}/> 
               }) 
              } 
            </div>
        ):(
            <div className='flex items-center justify-center h-[400px]'>
                <video muted autoPlay loop>
                    <source src={Loading} type='video/webm'/>
                </video>
            </div>
        )
      }
    </div>
  )
}

export default CategoryProduct
