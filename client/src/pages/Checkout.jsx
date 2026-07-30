import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";

import CheckoutForm from "../components/CheckoutForm";


function Checkout() {


  const { cart, setCart } = useCart();


  const navigate = useNavigate();





  const totalAmount = cart.reduce(
    (sum, item) =>
      sum + item.price * item.quantity,
    0
  );







  const handlePlaceOrder = (customerDetails) => {



    const existingOrders = JSON.parse(
      localStorage.getItem("orders")
    ) || [];





    const newOrder = {


      id: Date.now(),


      customer: customerDetails,


      items: cart,


      total: totalAmount,


      date: new Date().toLocaleString(),


      status: "Confirmed"


    };






    const updatedOrders = [

      ...existingOrders,

      newOrder

    ];







    localStorage.setItem(

      "orders",

      JSON.stringify(updatedOrders)

    );







    setCart([]);


    localStorage.removeItem("cart");






    toast.success(
      "Order placed successfully 🎉"
    );





    navigate("/order-success");



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

        Checkout 🛒

      </h1>








      {cart.length === 0 ? (



        <div

          className="
            text-center
            text-2xl
            mt-20
            text-gray-700
            dark:text-gray-300
          "

        >

          Your cart is empty 🛍️

        </div>




      ) : (




        <>




          <div

            className="
              bg-white
              dark:bg-gray-800
              shadow-md
              rounded-xl
              p-5
              mb-6
            "

          >





            <h2

              className="
                text-2xl
                font-bold
                mb-4
                text-gray-900
                dark:text-white
              "

            >

              Order Summary

            </h2>







            {cart.map((item) => (




              <div

                key={item.id}

                className="
                  flex
                  justify-between
                  mb-3
                  text-gray-700
                  dark:text-gray-300
                "

              >





                <p>

                  {item.name} × {item.quantity}

                </p>





                <p>

                  ₹{item.price * item.quantity}

                </p>






              </div>





            ))}








            <hr className="dark:border-gray-600" />







            <h2

              className="
                text-2xl
                font-bold
                mt-4
                text-gray-900
                dark:text-white
              "

            >

              Total: ₹{totalAmount}

            </h2>






          </div>









          <CheckoutForm

            onPlaceOrder={handlePlaceOrder}

          />






        </>





      )}







    </div>


  );

}


export default Checkout;