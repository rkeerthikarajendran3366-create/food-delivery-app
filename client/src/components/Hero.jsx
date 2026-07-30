import { Link } from "react-router-dom";

function Hero() {
  return (
    <section className="relative min-h-[600px] flex items-center overflow-hidden">

      {/* Background Image */}
      <img
        src="https://images.unsplash.com/photo-1504674900247-0877df9cc836"
        alt="Food"
        className="absolute inset-0 w-full h-full object-cover"
      />

      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/60 to-orange-900/40"></div>


      {/* Content */}
      <div className="relative z-10 max-w-6xl mx-auto px-6 text-white">

        <h1 className="text-5xl md:text-7xl font-extrabold leading-tight">
          Delicious Food
          <span className="text-orange-400">
            {" "}Delivered Fast 🚀
          </span>
        </h1>


        <p className="mt-6 text-lg md:text-xl text-gray-200 max-w-xl">
          Discover the best restaurants near you.
          Order your favourite dishes with FoodExpress.
        </p>


        {/* Buttons */}
        <div className="mt-8 flex flex-wrap gap-5">

          <Link
            to="/restaurants"
            className="
            bg-orange-500 
            hover:bg-orange-600
            px-8 py-3 
            rounded-full
            font-bold
            text-lg
            transition
            hover:scale-105
            "
          >
            Order Now 🍔
          </Link>


          <Link
            to="/restaurants"
            className="
            border-2
            border-white
            hover:bg-white
            hover:text-black
            px-8 py-3
            rounded-full
            font-bold
            text-lg
            transition
            hover:scale-105
            "
          >
            Explore Restaurants 🍽️
          </Link>

        </div>


        {/* Stats */}
        <div className="mt-12 flex gap-10 flex-wrap">

          <div>
            <h2 className="text-3xl font-bold text-orange-400">
              500+
            </h2>
            <p>
              Restaurants
            </p>
          </div>


          <div>
            <h2 className="text-3xl font-bold text-orange-400">
              10K+
            </h2>
            <p>
              Happy Customers
            </p>
          </div>


          <div>
            <h2 className="text-3xl font-bold text-orange-400">
              30 min
            </h2>
            <p>
              Fast Delivery
            </p>
          </div>

        </div>


      </div>

    </section>
  );
}

export default Hero;