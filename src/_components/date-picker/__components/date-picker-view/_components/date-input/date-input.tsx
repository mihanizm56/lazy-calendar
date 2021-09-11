import React, { memo, useCallback, useMemo } from 'react';
import classnames from 'classnames/bind';
import { SimpleInput, TimeCalendarDatesIcon } from '@wildberries/ui-kit';
import { PLACEHOLDER_INTERVAL, PLACEHOLDER_SINGLE } from '@/_constants';
import { inputValueFormatter } from './_utils/input-value-formatter';
import styles from './date-input.module.scss';

const cn = classnames.bind(styles);
const BLOCK_NAME = 'Date-input';

type PropsType = {
  startDate: Date | null;
  endDate: Date | null;
  onToggleCalendar: () => void;
  disabled?: boolean;
  isInterval?: boolean;
  isFullWidth?: boolean;
  id: string;
  name: string;
  locale: string;
  isCalendarOpened: boolean;
};

export const DateInput = memo(
  ({
    startDate,
    endDate,
    onToggleCalendar,
    disabled,
    isInterval,
    isFullWidth,
    id,
    name,
    locale,
    isCalendarOpened,
  }: PropsType) => {
    const inputValue = useMemo(
      () => inputValueFormatter({ endDate, startDate, isInterval, locale }),
      [endDate, isInterval, locale, startDate],
    );

    const inputPlaceholder = useMemo(
      () => (isInterval ? PLACEHOLDER_INTERVAL : PLACEHOLDER_SINGLE),
      [isInterval],
    );

    const handleToggleCalendar = useCallback(() => {
      if (!disabled) {
        onToggleCalendar();
      }
    }, [disabled, onToggleCalendar]);

    const iconColor = useMemo(
      () => (isCalendarOpened ? 'purpleColor' : 'greyColor'),
      [isCalendarOpened],
    );

    return (
      <div
        className={cn(BLOCK_NAME, {
          [`${BLOCK_NAME}--interval`]: isInterval,
          [`${BLOCK_NAME}--full-width`]: isFullWidth,
        })}
      >
        <SimpleInput
          autoComplete="off"
          disabled={disabled}
          id={id}
          name={name}
          placeholder={inputPlaceholder}
          type="text"
          value={inputValue}
        />

        <button
          className={cn(`${BLOCK_NAME}__icon-button`)}
          onClick={handleToggleCalendar}
          type="button"
        >
          <div className={cn(`${BLOCK_NAME}__icon`)}>
            <TimeCalendarDatesIcon colorType={iconColor} />
          </div>
        </button>
      </div>
    );
  },
);
