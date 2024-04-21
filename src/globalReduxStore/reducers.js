import { combineReducers } from 'redux';
import { actionTypes } from './actions';

const initialUserState = {
  users: [],
};

const userReducer = (state = initialUserState, action) => {
  switch (action.type) {
    case actionTypes.SET_USERS:
      return {
        ...state,
        users: action.payload,
      };
    default:
      return state;
  }
};

const initialProductState = {
  products: [{
    id: 2,
    name: 'Demo Products',
    price: '$19.99',
    description: 'This is a demo product description.',
  }],
};

const productReducer = (state = initialProductState, action) => {
  switch (action.type) {
    case actionTypes.SET_PRODUCTS:
      return {
        ...state,
        products: action.payload,
      };
    case actionTypes.SET_PRODUCT:
      console.log(action, 'Actions');
      return {
        ...state,
        products: [...state.products, action.payload],
      };
    default:
      return state;
  }
};

const initialTransactionState = {
  transactions: [],
};

const transactionReducer = (state = initialTransactionState, action) => {
  switch (action.type) {
    case actionTypes.SET_TRANSACTIONS:
      return {
        ...state,
        transactions: action.payload,
      };
    default:
      return state;
  }
};

const initialReviewState = {
  reviews: [],
};

const reviewReducer = (state = initialReviewState, action) => {
  switch (action.type) {
    case actionTypes.SET_REVIEWS:
      return {
        ...state,
        reviews: action.payload,
      };
    default:
      return state;
  }
};

const initialOrderState = {
  orders: [],
};

const orderReducer = (state = initialOrderState, action) => {
  switch (action.type) {
    case actionTypes.SET_ORDERS:
      return {
        ...state,
        orders: action.payload,
      };
    default:
      return state;
  }
};

const rootReducer = combineReducers({
  user: userReducer,
  product: productReducer,
  transaction: transactionReducer,
  review: reviewReducer,
  order: orderReducer,
});

export default rootReducer;
