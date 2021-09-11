import { ButtonVariant } from '@wildberries/ui-kit/lib/button-link/types';
import { CSSProperties, RefObject } from 'react';

export type DaysInMonthsType = {
  dateOfThisDay?: Date;
  dayNumber?: number;
  isEmpty?: boolean;
  isFirstDayInMonth?: boolean;
  isLastDayInMonth?: boolean;
  isFirstWeekDay?: boolean;
  isFirstDayInWeek?: boolean;
  isLastDayInWeek?: boolean;
  isLastWeekDay?: boolean;
  isSelectedDate?: boolean;
  isFirstSelectedDay?: boolean;
  isLastSelectedDay?: boolean;
  isEmptyLast?: boolean;
  inlineStyles?: CSSProperties;
  isDisabled?: boolean;
};

export type MonthsInYearType = {
  monthDays: Array<DaysInMonthsType>;
  monthName: string;
  isCurrentMonth?: boolean;
};

export type OnDatePickedChangeParamsType = {
  startDate: Date | null;
  endDate: Date | null;
};

export type DatePickerTranslationConfig = {
  weekDaysLabels: Array<string>;
  monthsLabels: Array<string>;
  weekFilterButtonText?: string;
  twoWeekFilterButtonText?: string;
  monthFilterButtonText?: string;
  startPeriodLabelText: string;
  endPeriodLabelText: string;
  resetButtonText: string;
  saveButtonText: string;
  errorText: {
    notCorrect: string;
    tooBig: string;
    tooSmall: string;
  };
};

export type RegisterFirstMonthDayParamsType = {
  month: number;
  ref: RefObject<HTMLButtonElement> | null;
};

export type ExtraPatternType = {
  datesSetter: () => { startDate: Date; endDate: Date };
  variant?: ButtonVariant;
  text: string;
};

export interface IGetCustomInlineDayStyle {
  (params: DaysInMonthsType): CSSProperties;
}
