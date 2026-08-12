import { Link } from "react-router-dom";
import { useWishlist } from "../context/WishlistContext";
import { useCart } from "../context/CartContext";
import toast from "react-hot-toast";

function Wishlist() {
  const {
    wishlist,
    removeFromWishlist,
  } = useWishlist();

  const { addToCart } = useCart();

  // Add food item to cart
  const handleAddToCart = (item) => {
    addToCart(item);

    toast.success(
      `${item.name} added to cart 🛒`
    );
  };

  // Remove restaurant from wishlist
  const handleRemove = (id) => {
    removeFromWishlist(id);
  };

  return (
    <div
      className="
        min-h-screen
        bg-gradient-to-br
        from-orange-50
        via-yellow-50
        to-red-50
        dark:from-gray-900
        dark:via-gray-800
        dark:to-red-950
        p-6
        transition
      "
    >
      {/* Page Title */}
      <h1
        className="
          text-4xl
          font-bold
          mb-8
          text-gray-900
          dark:text-white
        "
      >
        ❤️ My Wishlist
      </h1>

      {/* Empty Wishlist */}
      {wishlist.length === 0 ? (
        <div
          className="
            flex
            flex-col
            items-center
            justify-center
            mt-20
            text-center
          "
        >
          <p className="text-6xl mb-5">
            😔
          </p>

          <h2
            className="
              text-2xl
              font-semibold
              text-gray-700
              dark:text-gray-300
            "
          >
            No favourite restaurants yet
          </h2>

          <p
            className="
              mt-2
              text-gray-600
              dark:text-gray-400
            "
          >
            Add your favourite restaurants to
            your wishlist ❤️
          </p>

          <Link
            to="/restaurants"
            className="
              mt-6
              bg-orange-500
              hover:bg-orange-600
              text-white
              px-6
              py-3
              rounded-full
              font-semibold
              transition
            "
          >
            Explore Restaurants 🍽️
          </Link>
        </div>
      ) : (
        <div
          className="
            grid
            md:grid-cols-2
            xl:grid-cols-3
            gap-8
          "
        >
          {wishlist.map((restaurant) => (
            <div
              key={restaurant.id}
              className="
                bg-white
                dark:bg-gray-800
                rounded-2xl
                shadow-lg
                overflow-hidden
                hover:shadow-2xl
                transition
              "
            >
              {/* Restaurant Image */}
              <img
                src={restaurant.image}
                alt={restaurant.name}
                className="
                  w-full
                  h-52
                  object-cover
                "
              />

              <div className="p-5">
                {/* Restaurant Name */}
                <h2
                  className="
                    text-2xl
                    font-bold
                    text-gray-900
                    dark:text-white
                  "
                >
                  {restaurant.name}
                </h2>

                {/* Restaurant Details */}
                <p
                  className="
                    mt-2
                    text-gray-600
                    dark:text-gray-300
                  "
                >
                  🍴 {restaurant.cuisine}
                </p>

                <p
                  className="
                    mt-2
                    text-gray-700
                    dark:text-gray-200
                  "
                >
                  ⭐ {restaurant.rating}
                </p>

                <p
                  className="
                    mt-1
                    text-gray-700
                    dark:text-gray-200
                  "
                >
                  🚴 {restaurant.deliveryTime}
                </p>

                {/* Menu Heading */}
                <h3
                  className="
                    text-xl
                    font-bold
                    mt-6
                    mb-4
                    text-gray-900
                    dark:text-white
                  "
                >
                  🍽️ Favourite Food
                </h3>

                {/* Food Items */}
                {restaurant.menu &&
                  restaurant.menu.length > 0 ? (
                  <div className="space-y-4">
                    {restaurant.menu.map((item) => (
                      <div
                        key={`${restaurant.id}-${item.id}`}
                        className="
                          border
                          border-gray-200
                          dark:border-gray-700
                          rounded-xl
                          p-3
                          bg-gray-50
                          dark:bg-gray-900
                        "
                      >
                        <div
                          className="
                            flex
                            gap-3
                            items-center
                          "
                        >
                          {/* Food Image */}
                          <img
                            src={item.image}
                            alt={item.name}
                            className="
                              w-20
                              h-20
                              rounded-lg
                              object-cover
                            "
                          />

                          {/* Food Details */}
                          <div className="flex-1">
                            <h4
                              className="
                                font-bold
                                text-gray-900
                                dark:text-white
                              "
                            >
                              {item.name}
                            </h4>

                            <p
                              className="
                                text-orange-600
                                font-semibold
                                mt-1
                              "
                            >
                              ₹{item.price}
                            </p>
                          </div>
                        </div>

                        {/* Add Food to Cart */}
                        <button
                          onClick={() =>
                            handleAddToCart(item)
                          }
                          className="
                            mt-3
                            w-full
                            bg-green-500
                            hover:bg-green-600
                            text-white
                            py-2
                            rounded-lg
                            font-semibold
                            transition
                          "
                        >
                          Add to Cart 🛒
                        </button>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p
                    className="
                      text-gray-500
                      dark:text-gray-400
                      text-center
                      py-4
                    "
                  >
                    No menu items available
                  </p>
                )}

                {/* Bottom Buttons */}
                <div
                  className="
                    flex
                    gap-3
                    mt-6
                  "
                >
                  <Link
                    to={`/restaurant/${restaurant.id}`}
                    className="
                      flex-1
                      text-center
                      bg-orange-500
                      hover:bg-orange-600
                      text-white
                      py-2
                      rounded-lg
                      font-semibold
                      transition
                    "
                  >
                    View Restaurant
                  </Link>

                  <button
                    onClick={() =>
                      handleRemove(restaurant.id)
                    }
                    className="
                      flex-1
                      bg-red-500
                      hover:bg-red-600
                      text-white
                      py-2
                      rounded-lg
                      font-semibold
                      transition
                    "
                  >
                    Remove ❤️
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Wishlist;