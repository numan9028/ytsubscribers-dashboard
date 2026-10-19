import { toast } from 'react-toastify';
import axios from 'axios';
import * as types from '../constants/actionTypes';
import { request } from '../helpers/axiosRequest';

export const API = axios.create({ baseURL: process.env.REACT_APP_API_URL });

// Page Actions

export const getPageById = (id, navigate) => async (dispatch) => {
  //page/get-by-id/622b4abff6781e26ec7b3913
  //UPDATE_PAGE
  try {
    const res = await request({
      url: `${process.env.REACT_APP_API_URL}/page/get-by-id/${id}`,
      auth: true,
      method: 'GET',
    });
    dispatch({
      type: types.GET_PAGED_DATA,
      payload: { ...res.data }
    });
  } catch (error) {
    dispatch({ type: types.ADD_PAGE_SECTION_FAIL, payload: error });
    throw error;
  }
}

// Update page

export const updatePageContent = (data, navigate, to) => async () => {
  try {
    const res = await request({
      url: `${process.env.REACT_APP_API_URL}/page/update-by-slug/`,
      auth: true,
      method: 'PUT',
      data: data
    });
    if (res.data.success) {
      toast.success(res.data.message, {
        position: 'top-center',
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        draggable: true,
        progress: undefined
      });
      setTimeout(() => {
        navigate(to);
      }, 1000);
    }
  } catch (error) {
    toast.error(error.message, {
      position: 'top-center',
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      draggable: true,
      progress: undefined
    });
  }
}

// Create Page Section
export const addPageSection = (data, navigate) => async (dispatch) => {
  try {
    dispatch({ type: types.ADD_PAGE_SECTION_ATTEMPT });
    const res = await request({
      url: `${process.env.REACT_APP_API_URL}/section/add-page-section`,
      auth: true,
      method: 'POST',
      data
    });
    toast.success('Section Added Successsully', {
      position: 'top-center',
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      draggable: true,
      progress: undefined
    });
    dispatch({
      type: types.ADD_PAGE_SECTION_SUCCESS,
      payload: { ...data }
    });
    setTimeout(() => {
      navigate('/dashboard/why-us');
    }, 2000);
  } catch (error) {
    dispatch({ type: types.ADD_PAGE_SECTION_FAIL, payload: error });
    toast.error('Unable to add Section', {
      position: 'top-center',
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      draggable: true,
      progress: undefined
    });
    throw error;
  }
};

// Update Page Section
export const updatePage = (data, navigate) => async (dispatch) => {
  try {
    dispatch({ type: types.UPDATE_PAGE_SECTION });
    const res = await request({
      url: `${process.env.REACT_APP_API_URL}/page/update-by-slug`,
      auth: true,
      method: 'PUT',
      data
    });
    toast.success('Page Updated Successsully', {
      position: 'top-center',
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      draggable: true,
      progress: undefined
    });
    dispatch({
      type: types.UPDATE_PAGE_SECTION_SUCCESS,
      payload: { ...data }
    });
    setTimeout(() => {
      navigate(data.link);
    }, 2000);
  } catch (err) {
    dispatch({ type: types.UPDATE_PAGE_SECTION_FAIL, payload: err });
    throw err;
  }
};

// Sections
// Get All Section
export const allPageSections = (slug) => async (dispatch) => {
  dispatch({ type: types.GET_PAGE_SECTION });
  try {
    const res = await request({
      url: `${process.env.REACT_APP_API_URL}/page/get-by-slug/`,
      auth: true,
      method: 'POST',
      data: { slug: slug }
    });

    dispatch({
      type: types.GET_PAGE_SECTION_SUCCESS,
      payload: res.data
    });
  } catch (err) {
    dispatch({ type: types.GET_PAGE_SECTION_FAIL, payload: err });
    throw err;
  }
};

// Get Single Section
export const singlePageSection = (slug) => async (dispatch) => {
  dispatch({ type: types.SINGLE_PAGE_SECTION });
  try {
    const res = await request({
      url: `${process.env.REACT_APP_API_URL}/section/get-by-slug/`,
      auth: true,
      method: 'POST',
      data: { slug }
    });

    dispatch({
      type: types.SINGLE_PAGE_SECTION_SUCCESS,
      payload: res.data
    });
  } catch (err) {
    dispatch({ type: types.SINGLE_PAGE_SECTION_FAIL, payload: err });
    throw err;
  }
};

export const singlePageSectionById = (id) => async (dispatch) => {
  dispatch({ type: types.SINGLE_PAGE_SECTION });
  try {
    const res = await request({
      url: `${process.env.REACT_APP_API_URL}/section/get-by-id/${id}`,
      auth: true,
      method: 'GET',
      data: null
    });

    dispatch({
      type: types.SINGLE_PAGE_SECTION_SUCCESS,
      payload: res.data
    });
  } catch (err) {
    dispatch({ type: types.SINGLE_PAGE_SECTION_FAIL, payload: err });
    throw err;
  }
};

// Update Page Section
export const updatePageSection = (data, id) => async (dispatch) => {
  try {
    dispatch({ type: types.UPDATE_PAGE_SECTION });
    const res = await request({
      url: `${process.env.REACT_APP_API_URL}/section/update-page-section/${id}`,
      auth: true,
      method: 'PUT',
      data
    });
    toast.success('Section Updated Successsully', {
      position: 'top-center',
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      draggable: true,
      progress: undefined
    });
    dispatch({
      type: types.UPDATE_PAGE_SECTION_SUCCESS,
      payload: { ...data }
    });
  } catch (err) {
    dispatch({ type: types.UPDATE_PAGE_SECTION_FAIL, payload: err });
    throw err;
  }
};
