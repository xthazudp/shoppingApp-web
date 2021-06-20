import { handleError } from './../../utils/ErrorHandler';
import { httpClient } from './../../utils/httpClient';
import { notify } from './../../utils/toaster';
import {
  PRODUCTS_RECEIVED,
  PRODUCT_RECEIVED,
  PRODUCT_REMOVED,
  REVIEW_ADDED,
  SET_ISLOADING,
  SET_ISSUBMITTING,
  SET_PAGE_NUMBER,
} from '../Constants/ProductConstant';

export const fetchProducts_ac = (params) => (dispatch) => {
  console.log('at action file');
  dispatch(loading(true));

  httpClient
    .GET('/product', true, params)
    .then((response) => {
      dispatch({
        type: PRODUCTS_RECEIVED,
        payload: response.data,
      });
    })
    .catch((err) => {
      handleError(err);
    })
    .finally(() => {
      dispatch(loading(false));
    });
};

// export const removeProduct_ac = (id) => {
//   return (dispatch) => {
//     httpClient
//       .DELETE(`/product/${id}`, true)
//       .then((response) => {
//         notify.showInfo('Product Removed');
//         dispatch({
//           type: PRODUCT_REMOVED,
//           productId: id,
//         });
//       })
//       .catch((err) => {
//         handleError(err);
//       });
//   };
// };

export const removeProduct_ac = (id) => (dispatch) => {
  httpClient
    .DELETE(`/product/${id}`, true)
    .then((response) => {
      notify.showInfo('Product Removed');
      dispatch({
        type: PRODUCT_REMOVED,
        productId: id,
      });
    })
    .catch((err) => {
      handleError(err);
    });
};

export const changePageNumber_ac = (page) => (dispatch) => {
  dispatch({
    type: SET_PAGE_NUMBER,
    payload: page,
  });
};

export const fetchProduct_ac = (id) => (dispatch) => {
  // dispatch(loading(true));
  httpClient
    .GET(`/product/${id}`, true)
    .then((response) => {
      dispatch({
        type: PRODUCT_RECEIVED,
        payload: response.data,
      });
    })
    .catch((err) => {
      handleError(err);
    });
  // .finally(() => {
  //   dispatch(loading(false));
  // });
};

export const addReview_ac = (productId, data) => (dispatch) => {
  dispatch(submitting(true));

  httpClient
    .POST(`/product/add-review/${productId}`, data, true)
    .then((response) => {
      dispatch({
        type: REVIEW_ADDED,
        payload: response.data,
      });
    })
    .catch((err) => {
      handleError(err);
    })
    .finally(() => {
      dispatch(submitting(false));
    });
};

const loading = (isLoading) => ({
  type: SET_ISLOADING,
  payload: isLoading,
});

const submitting = (isSubmitting) => ({
  type: SET_ISSUBMITTING,
  payload: isSubmitting,
});
// export const fetchProducts_ac = (params) => {
//   return (dispatch) => {
//     console.log('At action file');

//     dispatch({
//       type: SET_ISLOADING,
//       payload: true,
//     });

//     setTimeout(() => {
//       dispatch({
//         type: SET_ISLOADING,
//         payload: false,
//       });
//     }, 4000);
//   };
// };
