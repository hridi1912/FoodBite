import React, { useState } from 'react'
import './Home.css'
import Header from '../../components/Header/Header'
import AppDownload from '../../components/AppDownload/AppDownload';
import ExploreCatagory from '../../components/ExploreCatagory/ExploreCatagory';
import ItemDisplay from '../../components/ItemDisplay/ItemDisplay';
function Home() {
    const [catagory,setcatagory] =useState("All");
  return (
    <div>
        <Header/>
        <ExploreCatagory catagory={catagory} setcatagory={setcatagory}/>
        <ItemDisplay catagory={catagory}/>
        <AppDownload/>
    </div>
  )
}

export default Home