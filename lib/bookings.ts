export type BookingRange = {
  from: Date | string;
  to: Date | string;
  middayCheckout?: boolean;
};

/** Existing availability source. Empty until a stay is marked booked. */
export const bookings: BookingRange[] = [
  // {
  //   from: new Date("05-01-2024"),
  //   to: new Date("07-02-2024"),
  //   middayCheckout: true,
  // },
];
