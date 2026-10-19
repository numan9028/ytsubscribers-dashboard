import axios from 'axios';
axios.defaults.withCredentials = true;

export async function request({ url, method, data }) {
  try {
    return await axios({
      method,
      url,
      data,
    });
  } catch (err) {
    if (
      err &&
      err.response &&
      err.response.data &&
      err.response.data.error &&
      err.response.status === 401
    ) {
      console.log(err.response.data.error);
    }
    throw err;
  }
}

// export async function API(url, method, data,) {

// }