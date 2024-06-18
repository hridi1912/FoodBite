// storeContext.jsx
import React, { createContext, useState } from 'react';
import { food_list } from '../assets/assets';

export const storeContext = createContext({
    food_list: [] // Default value as an empty array
});

const StoreContextProvider = ({ children }) => {
    const [foodList, setFoodList] = useState(food_list); // Assuming food_list is correctly imported

    const contextValue = {
        food_list: foodList
    };

    return (
        <storeContext.Provider value={contextValue}>
            {children}
        </storeContext.Provider>
    );
};

export default StoreContextProvider;
