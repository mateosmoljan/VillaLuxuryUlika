import React, { useEffect, useRef, useState } from "react";
import dayjs from "dayjs";
import isBetween from "dayjs/plugin/isBetween";
import { IYear } from "./../types";
import {
  daysOfTheWeek,
  daysOfTheWeekOffset,
  formatBookingsData,
  getMonthName,
} from "./../Utils";
import { bookings } from "@/components/AvailabilityCalendar/AvailabilityCalendar";

dayjs.extend(isBetween);

// Example: Hardcoded prices per month/day (in €). Expand this based on your data.
// Use a 2D array: prices[month][day] (month/day 1-indexed; use 0 for missing days).
const prices: number[][] = [
  // Month 1 (January): 31 days
  [
    0, 550, 525, 525, 525, 190, 190, 190, 190, 250, 250, 190, 190, 190, 190,
    190, 250, 250, 190, 190, 190, 190, 190, 250, 250, 190, 190, 190, 190, 190,
    250, 250,
  ], // days 1-31
  // Month 2 (February): 28 days (non-leap year example)
  [
    0, 190, 190, 190, 190, 190, 250, 250, 190, 190, 190, 190, 190, 250, 250,
    190, 190, 190, 190, 190, 250, 250, 190, 190, 190, 190, 190, 250, 250,
  ],
  // Month 3 (March): 31 days
  [
    0, 190, 190, 190, 190, 190, 250, 250, 190, 190, 190, 190, 190, 250, 250,
    190, 190, 190, 190, 190, 250, 250, 190, 190, 190, 190, 190, 250, 250, 190,
    190, 190,
  ],
  // Month 4 (April): 30 days
  [
    0, 250, 260, 260, 260, 260, 260, 190, 190, 190, 250, 250, 190, 190, 190,
    190, 190, 250, 250, 190, 190, 190, 190, 190, 250, 250, 190, 190, 190, 190,
    250,
  ],
  // Month 5 (May): 31 days
  [
    0, 250, 250, 190, 190, 190, 190, 190, 190, 190, 190, 190, 190, 190, 190,
    190, 190, 190, 190, 190, 190, 190, 190, 233, 233, 233, 233, 233, 233, 233,
    233, 233,
  ],
  // Month 6 (June): 30 days
  [
    0, 233, 233, 233, 233, 233, 245, 245, 245, 245, 245, 245, 245, 245, 245,
    245, 245, 245, 245, 245, 245, 296, 296, 336, 336, 336, 336, 336, 336, 336,
    336,
  ],
  // Month 7 (July): 31 days
  [
    0, 336, 336, 336, 393, 393, 393, 393, 393, 393, 393, 445, 445, 445, 445,
    445, 445, 445, 512, 512, 512, 512, 512, 512, 512, 550, 550, 550, 550, 550,
    550, 550,
  ],
  // Month 8 (August): 31 days
  [
    0, 550, 550, 550, 550, 550, 550, 550, 550, 550, 550, 550, 550, 550, 550,
    503, 503, 503, 503, 503, 503, 503, 428, 428, 428, 428, 428, 428, 428, 384,
    384, 384,
  ],
  // Month 9 (September): 30 days
  [
    0, 384, 384, 384, 384, 320, 320, 320, 320, 320, 320, 320, 285, 285, 285,
    285, 285, 285, 285, 249, 249, 249, 249, 249, 249, 249, 200, 200, 200, 200,
    200,
  ],
  // Month 10 (October): 31 days
  [
    0, 200, 200, 200, 200, 200, 200, 200, 200, 200, 200, 200, 200, 200, 200,
    200, 250, 250, 250, 250, 250, 250, 250, 250, 250, 250, 250, 250, 250, 250,
    250, 250,
  ],
  // Month 11 (November): 30 days
  [
    0, 250, 190, 190, 190, 190, 190, 250, 250, 190, 190, 190, 190, 190, 250,
    250, 190, 190, 190, 190, 190, 250, 250, 190, 190, 190, 190, 190, 250, 250,
    190,
  ],
  // Month 12 (December): 31 days
  [
    0, 190, 190, 190, 190, 250, 250, 190, 190, 190, 190, 190, 250, 250, 190,
    190, 190, 190, 190, 250, 250, 190, 190, 190, 190, 260, 260, 260, 260, 190,
    550, 550,
  ],
];

const getPrice = (month: number, day: number): number | undefined => {
  if (month < 1 || month > 12 || day < 1 || day > 31) return undefined;
  return prices[month - 1]?.[day]; // 0-index array access
};

const Year: React.FC<IYear> = ({
  activeYear,
  showNumberOfMonths = 12,
  bookedDates = [],
  lateCheckouts = [],
  monthsFrom = 1,
}): JSX.Element => {
  const _year = activeYear || dayjs().year();

  return (
    <div className="year" data-testid="year">
      {new Array(showNumberOfMonths).fill("").map((_, pos) => {
        const arrOffset = 1;
        const month = monthsFrom + pos;
        const date = `${_year}-${month}`;
        const monthName = getMonthName(month);
        const totalDays = dayjs(date).daysInMonth();
        const firstDayOfWeek = dayjs(`${date}-01`).day();

        const offsetDays =
          firstDayOfWeek !== 0
            ? new Array(firstDayOfWeek - arrOffset).fill("")
            : new Array(Number(daysOfTheWeekOffset[firstDayOfWeek])).fill("");

        const daysArr = new Array(totalDays).fill("");

        return (
          <div key={pos} className="month" data-testid="month">
            <h3 className="monthName">{monthName}</h3>

            {/* <div className="content dayOfTheWeek">
              {daysOfTheWeek.map((dayOfTheWeek, pos) => {
                return (
                  <div key={pos} className="day">
                    {dayOfTheWeek}
                  </div>
                );
              })}
            </div> */}

            <div className="content">
              {offsetDays.map((_, pos) => {
                return <div key={pos} className="day" />;
              })}

              {daysArr.map((_, pos) => {
                const day = pos + arrOffset;
                const _date = `${month}-${day}-${_year}`;

                const isBooked = Array.isArray(bookedDates)
                  ? bookedDates.includes(_date)
                  : false;

                const isLateCheckout = Array.isArray(lateCheckouts)
                  ? lateCheckouts.includes(_date)
                  : false;

                // Get price for this day (your main goal).
                const price = getPrice(month, day);

                // Example conditional: If month=1 && day=2, override with 123 (or any logic).
                // You can move this into getPrice() for cleaner code.
                // const displayPrice = month === 1 && day === 2 ? 123 : price;

                return (
                  <div
                    key={pos}
                    className={`day ${isBooked ? "booked" : ""} ${
                      isLateCheckout ? "isLateCheckout" : ""
                    } `}

                    // ${
                    //   bookings.some((booking) =>
                    //     dayjs(_date).isSame(booking.from, "day")
                    //   )
                    //     ? "CheckIn"
                    //     : ""
                    // }
                  >
                    <div className="flex flex-col items-center gap-2 border border-gray-200 rounded-md p-2">
                      <span className="text-[10px] ">{day}</span>
                      {/* Replace {month} with price. Add € prefix if needed. */}
                      <span className="text-[10px] text-gray-500">
                        {price ? `€${price}` : month}{" "}
                        {/* Fallback to month if no price */}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Year;
