import axios from 'axios';
import * as types from '../constants/actionTypes';
import { request } from '../helpers/axiosRequest';

export const API = axios.create({ baseURL: process.env.REACT_APP_API_URL });

// Get All Orders
export const allOrders = () => async (dispatch) => {
  dispatch({ type: types.GET_ORDERS_ATTEMPT });
  try {
    const res = await request({
      url: `${process.env.REACT_APP_API_URL}/orders/get-all`,
      auth: true,
      method: 'GET'
    });
    dispatch({
      type: types.GET_ORDERS_SUCCESS,
      payload: res.data
    });
  } catch (err) {
    dispatch({ type: types.GET_ORDERS_FAIL, payload: err });
    throw err;
  }
};

// Get Single Order
export const singleOrder = (id) => {
  return async (dispatch) => {
    dispatch({ type: types.SINGLE_ORDER_ATTEMPT });
    try {
      const res = await request({
        url: `${process.env.REACT_APP_API_URL}/orders/get-order/${id}`,
        auth: true,
        method: 'GET'
      });
      dispatch({
        type: types.SINGLE_ORDER_SUCCESS,
        payload: res.data
      });
    } catch (err) {
      dispatch({ type: types.SINGLE_ORDER_FAIL, payload: err });
      throw err;
    }
  };
};

export const updateOrderItem = ({ id, ...data }) => async (dispatch) => {
  dispatch({ type: types.UPDATE_ORDER_ATTEMPT });
  try {
    const res = await request({
      url: `${process.env.REACT_APP_API_URL}/orders/update-order-item/${id}`,
      method: 'PUT',
      data
    });
    dispatch({
      type: types.UPDATE_ORDER_SUCCESS,
      payload: res.data.orderItem
    });
    return res.data.orderItem;
  } catch (err) {
    dispatch({ type: types.UPDATE_ORDER_FAIL, payload: err });
    throw err;
  }
};
