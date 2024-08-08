// storeContext.jsx
import React, { createContext, useEffect, useState } from 'react';
//import { gadget_list } from '../assets/assets';
import axios from "axios"
export const storeContext = createContext({
    gadget_list: [], // Default value as an empty array
    cartItems: {}, // Default value as an empty object
    addToCart: () => {}, // Default empty function
    removeFromCart: () => {}, // Default empty function
    token: '',
    setToken:()=>{},
    url:''
});
//export const storeContext= createContext(null)

const StoreContextProvider = ({ children }) => {
    const [gadgetList, setgadgetList] = useState([]); // Assuming gadget_list is correctly imported
    const [cartItems , setCartItems] =useState({});
    const url ="http://localhost:4000/";
    const [token,setToken]=useState("");
    
    const addToCart =(itemId) =>{
        console.log("Id of items :",itemId)
        if(!cartItems[itemId]){
            setCartItems((prev)=>({...prev,[itemId]:1}))
        }
        else{
            setCartItems((prev)=>({...prev,[itemId]:prev[itemId]+1}))
        }
    }
    const removeFromCart =(itemId)=>{
        setCartItems((prev)=>({...prev,[itemId]:prev[itemId]-1}))
    }
    useEffect(()=>{
          console.log(cartItems);
    },[cartItems])
    const fetchGadgetList =async()=>{
        try {
            const response = await axios.get(url + "api/gadget/list");
            setgadgetList(response.data.data);
        } catch (error) {
            console.error("Error fetching gadget list:", error);
        }
    } 
    const getTotalCartAmount = () => {
        let totalAmount = 0;
        for(const item in cartItems)
        {
            if(cartItems[item] > 0) {
            let itemInfo = gadgetList.find((product)=>product._id == item );
            totalAmount += itemInfo.price * cartItems[item];
        }

    }
    return totalAmount;
}
    useEffect(()=>{
        
        async function loadData(){
            await fetchGadgetList()
        }
        if(localStorage.getItem("token")){
            setToken(localStorage.getItem("token"))
       }
       loadData();
    },[])
    
    const contextValue = {
        gadget_list: gadgetList,
        setgadgetList,
        cartItems,
        setCartItems,
        addToCart,
        removeFromCart,
        url,
        token,
        setToken,
        getTotalCartAmount,
    };

    return (
        <storeContext.Provider value={contextValue}>
            {children}
        </storeContext.Provider>
    );
};

export default StoreContextProvider;
