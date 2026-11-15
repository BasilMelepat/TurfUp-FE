import Chip from "../common/Chip";

const RATINGS = [
  [0, "Any"],
  [4, "4.0+"],
  [4.5, "4.5+"],
];

const Section = ({ title, children }) => (
  <section>
    <h4 className="mb-2 text-xs font-bold uppercase tracking-wider opacity-60">{title}</h4>
    {children}
  </section>
);

const TurfFilters = ({
  showQuick = false,
  sports,
  sport,
  onSport,
  openOnly,
  onOpenOnly,
  limit,
  ceiling,
  onLimit,
  minRating,
  onRating,
  step,
}) => (
  <div className="space-y-5">
    {showQuick && (
      <Section title="Sport">
        <div className="flex flex-wrap gap-2">
          {sports.map((s) => (
            <Chip key={s} active={sport === s} onClick={() => onSport(s)}>
              {s}
            </Chip>
          ))}
        </div>
      </Section>
    )}
    <Section title={`Price per hour · ${limit >= ceiling ? "Any" : `Up to ₹${limit}`}`}>
      <input
        type="range"
        min={step * 2}
        max={ceiling}
        step={step}
        value={limit}
        onChange={(e) => onLimit(Number(e.target.value))}
        aria-label="Maximum price per hour"
        className="range range-primary range-sm"
      />
    </Section>
    <Section title="Rating">
      <div className="join w-full" role="group" aria-label="Minimum rating">
        {RATINGS.map(([value, label]) => (
          <button
            key={value}
            type="button"
            aria-pressed={minRating === value}
            onClick={() => onRating(value)}
            className={`btn btn-sm join-item flex-1 ${minRating === value ? "btn-primary text-white" : ""}`}
          >
            {label}
          </button>
        ))}
      </div>
    </Section>
    {showQuick && (
      <Section title="Availability">
        <Chip active={openOnly} onClick={() => onOpenOnly(!openOnly)}>
          <i className="h-2 w-2 rounded-full bg-green-400" /> Open now
        </Chip>
      </Section>
    )}
  </div>
);

export default TurfFilters;
