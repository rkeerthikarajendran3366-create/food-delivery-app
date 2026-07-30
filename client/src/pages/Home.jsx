import Hero from "../components/Hero";
import FoodCategories from "../components/FoodCategories";
import PopularRestaurants from "../components/PopularRestaurants";


function Home() {

  return (

    <div
      className="
        min-h-screen
        bg-gray-50
        dark:bg-gray-900
        transition
        duration-300
      "
    >

      <Hero />

      <FoodCategories />

      <PopularRestaurants />

    </div>

  );

}


export default Home;