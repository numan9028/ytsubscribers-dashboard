import * as types from '../constants/actionTypes';

const initialState = {
  items: [],
  loading: true,
  stripeSetting: {}
};

export default function (state = initialState, action) {
  switch (action.type) {
    case types.CREATE_STRIPE_SETTING_SUCCESS:
      return {
        ...state,
        items: action.payload,
        stripeSetting: action.payload,
        loading: false
      };
    case types.SINGLE_STRIPE_SETTING_SUCCESS:
      return {
        ...state,
        items: action.payload,
        stripeSetting: action.payload,
        loading: false
      };
    case types.GET_STRIPE_SETTINGS_SUCCESS:
      return {
        ...state,
        items: action.payload,
        stripeSetting: action.payload,
        loading: false
      };
    case types.UPDATE_STRIPE_SETTING_SUCCESS:
      return {
        ...state,
        items: action.payload,
        stripeSetting: action.payload,
        loading: false
      };
    case types.DELETE_STRIPE_SETTING_SUCCESS:
      return {
        ...state,
        items: action.payload,
        stripeSetting: action.payload,
        loading: false
      };
    default:
      return state;
  }
}
