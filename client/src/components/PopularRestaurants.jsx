import { Link } from "react-router-dom";

function PopularRestaurants() {

  const restaurants = [
    {
      id: 1,
      name: "Pizza Palace",
      image:
        "https://images.unsplash.com/photo-1513104890138-7c749659a591",
      cuisine: "Italian, Pizza",
      rating: "4.8",
      delivery: "25-30 min"
    },
    {
      id: 2,
      name: "Burger House",
      image:
        "https://images.unsplash.com/photo-1568901346375-23c9450c58cd",
      cuisine: "Burgers, Fast Food",
      rating: "4.6",
      delivery: "20-25 min"
    },
    {
      id: 3,
      name: "Spice Kitchen",
      image:
        "https://images.unsplash.com/photo-1585937421612-70a008356fbe",
      cuisine: "Indian Food",
      rating: "4.7",
      delivery: "30-35 min"
    },
    {
      id: 4,
      name: "Chinese Wok",
      image:
        "https://images.unsplash.com/photo-1525755662778-989d0524087e",
      cuisine: "Chinese",
      rating: "4.5",
      delivery: "25-30 min"
    }
  ];


  return (

    <section className="py-16 bg-white dark:bg-gray-950">


      <div className="max-w-6xl mx-auto px-6">


        {/* Heading */}

        <div className="text-center mb-10">

          <h2 className="
          text-4xl
          font-bold
          text-gray-900
          dark:text-white
          ">
            Popular Restaurants 🍴
          </h2>


          <p className="
          mt-3
          text-gray-600
          dark:text-gray-300
          ">
            Explore top restaurants near you
          </p>

        </div>



        {/* Restaurant Cards */}

        <div className="
        grid
        grid-cols-1
        sm:grid-cols-2
        lg:grid-cols-4
        gap-8
        ">


          {
            restaurants.map((restaurant) => (

              <div
                key={restaurant.id}
                className="
                bg-gray-100
                dark:bg-gray-800
                rounded-2xl
                overflow-hidden
                shadow-lg
                hover:shadow-2xl
                transition
                hover:-translate-y-2
                "
              >


                {/* Image */}

                <img
                  src={restaurant.image}
                  alt={restaurant.name}
                  className="
                  w-full
                  h-48
                  object-cover
                  "
                />



                {/* Content */}

                <div className="p-5">


                  <h3 className="
                  text-xl
                  font-bold
                  text-gray-900
                  dark:text-white
                  ">
                    {restaurant.name}
                  </h3>



                  <p className="
                  text-gray-600
                  dark:text-gray-300
                  mt-2
                  ">
                    {restaurant.cuisine}
                  </p>



                  <div className="
                  flex
                  justify-between
                  mt-4
                  text-sm
                  ">


                    <span className="
                    bg-green-500
                    text-white
                    px-3
                    py-1
                    rounded-full
                    ">
                      ⭐ {restaurant.rating}
                    </span>



                    <span className="
                    text-gray-700
                    dark:text-gray-200
                    ">
                      🚴 {restaurant.delivery}
                    </span>


                  </div>



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
                    rounded-full
                    font-semibold
                    transition
                    "
                  >
                    View Restaurant
                  </Link>


                </div>


              </div>

            ))
          }


        </div>


      </div>


    </section>

  );
}


export default PopularRestaurants;