// storeContext.jsx
import React, { createContext, useEffect, useState } from 'react';
import { food_list } from '../assets/assets';

export const storeContext = createContext({
    food_list: [] // Default value as an empty array
});

const StoreContextProvider = ({ children }) => {
    const [foodList, setFoodList] = useState(food_list); // Assuming food_list is correctly imported
    const [cartItems , setCartItems] =useState({});
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
    const contextValue = {
        food_list: foodList,
        cartItems,
        setCartItems,
        addToCart,
        removeFromCart
    };

    return (
        <storeContext.Provider value={contextValue}>
            {children}
        </storeContext.Provider>
    );
};

export default StoreContextProvider;
