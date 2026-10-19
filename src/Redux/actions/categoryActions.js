import { toast } from 'react-toastify';
import axios from 'axios';
import * as types from '../constants/actionTypes';
import { request } from '../helpers/axiosRequest';

export const API = axios.create({ baseURL: process.env.REACT_APP_API_URL });

// Add Category
export const addCategory = (data, navigate) => async (dispatch) => {
  try {
    dispatch({ type: types.CREATE_CATEGORY_ATTEMPT });
    const res = await request({
      url: `${process.env.REACT_APP_API_URL}/category/add-new`,
      auth: true,
      method: 'POST',
      data
    });
    dispatch({
      type: types.CREATE_CATEGORY_SUCCESS,
      payload: { ...data }
    });
    toast.success('Category Added Successsully', {
      position: 'top-center',
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      draggable: true,
      progress: undefined
    });
    setTimeout(() => {
      navigate('/dashboard/package-category');
    }, 2000);
  } catch (err) {
    dispatch({ type: types.CREATE_CATEGORY_FAIL, payload: err });
    toast.error('Unable to add Category', {
      position: 'top-center',
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      draggable: true,
      progress: undefined
    });
    console.log('errerr', err);
    throw err;
  }
};

// Get Single Category
export const singleCategory = (id) => async (dispatch) => {
  dispatch({ type: types.SINGLE_CATEGORY_ATTEMPT });
  try {
    const res = await request({
      url: `${process.env.REACT_APP_API_URL}/category/get-by-id/${id}`,
      auth: true,
      method: 'GET'
    });

    dispatch({
      type: types.SINGLE_CATEGORY_SUCCESS,
      payload: res.data
    });
  } catch (err) {
    dispatch({ type: types.SINGLE_CATEGORY_FAIL, payload: err });

    throw err;
  }
};

// Get All Categories
export const getAllCategories = () => async (dispatch) => {
  dispatch({ type: types.GET_CATEGORY_ATTEMPT });
  try {
    const res = await request({
      url: `${process.env.REACT_APP_API_URL}/category/get-all`,
      auth: true,
      method: 'GET'
    });

    dispatch({
      type: types.GET_CATEGORY_SUCCESS,
      payload: res.data
    });
  } catch (err) {
    dispatch({ type: types.GET_CATEGORY_FAIL, payload: err });
    throw err;
  }
};

// Upadate Category
export const updateCategory = (data, navigate) => async (dispatch) => {
  try {
    dispatch({ type: types.UPDATE_CATEGORY_ATTEMPT });
    const res = await request({
      url: `${process.env.REACT_APP_API_URL}/category/update-by-id`,
      auth: true,
      method: 'PUT',
      data
    });
    dispatch({
      type: types.UPDATE_CATEGORY_SUCCESS,
      payload: { ...data }
    });
    toast.success('Category Updated Successsully', {
      position: 'top-center',
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      draggable: true,
      progress: undefined
    });
    setTimeout(() => {
      navigate('/dashboard/package-category');
    }, 1000);
  } catch (err) {
    dispatch({ type: types.UPDATE_CATEGORY_FAIL, payload: err });
    toast.error('Error: Unable to update this category', {
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

// Delete Category
export const deleteCategory = (id) => async (dispatch) => {
  try {
    dispatch({ type: types.DELETE_CATEGORY_ATTEMPT });
    const res = await request({
      method: 'POST',
      auth: true,
      url: `${process.env.REACT_APP_API_URL}/category/delete-by-id`,
      data: { id }
    });

    toast.success('Category Deleted Successsully', {
      position: 'top-center',
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      draggable: true,
      progress: undefined
    });
    setTimeout(() => {
      window.location.href = '/dashboard/package-category';
    }, 1000);
    dispatch({ type: types.DELETE_CATEGORY_SUCCESS, payload: {} });
  } catch (err) {
    toast.error('Error: Unable to Deleted this category', {
      position: 'top-center',
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      draggable: true,
      progress: undefined
    });
    dispatch({ type: types.DELETE_CATEGORY_FAIL, payload: err });
    throw new Error(err);
  }
};
