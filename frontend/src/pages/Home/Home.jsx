import React, { useState } from 'react'
import './Home.css'
import Header from '../../components/Header/Header'
import AppDownload from '../../components/AppDownload/AppDownload';
import ExploreCatagory from '../../components/ExploreCatagory/ExploreCatagory';
import ItemDisplay from '../../components/ItemDisplay/ItemDisplay';
import OrderPieChart from '../../components/OrderPieChart/OrderPieChart';
function Home() {
    const [catagory,setcatagory] =useState("All");
  return (
    <div>
        <Header/>
        <div id='explore-menu'><ExploreCatagory catagory={catagory} setcatagory={setcatagory}/></div>
        <div><ItemDisplay catagory={catagory}/></div>
        <div><OrderPieChart/></div>
        <div id='app-download'><AppDownload/></div>
    </div>
  )
}

export default Home