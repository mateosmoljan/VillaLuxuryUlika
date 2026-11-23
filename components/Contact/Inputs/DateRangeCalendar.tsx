"use client";

import { DateRange } from "react-date-range";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import { datePattern, pickerLocale } from "@/lib/site/dateLocale";

interface CustomRange {
  startDate: Date | undefined;
  endDate: Date | undefined;
  key: string | undefined;
}

type Props = {
  state: CustomRange[];
  setState: (value: CustomRange[]) => void;
  calendarWidth: string;
  disabledDates: Date[];
  localeCode: string;
};

export default function DateRangeCalendar({
  state,
  setState,
  calendarWidth,
  disabledDates,
  localeCode,
}: Props) {
  const locale = pickerLocale(localeCode);
  return (
    <DateRange
      editableDateInputs={true}
      onChange={(item) => setState([item.selection as CustomRange])}
      moveRangeOnFirstSelection={false}
      ranges={state}
      className="relative bg-white z-20 "
      months={2}
      locale={locale}
      direction={calendarWidth === "horizontal" ? "horizontal" : "vertical"}
      rangeColors={["#B29600"]}
      disabledDates={disabledDates}
      dateDisplayFormat={datePattern(localeCode)}
    />
  );
}
