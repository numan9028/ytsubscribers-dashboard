import { toast } from 'react-toastify';
import axios from 'axios';
import * as types from '../constants/actionTypes';
import { request } from '../helpers/axiosRequest';

export const API = axios.create({ baseURL: process.env.REACT_APP_API_URL });

// Add Addon
export const createAddon = (data, navigate) => async (dispatch) => {
  try {
    dispatch({ type: types.CREATE_ADDON_ATTEMPT });
    const res = await request({
      url: `${process.env.REACT_APP_API_URL}/addon/add-new`,
      auth: true,
      method: 'POST',
      data
    });
    toast.success('Addon Added Successsully', {
      position: 'top-center',
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      draggable: true,
      progress: undefined
    });
    dispatch({
      type: types.CREATE_ADDON_SUCCESS,
      payload: { ...data }
    });
    setTimeout(() => {
      navigate('/dashboard/addons');
    }, 1000);
  } catch (err) {
    dispatch({ type: types.CREATE_ADDON_FAIL, payload: err });
    toast.error('Unable to add Addon.', {
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

// Upadate Addon
export const updateAddon = (data, navigate) => async (dispatch) => {
  try {
    dispatch({ type: types.UPDATE_ADDON_ATTEMPT });
    const res = await request({
      url: `${process.env.REACT_APP_API_URL}/addon/update-by-id`,
      auth: true,
      method: 'PUT',
      data
    });
    dispatch({
      type: types.UPDATE_ADDON_SUCCESS,
      payload: { ...data }
    });
    toast.success('Addon Updated Successsully', {
      position: 'top-center',
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      draggable: true,
      progress: undefined
    });
    setTimeout(() => {
      navigate('/dashboard/addons');
    }, 1000);
  } catch (err) {
    dispatch({ type: types.UPDATE_ADDON_FAIL, payload: err });
    toast.error('Error: Unable to update this Addon', {
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

// Get Single Addon
export const singleAddon = (id) => async (dispatch) => {
  dispatch({ type: types.SINGLE_ADDON_ATTEMPT });
  try {
    const res = await request({
      url: `${process.env.REACT_APP_API_URL}/addon/get-by-id`,
      auth: true,
      method: 'POST',
      data: { id }
    });

    dispatch({
      type: types.SINGLE_ADDON_SUCCESS,
      payload: res.data
    });
  } catch (err) {
    dispatch({ type: types.SINGLE_ADDON_FAIL, payload: err });
    throw err;
  }
};

// Delete Addon
export const deleteAddon = (id) => async (dispatch) => {
  try {
    dispatch({ type: types.DELETE_ADDON_ATTEMPT });
    const res = await request({
      method: 'POST',
      auth: true,
      url: `${process.env.REACT_APP_API_URL}/addon/delete-by-id`,
      data: { id }
    });

    toast.success('Addon Deleted Successsully', {
      position: 'top-center',
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      draggable: true,
      progress: undefined
    });
    setTimeout(() => {
      window.location.href = '/dashboard/addons';
    }, 1000);
    dispatch({ type: types.DELETE_ADDON_SUCCESS, payload: {} });
  } catch (err) {
    toast.error('Error: Unable to Deleted this Addon', {
      position: 'top-center',
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      draggable: true,
      progress: undefined
    });
    dispatch({ type: types.DELETE_ADDON_FAIL, payload: err });
    throw new Error(err);
  }
};
