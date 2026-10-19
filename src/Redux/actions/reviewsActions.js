import { toast } from 'react-toastify';
import axios from 'axios';
import * as types from '../constants/actionTypes';
import { request } from '../helpers/axiosRequest';

export const API = axios.create({ baseURL: process.env.REACT_APP_API_URL });

// Create Review
export const addReview = (data, navigate) => async (dispatch) => {
  try {
    dispatch({ type: types.CREATE_REVIEW_ATTEMPT });
    const res = await request({
      url: `${process.env.REACT_APP_API_URL}/reviews/add-new`,
      auth: true,
      method: 'POST',
      data
    });
    toast.success('Review Added Successsully', {
      position: 'top-center',
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      draggable: true,
      progress: undefined
    });
    dispatch({
      type: types.CREATE_REVIEW_SUCCESS,
      payload: { ...data }
    });
    setTimeout(() => {
      navigate('/dashboard/reviews');
    }, 2000);
  } catch (err) {
    dispatch({ type: types.CREATE_REVIEW_FAIL, payload: err });
    toast.error(err, {
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

// Get All Reviews
export const allReviews = () => async (dispatch) => {
  dispatch({ type: types.GET_REVIEWS_ATTEMPT });
  try {
    const res = await request({
      url: `${process.env.REACT_APP_API_URL}/reviews/get-all`,
      auth: true,
      method: 'GET'
    });

    dispatch({
      type: types.GET_REVIEWS_SUCCESS,
      payload: res.data
    });
  } catch (err) {
    dispatch({ type: types.GET_REVIEWS_FAIL, payload: err });
    throw err;
  }
};
export const pendingReviews = () => async (dispatch) => {
  dispatch({ type: types.GET_PEND_REVIEWS_ATTEMPT });
  try {
    const res = await request({
      url: `${process.env.REACT_APP_API_URL}/reviews/get-pending`,
      auth: true,
      method: 'GET'
    });

    dispatch({
      type: types.GET_PEND_REVIEWS_SUCCESS,
      payload: res.data
    });
  } catch (err) {
    dispatch({ type: types.GET_PEND_REVIEWS_FAIL, payload: err });
    throw err;
  }
};


// Get Single Review
export const singleReview = (id) => {
  return async (dispatch) => {
    dispatch({ type: types.SINGLE_REVIEW_ATTEMPT });
    try {
      const res = await request({
        url: `${process.env.REACT_APP_API_URL}/reviews/get-by-id/${id}`,
        auth: true,
        method: 'GET'
      });
      dispatch({
        type: types.SINGLE_REVIEW_SUCCESS,
        payload: res.data
      });
    } catch (err) {
      dispatch({ type: types.SINGLE_REVIEW_FAIL, payload: err });
      throw err;
    }
  };
};
// Update Review
export const updateReview = (data, navigate) => async (dispatch) => {
  try {
    dispatch({ type: types.UPDATE_REVIEW_ATTEMPT });
    const res = await request({
      url: `${process.env.REACT_APP_API_URL}/reviews/update-by-id`,
      auth: true,
      method: 'PUT',
      data
    });
    dispatch({
      type: types.UPDATE_REVIEW_SUCCESS,
      payload: { ...data }
    });
    toast.success('Review Updated Successsully', {
      position: 'top-center',
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      draggable: true,
      progress: undefined
    });
    setTimeout(() => {
      navigate('/dashboard/reviews');
    }, 2000);
  } catch (err) {
    dispatch({ type: types.UPDATE_REVIEW_FAIL, payload: err });
    throw err;
  }
};

// Delete Review
export const deleteReview = (id) => async (dispatch) => {
  try {
    dispatch({ type: types.DELETE_REVIEW_ATTEMPT });
    const res = await request({
      method: 'POST',
      auth: true,
      url: `${process.env.REACT_APP_API_URL}/reviews/delete-by-id`,
      data: { _id: id }
    });

    toast.success('Review Deleted Successsully', {
      position: 'top-center',
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      draggable: true,
      progress: undefined
    });
    dispatch({ type: types.DELETE_REVIEW_SUCCESS, payload: {} });
    setTimeout(() => {
      window.location.href = '/dashboard/reviews';
    }, 1000);
  } catch (err) {
    dispatch({ type: types.DELETE_REVIEW_FAIL, payload: err });
    toast.error('Error Found', {
      position: 'top-center',
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      draggable: true,
      progress: undefined
    });
    throw new Error(err);
  }
};
