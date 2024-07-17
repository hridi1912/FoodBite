/* 
import React ,{useContext} from 'react'
import './Cart.css'

import { storeContext } from '../../context/storeContext'
import { gadget_list } from '../../assets/assets';



const Cart = () => {


    const {cartItems,food_list,removeFromCart,getTotalCartAmount} = useContext (storeContext);



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
        {gadget_list.map((item,index)=>{
          if(cartItems[item.id] > 0)
          {
            return (
              <div>
                <div className='cart-items-title cart-items-item'>
                 <img src={item.image} alt={item.name} />
                 <p>{item.name}</p>
                 <p>${item.price}</p>
                 <p>{cartItems[item.id]}</p>
                 <p>${item.price * cartItems[item.id]}</p>
                 <p onClick = {()=> removeFromCart(item.id)} className='cross'>x</p>
                

              </div>
              <hr/>
              </div>
            )
              
          }

})}

      </div>
      <div className='cart'>
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
            <p>${18}</p>
          </div>
          <hr />
          <div className="cart-total-details">
            <b>Total</b>
            <b>${getTotalCartAmount()+18}</b>
          </div>
          <button>CHECK OUT</button>
        </div>

        

      </div>
      <div className="cart-promocode">
        <div>
          <p>Enter your promo (if you have any)</p>
          <div className='cart-promocode-input'>
            <input type="text" placeholder='promo code'/>
            <button>Submit</button>
          </div>
        </div>
      </div>
    </div>
      
    </div>
  )
}

export default Cart

*/




import React, { useContext } from 'react';
import './Cart.css';
import { storeContext } from '../../context/storeContext';
import { gadget_list } from '../../assets/assets';

const Cart = () => {
    const { cartItems, removeFromCart, getTotalCartAmount } = useContext(storeContext);

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
                    if (cartItems[item.id] > 0) {
                        return (
                            <div key={index}>
                                <div className='cart-items-title cart-items-item'>
                                    <img src={item.image} alt={item.name} />
                                    <p>{item.name}</p>
                                    <p>${item.price}</p>
                                    <p>{cartItems[item.id]}</p>
                                    <p>${item.price * cartItems[item.id]}</p>
                                    <p onClick={() => removeFromCart(item.id)} className='cross'>x</p>
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
                        <p>$18</p>
                    </div>
                    <hr />
                    <div className="cart-total-details">
                        <b>Total</b>
                        <b>${getTotalCartAmount() + 18}</b>
                    </div>
                    <button>CHECK OUT</button>
                </div>
                <div className="cart-promocode">
                    <div>
                        <p>Enter your promo (if you have any)</p>
                        <div className='cart-promocode-input'>
                            <input type="text" placeholder='promo code' />
                            <button>Submit</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Cart;
