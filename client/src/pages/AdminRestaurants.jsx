import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import restaurants from "../data/restaurants";

const BACKEND_URL =
  "https://foodexpress-backend-p9dv.onrender.com";

function AdminRestaurants() {
  const [backendRestaurants, setBackendRestaurants] =
    useState([]);

  const [loading, setLoading] = useState(true);

  const [error, setError] = useState("");

  // --------------------------------------------------
  // FETCH DATABASE RESTAURANTS
  // --------------------------------------------------

  useEffect(() => {
    const fetchRestaurants = async () => {
      try {
        setLoading(true);
        setError("");

        const response = await fetch(
          `${BACKEND_URL}/api/restaurants`
        );

        const data = await response.json();

        if (!response.ok) {
          throw new Error(
            data.message ||
              "Failed to fetch restaurants"
          );
        }

        /*
          Backend may return:
          [
            restaurant,
            restaurant
          ]

          OR:

          {
            restaurants: [...]
          }
        */

        const restaurantData =
          Array.isArray(data)
            ? data
            : data.restaurants || [];

        setBackendRestaurants(
          restaurantData
        );
      } catch (error) {
        console.error(
          "❌ Fetch Restaurants Error:",
          error
        );

        setError(
          "Unable to load database restaurants."
        );
      } finally {
        setLoading(false);
      }
    };

    fetchRestaurants();
  }, []);

  // --------------------------------------------------
  // TOTAL RESTAURANTS
  // --------------------------------------------------

  const totalRestaurants =
    restaurants.length +
    backendRestaurants.length;

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 p-6">
      <div className="max-w-7xl mx-auto">

        {/* BACK BUTTON */}
        <Link
          to="/admin"
          className="
            inline-block
            mb-6
            bg-orange-500
            hover:bg-orange-600
            text-white
            px-5
            py-2
            rounded-lg
            transition
          "
        >
          ← Back to Dashboard
        </Link>

        {/* HEADER */}
        <div className="mb-8">
          <h1
            className="
              text-4xl
              font-bold
              text-gray-900
              dark:text-white
            "
          >
            🍔 Restaurants
          </h1>

          <p
            className="
              mt-2
              text-gray-600
              dark:text-gray-300
            "
          >
            View and manage all restaurants.
          </p>
        </div>

        {/* TOTAL COUNT */}
        <div
          className="
            mb-6
            bg-white
            dark:bg-gray-800
            rounded-xl
            shadow-lg
            p-5
          "
        >
          <p
            className="
              text-lg
              font-semibold
              text-gray-900
              dark:text-white
            "
          >
            Total Restaurants:{" "}
            <span className="text-orange-500">
              {totalRestaurants}
            </span>
          </p>

          <div
            className="
              mt-2
              text-sm
              text-gray-600
              dark:text-gray-300
            "
          >
            <p>
              Existing Restaurants:{" "}
              <strong>
                {restaurants.length}
              </strong>
            </p>

            <p>
              Owner Restaurants:{" "}
              <strong>
                {backendRestaurants.length}
              </strong>
            </p>
          </div>
        </div>

        {/* LOADING */}
        {loading && (
          <div
            className="
              mb-6
              bg-white
              dark:bg-gray-800
              rounded-xl
              shadow-lg
              p-6
              text-center
            "
          >
            <p
              className="
                text-gray-700
                dark:text-gray-300
              "
            >
              Loading owner restaurants...
            </p>
          </div>
        )}

        {/* ERROR */}
        {error && (
          <div
            className="
              mb-6
              bg-red-50
              dark:bg-red-900/30
              border
              border-red-200
              dark:border-red-700
              rounded-xl
              p-5
            "
          >
            <p
              className="
                text-red-700
                dark:text-red-300
              "
            >
              {error}
            </p>
          </div>
        )}

        {/* =================================================
            EXISTING LOCAL RESTAURANTS
        ================================================= */}

        <div className="mb-10">

          <h2
            className="
              text-2xl
              font-bold
              mb-5
              text-gray-900
              dark:text-white
            "
          >
            🍴 Existing Restaurants
          </h2>

          {restaurants.length > 0 ? (
            <div
              className="
                grid
                grid-cols-1
                md:grid-cols-2
                lg:grid-cols-3
                gap-6
              "
            >
              {restaurants.map(
                (restaurant) => (
                  <div
                    key={`local-${restaurant.id}`}
                    className="
                      bg-white
                      dark:bg-gray-800
                      rounded-xl
                      shadow-lg
                      overflow-hidden
                      hover:shadow-2xl
                      hover:-translate-y-1
                      transition
                    "
                  >
                    {/* IMAGE */}
                    <img
                      src={restaurant.image}
                      alt={restaurant.name}
                      className="
                        w-full
                        h-48
                        object-cover
                      "
                    />

                    <div className="p-5">

                      <div
                        className="
                          inline-block
                          mb-3
                          bg-gray-200
                          dark:bg-gray-700
                          text-gray-700
                          dark:text-gray-200
                          text-xs
                          font-semibold
                          px-3
                          py-1
                          rounded-full
                        "
                      >
                        Existing Restaurant
                      </div>

                      <h2
                        className="
                          text-xl
                          font-bold
                          text-gray-900
                          dark:text-white
                        "
                      >
                        {restaurant.name}
                      </h2>

                      <p
                        className="
                          mt-2
                          text-gray-600
                          dark:text-gray-300
                        "
                      >
                        🍽️ {restaurant.cuisine}
                      </p>

                      <div
                        className="
                          mt-3
                          space-y-2
                        "
                      >
                        <p
                          className="
                            text-gray-700
                            dark:text-gray-300
                          "
                        >
                          ⭐ Rating:{" "}
                          <strong>
                            {restaurant.rating}
                          </strong>
                        </p>

                        <p
                          className="
                            text-gray-700
                            dark:text-gray-300
                          "
                        >
                          ⚡ Delivery:{" "}
                          <strong>
                            {
                              restaurant.deliveryTime
                            }
                          </strong>
                        </p>

                        <p
                          className="
                            text-gray-700
                            dark:text-gray-300
                          "
                        >
                          💰 Cost for Two:{" "}
                          <strong>
                            ₹
                            {
                              restaurant.costForTwo
                            }
                          </strong>
                        </p>
                      </div>

                      {/* MENU */}
                      <div
                        className="
                          mt-4
                          p-4
                          bg-orange-50
                          dark:bg-gray-700
                          rounded-lg
                        "
                      >
                        <h3
                          className="
                            font-bold
                            text-gray-900
                            dark:text-white
                            mb-2
                          "
                        >
                          🍴 Menu
                        </h3>

                        {restaurant.menu &&
                        restaurant.menu.length >
                          0 ? (
                          <div className="space-y-2">
                            {restaurant.menu.map(
                              (
                                item,
                                index
                              ) => (
                                <div
                                  key={
                                    item.id ||
                                    index
                                  }
                                  className="
                                    flex
                                    justify-between
                                    items-center
                                    border-b
                                    border-gray-200
                                    dark:border-gray-600
                                    pb-2
                                  "
                                >
                                  <span
                                    className="
                                      text-gray-700
                                      dark:text-gray-200
                                    "
                                  >
                                    {item.name}
                                  </span>

                                  <span
                                    className="
                                      font-semibold
                                      text-orange-600
                                      dark:text-orange-400
                                    "
                                  >
                                    ₹
                                    {
                                      item.price
                                    }
                                  </span>
                                </div>
                              )
                            )}
                          </div>
                        ) : (
                          <p
                            className="
                              text-gray-500
                              dark:text-gray-300
                            "
                          >
                            No menu items available.
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                )
              )}
            </div>
          ) : (
            <div
              className="
                bg-white
                dark:bg-gray-800
                rounded-xl
                shadow-lg
                p-8
                text-center
              "
            >
              <p
                className="
                  text-gray-600
                  dark:text-gray-300
                "
              >
                No existing restaurants found.
              </p>
            </div>
          )}
        </div>

        {/* =================================================
            OWNER CREATED RESTAURANTS
        ================================================= */}

        <div>

          <h2
            className="
              text-2xl
              font-bold
              mb-5
              text-gray-900
              dark:text-white
            "
          >
            🏪 Restaurant Owner Businesses
          </h2>

          {backendRestaurants.length >
          0 ? (
            <div
              className="
                grid
                grid-cols-1
                md:grid-cols-2
                lg:grid-cols-3
                gap-6
              "
            >
              {backendRestaurants.map(
                (restaurant) => (
                  <div
                    key={
                      restaurant._id ||
                      restaurant.id
                    }
                    className="
                      bg-white
                      dark:bg-gray-800
                      rounded-xl
                      shadow-lg
                      overflow-hidden
                      hover:shadow-2xl
                      hover:-translate-y-1
                      transition
                    "
                  >

                    {/* IMAGE */}

                    {restaurant.image ? (
                      <img
                        src={
                          restaurant.image
                        }
                        alt={
                          restaurant.name
                        }
                        className="
                          w-full
                          h-48
                          object-cover
                        "
                      />
                    ) : (
                      <div
                        className="
                          w-full
                          h-48
                          bg-orange-100
                          dark:bg-gray-700
                          flex
                          items-center
                          justify-center
                          text-6xl
                        "
                      >
                        🍔
                      </div>
                    )}

                    <div className="p-5">

                      {/* BADGE */}

                      <div
                        className="
                          inline-block
                          mb-3
                          bg-green-100
                          dark:bg-green-900/40
                          text-green-700
                          dark:text-green-300
                          text-xs
                          font-semibold
                          px-3
                          py-1
                          rounded-full
                        "
                      >
                        Restaurant Owner
                      </div>

                      {/* NAME */}

                      <h2
                        className="
                          text-xl
                          font-bold
                          text-gray-900
                          dark:text-white
                        "
                      >
                        {restaurant.name}
                      </h2>

                      {/* CUISINE */}

                      <p
                        className="
                          mt-2
                          text-gray-600
                          dark:text-gray-300
                        "
                      >
                        🍽️{" "}
                        {restaurant.cuisine ||
                          "Not specified"}
                      </p>

                      {/* DETAILS */}

                      <div
                        className="
                          mt-4
                          space-y-2
                        "
                      >

                        <p
                          className="
                            text-gray-700
                            dark:text-gray-300
                          "
                        >
                          ⭐ Rating:{" "}
                          <strong>
                            {restaurant.rating ||
                              "N/A"}
                          </strong>
                        </p>

                        <p
                          className="
                            text-gray-700
                            dark:text-gray-300
                          "
                        >
                          ⚡ Delivery:{" "}
                          <strong>
                            {
                              restaurant.deliveryTime
                            }
                          </strong>
                        </p>

                        {restaurant.description && (
                          <p
                            className="
                              text-gray-700
                              dark:text-gray-300
                            "
                          >
                            📝{" "}
                            {
                              restaurant.description
                            }
                          </p>
                        )}

                        {restaurant.ownerId && (
                          <p
                            className="
                              text-gray-700
                              dark:text-gray-300
                              break-all
                            "
                          >
                            👤 Owner ID:{" "}
                            <strong>
                              {typeof restaurant.ownerId ===
                              "object"
                                ? restaurant
                                    .ownerId
                                    ._id
                                : restaurant.ownerId}
                            </strong>
                          </p>
                        )}

                      </div>

                      {/* MENU */}

                      <div
                        className="
                          mt-4
                          p-4
                          bg-orange-50
                          dark:bg-gray-700
                          rounded-lg
                        "
                      >
                        <h3
                          className="
                            font-bold
                            text-gray-900
                            dark:text-white
                            mb-2
                          "
                        >
                          🍴 Menu
                        </h3>

                        {restaurant.menu &&
                        restaurant.menu.length >
                          0 ? (
                          <div className="space-y-2">
                            {restaurant.menu.map(
                              (
                                item,
                                index
                              ) => (
                                <div
                                  key={
                                    item._id ||
                                    item.id ||
                                    index
                                  }
                                  className="
                                    flex
                                    justify-between
                                    items-center
                                    border-b
                                    border-gray-200
                                    dark:border-gray-600
                                    pb-2
                                  "
                                >
                                  <span
                                    className="
                                      text-gray-700
                                      dark:text-gray-200
                                    "
                                  >
                                    {item.name}
                                  </span>

                                  <span
                                    className="
                                      font-semibold
                                      text-orange-600
                                      dark:text-orange-400
                                    "
                                  >
                                    ₹
                                    {
                                      item.price
                                    }
                                  </span>
                                </div>
                              )
                            )}
                          </div>
                        ) : (
                          <p
                            className="
                              text-gray-500
                              dark:text-gray-300
                            "
                          >
                            No menu items available.
                          </p>
                        )}
                      </div>

                    </div>
                  </div>
                )
              )}
            </div>
          ) : !loading ? (
            <div
              className="
                bg-white
                dark:bg-gray-800
                rounded-xl
                shadow-lg
                p-10
                text-center
              "
            >
              <div className="text-5xl mb-4">
                🏪
              </div>

              <h2
                className="
                  text-xl
                  font-bold
                  text-gray-900
                  dark:text-white
                "
              >
                No Owner Restaurants Yet
              </h2>

              <p
                className="
                  mt-2
                  text-gray-600
                  dark:text-gray-300
                "
              >
                Approved restaurant owner
                businesses will appear here.
              </p>
            </div>
          ) : null}

        </div>

      </div>
    </div>
  );
}

export default AdminRestaurants;