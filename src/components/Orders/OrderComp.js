import React, { useState, useEffect } from 'react';
import { formatDate } from '../../utils/dateUtil';

import {
  listOrders,
  getStatusValues,
  updateOrderStatus,
} from './OrderCompHelper';

const Orders = (props) => {
  const [orders, setOrders] = useState({
    loading: false,
    orders: '',
  });
  const [statusValues, setStatusValues] = useState({ statusValues: '' });

  // const isLoggedIn = localStorage.getItem('token') ? true : false;
  // console.log('props->', props);

  const userId =
    props.isLoggedIn && JSON.parse(localStorage.getItem('user'))._id;
  const token = props.isLoggedIn && localStorage.getItem('token');

  const loadOrders = () => {
    // console.log('userID', userId);
    listOrders(userId, token).then((data) => {
      // console.log('data ', data.orders);
      if (data.error) {
        console.log(data.error);
      } else {
        setOrders({ ...data, orders: data.orders });
      }
    });
  };

  const loadStatusValues = () => {
    // getStatusValues(userId, token).then((data) => {
    getStatusValues(userId).then((data) => {
      // console.log('data', data);
      if (data.error) {
        console.log(data.error);
      } else {
        setStatusValues(data);
      }
    });
  };

  useEffect(() => {
    loadOrders();
    loadStatusValues();
    // loopOrder();
  }, []);

  const showOrdersLength = () => {
    // console.log('order length', orders.orders.length);
    if (orders.orders.length > 0) {
      return (
        <h4 className='card-title display-6'>
          Total orders : {orders.orders.length}
        </h4>
      );
    } else {
      return <h3 className='text-danger display-2'>Empty Orders</h3>;
    }
  };

  const showProducts = (data) => {
    // console.log('data.length', data.products);
    if (data.products.length > 0) {
      return data.products.map((p, i) => {
        return (
          <>
            <div
              className='mb-2'
              style={{ padding: '20px', border: '1px solid indigo' }}
            >
              <div className='input-group mb-2 mr-sm-2'>
                <div className='input-group-prepend'>
                  <div className='input-group-text'>Name : {p.name}</div>
                  <div className='input-group-text'>Qty :{p.count}</div>
                  <div className='input-group-text'>Price : Rs {p.price}</div>
                  <div className='input-group-text'>Product Id : {p._id}</div>
                </div>
              </div>
            </div>
          </>
        );
      });
    }
  };
  // const showInput = (key, value) => {
  //   <div className='input-group mb-2 mr-sm-2'>
  //     <div className='input-group-prepend'>
  //       <div className='input-group-text'>{key}</div>
  //     </div>
  //     <input type='text' value={value} className='form-control' readOnly />
  //   </div>;
  // };

  const loopOrder = () => {
    if (orders.orders.length > 0) {
      return orders.orders.map((data, index) => {
        console.log('data=>', data);
        return (
          <div
            className='mt-3'
            key={index}
            style={{ borderBottom: '5px solid indigo' }}
          >
            <h5 className='card-title mb-3'>
              <span className='bg-primay'>Order ID : {data._id}</span>
            </h5>

            <ul className='list-group mb-2'>
              {/* <li className='list-group-item'>Status : {data.status}</li> */}
              <li className='list-group-item'>{showStatus(data)}</li>

              <li className='list-group-item'>
                Transaction Id : {data.transaction_id}
              </li>
              <li className='list-group-item'>Amount : Rs {data.amount}</li>
              <li className='list-group-item'>Ordered By : {data.user.name}</li>

              <li className='list-group-item'>
                Username : {data.user.username}
              </li>
              <li className='list-group-item'>
                Delivery Addr : {data.address}
              </li>

              <li className='list-group-item'>
                Ordered On : {formatDate(data.createdAt)}
              </li>
            </ul>
            <h3 className='mt-4 mb-4 font-italic'>
              Total Products in order : {data.products.length}
            </h3>
            {showProducts(data)}
          </div>
        );
      });
    }
  };

  const handleStatusChange = (e, orderId) => {
    // console.log('order status updates..');
    updateOrderStatus(orderId, userId, e.target.value).then((data) => {
      if (data.error) {
        console.log('Failed');
      } else {
        console.log('success');
        loadOrders();
      }
    });
  };

  const showStatus = (o) => (
    <div className='form-group'>
      <h3>Status : {o.status}</h3>
      <select
        className='form-control'
        onChange={(e) => handleStatusChange(e, o._id)}
      >
        <option>Update Status: </option>
        {/* {console.log('statusvalue', statusValues)} */}
        {statusValues.statusValues.map((status, index) => (
          <option key={index} value={status}>
            {status}
          </option>
        ))}
      </select>
    </div>
  );

  return (
    <div>
      <div>
        <div className='card border-dark mb-3'>
          <div className='card-header'>{showOrdersLength()}</div>
          <div className='card-body text-dark'>{loopOrder()}</div>
        </div>
      </div>
      {/* <div className='row'>
        <div className='col-md-8 offset-md-2'>
          {showOrdersLength()}
          {loopOrder()}
        </div>
      </div> */}
    </div>
  );
};

export default Orders;
