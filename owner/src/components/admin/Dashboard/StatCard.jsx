import CountUp from "react-countup";

const StatCard = ({ title, value, icon: Icon, className = "" }) => (
  <div className={`rounded-2xl border-t-4 border-primary bg-base-100 p-4 shadow-sm ${className}`}>
    <div className="flex items-center justify-between">
      <h2 className="text-sm font-medium opacity-70">{title}</h2>
      <Icon className="h-5 w-5 text-primary" />
    </div>
    <p className="mt-1 font-display text-4xl font-bold tabular-nums">
      <CountUp end={value} duration={2} separator="," />
    </p>
  </div>
);

export default StatCard;
