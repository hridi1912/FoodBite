import './details.css';
import React, { useContext } from 'react';
import { useParams } from 'react-router-dom';
import { storeContext } from '../../context/storeContext';

function Details() {
    const { id } = useParams();
    const { food_list } = useContext(storeContext);  

    const food = food_list.find(food => food.id === parseInt(id));
    

    if (!food) {
        return <div>That item not found</div>;
    }

    return (
        <div>
            <h1>{food.name}</h1>
            <p>Price: {food.price}</p>
            <p>Description: {food.description}</p>
        </div>
    );
}

export default Details;
