/* eslint-disable @typescript-eslint/ban-ts-ignore */
import React, { Component, createRef, LegacyRef, RefObject } from 'react';
import {
  Throttler,
  withScreenResizeDetectHoc,
  WithScreenResizePropsType,
} from '@wildberries/ui-kit';
import { List } from 'react-virtualized';
import {
  DatePickerTranslationConfig,
  ExtraPatternType,
  IGetCustomInlineDayStyle,
  OnDatePickedChangeParamsType,
} from '@/_types';
import { DatePickerView } from './__components/date-picker-view/date-picker-view';

type StateType = {
  year: number;
  isCalendarOpened: boolean;
  startDate: Date | null;
  endDate: Date | null;
};

export type DatePickerPropsType = {
  /** флаг блокировки инпута */
  disabled?: boolean;
  /** имя инпута */
  name: string;
  /** id инпута */
  id: string;

  onChange: (params: OnDatePickedChangeParamsType) => void;
  onClose?: () => void;
  initialYear?: number;
  translationConfig: DatePickerTranslationConfig;
  isInterval?: boolean;
  startDate?: Date;
  endDate?: Date;
  isFullWidth?: boolean;
  withIntervalInputs?: boolean;
  dateUpLimit?: Date;
  dateDownLimit?: Date;
  locale?: string;
  intervalPatterns?: Array<ExtraPatternType>;
  getCustomInlineDayStyle?: IGetCustomInlineDayStyle;
};

type PropsType = DatePickerPropsType & WithScreenResizePropsType;

export class WrappedContainer extends Component<PropsType, StateType> {
  containerRef: RefObject<HTMLDivElement>;

  listRef: LegacyRef<List> | undefined;

  debouncedSetFirstDate: (date: Date | null, withoutScroll?: boolean) => void;

  debouncedSetLastDate: (date: Date | null, withoutScroll?: boolean) => void;

  constructor(props: PropsType) {
    super(props);

    const throttler = new Throttler();

    this.containerRef = createRef();
    this.listRef = createRef();

    this.state = {
      year: props.initialYear || new Date().getFullYear(),
      isCalendarOpened: false,
      startDate: props.startDate || null,
      endDate: props.endDate || null,
    };

    this.debouncedSetFirstDate = throttler.createDebounce({
      callback: this.handleSetFirstDate,
      timeoutMs: 100,
    });
    this.debouncedSetLastDate = throttler.createDebounce({
      callback: this.handleSetLastDate,
      timeoutMs: 100,
    });
  }

  componentDidMount() {
    window.addEventListener('click', this.handleOutsideClick);
  }

  componentDidUpdate(prevProps: PropsType, prevState: StateType) {
    // if not interval - close after date was set
    if (
      prevState.startDate !== this.state.startDate &&
      !this.props.isInterval
    ) {
      this.handleSetDates();
    }
  }

  componentWillUnmount() {
    window.removeEventListener('click', this.handleOutsideClick);
  }

  scrollToDate = ({ year, month }: { year?: number; month: number }) => {
    if (this.listRef) {
      // @ts-ignore
      this.listRef.current.scrollToRow(month);
    }

    if (year && year !== this.state.year) {
      this.setState({ year });
    }
  };

  handleOutsideClick = ({ target }: MouseEvent): void => {
    if (
      this.props.screenType !== 'mobile' &&
      this.state.isCalendarOpened &&
      this.containerRef.current &&
      !this.containerRef.current.contains(target as HTMLElement)
    ) {
      this.handleToggleCalendar();
    }
  };

  onDecreaseYear = () => {
    this.setState(prevState => ({
      year: prevState.year - 1,
    }));

    this.scrollToDate({
      month: 0,
    });
  };

  onIncreaseYear = () => {
    this.setState(prevState => ({
      year: prevState.year + 1,
    }));

    this.scrollToDate({
      month: 0,
    });
  };

  // todo refactor
  handleSetFirstDate = (date: Date | null, withoutScroll?: boolean) => {
    if (!date) {
      this.setState({
        startDate: null,
      });

      return;
    }

    const startDate = new Date(new Date(date).setHours(0, 0, 0, 0));

    this.setState({
      startDate,
    });

    if (!withoutScroll) {
      this.scrollToDate({
        month: startDate.getMonth(),
        year: startDate.getFullYear(),
      });
    }
  };

