import React from 'react';
import './Header.component.css';
import { NavLink, withRouter } from 'react-router-dom';

const logout = (history) => {
  // localstorage clear
  localStorage.clear();
  history.push('/');
  // navigate to Login page
};

const HeaderComponent = (props) => {
  console.log('props in header >>', props);
  const currentUser = JSON.parse(localStorage.getItem('user'));
  let content = props.isLoggedIn ? (
    <ul className="nav_list">
      <li className="nav_item">
        <NavLink to="/home/abc" activeClassName="selected">
          Home
        </NavLink>
      </li>
      <li className="nav_item">
        <NavLink to="/dashboard" activeClassName="selected">
          Dashboard
        </NavLink>
      </li>
      <li className="nav_item">
        <NavLink to="/about" activeClassName="selected">
          About
        </NavLink>
      </li>
      <li className="nav_item">
        <NavLink to="/settings" activeClassName="selected">
          Settings
        </NavLink>
      </li>
      <li className="nav_item">
        <button
          className="btn btn-success logout"
          onClick={() => logout(props.history)}
        >
          Logout
        </button>
        <p className="user-info">{currentUser.username}</p>
      </li>
    </ul>
  ) : (
    <ul className="nav_list">
      <li className="nav_item">
        <NavLink to="/home" activeClassName="selected">
          Home
        </NavLink>
      </li>
      <li className="nav_item">
        <NavLink exact to="/" activeClassName="selected">
          Login
        </NavLink>
      </li>
      <li className="nav_item">
        <NavLink exact to="/register" activeClassName="selected">
          Register
        </NavLink>
      </li>
    </ul>
  );
  return <div className="nav_bar">{content}</div>;
};
export const Header = withRouter(HeaderComponent);
