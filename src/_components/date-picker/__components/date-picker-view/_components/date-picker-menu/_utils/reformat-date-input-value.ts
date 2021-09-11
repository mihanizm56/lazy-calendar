export const reformatDateInputValue = (value: string): Date => {
  const dateSplitter = value.split(/\d/).find(Boolean) || '.';

  const [day, month, year]: Array<string> = value.split(dateSplitter);

  const formattedDay: string = day && day.length === 1 ? `0${day}` : day;
  const formattedMonth = month && month.length === 1 ? `0${month}` : month;

  // YYYY-MM-DDTHH:mm:ss.sss for cross-browser
  return new Date(`${year}-${formattedMonth}-${formattedDay}T00:00:00`);
};
