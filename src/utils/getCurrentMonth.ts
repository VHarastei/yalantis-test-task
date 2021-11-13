export const getCurrentMonth = (date: Date) =>
  date.toLocaleString('en', { month: 'long' });
