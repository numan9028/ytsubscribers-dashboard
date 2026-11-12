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
    case types.UPDATE_ORDER_SUCCESS:
      return {
        ...state,
        items: {
          ...state.items,
          order: {
            ...state.items.order,
            orderItems: (state.items.order?.orderItems || []).map((item) =>
              item._id === action.payload._id ? action.payload : item
            )
          }
        }
      };

    default:
      return state;
  }
}
