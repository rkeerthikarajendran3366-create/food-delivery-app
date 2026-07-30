import { Link } from "react-router-dom";


function Footer() {


  return (


    <footer
      className="
        bg-orange-500
        dark:bg-gray-900
        text-white
        mt-10
        transition
      "
    >



      <div
        className="
          max-w-7xl
          mx-auto
          px-6
          py-10
          grid
          md:grid-cols-3
          gap-8
        "
      >



        {/* Brand */}

        <div>

          <h2 className="text-2xl font-bold">

            🍕 FoodExpress

          </h2>


          <p className="
            mt-3
            text-orange-100
            dark:text-gray-300
          ">

            Delicious food delivered fast
            from your favorite restaurants.

          </p>


        </div>







        {/* Quick Links */}

        <div>


          <h3 className="text-xl font-bold mb-3">

            Quick Links

          </h3>


          <ul className="space-y-2">


            <li>

              <Link to="/">

                Home

              </Link>

            </li>



            <li>

              <Link to="/restaurants">

                Restaurants

              </Link>

            </li>



            <li>

              <Link to="/wishlist">

                Wishlist

              </Link>

            </li>



            <li>

              <Link to="/orders">

                Orders

              </Link>

            </li>


          </ul>


        </div>








        {/* Contact */}

        <div>


          <h3 className="text-xl font-bold mb-3">

            Contact

          </h3>



          <p>
            📍 Chennai, India
          </p>


          <p>
            📞 +91 98765 43210
          </p>


          <p>
            ✉️ support@foodexpress.com
          </p>



        </div>





      </div>






      <div
        className="
          text-center
          border-t
          border-orange-300
          dark:border-gray-700
          py-4
        "
      >

        © 2026 FoodExpress. All rights reserved.

      </div>





    </footer>


  );

}


export default Footer;