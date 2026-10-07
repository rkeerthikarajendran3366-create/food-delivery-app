import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import restaurants from "../data/restaurants";

const BACKEND_URL =
  "https://foodexpress-backend-p9dv.onrender.com";

function Restaurants() {
  const [ownerRestaurants, setOwnerRestaurants] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadOwnerRestaurants = async () => {
      try {
        const response = await fetch(
          `${BACKEND_URL}/api/restaurants`
        );

        const data = await response.json();

        console.log("Backend Restaurants:", data);

        if (response.ok) {
          // Your backend currently returns an array directly
          if (Array.isArray(data)) {
            setOwnerRestaurants(data);
          }

          // Also support { success: true, restaurants: [] }
          else if (
            data.success &&
            Array.isArray(data.restaurants)
          ) {
            setOwnerRestaurants(data.restaurants);
          }
        }
      } catch (error) {
        console.error(
          "Failed to load backend restaurants:",
          error
        );
      } finally {
        setLoading(false);
      }
    };

    loadOwnerRestaurants();
  }, []);

  const backendRestaurants = ownerRestaurants.map(
    (restaurant) => ({
      ...restaurant,

      // MongoDB ObjectId
      id: restaurant._id,

      isBackendRestaurant: true,

      location:
        restaurant.address ||
        restaurant.city ||
        "Available",

      costForTwo:
        restaurant.costForTwo ||
        "Available",

      menu: restaurant.menu || [],
    })
  );

  // IMPORTANT:
  // Existing 21 restaurants are kept.
  // Owner-created MongoDB restaurants are added after them.
  const allRestaurants = [
    ...restaurants,
    ...backendRestaurants,
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-6">
      <div className="max-w-7xl mx-auto">

        <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">
          🍔 Restaurants
        </h1>

        <p className="text-gray-600 dark:text-gray-300 mb-8">
          Explore restaurants and delicious food.
        </p>

        {loading && (
          <div className="text-center py-10">
            <p className="text-gray-600 dark:text-gray-300">
              Loading restaurants...
            </p>
          </div>
        )}

        {!loading && allRestaurants.length === 0 && (
          <div className="text-center py-10">
            <p className="text-gray-600 dark:text-gray-300">
              No restaurants available.
            </p>
          </div>
        )}

        {!loading && allRestaurants.length > 0 && (
          <div
            className="
              grid
              grid-cols-1
              md:grid-cols-2
              lg:grid-cols-3
              gap-6
            "
          >
            {allRestaurants.map((restaurant) => (
              <div
                key={restaurant.id}
                className="
                  bg-white
                  dark:bg-gray-800
                  rounded-xl
                  shadow-lg
                  overflow-hidden
                  hover:shadow-2xl
                  transition
                "
              >
                <img
                  src={restaurant.image}
                  alt={restaurant.name}
                  className="w-full h-56 object-cover"
                />

                <div className="p-5">

                  <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                    {restaurant.name}
                  </h2>

                  <p className="mt-2 text-gray-600 dark:text-gray-300">
                    🍽️ {restaurant.cuisine}
                  </p>

                  <p className="mt-2 text-gray-600 dark:text-gray-300">
                    ⭐ {restaurant.rating || 4.5}
                  </p>

                  <p className="mt-2 text-gray-600 dark:text-gray-300">
                    🕒{" "}
                    {restaurant.deliveryTime ||
                      "30-40 mins"}
                  </p>

                  <Link
                    to={`/restaurant/${restaurant.id}`}
                    className="
                      block
                      mt-5
                      text-center
                      bg-orange-500
                      hover:bg-orange-600
                      text-white
                      py-2
                      rounded-lg
                      font-semibold
                    "
                  >
                    View Details
                  </Link>

                </div>
              </div>
            ))}
          </div>
        )}

      </div>
    </div>
  );
}

export default Restaurants;