export const getBirthdate = (strDate: string): string => {
  const date = new Date(strDate);
  const [month, day, year] = date.toLocaleDateString('en-US').split('/');
  return `${day} ${date.toLocaleString('en', { month: 'long' })}, ${year} year`;
};
