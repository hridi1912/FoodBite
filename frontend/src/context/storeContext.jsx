// storeContext.jsx
import React, { createContext, useEffect, useState } from 'react';
import { gadget_list } from '../assets/assets';

export const storeContext = createContext({
    gadget_list: [], // Default value as an empty array
    cartItems: {}, // Default value as an empty object
    addToCart: () => {}, // Default empty function
    removeFromCart: () => {} // Default empty function
});

const StoreContextProvider = ({ children }) => {
    const [gadgetList, setgadgetList] = useState(gadget_list); // Assuming gadget_list is correctly imported
    const [cartItems , setCartItems] =useState({});
    const url ="http://localhost:4000";
    const [token,setToken]=useState("");
    const addToCart =(itemId) =>{
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

    useEffect(()=>{
        if(localStorage.getItem("token")){
             setToken(localStorage.getItem("token"))
        }

    },[])

    const contextValue = {
        gadget_list: gadgetList,
        cartItems,
        setCartItems,
        addToCart,
        removeFromCart,
        url,
        token,
        setToken
    };

    return (
        <storeContext.Provider value={contextValue}>
            {children}
        </storeContext.Provider>
    );
};

export default StoreContextProvider;
