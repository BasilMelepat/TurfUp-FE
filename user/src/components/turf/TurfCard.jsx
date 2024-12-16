import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import useReviews from "../../hooks/useReviews";

const TurfCard = ({ turf }) => {
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const { averageRating } = useReviews(turf._id);

  return (
    <div className="card bg-base-100 shadow-xl animate-bounce-fade-in">
      <figure>
        <img
          src={turf.image}
          alt={turf.name}
          className="w-full h-48 object-cover"
        />
      </figure>
      <div className="card-body bg-base-200 flex text-center justify-center items-center">
        <h2 className="card-title">{turf.name}</h2>
        
        {/* Rating Display */}
        <div className="flex items-center space-x-2">
          <div className="rating rating-sm">
            {averageRating ? (
              [1, 2, 3, 4, 5].map((star) => (
                <input
                  key={star}
                  type="radio"
                  name={`rating-${turf._id}`}
                  className="mask mask-star-2 bg-orange-400"
                  checked={star === Math.round(averageRating)}
                  readOnly
                />
              ))
            ) : (
              <p className="text-xs opacity-70">No reviews</p>
            )}
          </div>
          {averageRating && (
            <span className="text-sm opacity-70">
              ({averageRating.toFixed(1)})
            </span>
          )}
        </div>

        <div className="flex flex-wrap justify-center items-center gap-2 mt-2">
          {turf.sportTypes.map((sport, index) => (
            <span key={index} className="badge badge-outline">
              {sport}
            </span>
          ))}
        </div>
        <p className="mt-2">
          Open: {turf.openTime} - {turf.closeTime}
        </p>
        <div className="card-actions mt-4">
          <Link
            to={isLoggedIn ? `/auth/turf/${turf._id}` : `/turf/${turf._id}`}
            className="relative inline-flex items-center justify-center p-0.5 mb-2 me-e text-sm font-medium rounded-lg group bg-gradient-to-br from-green-400 to-blue-600 group-hover:from-green-400 group-hover:to-blue-600 hover:text-white dark:text-dark"
          >
            <span className="relative px-10 py-2.5 transition-all ease-in duration-75 bg-base-100 rounded-md group-hover:bg-opacity-0">
              View Details
            </span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default TurfCard;