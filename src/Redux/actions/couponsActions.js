import { toast } from 'react-toastify';
import axios from 'axios';
import * as types from '../constants/actionTypes';
import { request } from '../helpers/axiosRequest';

export const API = axios.create({ baseURL: process.env.REACT_APP_API_URL });

// Create Coupon
export const addCoupon = (data, navigate) => async (dispatch) => {
  try {
    dispatch({ type: types.CREATE_COUPON_ATTEMPT });
    const res = await request({
      url: `${process.env.REACT_APP_API_URL}/coupons/add-new`,
      auth: true,
      method: 'POST',
      data
    });
    toast.success('Coupon Added Successsully', {
      position: 'top-center',
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      draggable: true,
      progress: undefined
    });
    dispatch({
      type: types.CREATE_COUPON_SUCCESS,
      payload: { ...data }
    });
    setTimeout(() => {
      navigate('/dashboard/coupons');
    }, 2000);
  } catch (err) {
    dispatch({ type: types.CREATE_COUPON_FAIL, payload: err });
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

// Get Single Coupon
export const singleCoupon = (id) => async (dispatch) => {
  dispatch({ type: types.SINGLE_COUPON_ATTEMPT });
  try {
    const res = await request({
      url: `${process.env.REACT_APP_API_URL}/coupons/get-by-id/${id}`,
      auth: true,
      method: 'GET'
    });
    dispatch({
      type: types.SINGLE_COUPON_SUCCESS,
      payload: res.data
    });
  } catch (err) {
    dispatch({ type: types.SINGLE_COUPON_FAIL, payload: err });
    throw err;
  }
};

// Update Coupon
export const updateCoupon = (data, navigate) => async (dispatch) => {
  try {
    dispatch({ type: types.UPDATE_COUPON_ATTEMPT });
    const res = await request({
      url: `${process.env.REACT_APP_API_URL}/coupons/update-by-id`,
      auth: true,
      method: 'PUT',
      data
    });
    dispatch({
      type: types.UPDATE_COUPON_SUCCESS,
      payload: { ...data }
    });
    toast.success('Coupon Updated Successsully', {
      position: 'top-center',
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      draggable: true,
      progress: undefined
    });
    setTimeout(() => {
      navigate('/dashboard/coupons');
    }, 2000);
  } catch (err) {
    dispatch({ type: types.UPDATE_COUPON_FAIL, payload: err });
    throw err;
  }
};

// Delete Coupon
export const deleteCoupon = (id) => async (dispatch) => {
  try {
    dispatch({ type: types.DELETE_COUPON_ATTEMPT });
    const res = await request({
      method: 'POST',
      auth: true,
      url: `${process.env.REACT_APP_API_URL}/coupons/delete-by-id`,
      data: { id }
    });

    toast.success('Coupon Deleted Successsully', {
      position: 'top-center',
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      draggable: true,
      progress: undefined
    });
    dispatch({ type: types.DELETE_COUPON_SUCCESS, payload: {} });
    setTimeout(() => {
      window.location.href = '/dashboard/coupons';
    }, 1000);
  } catch (err) {
    dispatch({ type: types.DELETE_COUPON_FAIL, payload: err });
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
