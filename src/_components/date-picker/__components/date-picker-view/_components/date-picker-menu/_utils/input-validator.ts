type ParamsType = {
  maskedValue: string;
  dateValue: Date;
  dateUpLimit?: Date | null;
  dateDownLimit?: Date | null;
  dateMask: RegExp;
  errorsTranslations: {
    notCorrect: string;
    tooBig: string;
    tooSmall: string;
  };
};

type OutputType = {
  error: boolean;
  errorText: string;
};

export const baseInputValidator = ({
  maskedValue,
  dateValue,
  dateUpLimit,
  dateDownLimit,
  dateMask,
  errorsTranslations,
}: ParamsType): OutputType => {
  if (!dateMask.test(maskedValue)) {
    return { error: true, errorText: '' };
  }

  if (dateValue.toString() === 'Invalid Date') {
    return { error: true, errorText: errorsTranslations.notCorrect };
  }

  // check up/down limit
  // if second value is less than first or vice versa
  if (dateUpLimit || dateDownLimit) {
    if (dateUpLimit && dateValue > dateUpLimit) {
      return { error: true, errorText: errorsTranslations.tooBig };
    }

    if (dateDownLimit && dateValue < dateDownLimit) {
      return { error: true, errorText: errorsTranslations.tooSmall };
    }
  }

  return { error: false, errorText: '' };
};
