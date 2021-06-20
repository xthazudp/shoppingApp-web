import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { RootReducer } from './Reducers';

const initialState = {
  product: {
    products: [],
    isLoading: false,
    pageNumber: 1,
    pageSize: 5,
    reviews: [],
    product: {},
    isSubmitting: false,
  },
  // user: {
  //   data: [],
  //   isLoading: false,
  //   pageNumber: 1,
  //   pageSize: 10,
  // },
  // notification: {
  //   data: [],
  //   isLoading: false,
  //   pageNumber: 1,
  //   pageSize: 10,
  // },
};
const middleware = [thunk];

export const store = createStore(
  RootReducer,
  initialState,
  applyMiddleware(...middleware)
);
