/* eslint-disable react/no-array-index-key */
import React, { memo } from 'react';
import classnames from 'classnames/bind';
import { Text } from '@wildberries/ui-kit';
import styles from './week-days-header-list.module.scss';

const cn = classnames.bind(styles);
const BLOCK_NAME = 'WeekDaysHeaderList';

type PropsType = {
  weekDaysLabels: Array<string>;
};

export const WeekDaysHeaderList = memo(({ weekDaysLabels }: PropsType) => {
  return (
    <>
      {weekDaysLabels.map((dayLabel: string, index: number) => {
        const textColor = index < 5 ? 'black' : 'red';

        return (
          <div key={index} className={cn(`${BLOCK_NAME}__weekday`)}>
            <Text color={textColor} size="h4" text={dayLabel} />
          </div>
        );
      })}
    </>
  );
});
