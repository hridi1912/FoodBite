import React from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import { assets } from '../../assets/assets/assets';
import './Admin.css';

const Admin = () => {
  return (
    <div className='admin-container'>
      <div className='sidebar'>
        <div className="sidebar-options">
          <NavLink to='/admin/add' className="sidebar-opt">
            <img src={assets.add_icon} alt="Add Items" />
            <p>Add Items</p>
          </NavLink>
          <NavLink to='/admin/list' className="sidebar-opt">
            <img src={assets.list_icon} alt="List Items" />
            <p>List Items</p>
          </NavLink>
          <NavLink to='/admin/orders' className="sidebar-opt">
            <img src={assets.order_icon} alt="Orders" />
            <p>Orders</p>
          </NavLink>
        </div>
      </div>
      <main className='content'>
        <Outlet />
      </main>
    </div>
  );
};

export default Admin;
