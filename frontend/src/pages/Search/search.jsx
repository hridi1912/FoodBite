import React, { useState } from 'react';
import './search.css';
import { gadget_list } from '../../assets/assets';
import { Link, useNavigate } from 'react-router-dom';

function Search() {
    const [searchTerm, setSearchTerm] = useState("");
    const [priceRange, setPriceRange] = useState("");
    const [gadgets, setgadgets] = useState(gadget_list);
    const [editItem, setEditItem] = useState(null);
    const [newName, setNewName] = useState("");
    const [newPrice, setNewPrice] = useState("");
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
                        <th>Name</th>
                        <th>Price</th>
                        <th colSpan={2}></th>
                    </tr>
                </thead>
                <tbody>
                    {
                        gadgets.filter((val) => {
                            if (searchTerm === "" && filterByPrice(val)) {
                                return val;
                            } else if (val.name.toLowerCase().includes(searchTerm.toLowerCase()) && filterByPrice(val)) {
                                return val;
                            }
                            return null;
                        }).map((val) => {
                            return (
                                <tr key={val.id}>
                                    <td><Link to={`/gadget/${val.id}`}>{val.name}</Link></td>
                                    <td>{val.price}</td>
                                    <td><button className='edit-button' onClick={() => handleEdit(val)}>Edit</button></td>
                                    <td><button className='delete-button' onClick={() => handleDelete(val.id)}>Delete</button></td>
                                </tr>
                            )
                        })
                    }
                </tbody>
            </table>

            {editItem && (
                <div className='edit-form'>
                    <h2>Edit Item</h2>
                    <input 
                        type='text' 
                        placeholder='New Name' 
                        value={newName} 
                        onChange={(e) => setNewName(e.target.value)} 
                    />
                    <input 
                        type='number' 
                        placeholder='New Price' 
                        value={newPrice} 
                        onChange={(e) => setNewPrice(e.target.value)} 
                    />
                    <button onClick={handleUpdate}>Update</button>
                    <button onClick={() => {
                        setEditItem(null);
                        setNewName("");
                        setNewPrice("");
                    }}>Cancel</button>
                </div>
            )}
        </>
    );
}

export default Search;
