import React, { useContext } from 'react';
import './Item.css';
import { assets } from '../../assets/assets';
import { storeContext } from '../../context/storeContext';

const Item = ({ id, name, description, price, image }) => {
    const { cartItems, addToCart, removeFromCart } = useContext(storeContext);

    const handleAddToCart = () => {
        addToCart(id);
    }

    const handleRemoveFromCart = () => {
        if (cartItems[id] > 0) {
            removeFromCart(id);
        }
    }

    return (
        <div className='food-item'>
            <div className="food-item-img-container">
                <img className='food-item-image' src={image} alt='' />
                <div className="button-container">
                    {cartItems[id] && cartItems[id] > 0 ? (
                        <div className='food-item-counter'>
                            <button onClick={handleRemoveFromCart} className="remove-from-cart-button">
                                Remove
                            </button>
                            <p>{cartItems[id]}</p>
                            <button onClick={handleAddToCart} className="add-more-button">
                                Add More
                            </button>
                        </div>
                    ) : (
                        <button onClick={handleAddToCart} className="add-to-cart-button">
                            Add to Cart
                        </button>
                    )}
                </div>
            </div>
            <div className="food-item-info">
                <div className="food-item-name-rating">
                    <p>{name}</p>
                    <img src={assets.rating_starts} alt='' />
                </div>
                <p className='food-item-desc'>{description}</p>
                <p className="food-item-price">${price}</p>
            </div>
        </div>
    )
}

export default Item;
