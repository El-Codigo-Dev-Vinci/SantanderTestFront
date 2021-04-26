import { DateTime, Duration } from 'luxon';

export const dateFormatter = (date) => {
  let dur = Duration.fromObject({ hour: 3 });
  return DateTime.fromISO(date).plus(dur).setLocale('es').toFormat('DDD');
};

export const hourFormatter = (date) => {
  return DateTime.fromISO(date).setLocale('es').toFormat('T');
};
