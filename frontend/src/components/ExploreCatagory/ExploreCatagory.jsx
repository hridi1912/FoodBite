import React from 'react'
import './ExploreCatagory.css'
import { catagory_list } from '../../assets/assets'
function ExploreCatagory({catagory,setcatagory}) {
  return (
    <div className='explore-menu' id='explore-menu'>
        <h1>Featured Categories</h1>
        <p className='explore-menu-text'>Discover a world of cutting-edge smartphones, accessories, and unbeatable deals</p>
        <div className="explore-menu-list">
            {catagory_list.map((item,index)=>{
                return (
                    <div onClick={()=>setcatagory(prev=>prev===item.menu_name?"All":item.menu_name)} key={index} className='explore-menu-list-item'>
                        < img className={catagory===item.menu_name?"active":""} src={item.menu_image} alt=""/> 
                        <p>{item.menu_name}</p>
                    </div>
                )
            })}
        </div>
        <hr/>
    </div>
  )
}

export default ExploreCatagory