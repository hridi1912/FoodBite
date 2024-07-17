import './details.css';
import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { storeContext } from '../../context/storeContext';

function Details() {
    const { id } = useParams();
    const { url } = useContext(storeContext);
    const [gadget, setGadget] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchGadgetDetails = async () => {
            try {
                const response = await axios.get(`${url}api/gadget/${id}`);
                setGadget(response.data.data);
            } catch (error) {
                console.error('Error fetching gadget details:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchGadgetDetails();
    }, [id, url]);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (!gadget) {
        return <div className="details-not-found">Item not found</div>;
    }

    return (
        <div className="details-container">
            <div className="details-img">
                <img src={`${url}images/${gadget.image}`} alt={gadget.name} />
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
