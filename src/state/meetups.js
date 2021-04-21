import { selector, selectorFamily } from 'recoil';

const apiUrl = process.env.REACT_APP_API_URL;

async function getJsonFromApi(path) {
  const response = await fetch(`${apiUrl}/${path}`);
  return response.json();
}

export const allMeetUps = selector({
  key: 'allMeetUps',
  get: async () => (await getJsonFromApi('meetup')).data,
});

export const meetUpById = selectorFamily({
  key: 'meetUpById',
  get: (id) => async () => (await getJsonFromApi(`meetup/${id}`)).data,
});
