import React, { memo, useMemo, useState } from 'react';
import classnames from 'classnames/bind';
import { ButtonLink } from '@wildberries/ui-kit';
import { DatePickerTranslationConfig, ExtraPatternType } from '@/_types';
import styles from './date-picker-menu.module.scss';
import { getDateMaskArray } from './_utils/get-date-mask-array';
import { getDateMask } from './_utils/get-date-mask';
import { PatternButton } from './_components/pattern-button/pattern-button';
import { DatePickerMenuInput } from './_components/date-picker-menu-input/date-picker-menu-input';

const cn = classnames.bind(styles);
const BLOCK_NAME = 'DatePickerMenu';

type PropsType = {
  startDate: Date | null;
  endDate: Date | null;
  onSetDates: () => void;
  onSetFirstDate: (date: Date | null) => void;
  onSetLastDate: (date: Date | null) => void;
  handleResetDates: () => void;
  translationConfig: DatePickerTranslationConfig;
  withIntervalInputs?: boolean;
  dateUpLimit?: Date;
  dateDownLimit?: Date;
  locale: string;
  intervalPatterns?: Array<ExtraPatternType>;
  onSetPeriod: (params: { startDate: Date; endDate: Date }) => void;
};

export const DatePickerMenu = memo(
  ({
    startDate,
    endDate,
    onSetDates,
    onSetFirstDate,
    onSetLastDate,
    handleResetDates,
    translationConfig,
    intervalPatterns,
    withIntervalInputs,
    dateUpLimit,
    dateDownLimit,
    locale,
    onSetPeriod,
  }: PropsType) => {
    const [firstInputError, setFirstInputError] = useState(true);
    const [secondInputError, setSecondInputError] = useState(true);

    const isSaveButtonDisabled = useMemo(
      () => firstInputError || secondInputError,
      [firstInputError, secondInputError],
    );

    const dateMaskArray = useMemo(() => getDateMaskArray(locale), [locale]);
    const dateMask = useMemo(() => getDateMask(locale), [locale]);

    const actionButtonsTop = useMemo(
      () => !withIntervalInputs && !intervalPatterns,
      [intervalPatterns, withIntervalInputs],
    );

    const resetButtonIsDisabled = useMemo(() => !startDate && !endDate, [
      endDate,
      startDate,
    ]);

    return (
      <div
        className={cn(BLOCK_NAME, {
          [`${BLOCK_NAME}--with-interval-inputs`]: withIntervalInputs,
        })}
      >
        {intervalPatterns && (
          <div
            className={cn(
              `${BLOCK_NAME}__filters-block`,
              `${BLOCK_NAME}__filters-block--with-buttons`,
            )}
          >
            {intervalPatterns.map(({ text, variant, datesSetter }) => {
              return (
                <div className={cn(`${BLOCK_NAME}__filter-button`)}>
                  <PatternButton
                    datesSetter={datesSetter}
                    onSetPeriod={onSetPeriod}
                    text={text}
                    variant={variant}
                  />
                </div>
              );
            })}
          </div>
        )}

        {withIntervalInputs && (
          <div className={cn(`${BLOCK_NAME}__filters-block`)}>
            <div className={cn(`${BLOCK_NAME}__date`)}>
              <DatePickerMenuInput
                dateDownLimit={dateDownLimit}
                dateMask={dateMask}
                dateMaskArray={dateMaskArray}
                dateUpLimit={endDate || dateUpLimit}
                errorsTranslations={translationConfig.errorText}
                errorTextValue="errorTextValue"
                id="start-datepicker-input"
                label={translationConfig.startPeriodLabelText}
                locale={locale}
                name="start-datepicker-input"
                onSetDate={onSetFirstDate}
                setInputExternalError={setFirstInputError}
                value={startDate}
              />
            </div>
            <div className={cn(`${BLOCK_NAME}__date`)}>
              <DatePickerMenuInput
                dateDownLimit={startDate || dateDownLimit}
                dateMask={dateMask}
                dateMaskArray={dateMaskArray}
                dateUpLimit={dateUpLimit}
                errorsTranslations={translationConfig.errorText}
                errorTextValue="errorTextValue"
                id="end-datepicker-input"
                label={translationConfig.endPeriodLabelText}
                locale={locale}
                name="end-datepicker-input"
                onSetDate={onSetLastDate}
                setInputExternalError={setSecondInputError}
                value={endDate}
              />
            </div>
          </div>
        )}

        <div
          className={cn(`${BLOCK_NAME}__action-buttons`, {
            [`${BLOCK_NAME}__action-buttons--top`]: actionButtonsTop,
          })}
        >
          <div className={cn(`${BLOCK_NAME}__cancel-button`)}>
            <ButtonLink
              disabled={resetButtonIsDisabled}
              fullWidth
              onClick={handleResetDates}
              text={translationConfig.resetButtonText}
              type="button"
              variant="interface"
            />
          </div>
          <div className={cn(`${BLOCK_NAME}__save-button`)}>
            <ButtonLink
              disabled={isSaveButtonDisabled}
              fullWidth
              onClick={onSetDates}
              text={translationConfig.saveButtonText}
              type="button"
              variant="main"
            />
          </div>
        </div>
      </div>
    );
  },
);
