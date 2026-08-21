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
  // Get logged-in user
  const getLoggedInUser = () => {
    try {
      const user = localStorage.getItem("user");

      return user ? JSON.parse(user) : null;
    } catch (error) {
      console.error("User loading error:", error);
      return null;
    }
  };

  // Get current user's email
  const getUserEmail = () => {
    const user = getLoggedInUser();

    return user?.email?.toLowerCase() || null;
  };

  // Get user-specific wishlist key
  const getWishlistKey = () => {
    const email = getUserEmail();

    if (!email) {
      return null;
    }

    return `wishlist_${email}`;
  };

  // Load wishlist for current user
  const loadWishlist = () => {
    try {
      const key = getWishlistKey();

      // Guest user
      if (!key) {
        return [];
      }

      const savedWishlist = localStorage.getItem(key);

      return savedWishlist
        ? JSON.parse(savedWishlist)
        : [];
    } catch (error) {
      console.error("Wishlist loading error:", error);

      return [];
    }
  };

  const [wishlist, setWishlist] = useState(loadWishlist);

  // Reload wishlist when login/logout happens
  useEffect(() => {
    const handleUserChange = () => {
      setWishlist(loadWishlist());
    };

    // Custom event for same-tab login/logout
    window.addEventListener(
      "userChanged",
      handleUserChange
    );

    // Storage event for changes from another tab
    window.addEventListener(
      "storage",
      handleUserChange
    );

    return () => {
      window.removeEventListener(
        "userChanged",
        handleUserChange
      );

      window.removeEventListener(
        "storage",
        handleUserChange
      );
    };
  }, []);

  // Save wishlist for current logged-in user
  useEffect(() => {
    const key = getWishlistKey();

    // Don't save anything for guest users
    if (!key) {
      return;
    }

    localStorage.setItem(
      key,
      JSON.stringify(wishlist)
    );
  }, [wishlist]);

  // Add restaurant to wishlist
  const addToWishlist = (restaurant) => {
    const email = getUserEmail();

    // Guest user
    if (!email) {
      toast.error(
        "Please login to use wishlist 🔐"
      );

      return;
    }

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
    const email = getUserEmail();

    if (!email) {
      toast.error(
        "Please login to use wishlist 🔐"
      );

      return;
    }

    const restaurant = wishlist.find(
      (item) => item.id === id
    );

    setWishlist((prevWishlist) =>
      prevWishlist.filter(
        (item) => item.id !== id
      )
    );

    toast.success(
      `${
        restaurant?.name || "Restaurant"
      } removed from wishlist`
    );
  };

  // Check whether restaurant is wishlisted
  const isWishlisted = (id) => {
    const email = getUserEmail();

    if (!email) {
      return false;
    }

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