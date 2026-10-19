import { toast } from 'react-toastify';
// import axios from 'axios';
import * as types from '../constants/actionTypes';
import { request } from '../helpers/axiosRequest';

// Create Section
export const addFAQ = (data, navigate) => async (dispatch) => {
  try {
    dispatch({ type: types.CREATE_FAQ_ATTEMPT });
    const res = await request({
      url: `${process.env.REACT_APP_API_URL}/faq/add-faq`,
      auth: true,
      method: 'POST',
      data
    });
    toast.success('Faq Added Successsully', {
      position: 'top-center',
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      draggable: true,
      progress: undefined
    });
    dispatch({
      type: types.CREATE_FAQ_SUCCESS,
      payload: { ...data }
    });
    setTimeout(() => {
      navigate('/dashboard/pages/faqs');
    }, 2000);
  } catch (err) {
    dispatch({ type: types.CREATE_FAQ_FAIL, payload: err });
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

// Get All Section
export const allFaqs = (id) => async (dispatch) => {
  dispatch({ type: types.GET_FAQS_ATTEMPT });
  try {
    const res = await request({
      url: `${process.env.REACT_APP_API_URL}/faq/get-all`,
      auth: true,
      method: 'GET'
    });
    dispatch({
      type: types.GET_FAQS_SUCCESS,
      payload: res.data
    });
  } catch (err) {
    dispatch({ type: types.GET_FAQS_FAIL, payload: err });
    throw err;
  }
};

// Get Single Section
export const singleFaq = (id) => async (dispatch) => {
  dispatch({ type: types.SINGLE_FAQS_ATTEMPT });
  try {
    const res = await request({
      url: `${process.env.REACT_APP_API_URL}/faq/get-one/${id}`,
      auth: true,
      method: 'GET'
    });
    dispatch({
      type: types.SINGLE_FAQS_SUCCESS,
      payload: res.data
    });
  } catch (err) {
    dispatch({ type: types.SINGLE_FAQS_FAIL, payload: err });
    throw err;
  }
};

// Update Page Section
export const updateFaq = (data, id) => async (dispatch) => {
  try {
    dispatch({ type: types.UPDATE_FAQS_ATTEMPT });
    const res = await request({
      url: `${process.env.REACT_APP_API_URL}/faq/update-by-id/${id}`,
      auth: true,
      method: 'PUT',
      data
    });
    dispatch({
      type: types.UPDATE_FAQS_SUCCESS,
      payload: { ...data }
    });
    toast.success('Faq Updated Successsully', {
      position: 'top-center',
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      draggable: true,
      progress: undefined
    });
  } catch (err) {
    dispatch({ type: types.UPDATE_FAQS_FAIL, payload: err });
    throw err;
  }
};

// Delete Faq
export function deleteFaq(id) {
  return async (dispatch) => {
    try {
      dispatch({ type: types.DELETE_FAQ_ATTEMPT });
      const res = await request({
        method: 'POST',
        auth: true,
        url: `${process.env.REACT_APP_API_URL}/faq/delete-by-id/${id}`
      });

      toast.success('Faq Deleted Successsully', {
        position: 'top-center',
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        draggable: true,
        progress: undefined
      });

      dispatch({ type: types.DELETE_FAQ_SUCCESS, payload: {} });
    } catch (err) {
      dispatch({ type: types.DELETE_FAQ_FAIL, payload: err });
      throw new Error(err);
    }
  };
}
