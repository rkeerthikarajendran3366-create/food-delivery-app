import { Link } from "react-router-dom";
import restaurants from "../data/restaurants";

function AdminRestaurants() {
  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 p-6">
      <div className="max-w-6xl mx-auto">

        {/* Back Button */}
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

        {/* Header */}
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
            Manage restaurants and menu items.
          </p>
        </div>

        {/* Restaurant Count */}
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
              {restaurants.length}
            </span>
          </p>
        </div>

        {/* Restaurants */}
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
            {restaurants.map((restaurant) => (
              <div
                key={restaurant.id}
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
                {/* Restaurant Image */}
                <img
                  src={restaurant.image}
                  alt={restaurant.name}
                  className="
                    w-full
                    h-48
                    object-cover
                  "
                />

                {/* Restaurant Details */}
                <div className="p-5">

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

                  <div className="mt-3 space-y-2">

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
                        {restaurant.deliveryTime}
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
                        ₹{restaurant.costForTwo}
                      </strong>
                    </p>

                  </div>

                  {/* Menu Items */}
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
                    restaurant.menu.length > 0 ? (
                      <div className="space-y-2">
                        {restaurant.menu.map(
                          (item, index) => (
                            <div
                              key={
                                item.id || index
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
                                ₹{item.price}
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
            ))}
          </div>
        ) : (
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
              🍔
            </div>

            <h2
              className="
                text-xl
                font-bold
                text-gray-900
                dark:text-white
              "
            >
              No Restaurants Found
            </h2>
          </div>
        )}

      </div>
    </div>
  );
}

export default AdminRestaurants;