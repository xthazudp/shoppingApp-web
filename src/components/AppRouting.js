import React from 'react';

import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import { ForgotPassword } from './auth/forgotPassword/ForgotPasswordComponent';
import { Login } from './auth/login/Login.component';
import { Register } from './auth/register/Register.component';
import { ResetPassword } from './auth/ResetPassword/ResetPasswordComp';
// import { Header } from './common/header/Header.component';
import { Header } from './common/header/HeaderComponent';
// import Product from './common/Product/Product';
import { HomeComp } from './Home/HomeComp';

// import { Sidebar } from './common/sidebar/Sidebar.component';
import { Sidebar } from './common/sidebar/SidebarComponent';

import { AddProduct } from './Products/AddProduct/AddProductComponent';
import { EditProduct } from './Products/EditProduct/EditProductComponent';
import ProductDetailsLanding from './Products/ProductDetailsLanding/ProductDetailsLanding';
import { SearchProduct } from './Products/SearchProduct/SearchProductComp';
import { ViewProducts } from './Products/ViewProduct/ViewProductComponent';
import MessageComponent from './Users/Messages/MessageComp';
import Cart from './Carts/CartComp';
import Orders from './Orders/OrderComp';
import DashboardComp from './Dashboard/DashboardComp';

// const Dashboard = (props) => {
//   // console.log('props in Dashboard ', props);
//   return <p>Dashboard Page</p>;
// };

const About = (props) => {
  // console.log('props in About ', props);
  return <p>About Page</p>;
};

const Settings = (props) => {
  // console.log('props in Settings ', props);
  return <p>Settings Page</p>;
};

const NotFound = (props) => {
  // console.
  return (
    <div className='content'>
      <h2>Not Found</h2>
      {/* <img width="400" src="./images/notfound.jpg" alt="not_found.png"></img> */}
    </div>
  );
};

const ProtectedRoute = ({ component: Component, ...rest }) => {
  return (
    <Route
      {...rest}
      render={(routeProps) =>
        localStorage.getItem('token') ? (
          <>
            <Header isLoggedIn={true}></Header>
            <div>
              <Sidebar isLoggedIn={true} />
              {/* <div className="main-content">
                  <Component {...routeProps}></Component>
                </div> */}
              <div className='main'>
                <Component isLoggedIn={true} {...routeProps}></Component>
              </div>
            </div>
          </>
        ) : (
          <Redirect to='/'></Redirect>
        )
      }
    ></Route>
  );
};
const PublicRoute = ({ component: Component, ...rest }) => {
  return (
    <Route
      {...rest}
      render={(routeProps) => (
        <>
          <Header
            isLoggedIn={localStorage.getItem('token') ? true : false}
          ></Header>
          <Sidebar isLoggedIn={localStorage.getItem('token') ? true : false} />
          {/* <div className="main-content">
           */}
          <div className='main'>
            <Component {...routeProps}></Component>
          </div>
        </>
      )}
    ></Route>
  );
};

const AuthRoute = ({ component: Component, ...rest }) => {
  return (
    <Route
      {...rest}
      render={(routeProps) => (
        <>
          <Header />
          <div className='main-content'>
            <Component {...routeProps}></Component>
          </div>
        </>
      )}
    ></Route>
  );
};

export const AppRouting = (props) => {
  return (
    <BrowserRouter>
      {/* <Header isLoggedIn={true}></Header> */}
      <Switch>
        <AuthRoute path='/' exact component={Login}></AuthRoute>

        <AuthRoute path='/register' component={Register} />
        <AuthRoute path='/forgot_password' component={ForgotPassword} />
        <AuthRoute path='/reset_password/:token' component={ResetPassword} />
        <ProtectedRoute path='/about' component={About} />
        <ProtectedRoute path='/settings' component={Settings} />
        {/* <ProtectedRoute path='/home' component={HomeComp}></ProtectedRoute> */}
        <PublicRoute path='/home' component={HomeComp}></PublicRoute>

        <PublicRoute path='/cart' component={Cart}></PublicRoute>

        {/* <ProtectedRoute path="/home/:name" component={Home}></ProtectedRoute> */}

        <ProtectedRoute
          path='/add_product'
          component={AddProduct}
        ></ProtectedRoute>
        <ProtectedRoute path='/add_product'></ProtectedRoute>
        <ProtectedRoute
          path='/view_products'
          component={ViewProducts}
        ></ProtectedRoute>
        <ProtectedRoute
          path='/edit_product/:id'
          component={EditProduct}
        ></ProtectedRoute>
        <ProtectedRoute
          path='/product_details/:id'
          component={ProductDetailsLanding}
        ></ProtectedRoute>
        <ProtectedRoute
          path='/dashboard'
          exact
          component={DashboardComp}
        ></ProtectedRoute>
        <ProtectedRoute
          path='/admin/dashboard'
          component={DashboardComp}
        ></ProtectedRoute>
        <ProtectedRoute path='/orders' component={Orders}></ProtectedRoute>
        <PublicRoute
          path='/search_product'
          component={SearchProduct}
        ></PublicRoute>
        <PublicRoute path='/message' component={MessageComponent}></PublicRoute>
        <PublicRoute component={NotFound}></PublicRoute>
      </Switch>
    </BrowserRouter>
  );
};
