import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { Activity, ArrowLeft, Clock, IndianRupee, MapPin } from "lucide-react";
import useTurfData from "../../hooks/useTurfData";
import useReviews from "../../hooks/useReviews";
import Reviews from "../reviews/Reviews";
import Stars from "../common/Stars";
import TurfDetailsSkeleton from "../ui/TurfDetailsSkeleton";

const InfoItem = ({ icon: Icon, label, value }) => (
  <div className="flex items-center gap-3 rounded-2xl bg-base-200 p-3">
    <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-primary/15 text-primary">
      <Icon size={20} />
    </span>
    <div className="min-w-0">
      <p className="text-xs font-semibold uppercase tracking-wider opacity-60">{label}</p>
      <p className="truncate font-medium">{value}</p>
    </div>
  </div>
);

const TurfDetails = () => {
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const { id } = useParams();
  const navigate = useNavigate();
  const { loading, turfs } = useTurfData();
  const { averageRating } = useReviews(id);

  if (loading) return <TurfDetailsSkeleton />;

  const turf = turfs.find((t) => t._id === id);
  if (!turf) {
    return (
      <div className="container mx-auto p-6 text-center">
        <h2>Turf not found</h2>
        <button className="btn btn-primary mt-4 text-white" onClick={() => navigate(-1)}>
          Go back
        </button>
      </div>
    );
  }

  const reserve = () => navigate(isLoggedIn ? `/auth/reserve/${id}` : "/login");

  return (
    <div className="container mx-auto px-4 py-4 pb-32">
      <button onClick={() => navigate(-1)} className="btn btn-ghost btn-sm mb-3 gap-1">
        <ArrowLeft size={16} /> Back
      </button>

      <div className="grid gap-6 lg:grid-cols-2">
        <div className="relative aspect-[16/10] overflow-hidden rounded-3xl bg-base-200 lg:aspect-auto lg:min-h-[380px]">
          <img
            src={turf.image || "/banner-1.png"}
            alt={turf.name}
            className="absolute inset-0 h-full w-full object-cover"
          />
        </div>

        <div className="rounded-3xl border border-base-300 bg-base-100 p-5 shadow-sm sm:p-6">
          <h1 className="text-4xl uppercase sm:text-5xl">{turf.name}</h1>
          <p className="mt-1 flex items-center gap-1.5 opacity-70">
            <MapPin size={16} /> {turf.location}
          </p>
          <div className="mt-3 flex items-center gap-2">
            {averageRating ? (
              <>
                <Stars value={averageRating} size={18} />
                <span className="font-medium">{averageRating.toFixed(1)}</span>
              </>
            ) : (
              <span className="text-sm opacity-70">No reviews yet</span>
            )}
          </div>
          <p className="my-4 text-lg">{turf.description}</p>
          <div className="grid grid-cols-2 gap-3">
            <InfoItem icon={IndianRupee} label="Price per hour" value={`₹ ${turf.pricePerHour}`} />
            <InfoItem icon={Activity} label="Sports" value={turf.sportTypes.join(", ")} />
            <InfoItem icon={Clock} label="Opens" value={turf.openTime} />
            <InfoItem icon={Clock} label="Closes" value={turf.closeTime} />
          </div>
        </div>
      </div>

      <div className="mt-10">
        <Reviews turfId={id} />
      </div>

      <div className="fixed inset-x-0 bottom-14 z-30 border-t border-base-300 bg-base-100/95 px-4 py-3 backdrop-blur lg:bottom-0">
        <div className="container mx-auto flex items-center gap-4">
          <p>
            <b className="font-display text-2xl tabular-nums">₹{turf.pricePerHour}</b>{" "}
            <span className="text-sm opacity-70">/ hour</span>
          </p>
          <button className="btn btn-primary ml-auto px-8 text-white" onClick={reserve}>
            Reserve a slot
          </button>
        </div>
      </div>
    </div>
  );
};

export default TurfDetails;
