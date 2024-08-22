import React, { useContext, useEffect, useState } from 'react';
import './Navbar.css';
import { assets } from '../../assets/assets';
import { Link, useNavigate } from 'react-router-dom';
import { storeContext } from '../../context/storeContext';
import axios from 'axios';
const Navbar = ({ setShowLogin }) => {
    const [menu, setMenu] = useState("Home");
    const {getTotalCartAmount} = useContext(storeContext);
    const { token, setToken } = useContext(storeContext);
    const { email,setEmail} = useContext(storeContext);
    const navigate = useNavigate();
    const [showAdmin,SetShowAdmin]=useState(false)
   
    
    const logout = () => {
        const confirmLogout = window.confirm("Are you sure you want to log out?");
        if (confirmLogout) {
            localStorage.removeItem("token");
            localStorage.removeItem("email");
            setToken("");
            setEmail('');
            navigate("/");
        }
    }
    const url="https://food-bite-api.vercel.app/api/user/login"
    const handleMenuClick = (menuName) => {
        setMenu(menuName);
    }

    const handleSearchClick = () => {
        navigate('/search');
    }
    const handleLogoClick = () => {
      navigate("/");
  }
  const fetchUser =async()=>{
    try {
        // Make the API call
        console.log("Fetching email:",email)
        
         if(email.trim()==="hriditaalam1@gmail.com"){
                SetShowAdmin(true);

         }else {
          // Show an error message if the API response is not successful
          console.log("Api is not working")
          SetShowAdmin(false);
         // toast.error("Failed to fetch response");
        }
      } catch (error) {
        // Handle any unexpected errors
        console.error("Error fetching :", error);
        //toast.error("An error occurred while fetching orders");
      }
  }
  useEffect(()=>{
    fetchUser();

  },[])
  
    return (
        <div className='navbar'>
            <div className='image-holder'>
               
                <Link to = '/'><img src={assets.logo} onClick={handleLogoClick} alt='' className='logo' /></Link>
            </div>
            <ul className='navbar-menu'>
                <li>
                    <Link to='/' onClick={() => handleMenuClick("Home")} className={menu === "Home" ? "active" : ""}>Home</Link>
                </li>
                <a href= '#explore-menu' onClick={()=>setMenu("Menu")} className={menu==="Menu"?"active":""}>Menu</a>
                <a href= '#app-download' onClick={()=>setMenu("Mobile-App")} className={menu ==="Mobile-App"?"active":""}>Mobile-app</a>
                <a href= '#footer' onClick={()=>setMenu("Contact-us")} className={menu==="Contact-us"?"active":""}>Contact-us</a>
            </ul>
            <div className="navbar-right">
                <img src={assets.search_icon} alt='' onClick={handleSearchClick} />
                
                <div className="navbar-search-icon">
                   <Link to ='/cart'> <img src={assets.basket_icon} alt="" /></Link>
                    <div className={getTotalCartAmount()==0?"":"dot"}></div>
                </div>
                {!token ?
                    <button onClick={() => setShowLogin(true)}>Sign In</button>
                    :
                    <div className='navbar-profile' onClick={fetchUser}>
                        <img src={assets.profile_icon} alt="Profile" />
                        <ul className='nav-profile-dropdown'>
                            <li onClick={()=>navigate('/myorders')} >
                                <img src={assets.bag_icon} alt="" /><p>Order</p>
                            </li>
                            <hr />
                            <li onClick={logout}>
                                <img src={assets.logout_icon} alt="" /><p>Log Out</p>
                                {console.log('Here is token: ',token)}
                            </li>
                            <hr />
                            {showAdmin ?(
    <>
        <li onClick={() => navigate('/admin')}>
            
            <p>Admin Panel</p>
        </li>
        
    </>
) : (
   <br />
)}
                        </ul>
                    </div>
                }
            </div>
        </div>
    );
}

export default Navbar;