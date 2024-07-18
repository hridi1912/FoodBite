// gadgetDisplay.jsx
import "./ItemDisplay.css";
import React, { useContext } from "react";
import { storeContext } from "../../context/storeContext.jsx"; // Adjust path as necessary
import Item from "../Item/Item.jsx";

const ItemDisplay = ({ catagory }) => {
  const { gadget_list } = useContext(storeContext);
  
  if (!gadget_list) {
    // Handle the case where gadget_list is null or undefined
    return <div className="gadget-display">Loading...</div>;
  }
  return (
    <div className="gadget-display" id="gadget-display">
      <h2>Top catagory for you</h2>
      <div className="gadget-display-list">
        {gadget_list.map((item, index) => {
         // console.log("Gadget :",item)
          if ((catagory === "All" || catagory === item.catagory)) {
            return (
              <Item
                key={index}
                id={item._id}
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
