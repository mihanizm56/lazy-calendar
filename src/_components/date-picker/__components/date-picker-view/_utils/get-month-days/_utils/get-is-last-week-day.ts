type ParamsType = {
  numberOfDaysInMonth: number;
  dayIndex: number;
};

export const getIsLastWeekDay = ({
  numberOfDaysInMonth,
  dayIndex,
}: ParamsType) => {
  // february
  if (numberOfDaysInMonth === 28) {
    return dayIndex > 20;
  }

  // over six weeks
  if (numberOfDaysInMonth > 35) {
    return dayIndex > 34;
  }

  // regular
  return dayIndex > 27;
};
