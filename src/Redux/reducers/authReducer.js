import * as types from '../constants/actionTypes';

const initialState = {
  items: [],
  loading: true,
  user: null,
};

// Users & Users Role Reducers
export default function (state = initialState, action) {
  switch (action.type) {
    // User Reducers
    case types.IS_AUTH:
      return {
        ...state,
        user: action.payload,
        // loginSuccess: action.payload,
        loading: false
      };

    // User Reducers
    case types.LOGIN_USER_SUCCESS:
      return {
        ...state,
        items: action.payload,
        loginSuccess: action.payload,
        loading: false
      };
    case types.CREATE_USER_SUCCESS:
      return {
        ...state,
        items: action.payload,
        loading: false
      };
    case types.SINGLE_USER_SUCCESS:
      return {
        ...state,
        items: action.payload,
        loading: false
      };
    case types.GET_ALL_USERS_SUCCESS:
      return {
        ...state,
        items: action.payload,
        loading: false
      };
    case types.UPDATE_USER_SUCCESS:
      return {
        ...state,
        items: action.payload,

        loading: false
      };
    case types.DELETE_USER_SUCCESS:
      return {
        ...state,
        items: action.payload,
        loading: false
      };
    case types.FORGET_PASSWORD_SUCCESS:
      return {
        ...state,
        items: action.payload,
        loading: false
      };

    // User Role Reducers
    case types.CREATE_USER_ROLE_SUCCESS:
      return {
        ...state,
        items: action.payload,
        loading: false
      };
    case types.SINGLE_USER_ROLE_SUCCESS:
      return {
        ...state,
        items: action.payload,
        loading: false
      };
    case types.GET_USER_ROLES_SUCCESS:
      return {
        ...state,
        items: action.payload,
        loading: false
      };
    case types.UPDATE_USER_ROLE_SUCCESS:
      return {
        ...state,
        items: action.payload,
        loading: false
      };
    case types.DELETE_USER_ROLE_SUCCESS:
      return {
        ...state,
        items: action.payload,
        loading: false
      };
    default:
      return state;
  }
}
