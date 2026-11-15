import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { format } from "date-fns";
import DateSelection from "./DateSelection";
import TimeSelection from "./TimeSelection";
import DurationSelection from "./DurationSelection";
import ReservationSummary from "./ReservationSummary";
import useReservation from "../../hooks/useReservation";
import ReservationSkeleton from "../ui/ReservationSkeleton";
import { getEndTime } from "../../utils/dateUtils";

const Panel = ({ children }) => (
  <section className="mb-4 rounded-3xl border border-base-300 bg-base-100 p-4 shadow-sm sm:p-6">{children}</section>
);

const Reservation = () => {
  const navigate = useNavigate();
  const {
    selectedDate,
    selectedStartTime,
    duration,
    availableTimes,
    timeSlots,
    pricePerHour,
    handleDateChange,
    handleTimeSelection,
    handleDurationChange,
    isTimeSlotBooked,
    isDurationAvailable,
    confirmReservation,
    loading,
  } = useReservation();

  if (loading) return <ReservationSkeleton />;

  const canPay = Boolean(selectedStartTime) && duration > 0 && isDurationAvailable(selectedStartTime, duration);
  const total = pricePerHour * duration;
  const steps = ["Date", "Time", "Pay"];
  const stepsDone = 1 + Number(Boolean(selectedStartTime)) + Number(canPay);

  return (
    <div className="container mx-auto max-w-4xl px-4 py-4 pb-36">
      <button onClick={() => navigate(-1)} className="btn btn-ghost btn-sm mb-2 gap-1">
        <ArrowLeft size={16} /> Back
      </button>
      <h1 className="mb-3 text-4xl uppercase">Reserve a slot</h1>

      <ol className="mb-4 flex gap-2 text-sm" aria-label="Progress">
        {steps.map((label, i) => (
          <li
            key={label}
            className={`flex-1 border-b-4 pb-1 ${i < stepsDone ? "border-primary font-semibold" : "border-base-300 opacity-60"}`}
          >
            {i + 1} {label}
          </li>
        ))}
      </ol>

      <Panel>
        <DateSelection selectedDate={selectedDate} handleDateChange={handleDateChange} />
      </Panel>
      <Panel>
        <TimeSelection
          availableTimes={availableTimes}
          selectedStartTime={selectedStartTime}
          handleTimeSelection={handleTimeSelection}
          isTimeSlotBooked={isTimeSlotBooked}
          timeSlots={timeSlots}
          duration={duration}
        />
      </Panel>
      {selectedStartTime && (
        <Panel>
          <DurationSelection
            selectedStartTime={selectedStartTime}
            duration={duration}
            handleDurationChange={handleDurationChange}
            isDurationAvailable={isDurationAvailable}
          />
          {duration > 0 && (
            <ReservationSummary
              selectedDate={selectedDate}
              selectedStartTime={selectedStartTime}
              duration={duration}
              pricePerHour={pricePerHour}
            />
          )}
        </Panel>
      )}

      <div className="fixed inset-x-0 bottom-14 z-30 border-t border-base-300 bg-base-100/95 px-4 py-3 backdrop-blur lg:bottom-0">
        <div className="mx-auto flex max-w-4xl items-center gap-4">
          <div className="min-w-0">
            <p className="font-display text-2xl leading-none tabular-nums">{canPay ? `₹${total}` : "Select a time"}</p>
            {canPay && (
              <p className="truncate text-sm opacity-70">
                {format(selectedDate, "d MMM")} · {selectedStartTime}–{getEndTime(selectedStartTime, duration)}
              </p>
            )}
          </div>
          <button className="btn btn-primary ml-auto px-8 text-white" disabled={!canPay} onClick={confirmReservation}>
            Pay {canPay ? `₹${total}` : ""}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Reservation;
