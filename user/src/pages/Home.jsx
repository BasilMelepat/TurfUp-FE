import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { ArrowRight } from "lucide-react";
import Footer from "../components/layout/Footer";
import TurfCard from "../components/turf/TurfCard";
import TurfCardSkeleton from "../components/ui/TurfCardSkeleton";
import useTurfData from "../hooks/useTurfData";
import banner from "/banner-2.jpeg";

const Home = () => {
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const { turfs, loading } = useTurfData();
  const recentTurfs = [...turfs]
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
    .slice(0, 4);
  const turfsPath = isLoggedIn ? "/auth/turfs" : "/turfs";

  return (
    <div className="min-h-screen bg-base-100 text-base-content">
      <section className="relative isolate mx-3 flex min-h-[300px] items-end overflow-hidden rounded-3xl bg-[#0b3d1c] text-white sm:mx-4 sm:min-h-[420px]">
        <img src={banner} alt="" className="absolute inset-0 -z-20 h-full w-full object-cover opacity-60" />
        <div className="absolute inset-0 -z-10 bg-gradient-to-t from-[#0b3d1c] via-[#0b3d1c]/50 to-transparent" />
        <div className="max-w-xl p-6 sm:p-10">
          <h1 className="text-5xl uppercase leading-[.95] sm:text-7xl">Book a turf. Show up. Play.</h1>
          <p className="mt-3 text-lg opacity-90">
            Live availability, instant payment and a QR pass for entry. No calls, no waiting.
          </p>
          <Link to={isLoggedIn ? turfsPath : "/signup"} className="btn btn-primary mt-5 gap-2 text-white">
            {isLoggedIn ? "Find a turf" : "Get started"} <ArrowRight size={16} />
          </Link>
        </div>
      </section>

      <div className="container mx-auto p-4">
        <div className="mb-4 mt-8 flex items-center justify-between">
          <h2>Recently added</h2>
          <Link to={turfsPath} className="btn btn-sm btn-ghost">
            View all
          </Link>
        </div>
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-5 lg:grid-cols-4">
          {loading
            ? Array.from({ length: 4 }, (_, i) => <TurfCardSkeleton key={i} />)
            : recentTurfs.map((turf, i) => <TurfCard key={turf._id} turf={turf} index={i} />)}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Home;
