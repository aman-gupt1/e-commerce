import React, { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from './pages/Home';
import Product from './pages/Products';
import About from './pages/About';
import Contact from './pages/Contact';
import Cart from './pages/Cart';
import Navbar from './components/Navbar';
import axios from "axios";
import Footer from './components/Footer';
import SingleProduct from './pages/SingleProduct';
import CategoryProduct from './pages/CategoryProduct';
import { useCart } from './context/CartContext';
import ProtectedRoute from './components/ProtectedRoute';
function App() {
  const [location, setLocation]=useState(null)
  const [openDropDown, setOpenDropDown]=useState(false)
  const getLocation=async()=>{
    navigator.geolocation.getCurrentPosition(async (pos)=>{
      const {latitude, longitude}=pos.coords;
      const url=`https://api.opencagedata.com/geocode/v1/json?q=${latitude}+${longitude}&key=20f376dad1664bb199762e26b0e4606a`;
      try {
        const res = await axios.get(url);
        const exactLocation = res.data.results[0].components;
        // console.log(exactLocation)
        setLocation(exactLocation);
        setOpenDropDown(false)
      } catch (error) {
        console.log("Error fetching location:", error.message);
      }
    })
  }

  useEffect(()=>{
getLocation()
  },[])

  return ( 
    <BrowserRouter>
    <Navbar location={location} getLocation={getLocation} openDropDown={openDropDown} setOpenDropDown={setOpenDropDown}/>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/products' element={<Product />} />
        <Route path='/product/:id' element={<SingleProduct />} />
        <Route path='category/:category' element={<CategoryProduct/>}/>
        <Route path='/about' element={<About />} />
        <Route path='/contact' element={<Contact />} />
        <Route path='/cart' element={<ProtectedRoute><Cart location={location} getLocation={getLocation}/></ProtectedRoute>} />
      </Routes>
      <Footer/>
    </BrowserRouter>
  );
}

export default App;
