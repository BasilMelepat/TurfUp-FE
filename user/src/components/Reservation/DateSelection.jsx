import { useMemo } from "react";
import { addDays, format, isSameDay } from "date-fns";

const DAYS = 14;

const DateSelection = ({ selectedDate, handleDateChange }) => {
  const days = useMemo(() => Array.from({ length: DAYS }, (_, i) => addDays(new Date(), i)), []);

  return (
    <div>
      <h3 className="mb-3">Date</h3>
      <div role="group" aria-label="Select date" className="no-scrollbar -mx-1 flex gap-2 overflow-x-auto px-1 pb-2">
        {days.map((day) => {
          const active = isSameDay(day, selectedDate);
          return (
            <button
              key={day.toDateString()}
              type="button"
              aria-pressed={active}
              onClick={() => handleDateChange(day)}
              className={`flex w-16 shrink-0 flex-col items-center rounded-2xl border py-2 transition ${
                active ? "border-primary bg-primary text-white" : "border-base-300 bg-base-100 hover:border-primary"
              }`}
            >
              <span className="text-xs opacity-80">{format(day, "EEE")}</span>
              <span className="font-display text-2xl leading-none">{format(day, "d")}</span>
              <span className="text-xs opacity-80">{format(day, "MMM")}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default DateSelection;
