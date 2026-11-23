import React from "react";
import { IControls } from "./../types";
import { MdOutlineKeyboardDoubleArrowRight } from "react-icons/md";
import { MdKeyboardDoubleArrowLeft } from "react-icons/md";
import { getCalendarData } from "@/lib/Calendar";
import { useLocale } from "next-intl";

const Controls = ({
  prev,
  initCal,
  next,
  canPrev = true,
  canNext = true,
}: IControls): JSX.Element => {
  const localeActive = useLocale();
  const CalendarData = getCalendarData(localeActive);
  return (
    <div className="controls" data-testid="controls">
      <button
        className="btn back flex gap-1 disabled:cursor-not-allowed disabled:opacity-40"
        onClick={() => prev()}
        data-testid="back"
        disabled={!canPrev}
      >
        <MdKeyboardDoubleArrowLeft className="text-xl" />
        {CalendarData.data[0].back}
      </button>

      <button className="btn now" onClick={() => initCal()} data-testid="now">
        {CalendarData.data[0].reset}
      </button>

      <button
        className="btn next flex gap-1 disabled:cursor-not-allowed disabled:opacity-40"
        onClick={() => next()}
        data-testid="next"
        disabled={!canNext}
      >
        {CalendarData.data[0].next}
        <MdOutlineKeyboardDoubleArrowRight className="text-xl" />
      </button>
    </div>
  );
};

export default Controls;
