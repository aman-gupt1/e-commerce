import React from "react";
import { getData } from "../context/DataContext";
 const FilterSection=({search, setSearch,category, setCategory, setPriceRange, brand, setBrand, priceRange,hadleCategoryChange, handleBrandChange})=>{
    const {categoryOnlyData, brandOnlyData}=getData()
    return(
        <div className='bg-gray-100 mt-10 p-4 rounded-md h-max hidden md:block'>
        <input type="text" 
        onChange={(e)=>setSearch(e.target.value)} 
        placeholder='Search..' value={search}
        className='bg-white p-2 rounded-md border-gray-400 border-2'/> 

           {/* category only data  */}
           <h1 className="mt-5 font-semibold text-xl">Category</h1>
           <div className="flex flex-col gap-2 mt-3">
                {
                  categoryOnlyData?.map((item,index)=>{
                  return <div key={index} className='flex gap-2'>
                        <input type="checkbox" name={item} checked={category===item} value={item} onChange={hadleCategoryChange}/>
                        <button className="cursor-pointer uppercase">{item}</button>
                    </div>
                  })
                }
           </div>
           {/* brand only data */}
           <h1 className="mt-5 mb-3 font-semibold text-xl">Brand</h1>
           <select name="" id=""
           className="bg-white w-full p-2 border-gray-400 border-2 rounded-md"
           value={brand} onChange={ handleBrandChange}>
            {
             brandOnlyData?.map((item, index)=>{
                // item.toUpperCase()
                return <option key={index} value={item} >{item}</option>
             })   
            }
           </select>
           {/* price range  */}
            <h1 className="mt-5 mb-3 font-semibold text-xl">Price Range</h1>
            <div className="flex flex-col gap-2">
            <label htmlFor="">Price Range: ${priceRange[0]} - ${priceRange[1]}</label>
            <input type="range" min="0"  max="5000" id="" name="" value={priceRange[1]} onChange={(e)=>setPriceRange([priceRange[0],Number(e.target.value)])}/>
            </div>
            <button className="bg-red-500 text-white rounded-md px-3 py-1 mt-5 cursor-pointer"
             onClick={()=>{
               setSearch('');
               setCategory('All');
               setBrand('All');
               setPriceRange([0,5000])
             }}>Reset Filters</button>
        </div>
    )
 }
 export default FilterSection