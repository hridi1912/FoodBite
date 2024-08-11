import React, { useContext } from 'react';
import './PaymentPreview.css';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { storeContext } from '../../context/storeContext';

const PaymentPreview = () => {
  const { orderId } = useParams();
  const navigate = useNavigate();
  
  const {url,orderData}= useContext(storeContext);
  console.log(orderData)
  if (!orderData) {
    // Handle the case where orderData is not available (e.g., user refreshes the page)
    return <div>Error: Order data not found.</div>;
  }

  const handleConfirmPayment = async () => {
    await axios.post(url + "api/order/verify", { orderId, success: "true" });
    navigate('/myorders');
  };

  return (
    <div className="payment-preview-container">
      <div className="payment-preview-content">
        <h2>Payment Preview</h2>
        <p>Order ID: {orderId}</p>
        <p className="payment-amount">Total Amount: ${orderData.amount}</p>
        <button onClick={handleConfirmPayment}>Confirm Payment</button>
      </div>
    </div>
  );
};

export default PaymentPreview;
