import React from 'react';
import { NavLink } from 'react-router-dom';
import './SidebarComponent.css';
export const Sidebar = (props) => {
  const user = JSON.parse(localStorage.getItem('user'));
  // console.log('props in sidebar', user);

  let content =
    props.isLoggedIn && user.role === 1 ? (
      <div class='sidenav'>
        <NavLink activeClassName='selected' to='/add_product'>
          Add Product
        </NavLink>
        <NavLink activeClassName='selected' to='/view_products'>
          View Product
        </NavLink>
        <NavLink activeClassName='selected' to='/search_product'>
          Search Product
        </NavLink>
        <NavLink isLoggedIn={true} activeClassName='selected' to='/orders'>
          View Orders
        </NavLink>
        {/* <NavLink activeClassName='selected' to='/notifications'>
          Notification
        </NavLink> */}
        <NavLink activeClassName='selected' to='/message'>
          Messages
        </NavLink>
      </div>
    ) : props.isLoggedIn ? (
      <div class='sidenav'>
        {user.role === 3 ? (
          <>
            <NavLink activeClassName='selected' to='/add_product'>
              Add Product
            </NavLink>
            <NavLink activeClassName='selected' to='/view_products'>
              View Product
            </NavLink>
            <NavLink activeClassName='selected' to='/search_product'>
              Search Product
            </NavLink>

            <NavLink activeClassName='selected' to='/message'>
              Messages
            </NavLink>
          </>
        ) : (
          <>
            <NavLink activeClassName='selected' to='/search_product'>
              Search Product
            </NavLink>

            <NavLink activeClassName='selected' to='/message'>
              Messages
            </NavLink>
          </>
        )}
      </div>
    ) : null;
  return content;
};
