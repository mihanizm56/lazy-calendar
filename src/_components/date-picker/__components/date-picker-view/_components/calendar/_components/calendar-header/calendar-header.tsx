import React, { memo, useCallback } from 'react';
import classnames from 'classnames/bind';
import {
  ButtonLink,
  ArrowsArrowLeftIcon,
  ArrowsArrowRightIcon,
  Text,
  BasicClearIcon,
} from '@wildberries/ui-kit';
import styles from './calendar-header.module.scss';

const cn = classnames.bind(styles);
const BLOCK_NAME = 'CalendarHeader';

type PropsType = {
  year: number;
  onCloseCalendar: () => void;
  onDecreaseYear: () => void;
  onIncreaseYear: () => void;
  increaseButtonDisabled: boolean;
  decreaseButtonDisabled: boolean;
};

export const CalendarHeader = memo(
  ({
    year,
    onCloseCalendar,
    onDecreaseYear,
    onIncreaseYear,
    increaseButtonDisabled,
    decreaseButtonDisabled,
  }: PropsType) => {
    const ArrowLeftIcon = useCallback(
      () => <ArrowsArrowLeftIcon size="S" />,
      [],
    );
    const ArrowRightIcon = useCallback(
      () => <ArrowsArrowRightIcon size="S" />,
      [],
    );
    const CloseIcon = useCallback(() => <BasicClearIcon size="M" />, []);

    return (
      <div className={cn(BLOCK_NAME)}>
        <ButtonLink
          disabled={decreaseButtonDisabled}
          onClick={onDecreaseYear}
          size="small"
          type="button"
          variant="only-icon"
        >
          {ArrowLeftIcon}
        </ButtonLink>

        <span className={cn(`${BLOCK_NAME}__title`)}>
          <Text color="black" size="h4-bold" text={`${year}`} />
        </span>

        <ButtonLink
          disabled={increaseButtonDisabled}
          onClick={onIncreaseYear}
          size="small"
          type="button"
          variant="only-icon"
        >
          {ArrowRightIcon}
        </ButtonLink>

        <div className={cn(`${BLOCK_NAME}__mobile-close-button`)}>
          <ButtonLink
            onClick={onCloseCalendar}
            size="small"
            type="button"
            variant="only-icon"
          >
            {CloseIcon}
          </ButtonLink>
        </div>
      </div>
    );
  },
);
