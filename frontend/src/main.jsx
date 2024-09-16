// main.jsx or index.js
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css'
import { RouterProvider } from 'react-router-dom';

import StoreContextProvider from './context/storeContext.jsx'; // Adjust path as necessary
import router from './routes/route.jsx';

const rootElement = document.getElementById('root');

ReactDOM.createRoot(rootElement).render(
    
        <React.StrictMode>
            <StoreContextProvider>
                <RouterProvider router={router}/>
            </StoreContextProvider>
         </React.StrictMode>    
        
    
);


