import './details.css';
import React, { useContext } from 'react';
import { useParams } from 'react-router-dom';
import { storeContext } from '../../context/storeContext';


function Details() {
    const { id } = useParams();
    const { gadget_list } = useContext(storeContext);
    const {url} = useContext(storeContext);
    const gadget = gadget_list.find(gadget => gadget._id === (id));
    //const imageUrl = `${url}images/`;
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
                <p className="details-price">Price: ${gadget.price}</p>
                <p className="details-description">{gadget.description}</p>
            </div>
        </div>
    );
}

export default Details;