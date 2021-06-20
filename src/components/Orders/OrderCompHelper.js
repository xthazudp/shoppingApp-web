import { handleError } from '../../utils/ErrorHandler';
import { httpClient } from '../../utils/httpClient';

const BASE_URL = process.env.REACT_APP_BASE_URL;
// export const listOrders = (userId, token) => {
//   return fetch(`${BASE_URL}/order/list/${userId}`, {
//     method: 'GET',
//     headers: {
//       Accept: 'application/json',
//       Authorization: `Bearer ${token}`,
//     },
//   })
//     .then((response) => {
//       return response.json();
//     })
//     .catch((err) => console.log(err));
// };

export const listOrders = (userId, token) => {
  return httpClient
    .GET(`${BASE_URL}/order/list/${userId}`, true)
    .then((response) => {
      // return response.json();
      // console.log('response=>', response);

      return { orders: response.data };
      // orders: response.data;
    })
    .catch((err) => {
      console.log(err);
      handleError(err);
    });
};

export const getStatusValues = (userId) => {
  return httpClient
    .GET(`${BASE_URL}/order/status-values/${userId}`, true)
    .then((response) => {
      // return response.json();
      // console.log('response=>', response);
      return { statusValues: response.data };
      // orders: response.data;
    })
    .catch((err) => {
      handleError(err);
    });
};

export const updateOrderStatus = (orderId, userId, status) => {
  return httpClient
    .PUT(`${BASE_URL}/order/${orderId}/status/${userId}`, { status }, true)
    .then((response) => {
      console.log('response=>', response);
      return response;
      // orders: response.data;
    })
    .catch((err) => {
      handleError(err);
    });
};

// export const updateOrderStatus = (orderId, userId, token, status) => {
//   return fetch(`${BASE_URL}/order/${orderId}/status/${userId}`, {
//     method: 'PUT',
//     headers: {
//       Accept: 'application/json',
//       'Content-Type': 'application/json',
//       Authorization: `${token}`,
//     },
//     body: JSON.stringify({ status, orderId }),
//   })
//     .then((response) => {
//       // console.log('response=>', response);
//       return response.json();
//     })
//     .catch((err) => {
//       handleError(err);
//     });
// };
