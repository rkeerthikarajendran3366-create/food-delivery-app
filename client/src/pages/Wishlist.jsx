import { Link } from "react-router-dom";
import { useWishlist } from "../context/WishlistContext";
import toast from "react-hot-toast";


function Wishlist() {


  const {
    wishlist,
    removeFromWishlist
  } = useWishlist();



  const handleRemove = (id, name) => {

    removeFromWishlist(id);

    toast.error(
      `${name} removed from wishlist ❤️`
    );

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




      {
        wishlist.length === 0 ? (


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

            <p
              className="
                text-6xl
                mb-5
              "
            >
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
              "
            >
              Explore Restaurants 🍽️
            </Link>


          </div>



        ) : (



          <div
            className="
              grid
              sm:grid-cols-2
              lg:grid-cols-3
              gap-8
            "
          >


            {
              wishlist.map((restaurant) => (



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
                    hover:-translate-y-2
                  "
                >



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
                        mt-3
                        text-gray-700
                        dark:text-gray-200
                      "
                    >
                      ⭐ {restaurant.rating}
                    </p>




                    <p
                      className="
                        text-gray-700
                        dark:text-gray-200
                      "
                    >
                      🚴 {restaurant.deliveryTime}
                    </p>




                    <div
                      className="
                        flex
                        gap-3
                        mt-5
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
                        "

                      >
                        View
                      </Link>




                      <button

                        onClick={() =>
                          handleRemove(
                            restaurant.id,
                            restaurant.name
                          )
                        }

                        className="
                          flex-1
                          bg-red-500
                          hover:bg-red-600
                          text-white
                          py-2
                          rounded-lg
                          font-semibold
                        "

                      >
                        Remove
                      </button>



                    </div>



                  </div>



                </div>


              ))
            }



          </div>


        )
      }



    </div>


  );

}


export default Wishlist;