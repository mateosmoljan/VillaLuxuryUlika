import React, { useEffect, useState, useCallback, useRef } from "react";
import dayjs from "dayjs";
import isBetween from "dayjs/plugin/isBetween";
import { handleBookings, isValidMonthsOption } from "./Utils";
import Controls from "./Controls";
import Year from "./Year";
import Key from "./Key";
import { ICalendarPropTypes, IControls, blockedDaysType, IYear } from "./types";
import {
  calendarStartMonth,
  initialCalendarYear,
  pricedYearRange,
} from "@/lib/dailyPrices";

dayjs.extend(isBetween);

const Calendar = ({
  bookings = [],
  showNumberOfMonths = 12,
  showKey = true,
  showCurrentYear = true,
  showControls = true,
}: ICalendarPropTypes): JSX.Element => {
  const initialMonth = 1;
  const initialPage = 1;
  const totalCalendarMonths = 12;
  const _showNumberOfMonths = isValidMonthsOption(showNumberOfMonths)
    ? showNumberOfMonths
    : totalCalendarMonths;
  const yearBounds = pricedYearRange();
  const [activeYear, setActiveYear] = useState(() => initialCalendarYear());
  const [bookedDates, setBookedDates] = useState<blockedDaysType>([]);
  const [lateCheckouts, setLateCheckouts] = useState<blockedDaysType>([]);
  const [monthsFrom, setMonthsFrom] = useState(initialMonth);
  const [page, setPage] = useState(initialPage);
  const scrollerRef = useRef<HTMLDivElement>(null);

  const totalPages = totalCalendarMonths / _showNumberOfMonths;

  const resetCalendarYear = () => {
    setMonthsFrom(initialMonth);
    setPage(initialPage);
  };

  const goToPage = useCallback(
    (_page: number): void => {
      const _monthsFrom = _page * _showNumberOfMonths - _showNumberOfMonths + 1;
      setMonthsFrom(_monthsFrom);
      setPage(_page);
    },
    [_showNumberOfMonths]
  );

  const findActivePage = useCallback(() => {
    const now = dayjs();
    const _month = now.month() + 1;
    let _page = 1;
    for (let i = 1; i <= totalPages; i++) {
      const found = _month <= i * _showNumberOfMonths;
      _page = i;
      if (found) break;
    }

    goToPage(_page);
  }, [goToPage, _showNumberOfMonths, totalPages]);

  useEffect(() => {
    if (_showNumberOfMonths !== totalCalendarMonths) {
      findActivePage();
    }
  }, [findActivePage, _showNumberOfMonths]);

  const initCal = useCallback(() => {
    setActiveYear(initialCalendarYear());
    if (_showNumberOfMonths !== totalCalendarMonths) findActivePage();
    else resetCalendarYear();
  }, [findActivePage, _showNumberOfMonths]);

  const prev = useCallback(() => {
    const isFirstPage = page === 1;

    if (isFirstPage) {
      if (activeYear <= yearBounds.min) return;
      const _previousYear = dayjs(`${activeYear}`).subtract(1, "year").year();
      setActiveYear(_previousYear);

      if (_showNumberOfMonths === totalCalendarMonths) {
        resetCalendarYear();
        return;
      }

      const nxtStartingMonth = totalCalendarMonths - _showNumberOfMonths + 1;
      const nxtPage = totalPages;

      setMonthsFrom(nxtStartingMonth);
      setPage(nxtPage);
      return;
    }

    const nxtStartingMonth = monthsFrom - _showNumberOfMonths;
    const nxtPage = page - 1;
    setMonthsFrom(nxtStartingMonth);
    setPage(nxtPage);
  }, [page, _showNumberOfMonths, monthsFrom, totalPages, activeYear, yearBounds.min]);

  const next = useCallback(() => {
    const isLastPage = page === totalPages;
    if (isLastPage) {
      if (activeYear >= yearBounds.max) return;
      const _nextYear = dayjs(`${activeYear}`).add(1, "year").year();
      setActiveYear(_nextYear);
      resetCalendarYear();
      return;
    }

    const nxtStartingMonth = page * _showNumberOfMonths + 1;
    const nxtPage = page + 1;
    setMonthsFrom(nxtStartingMonth);
    setPage(nxtPage);
  }, [page, totalPages, _showNumberOfMonths, activeYear, yearBounds.max]);

  const configControls: IControls = {
    prev,
    next,
    initCal,
    canPrev: activeYear > yearBounds.min || page > 1,
    canNext: activeYear < yearBounds.max || page < totalPages,
  };

  useEffect(() => {
    const scroller = scrollerRef.current;
    if (!scroller) return;
    const month = calendarStartMonth(activeYear);
    const target = scroller.querySelector(
      `[data-month="${month}"]`
    ) as HTMLElement | null;
    if (!target) {
      scroller.scrollTop = 0;
      return;
    }
    const top =
      target.getBoundingClientRect().top -
      scroller.getBoundingClientRect().top +
      scroller.scrollTop;
    scroller.scrollTop = top;
  }, [activeYear]);

  useEffect(() => {
    const { halfDays, bookedDays } = handleBookings({
      bookings,
      year: activeYear,
    });

    setBookedDates(bookedDays);
    setLateCheckouts(halfDays);
  }, [bookings, activeYear]);

  const configYear: IYear = {
    showNumberOfMonths: _showNumberOfMonths,
    bookedDates,
    lateCheckouts,
    activeYear,
    monthsFrom,
  };

  const shouldRender = {
    key: showKey,
    currentYear: showCurrentYear,
    controls: showControls,
  };

  const layoutClassName =
    _showNumberOfMonths !== totalCalendarMonths
      ? _showNumberOfMonths > 1
        ? "twoCol"
        : "singleCol"
      : "";
  return (
    <section className={`calendar ${layoutClassName}`} data-testid="calendar">
      {/* <h2 className=" text-4xl text-dark_blue_black mb-4">Villa Panorama</h2> */}
      <div className="wrap overflow-hidden">
        {!shouldRender.controls && !shouldRender.currentYear ? null : (
          <div className="controlWrap">
            {shouldRender.currentYear && (
              <p className="currentYear" data-testid="currentYear">
                {activeYear}
              </p>
            )}

            {shouldRender.controls && <Controls {...configControls} />}
          </div>
        )}

        <div
          ref={scrollerRef}
          className={`overflow-x-hidden overflow-y-scroll my-2  p-4 pt-6 h-[260px] sm:h-[510px]`}
        >
          <Year {...configYear} />
        </div>

        {/* {shouldRender.key && <Key />} */}
      </div>
    </section>
  );
};

export default Calendar;
