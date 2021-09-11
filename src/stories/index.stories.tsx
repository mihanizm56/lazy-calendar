/* eslint-disable react/forbid-dom-props */
/* eslint-disable no-console */
import React from 'react';
import { storiesOf } from '@storybook/react';
import { boolean, text } from '@storybook/addon-knobs';
import { DatePicker } from '@/_components/date-picker';
import {
  ExtraPatternType,
  IGetCustomInlineDayStyle,
  OnDatePickedChangeParamsType,
} from '@/_types';

export const WEEK_DAYS = ['ПН', 'ВТ', 'СР', 'ЧТ', 'ПТ', 'СБ', 'ВС'];

export const MONTHS = [
  'Январь',
  'Февраль',
  'Март',
  'Апрель',
  'Май',
  'Июнь',
  'Июль',
  'Август',
  'Сентябрь',
  'Октябрь',
  'Ноябрь',
  'Декабрь',
];

const INTERVAL_PATTERNS: Array<ExtraPatternType> = [
  {
    text: 'week up',
    variant: 'main',
    datesSetter: () => ({
      startDate: new Date(),
      endDate: new Date(new Date().setDate(new Date().getDate() + 6)),
    }),
  },
  {
    text: 'two weeks down',
    datesSetter: () => ({
      startDate: new Date(new Date().setDate(new Date().getDate() - 13)),
      endDate: new Date(),
    }),
  },
];

const StoriesContainer = ({ children }: any) => {
  const handleChange = (params: OnDatePickedChangeParamsType) => {
    console.log('handleChange', params);
  };

  return children({ onChange: handleChange });
};

const colorDayFunction: IGetCustomInlineDayStyle = ({ isFirstDayInMonth }) => {
  return isFirstDayInMonth
    ? {
        backgroundColor: 'red',
      }
    : {};
};

storiesOf('Inputs', module)
  .addParameters({
    component: DatePicker,
    componentSubtitle: 'Компонент для выбора дат',
  })
  .add('DatePicker', () => (
    <StoriesContainer>
      {({ onChange }: any) => (
        <div style={{ maxWidth: '300px' }}>
          <DatePicker
            // dateDownLimit={new Date(date('dateDownLimit'))}
            dateUpLimit={new Date()}
            disabled={boolean('disabled', false)}
            getCustomInlineDayStyle={
              boolean('getCustomInlineDayStyle', false)
                ? colorDayFunction
                : undefined
            }
            id="test"
            intervalPatterns={
              boolean('intervalPatterns', false) ? INTERVAL_PATTERNS : undefined
            }
            isFullWidth={boolean('isFullWidth', false)}
            isInterval={boolean('isInterval', true)}
            locale={text('locale', 'ru')}
            name="test"
            onChange={onChange}
            translationConfig={{
              weekDaysLabels: WEEK_DAYS,
              weekFilterButtonText: text('weekFilterButtonText', 'weekFilter'),
              twoWeekFilterButtonText: text(
                'twoWeekFilterButtonText',
                'twoWeekFilter',
              ),
              monthFilterButtonText: text(
                'monthFilterButtonText',
                'monthFilter',
              ),
              startPeriodLabelText: text('startPeriodLabelText', 'startPeriod'),
              endPeriodLabelText: text('endPeriodLabelText', 'endPeriodLabel'),
              resetButtonText: text('resetIntervalButtonText', 'reset'),
              saveButtonText: text('saveIntervalButtonText', 'save'),
              monthsLabels: MONTHS,
              errorText: {
                notCorrect: 'Некорректная дата',
                tooBig: 'Дата слишком большая',
                tooSmall: 'Дата слишком маленькая',
              },
            }}
            withIntervalInputs={boolean('withIntervalInputs', true)}
          />
        </div>
      )}
    </StoriesContainer>
  ));
