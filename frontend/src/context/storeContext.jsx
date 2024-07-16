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

    const getTotalCartAmount = () => {
        let totalAmount = 0;
        for(const item in cartItems)
        {
            if(cartItems[item] > 0) {
            let itemInfo = gadget_list.find((product)=>product.id === item );
            totalAmount += itemInfo.price * cartItems[item];
        }

    }
    return totalAmount;
}




   

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
        setToken,
        getTotalCartAmount
    };

    return (
        <storeContext.Provider value={contextValue}>
            {children}
        </storeContext.Provider>
    );
};

export default StoreContextProvider;
