// @ts-nocheck

import { DaysInMonthsType, IGetCustomInlineDayStyle } from '../../../../_types';
import { getFirstDayInMonth } from './_utils/get-first-day-in-month';
import { getMockDays } from './_utils/get-mock-days';
import { getRealDays } from './_utils/get-real-days';

export type ParamsType = {
  year: number;
  month: number;
  firstDateInPeriod: Date | null;
  lastDateInPeriod: Date | null;
  dateUpLimit?: Date;
  dateDownLimit?: Date;
  getCustomInlineDayStyle?: IGetCustomInlineDayStyle;
};

export const getMonthDays = ({
  year,
  month,
  firstDateInPeriod,
  lastDateInPeriod,
  dateUpLimit,
  dateDownLimit,
  getCustomInlineDayStyle,
}: ParamsType): Array<DaysInMonthsType> => {
  const date = new Date(year, month);

  const firstDayInMonth = getFirstDayInMonth(date);

  const mockDays = getMockDays(firstDayInMonth);

  const realDays = getRealDays({
    date,
    firstDayInMonth,
    year,
    month,
    dateUpLimit,
    dateDownLimit,
    firstDateInPeriod,
    lastDateInPeriod,
    getCustomInlineDayStyle,
  });

  return [...mockDays, ...realDays];
};
