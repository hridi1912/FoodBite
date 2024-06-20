import React from 'react'
import './Footer.css'
import { assets } from '../../assets/assets'
const Footer = () => {
  return (
    <div className='footer' id='footer'>
       <div className="footer-content">
        <div className="footer-content-left">
            <img src={assets.logo} />
            <p>FoodBite is a place where you will find every cuisin around the world.</p>
        </div>
        <div className="footer-content-center">

        </div>
        <div className="footer-content-right">

        </div>
       </div>
    </div>
  )
}

export default Footer