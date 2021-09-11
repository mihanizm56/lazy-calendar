import { DaysInMonthsType } from '@/_types';

export const getMockDays = (
  firstDayInMonth: number,
): Array<DaysInMonthsType> => {
  return [...Array(firstDayInMonth)].map((dayNumber: number) => {
    return {
      isEmpty: true,
      isEmptyLast: dayNumber === firstDayInMonth - 1,
    };
  });
};
