import React, { useEffect } from 'react'
import { getData } from '../context/DataContext'
import FilterSection from '../components/FilterSection'
import Loading from "../assets/Loading4.webm"
import ProductCard from '../components/ProductCard'
import { useState } from 'react'
import Pagination from '../components/Pagination'
import Lottie from 'lottie-react'
import notfound from "../assets/notfound.json"
import MobileFilter from '../components/MobileFilter'
const Product=()=>{
  const {data, fetchAllProducts}=getData()

  // statemanagement
  const [search, setSearch]=useState("")
  const [category, setCategory]=useState("All")
  const [brand, setBrand]=useState("All")
  const [priceRange, setPriceRange]=useState([0,5000])
  const [page,setPage]=useState(1)
  const [openFilter, setOpenFilter]=useState(false)

  useEffect(()=>{
    fetchAllProducts()
    window.scrollTo(0,0)
  },[])

  const hadleCategoryChange=(e)=>{
    setCategory(e.target.value)
    setPage(1)
    setOpenFilter(false)
    // console.log(category)
  }
  const handleBrandChange=(e)=>{
    setBrand(e.target.value)
    setPage(1)
    setOpenFilter(false)
  }

  const pageHandler=(selectPage)=>{
    setPage(selectPage)
    window.scrollTo(0,0)
  }
  

  const filteredData = data?.filter((item) => {
  return (
    item.title.toLowerCase().includes(search.toLowerCase()) &&
    (category === "All" || item.category === category) &&
    (brand === "All" || item.brand?.toLowerCase().trim() === brand.toLowerCase().trim()) &&
    item.price >= priceRange[0] &&
    item.price <= priceRange[1]
  );
});
const dynamicPage =Math.ceil(filteredData?.length/8)

  return (
    <div>
      <div className='max-w-6xl mx-auto px-4 mb-10'>
        <div>
          <MobileFilter openFilter={openFilter} setOpenFilter={setOpenFilter} search={search} setSearch={setSearch}
             category={category} setCategory={setCategory} 
             brand={brand} setBrand={setBrand} 
             priceRange={priceRange} setPriceRange={setPriceRange} 
             hadleCategoryChange={hadleCategoryChange}  handleBrandChange={ handleBrandChange}/>
        </div>
      {
        data?.length>0 ?(
          <>
          <div className='flex gap-8'>
            < FilterSection search={search} setSearch={setSearch}
             category={category} setCategory={setCategory} 
             brand={brand} setBrand={setBrand} 
             priceRange={priceRange} setPriceRange={setPriceRange} 
             hadleCategoryChange={hadleCategoryChange}  handleBrandChange={ handleBrandChange}/>
             {
              filteredData?.length>0 ? (
                <div className='flex flex-col justify-center items-center'>
                  <div className='grid grid-cols-2 md:grid-cols-4 gap-2 md:gap-7 mt-10 '>
              {
                // fetch data from filter 
               filteredData?.slice(page*8-8, page*8).map((product, index)=>{
                return <ProductCard key={index} product={product}/>
               })
              }
            </div>
            <Pagination pageHandler={pageHandler} page={page} dynamicPage={dynamicPage}/>
                </div>
              ) : (
                <div className='flex  justify-center items-center md:h-[600px] md:w-[900px] mt-10'> 
                <Lottie animationData={notfound} classID='w-[500px]'/>
                </div>
              )
             }
            {/* <div className='grid grid-cols-4 gap-7 mt-10 '>
              {
                // fetch data from filter 
               filteredData?.slice(page*8-8, page*8).map((product, index)=>{
                return <ProductCard key={index} product={product}/>
               })
              }
            </div> */}
          </div>
          
          </>
        ) :(
          <div className='flex items-center justify-center h-[400px]'>
            <video muted autoPlay loop>
              <source src={Loading} type='video/webm' />
            </video>
          </div>
        )
      }
      </div>
    </div>
  )
}

export default Product
