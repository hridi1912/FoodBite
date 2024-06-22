import React, { useContext, useState } from 'react'
import './Navbar.css'
import { assets } from '../../assets/assets'
import { Link, useNavigate } from 'react-router-dom';
import { storeContext } from '../../context/storeContext';

const Navbar = ({setShowLogin}) => {
    const[menu,setMenu]= useState("Home");
    const {token,setToken}= useContext(storeContext);
    const navigate =useNavigate();
    const logout =()=>{
          localStorage.removeItem("token");
          setToken("");
          navigate("/");
    }

    const searching=()=>{
      navigate('/search');
    }

  return (
    <div className='navbar'>
      <img src={assets.logo} alt='' className='logo'/>
      <ul className='navbar-menu'>
        <Link to = '/' onClick={()=>setMenu("Home")} className={menu==="Home"?"active":""}>Home</Link>
        <a href= '#explore-menu' onClick={()=>setMenu("Menu")} className={menu==="Menu"?"active":""}>Menu</a>
        <a href= '#app-download' onClick={()=>setMenu("Mobile-App")} className={menu ==="Mobile-App"?"active":""}>Mobile-app</a>
        <a href= '#footer' onClick={()=>setMenu("Contact-us")} className={menu==="Contact-us"?"active":""}>Contact-us</a>
      </ul>
      <div className="navbar-right">
        <img onClick={searching} src={assets.search_icon} alt='' />
        <div className="navbar-search-icon">
            <img src={assets.basket_icon} alt="" />
            <div className="dot"></div>
        </div>
        {!token?<button onClick ={()=>setShowLogin(true)}>sign in</button>
      :<div className='navbar-profile'>
        <img src={assets.profile_icon} />
        <ul className='nav-profile-dropdown'>
          <li><img src={assets.bag_icon} alt="" /><p>Order</p></li>
          <hr />
          <li onClick={logout} ><img src={assets.logout_icon} alt="" /><p>LogOut</p></li>
        </ul>
      </div>}
    </div>
  
  </div>
  )}

export default Navbar