import React, { useContext, useState } from 'react';
import './Navbar.css';
import { assets } from '../../assets/assets';
import { Link, useNavigate } from 'react-router-dom';
import { storeContext } from '../../context/storeContext';

const Navbar = ({ setShowLogin }) => {
    const [menu, setMenu] = useState("Home");
    const {getTotalCartAmount} = useContext(storeContext);
    const { token, setToken } = useContext(storeContext);
    const navigate = useNavigate();

    const logout = () => {
        const confirmLogout = window.confirm("Are you sure you want to log out?");
        if (confirmLogout) {
            localStorage.removeItem("token");
            setToken("");
            navigate("/");
        }
    }

    const handleMenuClick = (menuName) => {
        setMenu(menuName);
    }

    const handleSearchClick = () => {
        navigate('/search');
    }
    const handleLogoClick = () => {
      navigate("/");
  }

    return (
        <div className='navbar'>
            <div className='image-holder'>
                <img src={assets.sidebar}   alt="" className='sidebar' />
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
                    <div className={getTotalCartAmount()===0?"":"dot"}></div>
                </div>
                {!token ?
                    <button onClick={() => setShowLogin(true)}>Sign In</button>
                    :
                    <div className='navbar-profile'>
                        <img src={assets.profile_icon} alt="Profile" />
                        <ul className='nav-profile-dropdown'>
                            <li>
                                <img src={assets.bag_icon} alt="" /><p>Order</p>
                            </li>
                            <hr />
                            <li onClick={logout}>
                                <img src={assets.logout_icon} alt="" /><p>Log Out</p>
                            </li>
                        </ul>
                    </div>
                }
            </div>
        </div>
    );
}

export default Navbar;
