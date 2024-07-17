import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import './Item.css';
import { storeContext } from '../../context/storeContext';

const Item = ({ id, name, description, price, image }) => {
    const { cartItems, addToCart, removeFromCart, url } = useContext(storeContext);

    const handleAddToCart = () => {
        addToCart(id);
    };

    const handleRemoveFromCart = () => {
        if (cartItems[id] > 0) {
            removeFromCart(id);
        }
    };

    const imageUrl = `${url}images/${image}`;

    return (
        <div className='gadget-item'>
            <div className="gadget-item-img-container">
                <Link to={`/gadget/${id}`}>
                    <img className='gadget-item-image' src={imageUrl} alt={name} />
                </Link>
                <div className="button-container">
                    {cartItems[id] && cartItems[id] > 0 ? (
                        <div className='gadget-item-counter'>
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
            <div className="gadget-item-info">
                <div className="gadget-item-name-rating">
                    <p>{name}</p>
                    <img src={`${url}assets/rating_starts`} alt='' />
                </div>
                <p className='gadget-item-desc'>{description}</p>
                <p className="gadget-item-price">${price}</p>
            </div>
        </div>
    );
};

export default Item;
