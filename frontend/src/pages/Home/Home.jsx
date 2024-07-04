import React, { useState } from 'react'
import './Home.css'
import Header from '../../components/Header/Header'

import FoodDisplay from '../../components/FoodDisplay/FoodDisplay';
import AppDownload from '../../components/AppDownload/AppDownload';
import ExploreCatagory from '../../components/ExploreCatagory/ExploreCatagory';
function Home() {
    const [category,setCategory] =useState("All");
  return (
    <div>
        <Header/>
        <ExploreCatagory category={category} setCategory={setCategory}/>
        <FoodDisplay category={category}/>
        <AppDownload/>
    </div>
  )
}

export default Home