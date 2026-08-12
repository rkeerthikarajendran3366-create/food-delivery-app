import { Link } from "react-router-dom";
import { useWishlist } from "../context/WishlistContext";

function RestaurantCard(props) {
  const {
    addToWishlist,
    removeFromWishlist,
    isWishlisted,
  } = useWishlist();

  // Create complete restaurant object
  // including menu items
  const restaurant = {
    id: props.id,
    name: props.name,
    cuisine: props.cuisine,
    rating: props.rating,
    deliveryTime: props.deliveryTime,
    costForTwo: props.costForTwo,
    image: props.image,
    menu: props.menu || [],
  };

  const favourite = isWishlisted(props.id);

  const handleWishlist = () => {
    if (favourite) {
      removeFromWishlist(props.id);
    } else {
      addToWishlist(restaurant);
    }
  };

  return (
    <div
      className="
        bg-gradient-to-br
        from-white
        to-orange-50
        dark:from-gray-800
        dark:to-gray-900
        rounded-xl
        shadow-lg
        overflow-hidden
        hover:shadow-xl
        transition
      "
    >
      {/* Image Section */}

      <div className="relative">
        <img
          src={props.image}
          alt={props.name}
          className="
            w-full
            h-52
            object-cover
          "
        />

        {/* Wishlist Button */}

        <button
          onClick={handleWishlist}
          type="button"
          className="
            absolute
            top-3
            right-3
            bg-white
            dark:bg-gray-700
            rounded-full
            p-2
            text-2xl
            shadow
            hover:scale-110
            transition
          "
        >
          {favourite ? "❤️" : "🤍"}
        </button>
      </div>

      {/* Content */}

      <div className="p-4">
        <h2
          className="
            text-xl
            font-bold
            text-gray-900
            dark:text-white
          "
        >
          {props.name}
        </h2>

        <p
          className="
            text-gray-600
            dark:text-gray-300
            mt-1
          "
        >
          {props.cuisine}
        </p>

        <div
          className="
            flex
            justify-between
            mt-3
            text-gray-700
            dark:text-gray-200
          "
        >
          <span>⭐ {props.rating}</span>

          <span>🚴 {props.deliveryTime}</span>
        </div>

        <p
          className="
            mt-2
            font-semibold
            text-orange-600
          "
        >
          {props.costForTwo}
        </p>

        <Link to={`/restaurant/${props.id}`}>
          <button
            type="button"
            className="
              w-full
              mt-4
              bg-orange-500
              hover:bg-orange-600
              text-white
              py-2
              rounded-lg
              transition
            "
          >
            View Details
          </button>
        </Link>
      </div>
    </div>
  );
}

export default RestaurantCard;