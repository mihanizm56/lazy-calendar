import React, { memo, useCallback } from 'react';
import { ButtonLink } from '@wildberries/ui-kit';
import { ExtraPatternType } from '@/_types';

type PropsType = ExtraPatternType & {
  onSetPeriod: (params: { startDate: Date; endDate: Date }) => void;
};

export const PatternButton = memo(
  ({ text, variant = 'interface', datesSetter, onSetPeriod }: PropsType) => {
    const handleClick = useCallback(() => {
      const dates = datesSetter();

      onSetPeriod(dates);
    }, [datesSetter, onSetPeriod]);

    return (
      <ButtonLink
        fullWidth
        onClick={handleClick}
        size="small"
        text={text}
        type="button"
        variant={variant}
      />
    );
  },
);
