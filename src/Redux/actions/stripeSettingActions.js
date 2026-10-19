import { toast } from 'react-toastify';
import axios from 'axios';
import * as types from '../constants/actionTypes';
import { request } from '../helpers/axiosRequest';

export const API = axios.create({ baseURL: process.env.REACT_APP_API_URL });

// Create Stripe Setting
export const addStripeSetting = (data, navigate) => async (dispatch) => {
  try {
    dispatch({ type: types.CREATE_STRIPE_SETTING_ATTEMPT });
    const res = await request({
      url: `${process.env.REACT_APP_API_URL}/stripe/add-settings`,
      auth: true,
      method: 'POST',
      data
    });
    toast.success('Stripe Settings Added Successsully', {
      position: 'top-center',
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      draggable: true,
      progress: undefined
    });
    dispatch({
      type: types.CREATE_STRIPE_SETTING_SUCCESS,
      payload: { ...data }
    });
    setTimeout(() => {
      navigate('/dashboard/stripe-setting');
    }, 2000);
  } catch (err) {
    dispatch({ type: types.CREATE_STRIPE_SETTING_FAIL, payload: err });
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

// Get All Stripe Settings
export const getSettings = () => async (dispatch) => {
  dispatch({ type: types.GET_STRIPE_SETTINGS_ATTEMPT });
  try {
    const res = await request({
      url: `${process.env.REACT_APP_API_URL}/stripe/get-settings`,
      auth: true,
      method: 'GET'
    });
    dispatch({
      type: types.GET_STRIPE_SETTINGS_SUCCESS,
      payload: res.data
    });
  } catch (err) {
    dispatch({ type: types.GET_STRIPE_SETTINGS_FAIL, payload: err });
    throw err;
  }
};

// Get Single Stripe Setting
export const singleStripeSetting = (id) => {
  return async (dispatch) => {
    dispatch({ type: types.SINGLE_STRIPE_SETTING_ATTEMPT });
    try {
      const res = await request({
        url: `${process.env.REACT_APP_API_URL}/stripe/get-by-id/${id}`,
        auth: true,
        method: 'GET'
      });
      dispatch({
        type: types.SINGLE_STRIPE_SETTING_SUCCESS,
        payload: res.data
      });
    } catch (err) {
      dispatch({ type: types.SINGLE_STRIPE_SETTING_FAIL, payload: err });
      throw err;
    }
  };
};
// Update Stripe Setting
export const updateSetting = (data, navigate) => async (dispatch) => {
  try {
    dispatch({ type: types.UPDATE_STRIPE_SETTING_ATTEMPT });
    const res = await request({
      url: `${process.env.REACT_APP_API_URL}/stripe/update-settings`,
      auth: true,
      method: 'PUT',
      data
    });
    dispatch({
      type: types.UPDATE_STRIPE_SETTING_SUCCESS,
      payload: { ...data }
    });
    toast.success('Stripe Setting Updated Successsully', {
      position: 'top-center',
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      draggable: true,
      progress: undefined
    });
    setTimeout(() => {
      navigate('/dashboard/stripe-setting');
    }, 2000);
  } catch (err) {
    toast.error('Error: Unable to update', {
      position: 'top-center',
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      draggable: true,
      progress: undefined
    });
    dispatch({ type: types.UPDATE_STRIPE_SETTING_FAIL, payload: err });
    throw err;
  }
};

// Delete Stripe Setting
export const deleteSetting = (id) => async (dispatch) => {
  try {
    dispatch({ type: types.DELETE_STRIPE_SETTING_ATTEMPT });
    const res = await request({
      method: 'POST',
      auth: true,
      url: `${process.env.REACT_APP_API_URL}/stripe/delete-settings`,
      data: { id }
    });

    toast.success('Stripe Setting Deleted Successsully', {
      position: 'top-center',
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      draggable: true,
      progress: undefined
    });
    dispatch({ type: types.DELETE_STRIPE_SETTING_SUCCESS, payload: {} });
    setTimeout(() => {
      window.location.href = '/dashboard/stripe-setting';
    }, 1000);
  } catch (err) {
    dispatch({ type: types.DELETE_STRIPE_SETTING_FAIL, payload: err });
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
