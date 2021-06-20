import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { emptyCart } from './../Carts/CartHelper';
import {
  getBraintreeClientToken,
  processPayment,
  createOrder,
} from './../Braintree/BraintreeComp';
import Dropin from 'braintree-web-drop-in-react';
// import Product from './../common/Product/Product';

const Checkout = (props) => {
  const [data, setData] = useState({
    loading: false,
    success: false,
    clientToken: null,
    error: '',
    instance: {},
    address: '',
  });

  const userId =
    props.isLoggedIn && JSON.parse(localStorage.getItem('user'))._id;
  const token = props.isLoggedIn && localStorage.getItem('token');
  let deliveryAdd = data.address;

  const getToken = (userId, token) => {
    if (localStorage.getItem('token')) {
      getBraintreeClientToken(userId, token).then((data) => {
        if (data.error) {
          // console.log(data.error);
          setData({ ...data, error: data.error });
        } else {
          // console.log(data);
          setData({ clientToken: data.clientToken });
        }
      });
    }
    // if (localStorage.getItem('token')) {
    //   const userId = JSON.parse(localStorage.getItem('user'))._id;
    //   const token = localStorage.getItem('token');
    //   getBraintreeClientToken(userId, token).then((data) => {
    //     if (data.error) {
    //       console.log(data.error);
    //       setData({ ...data, error: data.error });
    //     } else {
    //       console.log(data);
    //       setData({ clientToken: data.clientToken });
    //     }
    //   });
    // }
  };

  useEffect(() => {
    getToken(userId, token);
  }, []);

  const getTotal = () => {
    return props.products.reduce((currentValue, nextValue) => {
      return currentValue + nextValue.count * nextValue.price;
    }, 0);
  };

  // let showDropIn = () => {
  //   <div>
  //     {data.clientToken !== null && props.products.length > 0 ? (
  //       <div>
  //         <Dropin
  //           options={{ authorization: data.clientToken }}
  //           onInstance={(instance) => (data.instance = instance)}
  //         />
  //         <button className='btn btn-success'>Checkout</button>
  //       </div>
  //     ) : null}
  //   </div>;
  // };

  // console.log('abc==>', props.isLoggedIn._id);
  // console.log('abc==>', props);

  const buy = () => {
    // const userId = JSON.parse(localStorage.getItem('user'))._id;
    // const token = localStorage.getItem('token');
    setData({ loading: true });
    let nonce;
    let getNonce = data.instance
      .requestPaymentMethod()
      .then((data) => {
        // console.log('data==>', data);
        nonce = data.nonce;
        // console.log('send nonce and total==>', nonce, getTotal(props.products));
        const paymentData = {
          paymentMethodNonce: nonce,
          amount: getTotal(props.products),
        };
        processPayment(userId, token, paymentData)
          .then((response) => {
            // console.log(response);
            const createOrderData = {
              products: props.products,
              transaction_id: response.transaction.id,
              amount: response.transaction.amount,
              address: deliveryAdd,
            };

            createOrder(userId, token, createOrderData)
              .then((response) => {
                emptyCart(() => {
                  console.log('payment success and cart is empty');
                  setData({ loading: false, success: true });
                });
              })
              .catch((error) => {
                console.log(error);
                setData({ loading: false });
              });

            // setData({ ...data, success: response.success });
          })
          .catch((error) => {
            console.log(error);
            setData({ loading: false });
          });
      })
      .catch((error) => {
        console.log('dropin errr=>', error);
        setData({ ...data, error: error.message });
      });
  };

  const showError = (error) => {
    return (
      <div
        className='alert alert-danger'
        style={{ display: error ? '' : 'none' }}
      >
        {error}
      </div>
    );
  };

  const showSuccess = (success) => {
    return (
      <div
        className='alert alert-info'
        style={{ display: success ? '' : 'none' }}
      >
        Thanks! Your payment was successfull!
      </div>
    );
  };

  const showLoading = (loading) => loading && <h2>loading..</h2>;

  const handleAddress = (event) => {
    setData({ ...data, address: event.target.value });
  };

  let content = props.isLoggedIn ? (
    <div onBlur={() => setData({ ...data, error: '' })}>
      {data.clientToken !== null && props.products.length > 0 ? (
        <div>
          <div className='gorm-group mb-3'>
            <label className='text-muted'>Delivery Address:</label>
            <textarea
              onChange={handleAddress}
              className='form-control'
              value={data.address}
              placeholder='type your delivery address here..'
            ></textarea>
          </div>
          <Dropin
            options={{
              authorization: data.clientToken,
              // paypal: {
              //   flow: 'vault',
              // },
            }}
            onInstance={(instance) => (data.instance = instance)}
          />
          <button onClick={buy} className='btn btn-success btn-block'>
            Pay
          </button>
        </div>
      ) : null}
    </div>
  ) : (
    <Link to='/'>
      {' '}
      <button className='btn btn-primary'>Sign in to checkout</button>
    </Link>
  );

  return (
    <div>
      <h4>Totals: Rs {getTotal()}</h4>
      {showLoading(data.loading)}
      {showSuccess(data.success)}
      {showError(data.error)}
      {content}
    </div>
  );
};

export default Checkout;
