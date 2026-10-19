import { toast } from 'react-toastify';
import axios from 'axios';
import * as types from '../constants/actionTypes';
import { request } from '../helpers/axiosRequest';
export const API = axios.create({ baseURL: process.env.REACT_APP_API_URL });
export const API_LOGIN = axios.create({ baseURL: process.env.REACT_APP_NODE_ROOT });

// Login User Account
export const loginAccount = (data) => async (dispatch) => {
  try {
    // dispatch({ type: types.LOGIN_USER_ATTEMPT });
    const res = await request(
      {
        url: `${process.env.REACT_APP_NODE_ROOT}/login`,
        method: 'POST',
        data,
      },
    );
    dispatch({ type: types.LOGIN_USER_SUCCESS, payload: res.data });
    if (res.data.success === true) {
      // localStorage.setItem('token', res.data.w_auth);
      // localStorage.setItem('role', res.data.userRole);
      localStorage.setItem('userId', res.data.userId);
      toast.success('Login Successfull', {
        position: 'top-center',
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        draggable: true,
        progress: undefined
      });
      setTimeout(() => {
        window.location.href = '/dashboard/app';
      }, 2000);
    } else {
      toast.error(res.data.message, {
        position: 'top-center',
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        draggable: true,
        progress: undefined
      });
    }

    return res.data;
  } catch (err) {
    dispatch({ type: types.LOGIN_USER_FAIL, payload: err });
    toast.error('Error: Please check your Email or Password', {
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

export const isAuth = () => async (dispatch) => {
  request({
    url: `${process.env.REACT_APP_NODE_ROOT}/auth`,
    method: "POST",
    data: null,
  }).then(({ data }) => {
    if (data.isAuth) {
      dispatch({
        type: types.IS_AUTH,
        payload: data,
      });
    }
  }).catch((error) => {
    console.log(error);
    dispatch({
      type: types.IS_AUTH,
      payload: null,
    });
  });

}

// Create User
export const addUser = (data, navigate, setLoading) => async (dispatch) => {
  setLoading(true);
  dispatch({ type: types.CREATE_USER_ATTEMPT });
  request({
    url: `${process.env.REACT_APP_API_URL}/users/add-user`,
    auth: true,
    method: 'POST',
    data
  }).then((res) => {
    if (res.data.success) {
      toast.success(res.data.message, {
        position: 'top-center',
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        draggable: true,
        progress: undefined
      });
      dispatch({
        type: types.CREATE_USER_SUCCESS,
        payload: { ...data }
      });
      setTimeout(() => {
        navigate('/dashboard/users');
      }, 2000);
    }
  }).catch((err) => {
    console.log("err: ", err.response.data.message)
    dispatch({ type: types.CREATE_USER_FAIL, payload: err });
    toast.error(err?.response?.data?.message, {
      position: 'top-center',
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      draggable: true,
      progress: undefined
    });
    setLoading(false);
  });
};

//GET SINGLE USER
export const singleUser = (id) => {
  return async (dispatch) => {
    dispatch({ type: types.SINGLE_USER_ATTEMPT });
    try {
      const res = await request({
        url: `${process.env.REACT_APP_API_URL}/users/get-user/${id}`,
        auth: true,
        method: 'GET'
      });
      dispatch({
        type: types.SINGLE_USER_SUCCESS,
        payload: res.data
      });
    } catch (err) {
      dispatch({ type: types.SINGLE_USER_FAIL, payload: err });
      throw err;
    }
  };
};

// UPDATE USER
export const updateUser = (data, navigate) => async (dispatch) => {
  try {
    dispatch({ type: types.UPDATE_USER_ATTEMPT });
    const res = await request({
      url: `${process.env.REACT_APP_API_URL}/users/update-user-by-id`,
      auth: true,
      method: 'PUT',
      data
    });
    dispatch({
      type: types.UPDATE_USER_SUCCESS,
      payload: { ...data }
    });
    toast.success('User Updated Successsully', {
      position: 'top-center',
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      draggable: true,
      progress: undefined
    });
    setTimeout(() => {
      navigate('/dashboard/users');
    }, 2000);
  } catch (err) {
    dispatch({ type: types.UPDATE_USER_FAIL, payload: err });
    throw err;
  }
};

// Delete User
export const deleteUser = (id) => async (dispatch) => {
  try {
    dispatch({ type: types.DELETE_USER_ATTEMPT });
    const res = await request({
      method: 'POST',
      auth: true,
      url: `${process.env.REACT_APP_API_URL}/users/delete-user-by-id`,
      data: { id }
    });

    toast.success('User Deleted Successsully', {
      position: 'top-center',
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      draggable: true,
      progress: undefined
    });
    setTimeout(() => {
      window.location.href = '/dashboard/users';
    }, 1000);
    dispatch({ type: types.DELETE_USER_SUCCESS, payload: {} });
  } catch (err) {
    toast.error('Error: Unable to delete this user', {
      position: 'top-center',
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      draggable: true,
      progress: undefined
    });
    dispatch({ type: types.DELETE_USER_FAIL, payload: err });
    throw new Error(err);
  }
};

// Forget Password
export function forgetPassword(data) {
  return async (dispatch) => {
    try {
      dispatch({ type: types.FORGET_PASSWORD_ATTEMPT });
      const res = await request({
        url: `${process.env.REACT_APP_API_URL}/user/forget-password`,
        auth: true,
        method: 'POST',
        data
      });
      toast.success('Forget password successsully', {
        position: 'top-center',
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        draggable: true,
        progress: undefined
      });
      dispatch({
        type: types.FORGET_PASSWORD_SUCCESS,
        payload: { ...data }
      });
    } catch (err) {
      dispatch({ type: types.FORGET_PASSWORD_FAIL, payload: err });
      throw err;
    }
  };
}

// User Role Actions
// Add User Role
export const addRole = (data, navigate) => async (dispatch) => {
  try {
    dispatch({ type: types.CREATE_USER_ROLE_ATTEMPT });
    const res = await request({
      url: `${process.env.REACT_APP_API_URL}/users/add-user-role`,
      auth: true,
      method: 'POST',
      data
    });
    toast.success('User Role Added Successsully', {
      position: 'top-center',
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      draggable: true,
      progress: undefined
    });
    dispatch({
      type: types.CREATE_USER_ROLE_SUCCESS,
      payload: { ...data }
    });
    setTimeout(() => {
      navigate('/dashboard/user-role');
    }, 2000);
  } catch (err) {
    dispatch({ type: types.CREATE_USER_ROLE_FAIL, payload: err });
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

// Get All User Roles
export const allUserRoles = () => async (dispatch) => {
  dispatch({ type: types.GET_USER_ROLES_ATTEMPT });
  try {
    const res = await request({
      url: `${process.env.REACT_APP_API_URL}/reviews/get-all`,
      auth: true,
      method: 'GET'
    });

    dispatch({
      type: types.GET_USER_ROLES_SUCCESS,
      payload: res.data
    });
  } catch (err) {
    dispatch({ type: types.GET_USER_ROLES_FAIL, payload: err });
    throw err;
  }
};

// Get Single User Role
export const singleUserRole = (id) => async (dispatch) => {
  dispatch({ type: types.SINGLE_USER_ROLE_ATTEMPT });
  try {
    const res = await request({
      url: `${process.env.REACT_APP_API_URL}/users/get-user-role/${id}`,
      auth: true,
      method: 'GET'
    });
    dispatch({
      type: types.SINGLE_USER_ROLE_SUCCESS,
      payload: res.data
    });
  } catch (err) {
    dispatch({ type: types.SINGLE_USER_ROLE_FAIL, payload: err });
    throw err;
  }
};

// Update User Role
export const updateUserRole = (data, navigate) => async (dispatch) => {
  try {
    dispatch({ type: types.UPDATE_USER_ROLE_ATTEMPT });
    const res = await request({
      url: `${process.env.REACT_APP_API_URL}/users/update-user-role`,
      auth: true,
      method: 'PUT',
      data
    });
    dispatch({
      type: types.UPDATE_USER_ROLE_SUCCESS,
      payload: { ...data }
    });
    toast.success('User Role Updated Successsully', {
      position: 'top-center',
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      draggable: true,
      progress: undefined
    });
    setTimeout(() => {
      navigate('/dashboard/user-role');
    }, 2000);
  } catch (err) {
    dispatch({ type: types.UPDATE_USER_ROLE_FAIL, payload: err });
    throw err;
  }
};

// Delete User Role
export const deleteUserRole = (id) => async (dispatch) => {
  try {
    dispatch({ type: types.DELETE_USER_ROLE_ATTEMPT });
    const res = await request({
      method: 'POST',
      auth: true,
      url: `${process.env.REACT_APP_API_URL}/users/delete-user-role`,
      data: { id }
    });

    toast.success('User Role Deleted Successsully', {
      position: 'top-center',
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      draggable: true,
      progress: undefined
    });
    dispatch({ type: types.DELETE_USER_ROLE_SUCCESS, payload: {} });
    setTimeout(() => {
      window.location.href = '/dashboard/user-role';
    }, 1000);
  } catch (err) {
    dispatch({ type: types.DELETE_USER_ROLE_FAIL, payload: err });
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
