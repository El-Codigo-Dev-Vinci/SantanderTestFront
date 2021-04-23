import axios from 'axios';
import { useRecoilValue } from 'recoil';
import { userState } from '../state/user';

const makeApi = (user, token) =>
  axios.create({
    baseURL: process.env.REACT_APP_API_URL,
    ...makeOptions(user, token),
  });

const makeOptions = (user, token) => {
  const authToken = token || user?.token;
  return authToken
    ? {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      }
    : {};
};

export const getData = async (path, user) => {
  const { data } = await makeApi(user).get(path);
  return data;
};

export function useApi(path, token = null) {
  const user = useRecoilValue(userState);
  const api = makeApi(user, token);

  return {
    create: async (entity) => {
      const { data } = await api.post(path, entity);
      return data;
    },
    update: async (entity) => {
      const { data } = await api.put(`${path}/${entity.id}`, entity);
      return data;
    },
    deleteById: async (id) => {
      const { data } = await api.delete(`${path}/${id}`);
      return data;
    },
  };
}
