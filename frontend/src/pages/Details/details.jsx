import './details.css';
import React, { useContext } from 'react';
import { useParams } from 'react-router-dom';
import { storeContext } from '../../context/storeContext';


function Details() {
    const { id } = useParams();
    const { cartItems, addToCart, removeFromCart, url } = useContext(storeContext);
    const { gadget_list } = useContext(storeContext);
    const stringID = id.toString();
    //const {url} = useContext(storeContext);
    const gadget = gadget_list.find(gadget => gadget._id === (id));
    //const imageUrl = `${url}images/`;
    const handleAddToCart = () => {
        addToCart(stringID);
    }

    const handleRemoveFromCart = () => {
        if (cartItems[stringID] > 0) {
            removeFromCart(stringID);
        }
    }
    if (!gadget) {
        return <div className="details-not-found">Item not found</div>;
    }


    return (
        <div className="details-container">
            <div className="details-img">
                <img src={gadget.image} alt={gadget.name} />
            </div>
            <div className="details-info">
                <h1>{gadget.name}</h1>
                <p className="details-price">Price: ৳{gadget.price}</p>
                <p className="details-description">{gadget.description}</p>
            </div>
            <div className="details-button">
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
                        <button onClick={handleAddToCart} className="add-to-cart">
                            Add to Cart
                        </button>
                    )}
                </div>
            

            
        </div>
    );
}

export default Details;