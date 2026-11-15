import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { Calendar, Clock, IndianRupee, MapPin } from "lucide-react";
import useBookingHistory from "../../hooks/useBookingHistory";
import useWriteReview from "../../hooks/useWriteReview";
import TurfBookingHistorySkeleton from "../ui/TurfBookingHistorySkeleton";
import WriteReview from "../reviews/WriteReview";

const TABS = [
  ["upcoming", "Upcoming"],
  ["past", "Past"],
];

const TurfBookingHistory = () => {
  const { loading, bookings } = useBookingHistory();
  const [tab, setTab] = useState("upcoming");
  const {
    isReviewModalOpen,
    rating,
    review,
    isSubmitting,
    openReviewModal,
    closeReviewModal,
    handleRatingChange,
    handleReviewChange,
    submitReview,
  } = useWriteReview();

  const visible = useMemo(() => {
    const now = Date.now();
    return bookings
      .filter((b) => (tab === "past") === (b.timeSlot.endsAt < now))
      .sort((a, b) => (tab === "past" ? b : a).timeSlot.startsAt - (tab === "past" ? a : b).timeSlot.startsAt);
  }, [bookings, tab]);

  if (loading) return <TurfBookingHistorySkeleton />;

  return (
    <div className="container mx-auto min-h-screen px-4 py-4">
      <h1 className="mb-3 text-4xl uppercase">My bookings</h1>
      <div className="join mb-5 w-full max-w-xs" role="group" aria-label="Booking period">
        {TABS.map(([value, label]) => (
          <button
            key={value}
            type="button"
            aria-pressed={tab === value}
            onClick={() => setTab(value)}
            className={`btn join-item flex-1 ${tab === value ? "btn-primary text-white" : ""}`}
          >
            {label}
          </button>
        ))}
      </div>

      {visible.length === 0 ? (
        <div className="rounded-3xl border border-base-300 p-10 text-center">
          <h3>Nothing here yet</h3>
          <p className="mb-4 opacity-70">Your {tab} bookings will show up here.</p>
          <Link to="/auth/turfs" className="btn btn-primary text-white">
            Find a turf
          </Link>
        </div>
      ) : (
        <div className="grid gap-4 md:grid-cols-2">
          {visible.map((booking, i) => (
            <article
              key={booking._id}
              style={{ animationDelay: `${Math.min(i, 8) * 70}ms` }}
              className="rounded-3xl border border-base-300 bg-base-100 p-4 shadow-sm motion-safe:animate-rise"
            >
              <div className="flex items-start justify-between gap-3">
                <div className="min-w-0 space-y-1.5">
                  <h3 className="truncate text-2xl">{booking.turf.name}</h3>
                  <p className="flex items-center gap-2 text-sm opacity-80">
                    <MapPin size={15} /> {booking.turf.location}
                  </p>
                  <p className="flex items-center gap-2 text-sm opacity-80">
                    <Calendar size={15} /> {booking.timeSlot.date}
                  </p>
                  <p className="flex items-center gap-2 text-sm opacity-80">
                    <Clock size={15} /> {booking.timeSlot.formattedStartTime} – {booking.timeSlot.formattedEndTime}
                  </p>
                  <p className="flex items-center gap-2 font-semibold">
                    <IndianRupee size={15} /> {booking.totalPrice}
                  </p>
                </div>
                <img
                  src={booking.qrCode}
                  alt="Booking QR code"
                  loading="lazy"
                  className="h-28 w-28 shrink-0 rounded-xl bg-white p-1"
                />
              </div>
              {tab === "past" && (
                <button
                  className="btn btn-outline btn-primary btn-sm mt-3"
                  onClick={() => openReviewModal(booking.turf._id)}
                >
                  Write a review
                </button>
              )}
            </article>
          ))}
        </div>
      )}

      {isReviewModalOpen && (
        <WriteReview
          rating={rating}
          review={review}
          isSubmitting={isSubmitting}
          onClose={closeReviewModal}
          onRatingChange={handleRatingChange}
          onReviewChange={handleReviewChange}
          onSubmit={submitReview}
        />
      )}
    </div>
  );
};

export default TurfBookingHistory;
