import React, { memo } from 'react';
import classnames from 'classnames/bind';
import { MonthsInYearType } from '@/_types';
import { CalendarHeader } from './_components/calendar-header/calendar-header';
import { CalendarBody } from './_components/calendar-body/calendar-body';
import styles from './calendar.module.scss';

const cn = classnames.bind(styles);
const BLOCK_NAME = 'Calendar';

type PropsType = {
  year: number;
  monthsInYear: Array<MonthsInYearType>;
  onCloseCalendar: () => void;
  handleDayClick: (date: Date) => void;
  weekDaysLabels: Array<string>;
  onDecreaseYear: () => void;
  onIncreaseYear: () => void;
  increaseButtonDisabled: boolean;
  decreaseButtonDisabled: boolean;
};

export const Calendar = memo(
  ({
    year,
    monthsInYear,
    onCloseCalendar,
    handleDayClick,
    weekDaysLabels,
    decreaseButtonDisabled,
    increaseButtonDisabled,
    onDecreaseYear,
    onIncreaseYear,
  }: PropsType) => {
    return (
      <div className={cn(BLOCK_NAME)}>
        <div className={cn(`${BLOCK_NAME}__header`)}>
          <CalendarHeader
            decreaseButtonDisabled={decreaseButtonDisabled}
            increaseButtonDisabled={increaseButtonDisabled}
            onCloseCalendar={onCloseCalendar}
            onDecreaseYear={onDecreaseYear}
            onIncreaseYear={onIncreaseYear}
            year={year}
          />
        </div>
        <div className={cn(`${BLOCK_NAME}__body`)}>
          <CalendarBody
            handleDayClick={handleDayClick}
            monthsInYear={monthsInYear}
            weekDaysLabels={weekDaysLabels}
          />
        </div>
      </div>
    );
  },
);
