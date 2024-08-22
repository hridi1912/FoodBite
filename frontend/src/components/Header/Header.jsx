import React from 'react';
import Slider from 'react-slick';
import './Header.css';
import { assets } from '../../assets/assets';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

function Header() {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
  };

  return (
    <div className='header'>
      <Slider {...settings}>
        <div>
          <img src={assets.banner1} alt="Banner 1" className="banner-image" />
        </div>
        <div>
          <img src={assets.banner2} alt="Banner 2" className="banner-image" />
        </div>
        {/* Add more slides as needed */}
      </Slider>
      <div className="header-contents">
        
        
        
      </div>
    </div>
  );
}

export default Header;
