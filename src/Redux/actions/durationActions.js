import { toast } from 'react-toastify';
import axios from 'axios';
import * as types from '../constants/actionTypes';
import { request } from '../helpers/axiosRequest';

export const API = axios.create({ baseURL: process.env.REACT_APP_API_URL });

// Add Duration
export const addDuration = (data, navigate) => async (dispatch) => {
  try {
    dispatch({ type: types.CREATE_DURATION_ATTEMPT });
    const res = await request({
      url: `${process.env.REACT_APP_API_URL}/durations/addNew`,
      auth: true,
      method: 'POST',
      data
    });
    toast.success('Duration Added Successsully', {
      position: 'top-center',
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      draggable: true,
      progress: undefined
    });

    dispatch({
      type: types.CREATE_DURATION_SUCCESS,
      payload: { ...data }
    });

    setTimeout(() => {
      navigate('/dashboard/durations');
    }, 2000);
  } catch (err) {
    dispatch({ type: types.CREATE_DURATION_FAIL, payload: err });
    toast.error('Error: Unable to add duration ', {
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
// Delete Duration
export const deleteDuration = (id) => async (dispatch) => {
  try {
    dispatch({ type: types.DELETE_DURATION_ATTEMPT });
    const res = await request({
      method: 'POST',
      auth: true,
      url: `${process.env.REACT_APP_API_URL}/durations/delete-by-id`,
      data: { id }
    });

    toast.success('Duration Deleted Successsully', {
      position: 'top-center',
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      draggable: true,
      progress: undefined
    });
    setTimeout(() => {
      window.location.href = '/dashboard/durations';
    }, 1000);
    dispatch({ type: types.DELETE_DURATION_SUCCESS, payload: {} });
  } catch (err) {
    toast.error('Error: Unable to Delete this Duration', {
      position: 'top-center',
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      draggable: true,
      progress: undefined
    });
    dispatch({ type: types.DELETE_DURATION_FAIL, payload: err });
    throw new Error(err);
  }
};
// Get Single Duration
export const singleDuration = (id) => async (dispatch) => {
  dispatch({ type: types.SINGLE_DURATION_ATTEMPT });
  try {
    const res = await request({
      url: `${process.env.REACT_APP_API_URL}/durations/get-by-id/${id}`,
      auth: true,
      method: 'GET'
    });
    dispatch({
      type: types.SINGLE_DURATION_SUCCESS,
      payload: res.data
    });
  } catch (err) {
    dispatch({ type: types.SINGLE_DURATION_FAIL, payload: err });
    throw err;
  }
};
export const updateDuration = (data, navigate) => async (dispatch) => {
  try {
    dispatch({ type: types.UPDATE_DURATION_ATTEMPT });
    const res = await request({
      url: `${process.env.REACT_APP_API_URL}/durations/update-by-id`,
      auth: true,
      method: 'PUT',
      data
    });
    dispatch({
      type: types.UPDATE_DURATION_SUCCESS,
      payload: { ...data }
    });
    toast.success('Duration Updated Successsully', {
      position: 'top-center',
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      draggable: true,
      progress: undefined
    });
    setTimeout(() => {
      navigate('/dashboard/durations');
    }, 2000);
  } catch (err) {
    dispatch({ type: types.UPDATE_DURATION_FAIL, payload: err });
    toast.error('Error: Unable to update duration.', {
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
