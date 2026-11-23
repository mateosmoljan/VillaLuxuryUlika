"use client";
import { useState, useRef, useEffect } from "react";
import { FaCalendarAlt } from "react-icons/fa";
import dynamic from "next/dynamic";
import { format } from "date-fns";
import { useLocale } from "next-intl";
import { datePattern, pickerLocale } from "@/lib/site/dateLocale";
import hr from "@/messages/hr.json";
import en from "@/messages/en.json";
import de from "@/messages/de.json";
import it from "@/messages/it.json";

interface CustomRange {
  startDate: Date | undefined;
  endDate: Date | undefined;
  key: string | undefined;
}

const DateRangeCalendar = dynamic(() => import("./DateRangeCalendar"), {
  ssr: false,
});

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

  const [calendarWidth, setCalendarWidth] = useState<string>("vertical");
  const localeActive = useLocale();
  const contact = { hr, en, de, it }[localeActive]?.Contact.Contact_Form ?? en.Contact.Contact_Form;
  const locale = pickerLocale(localeActive);
  const pattern = datePattern(localeActive);

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

  const formatDate = (date: Date): string => format(date, pattern, { locale });

  // const disabledDates: Date[] = [
  //   new Date("2024-03-12"),
  //   new Date("2024-04-15"),
  // ];

  const [disabledDateArray, setDisabledDateArray] = useState<Date[]>([]);

  const getDisabledDates = (): Date[] => {
    const disabledRanges = [
      { startDate: new Date("2024-05-02"), endDate: new Date("2024-09-16") },
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
            <span>{contact.arrival}*</span>
          )}
          <FaCalendarAlt />
        </button>
        <button
          className="text-grey3 border-solid border-2  bg-white font-Bold font-poppins mb-4 rounded-md justify-between items-center flex w-full py-[8.5px] px-[14px]"
          onClick={() => setActiveDateRange(!activeDateRange)}
        >
          <span>
            {activateDate ? departureDate : `${contact.departure}*`}
          </span>
          <FaCalendarAlt />
        </button>
      </div>
      {activeDateRange && (
        <div
          ref={dateRangeRef}
          className="absolute border-solid border-2 border-grey3 z-20"
        >
          <div>
            <DateRangeCalendar
              state={state}
              setState={setState}
              calendarWidth={calendarWidth}
              disabledDates={getDisabledDates()}
              localeCode={localeActive}
            />
          </div>
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
