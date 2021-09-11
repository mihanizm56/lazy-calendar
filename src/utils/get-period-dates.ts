import { PERIODS, PeriodType } from '../_constants';

type ParamsType = {
  period: PeriodType;
  currentDate: Date;
};

type OutputType = {
  startDate: Date;
  finishDate: Date;
};

export const getPeriodDates = ({
  period,
  currentDate,
}: ParamsType): OutputType => {
  const clonedDate = new Date(currentDate);

  switch (period) {
    case PERIODS.month:
      // set month minus one day
      const prevMonth = new Date(
        clonedDate.setMonth(clonedDate.getMonth() - 1),
      );

      return {
        startDate: new Date(prevMonth.setDate(clonedDate.getDate() + 1)),
        finishDate: currentDate,
      };

    // set week minus one day
    case PERIODS.week:
      return {
        startDate: new Date(clonedDate.setDate(clonedDate.getDate() - 6)),
        finishDate: currentDate,
      };

    // set two weeks minus one day
    case PERIODS['two-weeks']:
      return {
        startDate: new Date(clonedDate.setDate(clonedDate.getDate() - 13)),
        finishDate: currentDate,
      };

    default:
      return {
        startDate: currentDate,
        finishDate: currentDate,
      };
  }
};
