import React, {
  memo,
  useCallback,
  useRef,
  useEffect,
  useMemo,
  useState,
} from 'react';
import classnames from 'classnames/bind';
import {
  SimpleInput,
  MaskedInput,
  SimpleInputChangeEventType,
  Label,
  Text,
} from '@wildberries/ui-kit';
import { MaskedInputRefType } from '@wildberries/ui-kit/lib/masked-input/_types';
import { reformatDateInputValue } from '../../_utils/reformat-date-input-value';
import { baseInputValidator } from '../../_utils/input-validator';
import styles from './date-picker-menu-input.module.scss';

const cn = classnames.bind(styles);
const BLOCK_NAME = 'DatePickerMenuInput';

export type InputState = {
  error: boolean;
  errorText: string;
  dirty: boolean;
};

type PropsType = {
  onSetDate: (date: Date | null) => void;
  dateMaskArray: Array<RegExp | string>;
  label: string;
  value?: Date | null;
  locale: string;
  dateMask: RegExp;
  id: string;
  name: string;
  dateUpLimit?: Date | null;
  dateDownLimit?: Date | null;
  errorTextValue: string;
  errorsTranslations: {
    notCorrect: string;
    tooBig: string;
    tooSmall: string;
  };
  setInputExternalError: (isError: boolean) => void;
};

export const DatePickerMenuInput = memo(
  ({
    onSetDate,
    dateMaskArray,
    errorsTranslations,
    value: dateValue,
    locale,
    dateMask,
    id,
    name,
    dateUpLimit,
    dateDownLimit,
    label,
    setInputExternalError,
  }: PropsType) => {
    const [inputError, setInputError] = useState(false);
    const [inputErrorText, setInputErrorText] = useState('');
    const [inputIsDirty, setInputIsDirty] = useState(false);

    // any because of masked input refs
    // set to mask inputs values
    // because only using refs we can access MaskedInput value
    const inputRef = useRef<any>(null);

    useEffect(() => {
      inputRef.current.value = dateValue
        ? new Intl.DateTimeFormat(locale).format(new Date(dateValue))
        : '';
    }, [dateValue, locale]);

    // set disabled or not save button
    useEffect(() => {
      const isValid = !Boolean(dateValue);

      setInputExternalError(isValid);
      setInputError(isValid);

      if (isValid) {
        setInputErrorText('');
      }
    }, [dateValue, setInputExternalError]);

    const secondInputCallbackRef = useCallback(
      (element: MaskedInputRefType | null) => {
        if (element) {
          inputRef.current = element.inputElement;
        }
      },
      [],
    );

    const handleInputValue = useCallback(
      ({ value }: SimpleInputChangeEventType) => {
        if (!value) {
          onSetDate(null);

          return;
        }

        if (!inputIsDirty) {
          setInputIsDirty(true);
        }

        const formattedDate = reformatDateInputValue(value);

        const { error, errorText } = baseInputValidator({
          maskedValue: value,
          dateValue: formattedDate,
          dateDownLimit,
          dateUpLimit,
          dateMask,
          errorsTranslations,
        });

        if (!error) {
          onSetDate(formattedDate);

          return;
        }

        if (inputErrorText !== errorText) {
          setInputError(true);
          setInputErrorText(errorText);
          setInputExternalError(true);
        }
      },
      [
        dateDownLimit,
        dateMask,
        dateUpLimit,
        errorsTranslations,
        inputErrorText,
        inputIsDirty,
        onSetDate,
        setInputExternalError,
      ],
    );

    const isInputError = useMemo(
      () => inputError && inputIsDirty && Boolean(inputErrorText),
      [inputError, inputErrorText, inputIsDirty],
    );

    return (
      <div
        className={cn(BLOCK_NAME, {
          [`${BLOCK_NAME}--error`]: isInputError,
        })}
      >
        <div className={cn(`${BLOCK_NAME}__label`)}>
          <Label colorType="richGrey" htmlFor={id}>
            {label}
          </Label>
        </div>

        <MaskedInput
          id={id}
          inputComponent={SimpleInput}
          inputRef={secondInputCallbackRef}
          // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
          // @ts-ignore
          isError={isInputError}
          mask={dateMaskArray}
          name={name}
          onChange={handleInputValue}
        />

        {isInputError && (
          <div className={cn(`${BLOCK_NAME}__error`)}>
            <Text color="red" size="h6" text={inputErrorText} />
          </div>
        )}
      </div>
    );
  },
);
