import * as types from '../constants/actionTypes';

const initialState = {
  items: [],
  loading: true,
  faqs: {}
};

export default function (state = initialState, action) {
  switch (action.type) {
    case types.CREATE_FAQ_SUCCESS:
      return {
        ...state,
        items: action.payload,
        faqs: action.payload,
        loading: false
      };
    case types.SINGLE_FAQS_SUCCESS:
      return {
        ...state,
        items: action.payload,
        faqs: action.payload,
        loading: false
      };
    case types.GET_FAQS_SUCCESS:
      return {
        ...state,
        items: action.payload,
        faqs: action.payload,
        loading: false
      };
    case types.UPDATE_FAQS_SUCCESS:
      return {
        ...state,
        items: action.payload,
        faqs: action.payload,
        loading: false
      };
    case types.DELETE_FAQ_SUCCESS:
      return {
        ...state,
        items: action.payload,
        faqs: action.payload,
        loading: false
      };
    default:
      return state;
  }
}
