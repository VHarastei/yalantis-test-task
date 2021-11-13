import { getCurrentMonth } from './getCurrentMonth';

export const getMonths = (): string[] => {
  const date = new Date();
  const months = [];
  for (let i = 0; i < 12; i++) {
    months.push(getCurrentMonth(date));
    date.setMonth(date.getMonth() + 1);
  }
  return months;
};
