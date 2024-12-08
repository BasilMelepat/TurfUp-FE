import { Link } from "react-router-dom";

import { Carousel, Footer } from "@components/common";

import banner1 from "/banner-1.jpg";
import banner2 from "/banner-2.jpg";
import banner3 from "/banner-3.jpg";

const Home = () => {
  const slides = [banner1, banner2, banner3];

  return (
    <div className="  bg-base-100 text-base-content">
      <div className="hero min-h-[82vh] bg-base-200 ">
        <div className="hero-content flex-col lg:flex-row-reverse">
          <div className="w-full lg:w-1/2">
            <Carousel slides={slides} />
          </div>
          <div className="w-full lg:w-1/2">
            <h1 className="text-5xl font-bold">Welcome to TurfUp</h1>
            <p className="py-6">
            we believe every game deserves the perfect stage. Whether you're planning a friendly match, 
            a competitive tournament, or just some quality time with your squad, we’ve got you covered.
            </p>
            <Link to="/login" className="btn btn-accent">
              Login
            </Link>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Home;
