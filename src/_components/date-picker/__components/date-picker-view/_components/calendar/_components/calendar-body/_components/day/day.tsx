/* eslint-disable react/forbid-dom-props */
import React, { memo, useCallback, useMemo, useEffect, useRef } from 'react';
import classnames from 'classnames/bind';
import { Text } from '@wildberries/ui-kit';
import { DaysInMonthsType, RegisterFirstMonthDayParamsType } from '@/_types';
import styles from './day.module.scss';

const cn = classnames.bind(styles);
const BLOCK_NAME = 'Day';

type PropsType = {
  handleDayClick: (date: Date) => void;
  dayParams: DaysInMonthsType;
};

export const Day = memo(
  ({
    dayParams: {
      isEmpty,
      dayNumber,
      dateOfThisDay,
      isFirstDayInMonth,
      isLastDayInMonth,
      isSelectedDate,
      isFirstSelectedDay,
      inlineStyles,
      isDisabled,
      isFirstWeekDay,
      isLastDayInWeek,
      isFirstDayInWeek,
      isLastWeekDay,
    },
    handleDayClick,
  }: PropsType) => {
    const buttonRef = useRef<HTMLButtonElement | null>(null);

    useEffect(() => {
      if (isFirstSelectedDay && buttonRef.current) {
        buttonRef.current.scrollIntoView({ block: 'center' });
      }
    }, []); // eslint-disable-line react-hooks/exhaustive-deps

    const dayFormattedNumber = useMemo(
      () => (dayNumber ? `${dayNumber}` : ''),
      [dayNumber],
    );

    const handleClick = useCallback(() => {
      if (!isEmpty && dateOfThisDay) {
        handleDayClick(dateOfThisDay);
      }
    }, [dateOfThisDay, handleDayClick, isEmpty]);

    return (
      <button
        ref={buttonRef}
        className={cn(BLOCK_NAME, {
          [`${BLOCK_NAME}--is-empty`]: isEmpty,
          [`${BLOCK_NAME}--is-first`]: isFirstDayInMonth,
          [`${BLOCK_NAME}--is-last`]: isLastDayInMonth,
          [`${BLOCK_NAME}--is-selected`]: isSelectedDate,
          [`${BLOCK_NAME}--disabled`]: isDisabled,
          [`${BLOCK_NAME}--border-right-top`]:
            isLastDayInWeek && isFirstWeekDay,
          [`${BLOCK_NAME}--border-left-bottom`]:
            isLastWeekDay && isFirstDayInWeek,
          [`${BLOCK_NAME}--border-left-top`]:
            isFirstWeekDay && isFirstDayInWeek,
          [`${BLOCK_NAME}--border-right-bottom`]:
            isLastWeekDay && isLastDayInWeek,
        })}
        disabled={isDisabled}
        onClick={handleClick}
        style={inlineStyles}
        type="button"
      >
        <Text color="black" size="h4" text={dayFormattedNumber} />
      </button>
    );
  },
);
