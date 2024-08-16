import React, { useContext, useEffect, useState } from 'react'
import './PlaceOrder.css'
import { storeContext } from '../../context/storeContext'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'



const PlaceOrder = () => {

  const {getTotalCartAmount,token,gadget_list,cartItems,url,setOrderData,setCartItems} = useContext(storeContext)
  const [showPaymentPreview, setShowPaymentPreview] = useState(false);

  const [data,setdata] = useState ({
    firstName:"",
    lastName:"",
    email:"",
    street:"",
    city:"",
    state:"",
    zipcode:"",
    country:"",
    phone:""
  })
  
  const PaymentPreviewModal = ({ isOpen, onClose, totalAmount }) => {
    if (!isOpen) return null;
  
    return (
      <div className="modal-overlay">
        <div className="modal-content">
          <h2>Payment Preview</h2>
          <p>Total Amount: ${totalAmount}</p>
          <button onClick={onClose}>Close</button>
          <button onClick={() => {
            onClose();
            // Proceed with the payment logic here
            placeOrder(); // or any other payment logic you have
          }}>Confirm Payment</button>
        </div>
      </div>
    );
  };
  

  const onChangeHandler = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setdata(data=> ({...data,[name]:value}))

  }
  

  const placeOrder = async (event) => {
    event.preventDefault();
    let orderItems = [];
    gadget_list.map((item)=>{
      if(cartItems[item._id]>0) {
        let itemInfo = item;
        itemInfo ["quantity"]  = cartItems [item._id];
        orderItems.push(itemInfo);
      }
    })
    let orderData = {
      address:data,
      items:orderItems,
      amount:getTotalCartAmount()+18,
    }
    console.log(orderData)
    
    let response = await axios.post(url + "api/order/placeOrder", orderData, { headers: { token } });
    
    if(response.data.success){
      //const {session_url} = response.data;
      //console.log(session_url)
      //window.location.replace(session_url);
      //const {orderId}= response.data;
      console.log(response.data);
      const orderID=response.data.orderId;
      console.log(orderID);
      setOrderData({ orderID, amount: orderData.amount });
      setCartItems({});
      navigate(`/payment/${orderID}`)
    }
    else {
      alert ("Error placing order");
    }
  } 
  const navigate = useNavigate();
  useEffect(()=>{
    if(!token){
        navigate('/cart')
    }
    else if(getTotalCartAmount()===0) {
        navigate('/cart')
    }

  },[token])
  
  
  return (
    <>
    <form onSubmit={placeOrder} className='place-order'>
      <div className="place-order-left">
        <p className='title'>Buyer Information</p>
        <div className="multi-fields">
          <input required name='firstName' onChange={onChangeHandler} value = {data.firstName} type="text" placeholder='First Name'/>
          <input required name='lastName' onChange={onChangeHandler} value = {data.lastName}type="text" placeholder='Last Name' />
        </div>
        <input required name = 'email' onChange={onChangeHandler} value = {data.email} type="email" placeholder='Type your email' />
        <input required name = 'street' onChange={onChangeHandler} value = {data.street}type="text" placeholder='Street' />

        <div className="multi-fields">
          <input required name = 'city' onChange={onChangeHandler} value = {data.city} type="text" placeholder='City'/>
          <input required name = 'state' onChange={onChangeHandler} value = {data.state} type="text" placeholder='State' />
        </div>
        <div className="multi-fields">
          <input  required name = 'zipcode' onChange={onChangeHandler} value = {data.zipcode} type="text" placeholder='Zip code'/>
          <input  required name = 'country' onChange={onChangeHandler} value = {data.country} type="text" placeholder='Country' />
        </div>
        <input required name = 'phone' onChange={onChangeHandler} value = {data.phone}type="text" placeholder='Phone'/>

      </div>
      <div className="place-order-right"> 
      <div className="cart-total">
                    <h2>Cart Totals</h2>
                    <div>
                    <div className="cart-total-details">
                        <p>Subtotal</p>
                        <p>${getTotalCartAmount()}</p>
                    </div>
                    <hr />
                    <div className="cart-total-details">
                        <p>Delivery fee</p>
                        <p>${getTotalCartAmount()===0?0:18}</p>
                    </div>
                    <hr />
                    <div className="cart-total-details">
                        <b>Total</b>
                        <b>${getTotalCartAmount()===0? 0: getTotalCartAmount()+18}</b>
                    </div>
                </div>
                <button type='submit' >MAKE PAYMENT</button>
              </div>

      </div>
    </form>
    {/* Payment Preview Modal */}
    <PaymentPreviewModal
        isOpen={showPaymentPreview}
        onClose={() => setShowPaymentPreview(false)}
        totalAmount={getTotalCartAmount() + 18}
      />
    </>
  )
}


export default PlaceOrder;