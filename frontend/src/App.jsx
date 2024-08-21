import React, { useState } from 'react';
import Navbar from './components/Navbar/Navbar';
import { Route, Routes } from 'react-router-dom';
import Home from './pages/Home/Home';
import Cart from './pages/Cart/Cart';
import PlaceOrder from './pages/PlaceOrder/PlaceOrder';
import Footer from './components/Footer/Footer';
import LoginPopup from './components/LoginPopup/LoginPopup';
import Search from './pages/Search/search';
import Details from './pages/Details/details';
import ExploreCatagory from './components/ExploreCatagory/ExploreCatagory';
import Verify from './pages/Verify/Verify';
import MyOrders from './pages/MyOrders/MyOrders';
import PaymentPreview from './pages/Payment/PaymentPreview';
import Admin from './pages/Admin/Admin';
import AddProduct from './pages/AddProduct/AddProduct';
import ListProduct from './pages/ListProduct/ListProduct';
import Orders from './pages/Orders/Orders';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const App = () => {
  const [showLogin, setShowLogin] = useState(false);
  const url = "https://food-bite-api.vercel.app";

  return (
    <>
      {showLogin ? <LoginPopup setShowLogin={setShowLogin} /> : null}
      <ToastContainer/>
      <div className='app'>
        <Navbar setShowLogin={setShowLogin} />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/cart' element={<Cart />} />
          <Route path='/order' element={<PlaceOrder />} />
          <Route path='/search' element={<Search />} />
          <Route path="/gadget/:id" element={<Details />} />
          <Route path='/verify' element={<Verify />} />
          <Route path="/payment/:orderId" element={<PaymentPreview />} />
          <Route path='/myorders' element={<MyOrders />} />
          
          {/* Nested routes under /admin */}
         
          <Route path='/admin' element={<Admin />}>
            <Route path='add' element={<AddProduct url={url} />} />
            <Route path='list' element={<ListProduct url={url} />} />
            <Route path='orders' element={<Orders url={url} />} />
          </Route>
        </Routes>
      </div>
      <Routes>
        <Route path='/' element={<Footer />} />
      </Routes>
    </>
  );
};

export default App;
