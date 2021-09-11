export const getFirstDayInMonth = (date: Date): number => {
  const day = date.getDay();

  return day === 0 ? 6 : day - 1;
};
