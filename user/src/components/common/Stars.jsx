import { Star } from "lucide-react";

const Stars = ({ value = 0, size = 14 }) => (
  <span className="inline-flex" role="img" aria-label={`${value.toFixed(1)} out of 5`}>
    {[1, 2, 3, 4, 5].map((n) => (
      <Star
        key={n}
        size={size}
        className={`text-orange-400 ${n <= Math.round(value) ? "fill-current" : "opacity-25"}`}
      />
    ))}
  </span>
);

export default Stars;
