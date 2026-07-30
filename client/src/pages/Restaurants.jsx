import { useState } from "react";
import RestaurantCard from "../components/RestaurantCard";
import restaurants from "../data/restaurants";


function Restaurants() {


  const [search, setSearch] = useState("");

  const [selectedCuisine, setSelectedCuisine] = useState("All");

  const [sortOption, setSortOption] = useState("Default");





  let filteredRestaurants = restaurants.filter((restaurant) => {


    const matchesSearch = restaurant.name
      .toLowerCase()
      .includes(search.toLowerCase());



    const matchesCuisine =
      selectedCuisine === "All" ||
      restaurant.cuisine === selectedCuisine;



    return matchesSearch && matchesCuisine;


  });





  if (sortOption === "Rating") {

    filteredRestaurants.sort(
      (a, b) => b.rating - a.rating
    );

  }



  if (sortOption === "Cost") {

    filteredRestaurants.sort(
      (a, b) => a.costForTwo - b.costForTwo
    );

  }



  if (sortOption === "Delivery") {

    filteredRestaurants.sort(
      (a, b) =>
        parseInt(a.deliveryTime) -
        parseInt(b.deliveryTime)
    );

  }






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
  "
    >





      <h1
        className="
          text-4xl
          font-bold
          mb-6
          text-gray-900
          dark:text-white
        "
      >

        Restaurants

      </h1>







      {/* Search */}

      <input

        type="text"

        placeholder="Search restaurants..."

        value={search}

        onChange={(e) => setSearch(e.target.value)}

        className="
          w-full
          border
          border-gray-300
          dark:border-gray-700
          bg-white
          dark:bg-gray-800
          text-gray-900
          dark:text-white
          rounded-lg
          p-3
          mb-6
          outline-none
        "

      />








      {/* Sort */}

      <div className="mb-6">


        <label
          className="
            font-bold
            mr-3
            text-gray-900
            dark:text-white
          "
        >

          Sort By:

        </label>




        <select

          value={sortOption}

          onChange={(e) => setSortOption(e.target.value)}

          className="
            border
            border-gray-300
            dark:border-gray-700
            bg-white
            dark:bg-gray-800
            text-gray-900
            dark:text-white
            p-2
            rounded-lg
          "

        >

          <option value="Default">
            Default
          </option>


          <option value="Rating">
            Highest Rating ⭐
          </option>


          <option value="Cost">
            Lowest Price 💰
          </option>


          <option value="Delivery">
            Fastest Delivery ⚡
          </option>


        </select>


      </div>









      {/* Cuisine Filter */}

      <div className="flex flex-wrap gap-3 mb-8">


        {[
          "All",
          "Italian",
          "American",
          "Indian",
          "Chinese"
        ].map((cuisine) => (


          <button

            key={cuisine}

            onClick={() => setSelectedCuisine(cuisine)}

            className={`
              px-4
              py-2
              rounded-lg
              transition

              ${selectedCuisine === cuisine

                ? "bg-orange-500 text-white"

                : "bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-white"
              }
            `}

          >

            {cuisine}

          </button>


        ))}


      </div>









      {/* Restaurant Cards */}

      <div className="grid md:grid-cols-3 gap-6">


        {filteredRestaurants.length > 0 ? (


          filteredRestaurants.map((restaurant) => (


            <RestaurantCard

              key={restaurant.id}

              id={restaurant.id}

              name={restaurant.name}

              cuisine={restaurant.cuisine}

              rating={restaurant.rating}

              deliveryTime={restaurant.deliveryTime}

              costForTwo={restaurant.costForTwo}

              image={restaurant.image}

            />


          ))


        ) : (


          <div
            className="
              col-span-3
              text-center
              text-xl
              text-gray-500
              dark:text-gray-300
            "
          >

            No restaurants found 😔

          </div>


        )}



      </div>




    </div>

  );

}


export default Restaurants;