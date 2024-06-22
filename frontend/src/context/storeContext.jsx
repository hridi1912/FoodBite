// storeContext.jsx
import React, { createContext, useEffect, useState } from 'react';
import { food_list } from '../assets/assets';

export const storeContext = createContext({
    food_list: [], // Default value as an empty array
    cartItems: {}, // Default value as an empty object
    addToCart: () => {}, // Default empty function
    removeFromCart: () => {} // Default empty function
});

const StoreContextProvider = ({ children }) => {
    const [foodList, setFoodList] = useState(food_list); // Assuming food_list is correctly imported
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
        food_list: foodList,
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
