export const getDateMaskArray = (locale: string): Array<RegExp | string> => {
  const dateFormat = new Intl.DateTimeFormat(locale).format(new Date());

  const result: Array<RegExp | string> = [];

  dateFormat.replace(/./g, match => {
    if (/\d/.test(match)) {
      result.push(/\d/);
    } else {
      result.push(match);
    }

    return match;
  });

  return result;
};
