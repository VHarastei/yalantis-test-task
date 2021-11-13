import { getCurrentMonth } from './getCurrentMonth';

export const getBirthdate = (strDate: string): string => {
  const date = new Date(strDate);
  const [, day, year] = date.toLocaleDateString('en-US').split('/');
  return `${day} ${getCurrentMonth(date)}, ${year} year`;
};
