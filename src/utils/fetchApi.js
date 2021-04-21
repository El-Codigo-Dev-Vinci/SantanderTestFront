import axios from 'axios';

export function axiosPost(url, entity) {
  return axios.post(`${process.env.REACT_APP_API_URL}/${url}`, entity);
}
