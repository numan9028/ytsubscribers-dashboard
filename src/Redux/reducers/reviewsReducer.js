import * as types from '../constants/actionTypes';

const initialState = {
  items: [],
  loading: true,
  reviews: {}
};

export default function (state = initialState, action) {
  switch (action.type) {
    case types.CREATE_REVIEW_SUCCESS:
      return {
        ...state,
        items: action.payload,
        reviews: action.payload,
        loading: false
      };
    case types.SINGLE_REVIEW_SUCCESS:
      return {
        ...state,
        items: action.payload,
        reviews: action.payload,
        loading: false
      };
    case types.GET_REVIEWS_SUCCESS:
      return {
        ...state,
        items: action.payload,
        reviews: action.payload,
        loading: false
      };
      case types.GET_PEND_REVIEWS_SUCCESS:
        return {
          ...state,
          items: action.payload,
          reviews: action.payload,
          loading: false
        };
    case types.UPDATE_REVIEW_SUCCESS:
      return {
        ...state,
        items: action.payload,
        reviews: action.payload,
        loading: false
      };
    case types.DELETE_REVIEW_SUCCESS:
      return {
        ...state,
        items: action.payload,
        reviews: action.payload,
        loading: false
      };
    default:
      return state;
  }
}
