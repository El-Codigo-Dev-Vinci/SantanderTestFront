import { has } from 'ramda';
import { atom, selector } from 'recoil';
import { localStorageEffect } from './effect';

export function initialUserRoute(user) {
  return '/';
}

export const userState = atom({
  key: 'usuario',
  default: {},
  effects_UNSTABLE: [localStorageEffect('usuario_actual')],
});

export const haveLogUser = selector({
  key: 'haveLogUser',
  get: ({ get }) => has('token', get(userState)),
});
