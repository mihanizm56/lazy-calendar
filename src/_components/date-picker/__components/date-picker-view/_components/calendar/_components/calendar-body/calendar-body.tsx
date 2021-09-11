/* eslint-disable react/no-array-index-key */
import React, { memo } from 'react';
import classnames from 'classnames/bind';
import { Text } from '@wildberries/ui-kit';
import {
  MonthsInYearType,
  DaysInMonthsType,
  RegisterFirstMonthDayParamsType,
} from '@/_types';
import { WeekDaysHeaderList } from './_components/week-days-header-list/week-days-header-list';
import { Day } from './_components/day/day';
import styles from './calendar-body.module.scss';

const cn = classnames.bind(styles);
const BLOCK_NAME = 'CalendarBody';

type PropsType = {
  monthsInYear: Array<MonthsInYearType>;
  handleDayClick: (date: Date) => void;
  weekDaysLabels: Array<string>;
  registerFirstMonthDayRef: (params: RegisterFirstMonthDayParamsType) => void;
  getCustomInlineDayStyle?: (
    params: DaysInMonthsType,
  ) => Record<string, string>;
};

export const CalendarBody = memo(
  ({
    monthsInYear,
    handleDayClick,
    weekDaysLabels,
    registerFirstMonthDayRef,
  }: PropsType) => {
    return (
      <div className={cn(BLOCK_NAME)}>
        {monthsInYear.map(({ monthName, monthDays }, monthIndex) => {
          return (
            <div
              key={`${monthIndex}_monthName`}
              className={cn(`${BLOCK_NAME}__month`)}
            >
              <div className={cn(`${BLOCK_NAME}__month-name`)}>
                <Text color="black" size="h4" text={monthName} />
              </div>

              <div className={cn(`${BLOCK_NAME}__days`)}>
                <WeekDaysHeaderList weekDaysLabels={weekDaysLabels} />

                {monthDays.map((dayParams: DaysInMonthsType, dayIndex) => (
                  <Day
                    key={`${monthName}${dayParams.dayNumber}_${dayIndex}`}
                    dayParams={dayParams}
                    handleDayClick={handleDayClick}
                    registerFirstMonthDayRef={registerFirstMonthDayRef}
                  />
                ))}
              </div>
            </div>
          );
        })}
      </div>
    );
  },
);
