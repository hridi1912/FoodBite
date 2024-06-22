import React, { useState } from 'react';
import './search.css';
import { food_list } from '../../assets/assets';

function Search() {
    const [searchTerm, setSearchTerm] = useState("");
    const [priceRange, setPriceRange] = useState("");

    const filterByPrice = (val) => {
        if (priceRange === "") {
            return true;
        } else if (priceRange === "Under 20" && val.price < 20) {
            return true;
        } else if (priceRange === "Under 12" && val.price < 12) {
            return true;
        }
        return false;
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
                    <option value="Under 20">Under 20/-</option>
                    <option value="Under 12">Under 12/-</option>
                </select>
            </div>
            <table className='result-table'>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Price</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        food_list.filter((val) => {
                            if (searchTerm === "" && filterByPrice(val)) {
                                return val;
                            } else if (val.name.toLowerCase().includes(searchTerm.toLowerCase()) && filterByPrice(val)) {
                                return val;
                            }
                            return null;
                        }).map((val) => {
                            return (
                                <tr key={val.id}>
                                    <td>{val.name}</td>
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
