import { getEndTime } from "../../utils/dateUtils";

const DurationSelection = ({ selectedStartTime, duration, handleDurationChange, isDurationAvailable }) => (
  <div>
    <h3 className="mb-3">Duration</h3>
    <div className="join w-full" role="group" aria-label="Duration">
      {[1, 2, 3].map((hours) => (
        <button
          key={hours}
          type="button"
          aria-pressed={duration === hours}
          onClick={() => handleDurationChange(hours)}
          disabled={!isDurationAvailable(selectedStartTime, hours)}
          className={`btn join-item h-auto flex-1 flex-col gap-0 py-2 ${duration === hours ? "btn-primary text-white" : ""}`}
        >
          <span className="font-semibold">
            {hours} hour{hours > 1 ? "s" : ""}
          </span>
          <span className="text-xs font-normal opacity-80">
            {selectedStartTime} to {getEndTime(selectedStartTime, hours)}
          </span>
        </button>
      ))}
    </div>
  </div>
);

export default DurationSelection;
