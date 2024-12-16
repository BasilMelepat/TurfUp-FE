import { Link } from "react-router-dom";
import Carousel from "../components/common/Carousel";
import Footer from "../components/layout/Footer";
import useTurfData from "../hooks/useTurfData";
import TurfCard from "../components/turf/TurfCard";
import TurfCardSkeleton from "../components/ui/TurfCardSkeleton";
import { useSelector } from "react-redux";
import banner1 from "/banner-1.png"
import banner2 from "/banner-2.jpeg"
import banner3 from "/banner-3.jpeg"
 
const Home = () => {
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const { turfs, loading } = useTurfData();
  const slides = [ banner1, banner2, banner3];


  return (
    <div className="min-h-screen bg-base-100 text-base-content">
      <div className="hero min-h-[70vh] bg-base-200">
        <div className="hero-content flex-col lg:flex-row-reverse animate-slide-in-right">
          <div className="w-full lg:w-1/2">
            <Carousel slides={slides} />
          </div>
          <div className="w-full lg:w-1/2 animate-zoom-in">
            <h1 className="text-5xl font-bold ">Welcome to <span class="text-transparent bg-clip-text bg-gradient-to-r to-emerald-600 from-sky-400">TurfUp:</span></h1>
            <p className="py-6">
            Explore our available slots, grab your gear, and let the games begin! 
            At TurfUp, it’s all about you, your team, and unforgettable moments on the field.</p>
            <p className="py-6">
            Let’s TurfUp and play on!
            </p>
            <Link to={isLoggedIn ? "/auth/turfs" : "/signup"} className="text-white no bg-gradient-to-r from-green-400 via-green-500 to-green-600 hover:bg-gradient-to-br font-medium rounded-lg  px-5 py-2.5 text-center me-2 mb-2">
              Get Started
            </Link>
          </div>
        </div>
      </div>
      <div className="container mx-auto  p-4 animate-slide-in-left">
        <h2 className="text-3xl font-bold mb-6 mt-10">Featured Turfs</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {loading
            ? Array.from({ length: 3 }).map((_, index) => (
                <TurfCardSkeleton key={`skeleton-${index}`} />
              ))
            : turfs
                .slice(0, 3)
                .map((turf) => <TurfCard key={turf._id} turf={turf} />)}
        </div>
        
        <div className="text-center mt-8">
          <Link
            to={isLoggedIn ? "/auth/turfs" : "/turfs"}
            className="text-white no bg-gradient-to-r from-green-400 via-green-500 to-green-600 hover:bg-gradient-to-br font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-10">
            View More Turfs
          </Link>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Home;