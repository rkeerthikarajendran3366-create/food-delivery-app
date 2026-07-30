import {
  createContext,
  useContext,
  useEffect,
  useState
} from "react";


export const WishlistContext = createContext();



export const useWishlist = () => {

  return useContext(WishlistContext);

};



function WishlistProvider({ children }) {


  const [wishlist, setWishlist] = useState(() => {

    const savedWishlist = localStorage.getItem("wishlist");

    return savedWishlist
      ? JSON.parse(savedWishlist)
      : [];

  });





  useEffect(() => {

    localStorage.setItem(
      "wishlist",
      JSON.stringify(wishlist)
    );

  }, [wishlist]);







  const addToWishlist = (restaurant) => {


    const exists = wishlist.find(
      (item) => item.id === restaurant.id
    );


    if (!exists) {

      setWishlist([
        ...wishlist,
        restaurant
      ]);

    }


  };






  const removeFromWishlist = (id) => {


    setWishlist(

      wishlist.filter(
        (item) => item.id !== id
      )

    );


  };







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

        isWishlisted

      }}

    >

      {children}

    </WishlistContext.Provider>

  );

}



export default WishlistProvider;