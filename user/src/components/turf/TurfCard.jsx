import { memo } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { ArrowRight, Star } from "lucide-react";
import { isOpenNow } from "../../utils/dateUtils";

const TurfCard = ({ turf, index = 0, list = false }) => {
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const { averageRating: rating, reviewCount } = turf;
  const open = isOpenNow(turf.openTime, turf.closeTime);

  return (
    <Link
      to={isLoggedIn ? `/auth/turf/${turf._id}` : `/turf/${turf._id}`}
      aria-label={`${turf.name}, ₹${turf.pricePerHour} per hour`}
      style={{ animationDelay: `${Math.min(index, 8) * 70}ms` }}
      className={`group flex overflow-hidden rounded-[20px] border border-base-300 bg-base-100 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl motion-safe:animate-rise ${
        list ? "flex-row" : "flex-row sm:flex-col"
      }`}
    >
      <div
        className={`relative shrink-0 overflow-hidden bg-base-200 ${
          list ? "w-[104px] sm:w-56" : "w-[104px] sm:aspect-video sm:w-full"
        }`}
      >
        <img
          src={turf.image}
          alt=""
          loading="lazy"
          decoding="async"
          className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
        />
        <span className="absolute left-2 top-2 flex items-center gap-1 rounded-full bg-black/55 px-2 py-0.5 text-[11px] font-semibold text-white backdrop-blur sm:left-3 sm:top-3">
          <Star size={12} className="fill-current" />
          {rating ? rating.toFixed(1) : "New"}
          {reviewCount ? ` · ${reviewCount}` : ""}
        </span>
        <span className="absolute right-3 top-3 hidden items-center gap-1.5 rounded-full bg-black/55 px-2.5 py-0.5 text-[11px] font-semibold text-white backdrop-blur sm:flex">
          <i className={`h-1.5 w-1.5 rounded-full ${open ? "bg-green-400" : "bg-red-400"}`} />
          {open ? "Open now" : "Closed"}
        </span>
      </div>

      <div className="flex min-w-0 flex-1 flex-col justify-between gap-2 p-3 sm:p-4">
        <div className="min-w-0">
          <h3 className="truncate text-xl leading-tight sm:text-[23px]">{turf.name}</h3>
          <p className="truncate text-sm opacity-70">
            {turf.location} · {turf.openTime}–{turf.closeTime}
          </p>
          <p className="mt-0.5 truncate text-sm opacity-70 sm:hidden">{turf.sportTypes?.join(" · ")}</p>
          <div className="mt-2 hidden flex-wrap gap-1.5 sm:flex">
            {turf.sportTypes?.map((sport) => (
              <span
                key={sport}
                className="rounded-md border border-base-300 px-2 py-0.5 text-[10.5px] font-semibold uppercase tracking-wider opacity-70"
              >
                {sport}
              </span>
            ))}
          </div>
        </div>
        <div className="flex items-center justify-between">
          <p>
            <span className="font-display text-xl font-bold tabular-nums sm:text-2xl">₹{turf.pricePerHour}</span>{" "}
            <span className="text-sm opacity-70">/hr</span>
          </p>
          <span className="inline-flex items-center gap-1 rounded-full bg-primary px-3 py-1.5 text-sm font-bold text-white">
            Book <ArrowRight size={14} />
          </span>
        </div>
      </div>
    </Link>
  );
};

export default memo(TurfCard);
