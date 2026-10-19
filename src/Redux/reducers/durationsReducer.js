import * as types from '../constants/actionTypes';
const initialState = {
  items: [],
  loading: true,
  durations: {}
};

export default function (state = initialState, action) {
  switch (action.type) {
    case types.CREATE_DURATION_SUCCESS:
      return {
        ...state,
        items: action.payload,
        durations: action.payload,
        loading: false
      };
    case types.SINGLE_DURATION_SUCCESS:
      return {
        ...state,
        items: action.payload,
        loading: false
      };
    case types.DELETE_DURATION_SUCCESS:
      return {
        ...state,
        items: action.payload,
        durations: action.payload,
        loading: false
      };
    default:
      return state;
    case types.UPDATE_DURATION_SUCCESS:
      return {
        ...state,
        items: action.payload,
        loading: false
      };
  }
}

