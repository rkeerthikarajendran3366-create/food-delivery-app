import { useContext, useState } from "react";
import { useParams, Link } from "react-router-dom";
import toast from "react-hot-toast";

import restaurants from "../data/restaurants";

import { CartContext } from "../context/CartContext";

import ReviewForm from "../components/ReviewForm";
import ReviewList from "../components/ReviewList";

function RestaurantDetails() {
  const { id } = useParams();

  const {
    cart,
    addToCart,
    increaseQuantity,
    decreaseQuantity,
    removeItem,
  } = useContext(CartContext);

  const restaurant = restaurants.find(
    (restaurant) => restaurant.id === Number(id)
  );

  const [reviews, setReviews] = useState(() => {
    const savedReviews =
      localStorage.getItem("restaurantReviews");

    try {
      return savedReviews
        ? JSON.parse(savedReviews)
        : [];
    } catch {
      return [];
    }
  });

  const addReview = (newReview) => {
    const updatedReviews = [
      ...reviews,
      newReview,
    ];

    setReviews(updatedReviews);

    localStorage.setItem(
      "restaurantReviews",
      JSON.stringify(updatedReviews)
    );

    toast.success(
      "Review added successfully ⭐"
    );
  };

  if (!restaurant) {
    return (
      <div
        className="
          min-h-screen
          flex
          flex-col
          items-center
          justify-center
          bg-gray-50
          dark:bg-gray-900
        "
      >
        <h1
          className="
            text-3xl
            font-bold
            text-gray-900
            dark:text-white
          "
        >
          Restaurant Not Found
        </h1>

        <Link
          to="/restaurants"
          className="
            mt-5
            bg-orange-500
            hover:bg-orange-600
            text-white
            px-6
            py-2
            rounded-lg
          "
        >
          Back
        </Link>
      </div>
    );
  }

  const restaurantReviews = reviews.filter(
    (review) =>
      review.restaurantId === restaurant.id
  );

  const getCartItem = (itemId) => {
    return cart.find(
      (cartItem) =>
        String(cartItem.id) === String(itemId)
    );
  };

  const handleAddCart = (item) => {
    addToCart(item);

    toast.success(
      `${item.name} added to cart 🛒`,
      {
        duration: 1500,
      }
    );
  };

  const handleIncrease = (itemId) => {
    increaseQuantity(itemId);
  };

  const handleDecrease = (itemId) => {
    decreaseQuantity(itemId);
  };

  const handleRemove = (itemId) => {
    removeItem(itemId);

    toast.success(
      "Item removed from cart 🗑️",
      {
        duration: 1500,
      }
    );
  };

  return (
    <div
      className="
        max-w-6xl
        mx-auto
        p-6
        min-h-screen
        bg-gray-50
        dark:bg-gray-900
      "
    >
      {/* Back */}

      <Link
        to="/restaurants"
        className="
          inline-block
          mb-6
          bg-orange-500
          hover:bg-orange-600
          text-white
          px-5
          py-2
          rounded-lg
        "
      >
        ← Back
      </Link>

      {/* Restaurant Image */}

      <img
        src={restaurant.image}
        alt={restaurant.name}
        className="
          w-full
          h-96
          object-cover
          rounded-xl
          shadow-lg
        "
      />

      {/* Restaurant Name */}

      <h1
        className="
          text-4xl
          font-bold
          mt-6
          text-gray-900
          dark:text-white
        "
      >
        {restaurant.name}
      </h1>

      {/* Restaurant Details */}

      <p
        className="
          mt-3
          text-gray-700
          dark:text-gray-300
        "
      >
        🍴 {restaurant.cuisine}
      </p>

      <p
        className="
          mt-2
          text-gray-700
          dark:text-gray-300
        "
      >
        ⭐ {restaurant.rating}
      </p>

      <p
        className="
          mt-2
          text-gray-700
          dark:text-gray-300
        "
      >
        📍 {restaurant.location}
      </p>

      <p
        className="
          mt-2
          text-gray-700
          dark:text-gray-300
        "
      >
        🕒 {restaurant.deliveryTime}
      </p>

      <p
        className="
          mt-2
          font-semibold
          text-orange-600
        "
      >
        💰 {restaurant.costForTwo}
      </p>

      {/* Menu */}

      <h2
        className="
          text-3xl
          font-bold
          mt-10
          mb-6
          text-gray-900
          dark:text-white
        "
      >
        Menu 🍽️
      </h2>

      <div
        className="
          grid
          grid-cols-1
          md:grid-cols-3
          gap-6
        "
      >
        {restaurant.menu.map((item) => {
          const cartItem = getCartItem(item.id);

          return (
            <div
              key={item.id}
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
              {/* Food Image */}

              <img
                src={item.image}
                alt={item.name}
                className="
                  w-full
                  h-52
                  object-cover
                "
              />

              <div className="p-4">
                {/* Food Name */}

                <h3
                  className="
                    text-xl
                    font-bold
                    text-gray-900
                    dark:text-white
                  "
                >
                  {item.name}
                </h3>

                {/* Price */}

                <p
                  className="
                    text-orange-600
                    font-semibold
                    mt-2
                  "
                >
                  ₹{item.price}
                </p>

                {/* =========================
                    ADD TO CART
                ========================== */}

                {!cartItem ? (
                  <button
                    type="button"
                    onClick={() =>
                      handleAddCart(item)
                    }
                    className="
                      mt-4
                      w-full
                      bg-green-500
                      hover:bg-green-600
                      active:scale-95
                      text-white
                      py-2
                      rounded-lg
                      font-semibold
                      transition
                    "
                  >
                    Add to Cart 🛒
                  </button>
                ) : (
                  <div className="mt-4">
                    {/* Quantity */}

                    <div
                      className="
                        flex
                        items-center
                        justify-center
                        gap-5
                      "
                    >
                      {/* Minus */}

                      <button
                        type="button"
                        aria-label={`Decrease ${item.name}`}
                        onClick={() =>
                          handleDecrease(item.id)
                        }
                        className="
                          w-10
                          h-10
                          rounded-lg
                          bg-gray-200
                          dark:bg-gray-700
                          text-gray-900
                          dark:text-white
                          text-xl
                          font-bold
                          hover:bg-gray-300
                          dark:hover:bg-gray-600
                          active:scale-95
                          transition
                        "
                      >
                        −
                      </button>

                      {/* Quantity */}

                      <span
                        className="
                          min-w-10
                          text-center
                          text-lg
                          font-bold
                          text-gray-900
                          dark:text-white
                        "
                      >
                        {cartItem.quantity}
                      </span>

                      {/* Plus */}

                      <button
                        type="button"
                        aria-label={`Increase ${item.name}`}
                        onClick={() =>
                          handleIncrease(item.id)
                        }
                        className="
                          w-10
                          h-10
                          rounded-lg
                          bg-green-500
                          hover:bg-green-600
                          active:scale-95
                          text-white
                          text-xl
                          font-bold
                          transition
                        "
                      >
                        +
                      </button>
                    </div>

                    {/* Remove */}

                    <button
                      type="button"
                      onClick={() =>
                        handleRemove(item.id)
                      }
                      className="
                        mt-3
                        w-full
                        bg-red-500
                        hover:bg-red-600
                        active:scale-95
                        text-white
                        py-2
                        rounded-lg
                        font-semibold
                        transition
                      "
                    >
                      Remove from Cart 🗑️
                    </button>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Reviews */}

      <div className="mt-12">
        <ReviewList
          reviews={restaurantReviews}
        />

        <ReviewForm
          restaurantId={restaurant.id}
          onAddReview={addReview}
        />
      </div>
    </div>
  );
}

export default RestaurantDetails;