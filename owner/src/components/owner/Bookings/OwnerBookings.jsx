import { useMemo } from "react";
import { format, subHours, subMinutes } from "date-fns";
import useOwnerBookings from "@hooks/owner/useOwnerBookings";
import BookingsSkeleton from "./BookingsSkeleton";
import Ledger from "@components/common/Ledger";

const clock = (iso) => format(subMinutes(subHours(new Date(iso), 5), 30), "h:mm a");

const OwnerBookings = () => {
  const { bookings, loading, error, filterDays, setFilterDays } = useOwnerBookings();

  const rows = useMemo(
    () =>
      bookings.map((b) => ({
        id: b.id,
        name: b.userName,
        sub: b.turfName,
        meta: `${clock(b.startTime)} – ${clock(b.endTime)}`,
        status: "Confirmed",
        amount: b.totalPrice,
        date: new Date(b.bookingDate),
        order: new Date(b.startTime).getTime(),
        extra: [["Duration", `${b.duration.toFixed(1)} hrs`]],
      })),
    [bookings]
  );

  if (loading) return <BookingsSkeleton />;
  if (error) return <div className="alert alert-error shadow-lg">{error}</div>;

  return (
    <div>
      <div className="mb-4">
        <h1 className="text-4xl uppercase">Bookings</h1>
        <p className="opacity-70">Reservations across your turfs</p>
      </div>
      <Ledger
        rows={rows}
        noun="booking"
        headers={["Customer", "Slot"]}
        money
        tabs
        toolbar={
          <select
            className="select select-bordered select-sm"
            value={filterDays}
            onChange={(e) => setFilterDays(Number(e.target.value))}
            aria-label="Date range"
          >
            {[7, 15, 30].map((d) => (
              <option key={d} value={d}>
                Last {d} days
              </option>
            ))}
          </select>
        }
      />
    </div>
  );
};

export default OwnerBookings;
