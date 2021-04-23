import { selector, selectorFamily } from 'recoil';
import { counterUpdatesState } from '../state/stateUpdate';
import queryString from 'query-string';
import axios from 'axios';

const apiUrl = process.env.REACT_APP_API_URL;

export const allMeetUps = selector({
  key: 'allMeetUps',
  get: async ({ get }) => {
    const { data } = get(apiIndex({ path: 'meetup' }));
    return data.data;
  },
});

export const apiIndex = selectorFamily({
  key: 'apiIndex',
  get: ({ path, filtro }) => ({ get }) => {
    get(counterUpdatesState(path));
    return getData(buildPath(path, filtro));
  },
});

export const buildPath = (path, filtro = {}) => {
  const query = queryString.stringify(filtro, { skipNull: true });
  return query ? `${path}?${query}` : `${path}`;
};

export const getData = async (path) => {
  return await makeApi().get(path);
};

const makeApi = () =>
  axios.create({
    baseURL: apiUrl,
  });
