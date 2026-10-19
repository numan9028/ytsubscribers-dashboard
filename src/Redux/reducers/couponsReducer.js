import * as types from '../constants/actionTypes';

const initialState = {
  items: [],
  loading: true,
  coupons: {}
};

export default function (state = initialState, action) {
  switch (action.type) {
    case types.CREATE_COUPON_SUCCESS:
      return {
        ...state,
        items: action.payload,
        coupons: action.payload,
        loading: false
      };
    case types.SINGLE_COUPON_SUCCESS:
      return {
        ...state,
        items: action.payload,
        coupons: action.payload,
        loading: false
      };
    case types.UPDATE_COUPON_SUCCESS:
      return {
        ...state,
        items: action.payload,
        coupons: action.payload,
        loading: false
      };
    case types.DELETE_COUPON_SUCCESS:
      return {
        ...state,
        items: action.payload,
        coupons: action.payload,
        loading: false
      };
    default:
      return state;
  }
}
