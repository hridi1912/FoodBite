import './details.css';
import React, { useContext } from 'react';
import { useParams } from 'react-router-dom';
import { storeContext } from '../../context/storeContext';

function Details() {
    const { id } = useParams();
    const { food_list } = useContext(storeContext);
    const foodItem = food_list.find(item => item.id === parseInt(id, 10));

    if (!foodItem) {
        return <div>Food item not found!</div>;
    }

    return (
        <div className="food-details">
            <h1>{foodItem.name}</h1>
            <img src={foodItem.image} alt={foodItem.name} />
            <p>{foodItem.description}</p>
            <p>Price: ${foodItem.price}</p>
        </div>
    );
}

export default Details;
