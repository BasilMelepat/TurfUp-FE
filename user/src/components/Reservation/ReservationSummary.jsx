import { format } from "date-fns";
import { getEndTime } from "../../utils/dateUtils";

const ReservationSummary = ({ selectedDate, selectedStartTime, duration, pricePerHour }) => (
  <p className="mt-3 text-sm opacity-70">
    {format(selectedDate, "d MMM yyyy")} · {selectedStartTime} to {getEndTime(selectedStartTime, duration)} · ₹
    {pricePerHour} × {duration}. A failed or conflicting payment is refunded automatically.
  </p>
);

export default ReservationSummary;
