import React from 'react';
import './HeaderComponent.css';
import { NavLink, withRouter } from 'react-router-dom';
import { itemTotal } from './../../Carts/CartHelper';

const logout = (history) => {
  // localstorage clear
  localStorage.clear();
  history.push('/');
  // navigate to Login page
};
const HeaderComponent = (props) => {
  const currentUser = JSON.parse(localStorage.getItem('user'));
  // console.log('Props ==>', props);
  // console.log('isloggedIn ==>', props.isLoggedIn);
  let content = props.isLoggedIn ? (
    <nav className='navbar navbar-expand-sm bg-dark navbar-dark fixed-top'>
      <div className='topnav'>
        <NavLink to='/home'>Home</NavLink>

        <NavLink to='/dashboard'>Dashboard</NavLink>
        <NavLink to='/cart'>
          Cart{' '}
          <sup>
            <small className='cart-badge'>{itemTotal()}</small>
          </sup>
        </NavLink>
        {/* <NavLink to='/settings'>Setting</NavLink> */}
        {/* <NavLink to='/about'>About</NavLink> */}

        <button
          className='btn btn-danger logout'
          onClick={() => logout(props.history)}
        >
          Logout
        </button>
        <p className='user-info'>{currentUser.username}</p>
      </div>
    </nav>
  ) : (
    <nav className='navbar navbar-expand-sm bg-dark navbar-dark fixed-top'>
      <div className='topnav'>
        <NavLink to='/home'>Home</NavLink>

        <NavLink to='/cart'>
          Cart
          <sup>
            <small className='cart-badge'>{itemTotal()}</small>
          </sup>
        </NavLink>
        <NavLink to='/'>Login</NavLink>
        <NavLink to='/register'>Register</NavLink>
      </div>
    </nav>
  );
  // console.log('isloggedIn ==>', props.isLoggedIn);
  return <div>{content}</div>;
};

export const Header = withRouter(HeaderComponent);
