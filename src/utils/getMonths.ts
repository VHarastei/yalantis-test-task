export const getMonths = (): string[] => {
  const date = new Date();
  const months = [];
  for (let i = 0; i < 12; i++) {
    months.push(date.toLocaleString('en', { month: 'long' }));
    date.setMonth(date.getMonth() + 1);
  }
  return months;
};
