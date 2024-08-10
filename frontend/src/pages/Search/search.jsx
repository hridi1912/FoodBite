import React, { useState,useContext } from 'react';
import './search.css';
import { gadget_list } from '../../assets/assets';
import { Link, useNavigate } from 'react-router-dom';
import { storeContext } from '../../context/storeContext';

function Search() {
    const [searchTerm, setSearchTerm] = useState("");
    const [priceRange, setPriceRange] = useState("");
    const { gadget_list } = useContext(storeContext);
    //const [editItem, setEditItem] = useState(null);
    //const [newName, setNewName] = useState("");
   // const [newPrice, setNewPrice] = useState("");
    const navigate = useNavigate();

    const filterByPrice = (val) => {
        if (priceRange === "") {
            return true;
        } else if (priceRange === "Under 50000" && val.price < 50000) {
            return true;
        } else if (priceRange === "Under 20000" && val.price < 20000) {
            return true;
        }
        return false;
    };
    /*
    const handleDelete = (id) => {
        const updatedgadgets = gadgets.filter((gadget) => gadget.id !== id);
        setgadgets(updatedgadgets);
    };
    
    const handleEdit = (gadget) => {
        setEditItem(gadget);
        setNewName(gadget.name);
        setNewPrice(gadget.price.toString());  // Ensure the price is a string for the input field
    };
    
    const handleUpdate = () => {
        const updatedgadgets = gadgets.map((gadget) => 
            gadget.id === editItem.id ? { ...gadget, name: newName, price: parseInt(newPrice) } : gadget
        );
        setgadgets(updatedgadgets);
        setEditItem(null);
        setNewName("");
        setNewPrice("");
    };
   */
    return (
        <>
            <div className='search-container'>
                <input className='search-box'
                    type='text' 
                    placeholder='  Search by name here...' 
                    onChange={(event) => {
                        setSearchTerm(event.target.value);
                    }} 
                />
                <select className='select-box' onChange={(event) => setPriceRange(event.target.value)}>
                    <option value="">All Prices</option>
                    <option value="Under 50000">Under 50000/-</option>
                    <option value="Under 20000">Under 20000/-</option>
                </select>
            </div>
            <table className='result-table'>
                <thead>
                    <tr>
                        <th colSpan={1}></th>
                        <th>Name</th>
                        <th>Price</th>
                        
                    </tr>
                </thead>
                <tbody>
                    {
                        gadget_list.filter((val) => {
                            if (searchTerm === "" && filterByPrice(val)) {
                                return val;
                            } else if (val.name.toLowerCase().includes(searchTerm.toLowerCase()) && filterByPrice(val)) {
                                return val;
                            }
                            return null;
                        }).map((val) => {
                            return (
                                <tr key={val.id}>
                                    <td><img className='td-image' src={val.image} alt="" /></td>
                                    <td><Link to={`/gadget/${val._id}`}>{val.name}</Link></td>
                                    <td>{val.price}</td>
                                    
                                </tr>
                            )
                        })
                    }
                </tbody>
            </table>

           
        </>
    );
}

export default Search;
