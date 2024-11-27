"use client";
import { useState, useRef, useEffect } from "react";
import { DateRange } from "react-date-range";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import { FaCalendarAlt } from "react-icons/fa";
import enGB from "date-fns/locale/en-GB";
import { FormControl } from "@mui/material";
import { useLocale } from "next-intl";
import { getContactData } from "@/lib/contact";

interface CustomRange {
  startDate: Date | undefined;
  endDate: Date | undefined;
  key: string | undefined;
}

function DataRangeComponent() {
  const dateRangeRef = useRef<HTMLDivElement>(null);
  const [activeDateRange, setActiveDateRange] = useState<boolean>(false);
  const [activateDate, setActivateDate] = useState<boolean>(false);
  const [state, setState] = useState<CustomRange[]>([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: "selection",
    },
  ]);
  const [arrivalDate, setArrivalDate] = useState<string>("");
  const [departureDate, setDepartureDate] = useState<string>("");
  const localeActive = useLocale();
  const ContactData = getContactData(localeActive);

  const [calendarWidth, setCalendarWidth] = useState<string>("vertical");

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dateRangeRef.current &&
        !dateRangeRef.current.contains(event.target as Node)
      ) {
        setActiveDateRange(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [dateRangeRef]);

  useEffect(() => {
    if (state[0].startDate) {
      const formattedArrivalDate = formatDate(state[0].startDate);
      setArrivalDate(formattedArrivalDate);
    }
    if (state[0].endDate) {
      const formattedDepartureDate = formatDate(state[0].endDate);
      setDepartureDate(formattedDepartureDate);
    }
  }, [state]);

  const formatDate = (date: Date): string => {
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
    return `${day}.${month}.${year}`;
  };

  // const disabledDates: Date[] = [
  //   new Date("2024-03-12"),
  //   new Date("2024-04-15"),
  // ];

  const [disabledDateArray, setDisabledDateArray] = useState<Date[]>([]);

  const getDisabledDates = (): Date[] => {
    const disabledRanges = [
      { startDate: new Date("2024-05-02"), endDate: new Date("2024-11-09") },
    ];

    const disabledDates: Date[] = [...disabledDateArray]; // Include dynamically added dates

    disabledRanges.forEach((range) => {
      let currentDate = new Date(range.startDate);
      while (currentDate <= range.endDate) {
        disabledDates.push(new Date(currentDate));
        currentDate.setDate(currentDate.getDate() + 1);
      }
    });

    return disabledDates;
  };

  const addDisabledDate = (newDate: Date) => {
    setDisabledDateArray((prevDates) => [...prevDates, newDate]);
  };

  useEffect(() => {
    const width = window.innerWidth;
    if (width > 640) {
      setCalendarWidth("horizontal");
    } else {
      setCalendarWidth("vertical");
    }
  }, []);

  useEffect(() => {
    if (state[0].startDate !== state[0].endDate) {
      setActiveDateRange(false);
    }
  }, [state]);

  const handleButtonClick = () => {
    setActiveDateRange(true);
    setActivateDate(true);
  };

  return (
    <div className="w-full px-2">
      <div className="flex flex-row w-full gap-4">
        <button
          className="text-grey3 border-solid border-2 bg-white font-Bold font-poppins mb-4 rounded-md justify-between items-center flex w-full py-[8.5px] px-[14px]"
          onClick={handleButtonClick}
        >
          {activateDate ? (
            arrivalDate
          ) : (
            <span>
              {/* {ContactData.data[0].arrival} */}
              Arrival*
            </span>
          )}
          <FaCalendarAlt />
        </button>
        <button
          className="text-grey3 border-solid border-2  bg-white font-Bold font-poppins mb-4 rounded-md justify-between items-center flex w-full py-[8.5px] px-[14px]"
          onClick={() => setActiveDateRange(!activeDateRange)}
        >
          <span>
            {activateDate
              ? departureDate
              : // ContactData.data[0].departure
                "Departure*"}
          </span>
          <FaCalendarAlt />
        </button>
      </div>
      {activeDateRange && (
        <div
          ref={dateRangeRef}
          className="absolute border-solid border-2 border-grey3 z-20"
        >
          <FormControl required>
            <DateRange
              editableDateInputs={true}
              onChange={(item) => setState([item.selection as CustomRange])}
              moveRangeOnFirstSelection={false}
              ranges={state}
              className="relative bg-white z-20 "
              months={2}
              locale={enGB}
              direction={
                calendarWidth === "horizontal" ? "horizontal" : "vertical"
              }
              rangeColors={["#B29600"]}
              // disabledDates={getDisabledDates()}
              dateDisplayFormat="d.M.y"
            />
          </FormControl>
        </div>
      )}
      <div>
        <input type="hidden" required name="arrivalDate" value={arrivalDate} />
        <input
          type="hidden"
          required
          name="departureDate"
          value={departureDate}
        />
      </div>
    </div>
  );
}

export default DataRangeComponent;
