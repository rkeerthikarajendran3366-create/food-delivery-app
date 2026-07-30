import { Link } from "react-router-dom";

function FoodCategories() {

  const categories = [
    {
      id: 1,
      name: "Pizza",
      image:
        "https://images.unsplash.com/photo-1513104890138-7c749659a591",
      cuisine: "Pizza"
    },
    {
      id: 2,
      name: "Burgers",
      image:
        "https://images.unsplash.com/photo-1568901346375-23c9450c58cd",
      cuisine: "Burger"
    },
    {
      id: 3,
      name: "Indian Food",
      image:
        "https://images.unsplash.com/photo-1585937421612-70a008356fbe",
      cuisine: "Indian"
    },
    {
      id: 4,
      name: "Chinese",
      image:
        "https://images.unsplash.com/photo-1525755662778-989d0524087e",
      cuisine: "Chinese"
    },
    {
      id: 5,
      name: "Desserts",
      image:
        "https://images.unsplash.com/photo-1551024601-bec78aea704b",
      cuisine: "Dessert"
    },
    {
      id: 6,
      name: "Drinks",
      image:
        "https://images.unsplash.com/photo-1544145945-f90425340c7e",
      cuisine: "Beverages"
    }
  ];


  return (
    <section className="py-16 bg-gray-100 dark:bg-gray-900">

      <div className="max-w-6xl mx-auto px-6">

        {/* Title */}
        <div className="text-center mb-10">

          <h2 className="text-4xl font-bold text-gray-900 dark:text-white">
            Explore Food Categories 🍽️
          </h2>

          <p className="mt-3 text-gray-600 dark:text-gray-300">
            Choose your favourite cuisine
          </p>

        </div>



        {/* Category Cards */}

        <div className="
          grid 
          grid-cols-2
          md:grid-cols-3
          lg:grid-cols-6
          gap-6
        ">

          {
            categories.map((category) => (

              <Link
                key={category.id}
                to={`/restaurants?cuisine=${category.cuisine}`}
                className="
                group
                bg-white
                dark:bg-gray-800
                rounded-2xl
                overflow-hidden
                shadow-lg
                hover:shadow-2xl
                transition
                hover:-translate-y-2
                "
              >

                <img
                  src={category.image}
                  alt={category.name}
                  className="
                  w-full
                  h-32
                  object-cover
                  group-hover:scale-110
                  transition
                  duration-300
                  "
                />


                <div className="p-4 text-center">

                  <h3 className="
                    font-bold
                    text-lg
                    text-gray-800
                    dark:text-white
                  ">
                    {category.name}
                  </h3>

                </div>


              </Link>

            ))
          }

        </div>

      </div>

    </section>
  );
}


export default FoodCategories;