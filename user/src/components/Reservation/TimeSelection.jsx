import { parse, isAfter, addHours } from "date-fns";

const TimeSelection = ({
  availableTimes,
  selectedStartTime,
  handleTimeSelection,
  isTimeSlotBooked,
  timeSlots,
  duration,
}) => {
  const closeTime = parse(timeSlots.closeTime, "hh:mm a", new Date());
  const start = selectedStartTime ? parse(selectedStartTime, "hh:mm a", new Date()) : null;
  const end = start && duration ? addHours(start, duration) : null;

  const isSelected = (time) => {
    if (!start || !end) return false;
    const current = parse(time, "hh:mm a", new Date());
    return current >= start && current < end;
  };
  const isDisabled = (time) =>
    isAfter(parse(time, "hh:mm a", new Date()), closeTime) || isTimeSlotBooked(time);

  return (
    <div>
      <div className="mb-3 flex items-baseline justify-between">
        <h3>Start time</h3>
        <span className="text-sm opacity-60">Struck-through = booked</span>
      </div>
      <div className="grid grid-cols-3 gap-2 sm:grid-cols-4 md:grid-cols-6">
        {availableTimes.map((time) => {
          const disabled = isDisabled(time);
          const selected = isSelected(time);
          return (
            <button
              key={time}
              type="button"
              aria-pressed={selected}
              onClick={() => handleTimeSelection(time)}
              disabled={disabled}
              className={`btn btn-sm font-medium ${
                selected
                  ? "btn-primary text-white"
                  : disabled
                  ? "btn-disabled line-through"
                  : "btn-outline border-base-300"
              }`}
            >
              {time}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default TimeSelection;
