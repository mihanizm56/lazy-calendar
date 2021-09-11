type ParamsType = {
  startDate: Date | null;
  endDate: Date | null;
  isInterval?: boolean;
  locale: string;
};

export const inputValueFormatter = ({
  startDate,
  endDate,
  isInterval,
  locale,
}: ParamsType): string => {
  if (!startDate) {
    return '';
  }

  if (endDate && isInterval) {
    const start = new Intl.DateTimeFormat(locale).format(
      new Date(startDate.toString()),
    );
    const end = new Intl.DateTimeFormat(locale).format(
      new Date(endDate.toString()),
    );

    return `${start} — ${end}`;
  }

  return new Intl.DateTimeFormat(locale).format(new Date(startDate.toString()));
};
