import * as types from '../constants/actionTypes';

const initialState = {
  items: [],
  item: {},
  loading: true,
  categories: {}
};

export default function (state = initialState, action) {
  switch (action.type) {
    case types.CREATE_CATEGORY_SUCCESS:
      return {
        ...state,
        items: action.payload,
        categories: action.payload,
        loading: false
      };
    case types.SINGLE_CATEGORY_SUCCESS:
      return {
        ...state,
        items: action.payload,
        categories: action.payload,
        loading: false
      };
    case types.GET_CATEGORY_SUCCESS:
      return {
        ...state,
        items: action.payload,
        categories: action.payload,
        loading: false
      };
    case types.UPDATE_CATEGORY_SUCCESS:
      return {
        ...state,
        items: action.payload,
        categories: action.payload,
        loading: false
      };
    case types.DELETE_CATEGORY_SUCCESS:
      return {
        ...state,
        items: action.payload,
        categories: action.payload,
        loading: false
      };
    default:
      return state;
  }
}
