export const getDateMask = (locale: string): RegExp => {
  const dateFormat = new Intl.DateTimeFormat(locale).format(new Date());

  const result = dateFormat.replace(/./g, match => {
    if (/\d/.test(match)) {
      return '\\d';
    }

    return match;
  });

  return new RegExp(result);
};
