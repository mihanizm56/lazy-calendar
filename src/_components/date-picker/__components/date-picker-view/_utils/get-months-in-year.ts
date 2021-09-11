import { IGetCustomInlineDayStyle, MonthsInYearType } from '@/_types';
import { getMonthDays } from './get-month-days/get-month-days';

export type ParamsType = {
  currentYear: number;
  firstDateInPeriod: Date | null;
  lastDateInPeriod: Date | null;
  months: Array<string>;
  currentMonth: number;
  dateUpLimit?: Date;
  dateDownLimit?: Date;
  getCustomInlineDayStyle?: IGetCustomInlineDayStyle;
};

export const getMonthsInYear = ({
  currentYear,
  currentMonth,
  firstDateInPeriod,
  lastDateInPeriod,
  months,
  dateUpLimit,
  dateDownLimit,
  getCustomInlineDayStyle,
}: ParamsType): Array<MonthsInYearType> => {
  return months.map((monthName: string, index: number) => {
    const monthDays = getMonthDays({
      year: currentYear,
      month: index,
      firstDateInPeriod,
      lastDateInPeriod,
      dateUpLimit,
      dateDownLimit,
      getCustomInlineDayStyle,
    });

    return {
      monthDays,
      monthName,
      isCurrentMonth: currentMonth === index,
    };
  });
};
