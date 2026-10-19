import * as types from '../constants/actionTypes';

const initialState = {
  items: [],
  item: {},
  loading: true,
  addons: {}
};

export default function (state = initialState, action) {
  switch (action.type) {
    case types.CREATE_ADDON_SUCCESS:
      return {
        ...state,
        items: action.payload,
        addons: action.payload,
        loading: false
      };
    case types.SINGLE_ADDON_SUCCESS:
      return {
        ...state,
        items: action.payload,
        addons: action.payload,
        loading: false
      };
    case types.UPDATE_ADDON_SUCCESS:
      return {
        ...state,
        items: action.payload,
        addons: action.payload,
        loading: false
      };
    case types.DELETE_ADDON_SUCCESS:
      return {
        ...state,
        items: action.payload,
        addons: action.payload,
        loading: false
      };
    default:
      return state;
  }
}
