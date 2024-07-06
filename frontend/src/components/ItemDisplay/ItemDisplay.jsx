// FoodDisplay.jsx
import "./ItemDisplay.css";
import React, { useContext } from "react";
import { storeContext } from "../../context/storeContext.jsx"; // Adjust path as necessary
import Item from "../Item/Item.jsx";

const ItemDisplay = ({ category }) => {
  const { food_list } = useContext(storeContext);

  if (!food_list) {
    // Handle the case where food_list is null or undefined
    return <div className="food-display">Loading...</div>;
  }

  return (
    <div className="food-display" id="food-display">
      <h2>Top dishes near you</h2>
      <div className="food-display-list">
        {food_list.map((item, index) => {
          if ((category === "All" || category === item.category)) {
            return (
              <Item
                key={index}
                id={item.id}
                name={item.name}
                description={item.description}
                price={item.price}
                image={item.image}
              />
            );
          }
        })}
      </div>
    </div>
  );
};

export default ItemDisplay;
