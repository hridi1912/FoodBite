// main.jsx or index.js
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css'
import { BrowserRouter } from 'react-router-dom';
import StoreContextProvider from './context/storeContext.jsx'; // Adjust path as necessary

const rootElement = document.getElementById('root');

ReactDOM.createRoot(rootElement).render(
    
        <BrowserRouter>
            <StoreContextProvider>
                <App />
            </StoreContextProvider>
        </BrowserRouter>
    
);


