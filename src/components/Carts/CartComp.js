import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Product from './../common/Product/Product';
import { getCart } from './CartHelper';
import Checkout from './../Checkout/CheckoutComp';

const IMG_URL = process.env.REACT_APP_IMG_URL;
const Cart = () => {
  const [items, setItems] = useState([]);
  const [run, setRun] = useState(false);

  useEffect(() => {
    setItems(getCart());
  }, [run]);

  const showItems = (items) => {
    return (
      <div>
        <h4>Your cart has {`${items.length}`} items</h4>
        <hr />
        {items.map((product, index) => (
          <Product
            key={index}
            product={product}
            stockLeft={product.quantity}
            imageUrl={`${IMG_URL}/${product.images[0]}`}
            productId={product._id}
            name={product.name}
            price={product.price}
            description={product.description}
            showAddToCartButton={false}
            showRemoveProductButton={true}
            cartUpdate={true}
            setRun={setRun}
            run={run}
          />
        ))}
      </div>
    );
  };

  const noItemsMessage = () => {
    return (
      <h3>
        Your cart is empty.
        <br />
        <Link to='/home'>Continue Shopping</Link>
      </h3>
    );
  };
  return (
    <>
      <h3>Shopping cart</h3>
      <div className='row'>
        <div className='col-md-6'>
          {items.length > 0 ? showItems(items) : noItemsMessage()}
        </div>
        <div className='col-md-4'>
          <h4>Your Cart Summary</h4>
          <hr />
          <Checkout
            isLoggedIn={localStorage.getItem('token') ? true : false}
            products={items}
          />
        </div>
      </div>
    </>
  );
};

export default Cart;
