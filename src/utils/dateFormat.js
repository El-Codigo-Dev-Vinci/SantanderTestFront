import { DateTime } from 'luxon';

export const dateFormatter = (date) => {
  return DateTime.fromISO(date).setLocale('es').toFormat('D');
};

export const hourFormatter = (date) => {
  return DateTime.fromISO(date).setLocale('es').toFormat('T');
};
