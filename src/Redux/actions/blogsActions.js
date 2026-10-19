import { toast } from 'react-toastify';
import axios from 'axios';
import * as types from '../constants/actionTypes';
import { request } from '../helpers/axiosRequest';

export const API = axios.create({ baseURL: process.env.REACT_APP_API_URL });

// Create Blog
export const addBlog = (data, navigate) => async (dispatch) => {
  try {
    dispatch({ type: types.CREATE_BLOG_ATTEMPT });
    const res = await request({
      url: `${process.env.REACT_APP_API_URL}/blogs/create-post`,
      auth: true,
      method: 'POST',
      data
    });
    toast.success('Blog Added Successsully', {
      position: 'top-center',
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      draggable: true,
      progress: undefined
    });
    dispatch({
      type: types.CREATE_BLOG_SUCCESS,
      payload: { ...data }
    });
    setTimeout(() => {
      navigate('/dashboard/blogs');
    });
  } catch (err) {
    dispatch({ type: types.CREATE_BLOG_FAIL, payload: err });
    toast.error('Error: Unable to add blog', {
      position: 'top-center',
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      draggable: true,
      progress: undefined
    });
    throw err;
  }
};

// Get All Featured Blogs
export const allFeaturedBlogs = (id) => async (dispatch) => {
  dispatch({ type: types.GET_ALL_BLOGS_ATTEMPT });
  try {
    const res = await request({
      url: `${process.env.REACT_APP_API_URL}/blogs/get-featured`,
      auth: true,
      method: 'GET'
    });

    dispatch({
      type: types.GET_ALL_BLOGS_SUCCESS,
      payload: res.data
    });
  } catch (err) {
    dispatch({ type: types.GET_ALL_BLOGS_FAIL, payload: err });
    throw err;
  }
};

// Get All Active Blogs
export const allActiveBlogs = (id) => async (dispatch) => {
  dispatch({ type: types.ALL_ACTIVE_BLOGS_ATTEMPT });
  try {
    const res = await request({
      url: `${process.env.REACT_APP_API_URL}/blogs/get-all`,
      auth: true,
      method: 'GET'
    });

    dispatch({
      type: types.ALL_ACTIVE_BLOGS_SUCCESS,
      payload: res.data
    });
  } catch (err) {
    dispatch({ type: types.ALL_ACTIVE_BLOGS_FAIL, payload: err });
    throw err;
  }
};

// Get Single Blog
export const singleBlog = (slug) => async (dispatch) => {
  dispatch({ type: types.SINGLE_BLOG_ATTEMPT });
  try {
    const res = await request({
      url: `${process.env.REACT_APP_API_URL}/blogs/get-by-slug/${slug}`,
      auth: true,
      method: 'GET'
    });
    dispatch({
      type: types.SINGLE_BLOG_SUCCESS,
      payload: res.data
    });
  } catch (err) {
    dispatch({ type: types.SINGLE_BLOG_FAIL, payload: err });
    throw err;
  }
};

// Update Blog
export const updateBlog = (data, id) => async (dispatch) => {
  try {
    dispatch({ type: types.UPDATE_BLOG_ATTEMPT });
    const res = await request({
      url: `${process.env.REACT_APP_API_URL}/blogs/update-by-id`,
      auth: true,
      method: 'PUT',
      data
    });
    dispatch({
      type: types.UPDATE_BLOG_SUCCESS,
      payload: { ...data }
    });
    toast.success('Blog Updated Successsully', {
      position: 'top-center',
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      draggable: true,
      progress: undefined
    });
  } catch (err) {
    dispatch({ type: types.UPDATE_BLOG_FAIL, payload: err });
    throw err;
  }
};

// Delete Blog
export const deleteBlog = (id) => async (dispatch) => {
  try {
    dispatch({ type: types.DELETE_BLOG_ATTEMPT });
    const res = await request({
      method: 'POST',
      auth: true,
      url: `${process.env.REACT_APP_API_URL}/blogs/delete-by-id`,
      data: { _id: id }
    });

    toast.success('Blog Deleted Successsully', {
      position: 'top-center',
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      draggable: true,
      progress: undefined
    });
    setTimeout(() => {
      window.location.href = '/dashboard/blogs';
    }, 1000);
    dispatch({ type: types.DELETE_BLOG_SUCCESS, payload: {} });
  } catch (err) {
    dispatch({ type: types.DELETE_BLOG_FAIL, payload: err });
    throw new Error(err);
  }
};
