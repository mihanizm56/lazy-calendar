export const PERIODS: Record<PeriodType, PeriodType> = {
  month: 'month',
  week: 'week',
  'two-weeks': 'two-weeks',
};

export type PeriodType = 'month' | 'week' | 'two-weeks';

export const PLACEHOLDER_SINGLE = '__.__.__';
export const PLACEHOLDER_INTERVAL = '__.__.__ - __.__.__';
