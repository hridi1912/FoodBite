import React, { useState } from 'react'
import './Home.css'
import Header from '../../components/Header/Header'
import AppDownload from '../../components/AppDownload/AppDownload';
import ExploreCatagory from '../../components/ExploreCatagory/ExploreCatagory';
import ItemDisplay from '../../components/ItemDisplay/ItemDisplay';
function Home() {
    const [category,setCategory] =useState("All");
  return (
    <div>
        <Header/>
        <ExploreCatagory category={category} setCategory={setCategory}/>
        <ItemDisplay category={category}/>
        <AppDownload/>
    </div>
  )
}

export default Home