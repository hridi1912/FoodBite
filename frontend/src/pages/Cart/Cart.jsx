import React, { useContext } from 'react';
import './Cart.css';
import { storeContext } from '../../context/storeContext';
//import { gadget_list } from '../../assets/assets';
import { useNavigate, useParams } from 'react-router-dom';


const Cart = () => {
    const { cartItems, removeFromCart, getTotalCartAmount,url,setCartItems } = useContext(storeContext);
    const { gadget_list } = useContext(storeContext);
    
    const navigate = useNavigate();
    //console.log("Cart items:",cartItems)
    //console.log("gadget items:",gadget_list)
    //const imageUrl = `${url}images/`;


    const promo = () => {
        if(getTotalCartAmount()>0)
         window.confirm("No promo available right now.");
    }



    const handleCheckOut=()=>{
      
       navigate('/order');

    }

    return (
        <div className='cart'>
            <div className="cart-items">
                <div className="cart-items-title">
                    <p>Items</p>
                    <p>Title</p>
                    <p>Price</p>
                    <p>Quantity</p>
                    <p>Total</p>
                    <p>Remove</p>
                </div>
                <br />
                <hr />
                {gadget_list.map((item, index) => {
                    if (cartItems[item._id] > 0) {
                        console.log("Items id:",item._id)
                        return (
                            <div key={index}>
                                <div className='cart-items-title cart-items-item'>
                                    <img src={item.image} alt={item.name} />
                                    <p>{item.name}</p>
                                    <p>${item.price}</p>
                                    <p>{cartItems[item._id]}</p>
                                    <p>${item.price*(cartItems[item._id])}</p>
                                    <p onClick={() => removeFromCart(item._id)} className='cross'>x</p>
                                </div>
                                <hr />
                            </div>
                        );
                    }
                    return null;
                })}
            </div>
            <div className="cart-bottom">
                <div className="cart-total">
                    <h2>Cart Totals</h2>
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
                    <button onClick={handleCheckOut}>CHECK OUT</button>
                </div>
                <div className="cart-promocode">
                    <div>
                        <p>Enter your promo (if you have any)</p>
                        <div className='cart-promocode-input'>
                            <input type="text" placeholder='promo code' />
                            <button onClick={promo}>Submit</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Cart;
