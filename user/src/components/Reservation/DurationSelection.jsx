import { getEndTime } from "../../utils/dateUtils";

const DurationSelection = ({
  selectedStartTime,
  duration,
  handleDurationChange,
  isDurationAvailable,
}) => {
  return (
    <div className="mt-6">
      <h3 className="text-lg font-semibold mb-4">Select Duration</h3>
      <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
        {[1, 2, 3].map((hours) => (
          <button
            key={hours}
            className={`btn flex-1 ${
              duration === hours ? "text-white bg-gradient-to-r from-cyan-400 via-cyan-500 to-cyan-600 shadow-lg shadow-cyan-500/50 dark:shadow-lg dark:shadow-cyan-800/80 " : "from-cyan-400 via-cyan-500 to-cyan-600 hover:bg-gradient-to-br hover:text-white"
            }`}
            onClick={() => handleDurationChange(hours)}
            disabled={!isDurationAvailable(selectedStartTime, hours)}
          >
            <div>
              <div>
                {hours} hour{hours > 1 ? "s" : ""}
              </div>
              <div className="text-sm">
                {selectedStartTime} to {getEndTime(selectedStartTime, hours)}
              </div>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};

export default DurationSelection;
