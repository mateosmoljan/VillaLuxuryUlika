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
import { getDailyPrice } from "@/lib/dailyPrices";

dayjs.extend(isBetween);

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

                const price = getDailyPrice(_year, month, day);

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
                      <span className="text-[10px] text-gray-500">
                        {typeof price === "number" ? `€${price}` : "–"}
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