  // todo refactor
  handleSetLastDate = (date: Date | null, withoutScroll?: boolean) => {
    if (!date) {
      this.setState({
        endDate: null,
      });

      return;
    }

    const endDate = new Date(new Date(date).setHours(23, 59, 59, 999));
    const year = endDate.getFullYear();
    const month = endDate.getMonth();

    if (!this.state.startDate) {
      this.setState({
        endDate,
      });

      if (!withoutScroll) {
        this.scrollToDate({
          year,
          month,
        });
      }

      return;
    }

    const startDateTimeMs = Date.parse(this.state.startDate.toUTCString());
    const stopDateTimeMs = Date.parse(date.toUTCString());

    if (stopDateTimeMs >= startDateTimeMs) {
      this.setState({
        endDate,
      });

      if (!withoutScroll) {
        this.scrollToDate({
          year,
          month,
        });
      }
    }
  };

  handleDayClick = (date: Date) => {
    if (this.state.startDate && this.props.isInterval) {
      const startDateTimeMs = Date.parse(this.state.startDate.toUTCString());
      const currentDateTimeMs = Date.parse(date.toUTCString());

      if (!this.state.endDate) {
        if (currentDateTimeMs >= startDateTimeMs) {
          this.handleSetLastDate(date, true);

          return;
        }
      } else {
        const stopDateTimeMs = Date.parse(this.state.endDate.toUTCString());
        const medianDateTimeMs = Math.floor(
          (startDateTimeMs + stopDateTimeMs) / 2,
        );

        if (currentDateTimeMs >= medianDateTimeMs) {
          this.handleSetLastDate(date, true);

          return;
        }
      }
    }

    this.handleSetFirstDate(date, true);
  };

  handleResetDates = () => {
    const params = {
      startDate: null,
      endDate: null,
    };

    this.setState(params);
    this.props.onChange(params);
  };

  handleSetDates = () => {
    this.props.onChange({
      startDate: this.state.startDate,
      endDate: this.state.endDate,
    });

    this.setState({ isCalendarOpened: false });
  };

  handleToggleCalendar = () => {
    this.setState(({ isCalendarOpened }) => ({
      isCalendarOpened: !isCalendarOpened,
    }));

    if (this.props.onClose && this.state.isCalendarOpened) {
      this.props.onClose();
    }
  };

  handleSetPeriod = ({
    startDate,
    endDate,
  }: {
    startDate: Date;
    endDate: Date;
  }) => {
    this.handleSetFirstDate(startDate);
    this.handleSetLastDate(endDate, true);
  };

  render() {
    return (
      <DatePickerView
        containerRef={this.containerRef}
        dateDownLimit={this.props.dateDownLimit}
        dateUpLimit={this.props.dateUpLimit}
        disabled={this.props.disabled}
        endDate={this.state.endDate}
        getCustomInlineDayStyle={this.props.getCustomInlineDayStyle}
        handleDayClick={this.handleDayClick}
        handleResetDates={this.handleResetDates}
        handleSetDates={this.handleSetDates}
        handleSetFirstDate={this.debouncedSetFirstDate}
        handleSetLastDate={this.debouncedSetLastDate}
        id={this.props.id}
        intervalPatterns={this.props.intervalPatterns}
        isCalendarOpened={this.state.isCalendarOpened}
        isFullWidth={this.props.isFullWidth}
        isInterval={this.props.isInterval}
        isMobile={this.props.screenType === 'mobile'}
        locale={this.props.locale}
        name={this.props.name}
        onDecreaseYear={this.onDecreaseYear}
        onIncreaseYear={this.onIncreaseYear}
        onSetPeriod={this.handleSetPeriod}
        onToggleCalendar={this.handleToggleCalendar}
        startDate={this.state.startDate}
        translationConfig={this.props.translationConfig}
        withIntervalInputs={this.props.withIntervalInputs}
        year={this.state.year}
        listRef={this.listRef}
      />
    );
  }
}

export const DatePicker = withScreenResizeDetectHoc<DatePickerPropsType>({})(
  WrappedContainer,
);
