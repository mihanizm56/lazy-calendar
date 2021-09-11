/* eslint-disable no-undef */
/* eslint-disable @typescript-eslint/ban-ts-ignore */
type ParamsType = {
  dateUpLimit?: Date;
  dateDownLimit?: Date;
  months: Array<string>;
  currentYear: number;
};

export const getLimitedMonths = ({
  dateUpLimit,
  dateDownLimit,
  months,
  currentYear,
}: ParamsType) => {
  const startLimit =
    dateDownLimit && currentYear === dateDownLimit.getFullYear()
      ? dateDownLimit.getMonth()
      : 0;
  const stopLimit =
    dateUpLimit && currentYear === dateUpLimit.getFullYear()
      ? dateUpLimit.getMonth() + 1
      : undefined; // undefined because of slice behaviour

  return months.slice(startLimit, stopLimit);
};
