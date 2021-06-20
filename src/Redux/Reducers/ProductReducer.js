import {
  PRODUCTS_RECEIVED,
  PRODUCT_RECEIVED,
  PRODUCT_REMOVED,
  REVIEW_ADDED,
  SET_ISLOADING,
  SET_ISSUBMITTING,
  SET_PAGE_NUMBER,
} from '../Constants/ProductConstant';

const defaultState = {
  isLoading: false,
  products: [],
};

export const ProductReducer = (state = defaultState, action) => {
  // console.log('At reducer with state ==>', state);
  console.log('At reducer ==>', action);

  switch (action.type) {
    case SET_ISLOADING:
      return {
        ...state,
        isLoading: action.payload,
      };

    case PRODUCTS_RECEIVED:
      return {
        ...state,
        products: action.payload,
      };

    case PRODUCT_REMOVED:
      const { products } = state;
      products.forEach((item, index) => {
        if (item._id === action.productId) {
          products.splice(index, 1);
        }
      });
      return {
        ...state,
        products: [...products],
      };

    case PRODUCT_RECEIVED:
      return {
        ...state,
        product: action.payload,
      };

    case REVIEW_ADDED:
      return {
        ...state,
        product: action.payload,
      };

    case SET_PAGE_NUMBER:
      return {
        ...state,
        pageNumber: action.payload,
      };

    case SET_ISSUBMITTING:
      return {
        ...state,
        isSubmitting: action.payload,
      };

    default:
      return {
        ...state,
      };
  }
};
