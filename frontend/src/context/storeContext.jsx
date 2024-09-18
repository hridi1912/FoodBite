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
    refreshToken:'',
    setRefreshToken:()=>{},
    setEmail:'',
    url:''
});
//export const storeContext= createContext(null)

const StoreContextProvider = ({ children }) => {
    const [gadgetList, setgadgetList] = useState([]); // Assuming gadget_list is correctly imported
    const [cartItems , setCartItems] =useState({});
    const [email , setEmail] =useState('');
    //const url ="https://food-bite-api.vercel.app/";
    const url ="http://localhost:4000/";
    const [token,setToken]=useState("");
    const [refreshToken,setRefreshToken]=useState("");
    const [orderData,setOrderData]=useState({});
    const addToCart = async (itemId) =>{
        console.log("Id of items :",itemId)
        if(!cartItems[itemId]){
            setCartItems((prev)=>({...prev,[itemId]:1}))
        }
        else{
            setCartItems((prev)=>({...prev,[itemId]:prev[itemId]+1}))
        }
        if(token){
            await axios.post(url+"api/cart/add",{itemId},{headers:{token}})
        }
    }
    const removeFromCart = async (itemId)=>{
        setCartItems((prev)=>({...prev,[itemId]:prev[itemId]-1}))
        if(token){
            await axios.post(url+"api/cart/remove",{itemId},{headers:{token}})
        }
    }
    useEffect(()=>{
          console.log(email);
    },[cartItems])
    const fetchGadgetList =async()=>{
        try {
            const response = await axios.get(url + "api/gadget/list");
            setgadgetList(response.data.data);
        } catch (error) {
            console.error("Error fetching gadget list:", error);
        }
    } 
    const loadCartData = async (token)=>{
        const response = await axios.post(url+"api/cart/get",{},{headers:{token}})
        console.log("Cart data:",response.data)
        setCartItems(response.data.cartData)
    }
    useEffect(() => {
        const storedEmail = localStorage.getItem("email");
        console.log("Here is your stored email:",storedEmail)
        if (storedEmail) {
          setEmail(storedEmail);
        }
      }, [setEmail]);

    const getTotalCartAmount = () => {
        let totalAmount = 0;
        for (const item in cartItems) {
            if (cartItems[item] > 0) {
                let itemInfo = gadgetList.find((product) => product._id === item);
                
                if (itemInfo) { 
                    totalAmount += itemInfo.price * cartItems[item];
                }
            }
        }
        return totalAmount;
    }
    


    useEffect(()=>{
        
        async function loadData(){
            await fetchGadgetList()
        
        if(localStorage.getItem("token") && localStorage.getItem("refreshToken")){
            setToken(localStorage.getItem("token"))
            setRefreshToken(localStorage.getItem("refreshToken"))
            await loadCartData(localStorage.getItem("token"))
       }
    }
       loadData();
    },[])

    const contextValue = {
        gadget_list: gadgetList,
        setgadgetList,
        cartItems,
        setOrderData,
        setCartItems,
        addToCart,
        removeFromCart,
        url,
        token,
        setToken,
        refreshToken,
        setRefreshToken,
        getTotalCartAmount,
        orderData,
        email,
        setEmail
        
    };

    return (
        <storeContext.Provider value={contextValue}>
            {children}
        </storeContext.Provider>
    );
};

export default StoreContextProvider;