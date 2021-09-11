type ParamsType = {
  firstDateInPeriod?: Date | null;
  lastDateInPeriod?: Date | null;
  dateOfThisDay: Date;
  isFirstSelectedDay: boolean;
  isLastSelectedDay: boolean;
};

export const getIsSelectedDate = ({
  firstDateInPeriod,
  lastDateInPeriod,
  dateOfThisDay,
  isFirstSelectedDay,
  isLastSelectedDay,
}: ParamsType) => {
  return Boolean(
    (firstDateInPeriod &&
      lastDateInPeriod &&
      Date.parse(dateOfThisDay.toUTCString()) >=
        Date.parse(firstDateInPeriod.toUTCString()) &&
      Date.parse(dateOfThisDay.toUTCString()) <=
        Date.parse(lastDateInPeriod.toUTCString())) ||
      isFirstSelectedDay ||
      isLastSelectedDay,
  );
};
