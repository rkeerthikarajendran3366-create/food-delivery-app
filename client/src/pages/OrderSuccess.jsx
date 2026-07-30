import { Link } from "react-router-dom";


function OrderSuccess() {


  return (

    <div className="max-w-4xl mx-auto p-10 text-center">


      <div className="bg-white shadow-lg rounded-xl p-8">


        <h1 className="text-4xl font-bold text-green-600">

          🎉 Order Placed Successfully!

        </h1>



        <p className="mt-4 text-lg">

          Thank you for ordering from FoodExpress ❤️

        </p>




        <Link to="/orders">

          <button className="mt-6 bg-orange-500 text-white px-6 py-3 rounded-lg">

            View Orders 📦

          </button>

        </Link>



      </div>


    </div>

  );

}


export default OrderSuccess;