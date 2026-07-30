import { Link } from "react-router-dom";


function NotFound() {


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
        transition
        text-center
        p-6
      "
    >


      <h1
        className="
          text-8xl
          font-bold
          text-orange-500
        "
      >

        404

      </h1>



      <h2
        className="
          text-3xl
          font-bold
          mt-4
          text-gray-900
          dark:text-white
        "
      >

        Page Not Found 😔

      </h2>




      <p
        className="
          mt-3
          text-gray-600
          dark:text-gray-300
          text-lg
        "
      >

        Sorry, the page you are looking for does not exist.

      </p>




      <Link to="/">

        <button
          className="
            mt-6
            bg-orange-500
            hover:bg-orange-600
            text-white
            px-6
            py-3
            rounded-lg
          "
        >

          Go Home 🏠

        </button>


      </Link>



    </div>

  );

}


export default NotFound;