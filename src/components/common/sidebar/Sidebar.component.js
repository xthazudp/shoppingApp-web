import React from 'react';
import { NavLink } from 'react-router-dom';
import './Sidebar.component.css';

export const Sidebar = (props) => {
  return (
    <div className="sidebar">
      <NavLink activeClassName="selected" to="add_product">
        Add Product
      </NavLink>
      <NavLink activeClassName="selected" to="view_product">
        View Product
      </NavLink>
      <NavLink activeClassName="selected" to="search_product">
        Search Product
      </NavLink>
      <NavLink activeClassName="selected" to="notifications">
        Notification
      </NavLink>
      <NavLink activeClassName="selected" to="message">
        Messages
      </NavLink>
    </div>
  );
};
