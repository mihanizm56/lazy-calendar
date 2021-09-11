import React, { memo, RefObject, useEffect, useMemo } from 'react';
import classnames from 'classnames/bind';
import { CSSTransition } from 'react-transition-group';
import { Modal } from '@wildberries/ui-kit';
import {
  DatePickerTranslationConfig,
  ExtraPatternType,
  IGetCustomInlineDayStyle,
  RegisterFirstMonthDayParamsType,
} from '@/_types';
import { Calendar } from './_components/calendar/calendar';
import { DatePickerMenu } from './_components/date-picker-menu/date-picker-menu';
import { getMonthsInYear } from './_utils/get-months-in-year';
import { DateInput } from './_components/date-input/date-input';
import styles from './date-picker-view.module.scss';

const cn = classnames.bind(styles);
const BLOCK_NAME = 'DatePickerView';

const ANIMATION_SHOW_TIME = 100;

type PropsType = {
  startDate: Date | null;
  endDate: Date | null;
  isCalendarOpened: boolean;
  year: number;
  handleResetDates: () => void;
  handleSetFirstDate: (date: Date | null) => void;
  handleSetLastDate: (date: Date | null) => void;
  handleSetDates: () => void;
  onToggleCalendar: () => void;
  containerRef: RefObject<HTMLDivElement>;
  disabled?: boolean;
  handleDayClick: (date: Date) => void;
  isInterval?: boolean;
  translationConfig: DatePickerTranslationConfig;
  isMobile: boolean;
  isFullWidth?: boolean;
  id: string;
  name: string;
  withIntervalInputs?: boolean;
  dateUpLimit?: Date;
  dateDownLimit?: Date;
  onDecreaseYear: () => void;
  onIncreaseYear: () => void;
  locale?: string;
  intervalPatterns?: Array<ExtraPatternType>;
  onSetPeriod: (params: { startDate: Date; endDate: Date }) => void;
  getCustomInlineDayStyle?: IGetCustomInlineDayStyle;
};

export const DatePickerView = memo(
  ({
    endDate,
    isCalendarOpened,
    handleResetDates,
    handleSetFirstDate,
    handleSetLastDate,
    handleSetDates,
    onToggleCalendar,
    containerRef,
    disabled,
    year,
    startDate,
    handleDayClick,
    isInterval,
    translationConfig,
    isMobile,
    isFullWidth,
    id,
    name,
    withIntervalInputs,
    dateUpLimit,
    dateDownLimit,
    onDecreaseYear,
    onIncreaseYear,
    locale = 'ru',
    intervalPatterns,
    onSetPeriod,
    getCustomInlineDayStyle,
  }: PropsType) => {
    const decreaseYearButtonDisabled = useMemo(
      () => (dateDownLimit ? dateDownLimit.getFullYear() === year : false),
      [dateDownLimit, year],
    );
    const increaseYearButtonDisabled = useMemo(
      () => (dateUpLimit ? dateUpLimit.getFullYear() === year : false),
      [dateUpLimit, year],
    );

    const monthsInYear = useMemo(
      () =>
        getMonthsInYear({
          currentYear: year,
          firstDateInPeriod: startDate,
          lastDateInPeriod: endDate,
          months: translationConfig.monthsLabels,
          currentMonth: new Date().getMonth(),
          dateUpLimit,
          dateDownLimit,
          getCustomInlineDayStyle,
        }),
      [
        dateDownLimit,
        dateUpLimit,
        endDate,
        getCustomInlineDayStyle,
        startDate,
        translationConfig.monthsLabels,
        year,
      ],
    );

    useEffect(() => {
      if (containerRef.current) {
        containerRef.current.style.setProperty(
          '--calendar-animation-duration',
          `${ANIMATION_SHOW_TIME}ms`,
        );
      }
    }, []); // eslint-disable-line react-hooks/exhaustive-deps

    return (
      <div ref={containerRef} className={cn(BLOCK_NAME)}>
        <DateInput
          disabled={disabled}
          endDate={endDate}
          id={id}
          isCalendarOpened={isCalendarOpened}
          isFullWidth={isFullWidth}
          isInterval={isInterval}
          locale={locale}
          name={name}
          onToggleCalendar={onToggleCalendar}
          startDate={startDate}
        />

        {isMobile ? (
          <Modal
            isOpened={isCalendarOpened}
            noPadding
            onClose={onToggleCalendar}
          >
            <div className={cn(`${BLOCK_NAME}__calendar`)}>
              <Calendar
                decreaseButtonDisabled={decreaseYearButtonDisabled}
                handleDayClick={handleDayClick}
                increaseButtonDisabled={increaseYearButtonDisabled}
                monthsInYear={monthsInYear}
                onCloseCalendar={onToggleCalendar}
                onDecreaseYear={onDecreaseYear}
                onIncreaseYear={onIncreaseYear}
                weekDaysLabels={translationConfig.weekDaysLabels}
                year={year}
              />

              {isInterval && (
                <DatePickerMenu
                  dateDownLimit={dateDownLimit}
                  dateUpLimit={dateUpLimit}
                  endDate={endDate}
                  handleResetDates={handleResetDates}
                  intervalPatterns={intervalPatterns}
                  locale={locale}
                  onSetDates={handleSetDates}
                  onSetFirstDate={handleSetFirstDate}
                  onSetLastDate={handleSetLastDate}
                  onSetPeriod={onSetPeriod}
                  startDate={startDate}
                  translationConfig={translationConfig}
                  withIntervalInputs={withIntervalInputs}
                />
              )}
            </div>
          </Modal>
        ) : (
          <CSSTransition
            classNames={{
              enter: cn(`${BLOCK_NAME}__calendar--enter`),
              exit: cn(`${BLOCK_NAME}__calendar--exit`),
            }}
            data-name="Overlay"
            in={isCalendarOpened}
            timeout={ANIMATION_SHOW_TIME}
            unmountOnExit
          >
            <div className={cn(`${BLOCK_NAME}__calendar`)}>
              <Calendar
                decreaseButtonDisabled={decreaseYearButtonDisabled}
                handleDayClick={handleDayClick}
                increaseButtonDisabled={increaseYearButtonDisabled}
                monthsInYear={monthsInYear}
                onCloseCalendar={onToggleCalendar}
                onDecreaseYear={onDecreaseYear}
                onIncreaseYear={onIncreaseYear}
                weekDaysLabels={translationConfig.weekDaysLabels}
                year={year}
              />

              {isInterval && (
                <DatePickerMenu
                  dateDownLimit={dateDownLimit}
                  dateUpLimit={dateUpLimit}
                  endDate={endDate}
                  handleResetDates={handleResetDates}
                  intervalPatterns={intervalPatterns}
                  locale={locale}
                  onSetDates={handleSetDates}
                  onSetFirstDate={handleSetFirstDate}
                  onSetLastDate={handleSetLastDate}
                  onSetPeriod={onSetPeriod}
                  startDate={startDate}
                  translationConfig={translationConfig}
                  withIntervalInputs={withIntervalInputs}
                />
              )}
            </div>
          </CSSTransition>
        )}
      </div>
    );
  },
);
