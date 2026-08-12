import {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

import toast from "react-hot-toast";

export const WishlistContext = createContext();

export const useWishlist = () => {
  return useContext(WishlistContext);
};

function WishlistProvider({ children }) {
  const [wishlist, setWishlist] = useState(() => {
    try {
      const savedWishlist = localStorage.getItem("wishlist");

      return savedWishlist
        ? JSON.parse(savedWishlist)
        : [];
    } catch (error) {
      console.error("Wishlist loading error:", error);
      return [];
    }
  });

  // Save wishlist to Local Storage
  useEffect(() => {
    localStorage.setItem(
      "wishlist",
      JSON.stringify(wishlist)
    );
  }, [wishlist]);

  // Add restaurant to wishlist
  const addToWishlist = (restaurant) => {
    if (!restaurant || !restaurant.id) {
      toast.error("Invalid restaurant");
      return;
    }

    const exists = wishlist.some(
      (item) => item.id === restaurant.id
    );

    if (exists) {
      toast("Already added to wishlist ❤️");
      return;
    }

    setWishlist((prevWishlist) => [
      ...prevWishlist,
      restaurant,
    ]);

    toast.success(
      `${restaurant.name || "Restaurant"} added to wishlist ❤️`
    );
  };

  // Remove restaurant from wishlist
  const removeFromWishlist = (id) => {
    const restaurant = wishlist.find(
      (item) => item.id === id
    );

    setWishlist((prevWishlist) =>
      prevWishlist.filter(
        (item) => item.id !== id
      )
    );

    toast.success(
      `${restaurant?.name || "Restaurant"} removed from wishlist`
    );
  };

  // Check wishlist status
  const isWishlisted = (id) => {
    return wishlist.some(
      (item) => item.id === id
    );
  };

  return (
    <WishlistContext.Provider
      value={{
        wishlist,
        addToWishlist,
        removeFromWishlist,
        isWishlisted,
      }}
    >
      {children}
    </WishlistContext.Provider>
  );
}

export default WishlistProvider;
