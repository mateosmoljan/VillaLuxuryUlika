"use client";

import Calendar from "./index";
import "./style.css";
import { bookings } from "@/lib/bookings";

export { bookings };

function AvailabilityCalendar() {
  return (
    <>
      <Calendar bookings={bookings} />
    </>
  );
}

export default AvailabilityCalendar;
