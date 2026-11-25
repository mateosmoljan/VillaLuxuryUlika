"use client";
import { useState, useRef, useEffect } from "react";
import { DateRange } from "react-date-range";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import { FaCalendarAlt } from "react-icons/fa";
import { format } from "date-fns";
import enGB from "date-fns/locale/en-GB";
import hrLocale from "date-fns/locale/hr";
import deLocale from "date-fns/locale/de";
import itLocale from "date-fns/locale/it";
import { FormControl } from "@mui/material";
import { useLocale } from "next-intl";
import { getContactData } from "@/lib/contact";
import { formatStay, readStay, writeStay } from "@/lib/stay";

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
  const localeBase =
    { hr: hrLocale, de: deLocale, it: itLocale, en: enGB }[localeActive] ??
    enGB;
  const pickerLocale = {
    ...localeBase,
    options: { ...localeBase.options, weekStartsOn: 1 as const },
  };
  const datePattern =
    { hr: "d.M.yyyy.", de: "dd.MM.yyyy", it: "dd/MM/yyyy", en: "d.M.yyyy" }[
      localeActive
    ] ?? "d.M.yyyy";

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

  useEffect(() => {
    function apply(arrivalIso: string, departureIso: string) {
      if (!arrivalIso) return;
      const arrivalDateValue = new Date(`${arrivalIso}T00:00:00`);
      const departureDateValue = departureIso
        ? new Date(`${departureIso}T00:00:00`)
        : arrivalDateValue;
      setState([{ startDate: arrivalDateValue, endDate: departureDateValue, key: "selection" }]);
      setActivateDate(true);
      setArrivalDate(formatStay(arrivalIso, localeActive));
      if (departureIso) setDepartureDate(formatStay(departureIso, localeActive));
    }
    const params = new URLSearchParams(window.location.search);
    const saved = readStay();
    apply(params.get("arrival") || saved?.arrival || "", params.get("departure") || saved?.departure || "");
    function onStay() {
      const next = readStay();
      if (!next) return;
      apply(next.arrival, next.departure);
    }
    window.addEventListener("ulika-stay", onStay);
    return () => window.removeEventListener("ulika-stay", onStay);
  }, [localeActive]);

  const formatDate = (date: Date): string =>
    format(date, datePattern, { locale: pickerLocale });

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
          type="button"
          className="text-grey3 border-solid border-2 bg-white font-Bold font-poppins mb-4 rounded-md justify-between items-center flex w-full py-[8.5px] px-[14px]"
          onClick={handleButtonClick}
        >
          {activateDate ? (
            arrivalDate
          ) : (
            <span>{ContactData.data[0].arrival}*</span>
          )}
          <FaCalendarAlt />
        </button>
        <button
          type="button"
          className="text-grey3 border-solid border-2  bg-white font-Bold font-poppins mb-4 rounded-md justify-between items-center flex w-full py-[8.5px] px-[14px]"
          onClick={() => setActiveDateRange(!activeDateRange)}
        >
          <span>
            {activateDate
              ? departureDate
              : `${ContactData.data[0].departure}*`}
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
              onChange={(item) => {
                const selection = item.selection as CustomRange;
                setState([selection]);
                if (!selection.startDate) return;
                const toIso = (date: Date) =>
                  `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`;
                const arrivalIso = toIso(selection.startDate);
                const departureIso = selection.endDate ? toIso(selection.endDate) : "";
                const saved = readStay();
                if (saved?.arrival === arrivalIso && (saved?.departure || "") === departureIso) return;
                writeStay({
                  arrival: arrivalIso,
                  departure: departureIso,
                  adults: saved?.adults || 2,
                  children: saved?.children || 0,
                });
              }}
              moveRangeOnFirstSelection={false}
              ranges={state}
              className="relative bg-white z-20 "
              months={2}
              locale={pickerLocale}
              direction={
                calendarWidth === "horizontal" ? "horizontal" : "vertical"
              }
              rangeColors={["#B29600"]}
              dateDisplayFormat={datePattern}
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
