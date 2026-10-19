import * as types from '../constants/actionTypes';

const initialState = {
  items: [],
  item: {},
  loading: true,
  packages: {}
};

export default function (state = initialState, action) {
  switch (action.type) {
    case types.CREATE_PACKAGE_SUCCESS:
      return {
        ...state,
        items: action.payload,
        loading: false
      };
    case types.SINGLE_PACKAGE_SUCCESS:
      return {
        ...state,
        items: action.payload,
        loading: false
      };
    case types.GET_CATEGORY_SUCCESS:
      return {
        ...state,
        items: action.payload,
        loading: false
      };
    case types.UPDATE_PACAKGE_SUCCESS:
      return {
        ...state,
        items: action.payload,
        loading: false
      };
    case types.DELETE_PACAKGE_SUCCESS:
      return {
        ...state,
        items: action.payload,
        loading: false
      };
    default:
      return state;
  }
}
