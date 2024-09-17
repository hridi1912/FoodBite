import React, { useContext, useState, useEffect } from 'react';
import { Outlet } from 'react-router-dom'; // Import Outlet for nested routes
import Navbar from './components/Navbar/Navbar';
import Footer from './components/Footer/Footer';
import LoginPopup from './components/LoginPopup/LoginPopup';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { storeContext } from './context/storeContext';

const App = () => {
  const { token } = useContext(storeContext);  // Get the authentication token from context
  const [showLogin, setShowLogin] = useState(false);

  // Show login popup if not authenticated, otherwise hide it
  useEffect(() => {
    setShowLogin(!token);
  }, [token]);

  return (
    <>
      <ToastContainer />
      <div className="app">
        {/* Navbar component with control over the login popup */}
        <Navbar setShowLogin={setShowLogin} />

        {/* Conditionally render the login popup if not authenticated */}
        {showLogin && <LoginPopup setShowLogin={setShowLogin} />}
        
        {/* Add the Outlet component to render child routes */}
        {!showLogin && <Outlet />}  {/* Renders the matching child route */}
      </div>

      {/* Footer always at the bottom */}
      <Footer />
    </>
  );
};

export default App;
