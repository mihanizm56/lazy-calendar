import { DaysInMonthsType, IGetCustomInlineDayStyle } from '@/_types';
import { getIsLastWeekDay } from './get-is-last-week-day';
import { getIsSelectedDate } from './get-is-selected-date';

type ParamsType = {
  year: number;
  month: number;
  firstDateInPeriod: Date | null;
  lastDateInPeriod: Date | null;
  dateUpLimit?: Date;
  dateDownLimit?: Date;
  date: Date;
  firstDayInMonth: number;
  getCustomInlineDayStyle?: IGetCustomInlineDayStyle;
};

export const getRealDays = ({
  date,
  firstDayInMonth,
  year,
  month,
  dateUpLimit,
  dateDownLimit,
  firstDateInPeriod,
  lastDateInPeriod,
  getCustomInlineDayStyle,
}: ParamsType) => {
  const clonedDate = new Date(date);
  const resultDaysArray: Array<DaysInMonthsType> = [];

  const numberOfDaysInMonth = new Date(year, month + 1, 0).getDate();

  for (let i = firstDayInMonth; clonedDate.getMonth() === month; i += 1) {
    const dayNumber = clonedDate.getDate();
    const dateOfThisDay = new Date(year, month, dayNumber);
    const isDisabled =
      (dateUpLimit && dateOfThisDay > dateUpLimit) ||
      (dateDownLimit && dateOfThisDay < dateDownLimit);

    const isFirstSelectedDay = Boolean(
      firstDateInPeriod &&
        firstDateInPeriod.toISOString() === dateOfThisDay.toISOString(),
    );
    const isLastSelectedDay = Boolean(
      lastDateInPeriod &&
        lastDateInPeriod.toISOString() === dateOfThisDay.toISOString(),
    );

    const isSelectedDate = getIsSelectedDate({
      firstDateInPeriod,
      lastDateInPeriod,
      dateOfThisDay,
      isFirstSelectedDay,
      isLastSelectedDay,
    });

    const isLastWeekDay = getIsLastWeekDay({
      numberOfDaysInMonth: numberOfDaysInMonth + firstDayInMonth,
      dayIndex: i,
    });

    const baseDayParams: DaysInMonthsType = {
      isSelectedDate,
      isFirstDayInMonth: i === firstDayInMonth,
      dayNumber,
      dateOfThisDay,
      // 7 is monday
      // 6 is sunday
      isFirstWeekDay: i < 7,
      isDisabled,
      isLastDayInWeek: i % 7 === 6,
      isFirstDayInWeek: i % 7 === 0,
      isFirstSelectedDay,
      isLastSelectedDay,
      isLastWeekDay,
    };

    resultDaysArray.push({
      ...baseDayParams,
      inlineStyles: getCustomInlineDayStyle
        ? getCustomInlineDayStyle(baseDayParams)
        : {},
    });

    clonedDate.setDate(dayNumber + 1);
  }

  resultDaysArray[resultDaysArray.length - 1].isLastDayInMonth = true;

  return resultDaysArray;
};

// get nuimber of days in month
