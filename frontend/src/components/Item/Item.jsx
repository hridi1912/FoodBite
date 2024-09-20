import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import './Item.css';
import { assets } from '../../assets/assets';
import { storeContext } from '../../context/storeContext';

const Item = ({ id, name, description, price, image }) => {
    const { cartItems, addToCart, removeFromCart, url } = useContext(storeContext);
    const stringID = id.toString();
    const handleAddToCart = () => {
        addToCart(stringID);
    }

    const handleRemoveFromCart = () => {
        if (cartItems[stringID] > 0) {
            removeFromCart(stringID);
        }
    }

    const imageUrl = image;
    //console.log('Image URL:', imageUrl); // Debug log to check the constructed URL
    
    return (
        <div className='gadget-item'>
            <div className="gadget-item-img-container">
                <Link to={`/gadget/${id}`}>
                    <img className='gadget-item-image' src={imageUrl} alt={name} />
                </Link>
                <div className="button-container">
                    {cartItems[stringID] && cartItems[stringID] > 0 ? (
                        <div className='gadget-item-counter'>
                            <button onClick={handleRemoveFromCart} className="remove-from-cart-button">
                                Remove
                            </button>
                            <p>{cartItems[stringID]}</p>
                            <button onClick={handleAddToCart} className="add-more-button">
                                Add More
                            </button>
                        </div>
                    ) : (
                        <button onClick={handleAddToCart} className="add-to-cart-button">
                            <h3>Add to Cart</h3>
                        </button>
                    )}
                </div>
            </div>
            <div className="gadget-item-info">
                <div className="gadget-item-name-rating">
                    <p>{name}</p>
                    <img src={assets.rating_starts} alt='' />
                </div>
                <p className='gadget-item-desc'>{description}</p>
                <p className="gadget-item-price">৳{price}</p>
            </div>
        </div>
    );
}

export default Item;
