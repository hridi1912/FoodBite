import React, { useState } from 'react'
import Navbar from './components/Navbar/Navbar'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home/Home'
import Cart from './pages/Cart/Cart'
import PlaceOrder from './pages/PlaceOrder/PlaceOrder'
import Footer from './components/Footer/Footer'
import LoginPopup from './components/LoginPopup/LoginPopup'
import Search from './pages/Search/search'
import Details from './pages/Details/details'
import ExploreCatagory from './components/ExploreCatagory/ExploreCatagory'
import Verify from './pages/Verify/Verify'

const App = () => {

  const [showLogin,setShowLogin] = useState(false)


  return (
    <>
    {showLogin?<LoginPopup setShowLogin={setShowLogin}/>:<></>}
    <div className='app'>
      <Navbar setShowLogin={setShowLogin} />
      <Routes>
        <Route path='/' element={<Home/>}/>
        
        <Route path='/cart' element={<Cart/>}/>
        <Route path='/order' element={<PlaceOrder/>}/>
       
        <Route path='/search' element={<Search/>}/>
        <Route path="/gadget/:id" element={<Details/>} />
        <Route path= '/verify' element = {<Verify/>}/>
      </Routes>
    </div>
    <Routes>
       <Route path='/' element={<Footer/>}/>
    </Routes>
    </>
  )
}

export default App