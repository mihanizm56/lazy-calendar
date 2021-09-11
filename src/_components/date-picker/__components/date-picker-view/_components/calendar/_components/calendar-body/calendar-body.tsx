/* eslint-disable react/forbid-dom-props */
/* eslint-disable react/no-array-index-key */
import React, { memo } from 'react';
import classnames from 'classnames/bind';
import { Text } from '@wildberries/ui-kit';
import {
  AutoSizer,
  CellMeasurer,
  CellMeasurerCache,
  List,
} from 'react-virtualized';
import { MonthsInYearType, DaysInMonthsType } from '@/_types';
import { WeekDaysHeaderList } from './_components/week-days-header-list/week-days-header-list';
import { Day } from './_components/day/day';
import styles from './calendar-body.module.scss';

const cn = classnames.bind(styles);
const BLOCK_NAME = 'CalendarBody';

type PropsType = {
  monthsInYear: Array<MonthsInYearType>;
  handleDayClick: (date: Date) => void;
  weekDaysLabels: Array<string>;
  getCustomInlineDayStyle?: (
    params: DaysInMonthsType,
  ) => Record<string, string>;
};

const cache = new CellMeasurerCache({
  fixedWidth: true,
  defaultHeight: 300,
  defaultWidth: 320,
});

export const CalendarBody = memo(
  ({ monthsInYear, handleDayClick, weekDaysLabels }: PropsType) => {
    return (
      <div className={cn(BLOCK_NAME)}>
        <AutoSizer>
          {({ width, height }) => {
            return (
              <List
                // ref={listRef}
                deferredMeasurementCache={cache}
                height={height}
                // onRowsRendered={onScroll}
                rowCount={monthsInYear.length}
                rowHeight={cache.rowHeight}
                rowRenderer={({ key, index, style: libStyle, parent }) => {
                  const { monthName, monthDays } = monthsInYear[index];

                  return (
                    <CellMeasurer
                      key={key}
                      cache={cache}
                      columnIndex={0}
                      parent={parent}
                      rowIndex={index}
                    >
                      {({ registerChild }) => {
                        return (
                          <div
                            // because of lib's ref type
                            // eslint-disable-next-line
                            // @ts-ignore
                            ref={registerChild}
                            key={key}
                            className={cn(`${BLOCK_NAME}__month`)}
                            style={{ ...libStyle }}
                          >
                            <div className={cn(`${BLOCK_NAME}__month-name`)}>
                              <Text color="black" size="h4" text={monthName} />
                            </div>

                            <div className={cn(`${BLOCK_NAME}__days`)}>
                              <WeekDaysHeaderList
                                weekDaysLabels={weekDaysLabels}
                              />

                              {monthDays.map(
                                (dayParams: DaysInMonthsType, dayIndex) => (
                                  <Day
                                    key={`${monthName}${dayParams.dayNumber}_${dayIndex}`}
                                    dayParams={dayParams}
                                    handleDayClick={handleDayClick}
                                  />
                                ),
                              )}
                            </div>
                          </div>
                        );
                      }}
                    </CellMeasurer>
                  );
                }}
                width={width}
              />
            );
          }}
        </AutoSizer>
      </div>
    );
  },
);

// {monthsInYear.map(({ monthName, monthDays }, monthIndex) => {
//   return (
//     <div
//       key={`${monthIndex}_monthName`}
//       className={cn(`${BLOCK_NAME}__month`)}
//     >
//       <div className={cn(`${BLOCK_NAME}__month-name`)}>
//         <Text color="black" size="h4" text={monthName} />
//       </div>

//       <div className={cn(`${BLOCK_NAME}__days`)}>
//         <WeekDaysHeaderList weekDaysLabels={weekDaysLabels} />

//         {monthDays.map((dayParams: DaysInMonthsType, dayIndex) => (
//           <Day
//             key={`${monthName}${dayParams.dayNumber}_${dayIndex}`}
//             dayParams={dayParams}
//             handleDayClick={handleDayClick}
//             registerFirstMonthDayRef={registerFirstMonthDayRef}
//           />
//         ))}
//       </div>
//     </div>
//   );
// })}
