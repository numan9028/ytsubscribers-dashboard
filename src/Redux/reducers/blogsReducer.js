import * as types from '../constants/actionTypes';

const initialState = {
  items: [],
  loading: true,
  blogs: {}
};

export default function (state = initialState, action) {
  switch (action.type) {
    case types.CREATE_BLOG_SUCCESS:
      return {
        ...state,
        items: action.payload,
        blogs: action.payload,
        loading: false
      };
    case types.SINGLE_BLOG_SUCCESS:
      return {
        ...state,
        items: action.payload,
        blogs: action.payload,
        loading: false
      };
    case types.ALL_ACTIVE_BLOGS_SUCCESS:
      return {
        ...state,
        items: action.payload,
        blogs: action.payload,
        loading: false
      };
    case types.UPDATE_BLOG_SUCCESS:
      return {
        ...state,
        items: action.payload,
        blogs: action.payload,
        loading: false
      };
    case types.DELETE_BLOG_SUCCESS:
      return {
        ...state,
        items: action.payload,
        blogs: action.payload,
        loading: false
      };
    default:
      return state;
  }
}
