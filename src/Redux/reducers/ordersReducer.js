import * as types from '../constants/actionTypes';

const initialState = {
  items: [],
  loading: true,
  orders: {}
};

export default function (state = initialState, action) {
  switch (action.type) {
    case types.SINGLE_ORDER_SUCCESS:
      return {
        ...state,
        items: action.payload,
        orders: action.payload,
        loading: false
      };
    case types.GET_ORDERS_SUCCESS:
      return {
        ...state,
        items: action.payload,
        orders: action.payload,
        loading: false
      };

    default:
      return state;
  }
}
