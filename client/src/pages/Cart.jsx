import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { CartContext } from "../context/CartContext";


function Cart() {


  const navigate = useNavigate();



  const {
    cart,
    increaseQuantity,
    decreaseQuantity,
    removeItem,
    clearCart,
  } = useContext(CartContext);





  const total = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );





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

        🛒 My Cart

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


          {cart.map((item) => (


            <div

              key={item.id}

              className="
                flex
                items-center
                justify-between
                bg-white
                dark:bg-gray-800
                shadow-md
                rounded-xl
                p-4
                mb-4
              "

            >





              <div className="flex items-center gap-4">



                <img

                  src={item.image}

                  alt={item.name}

                  className="
                    w-24
                    h-24
                    object-cover
                    rounded-lg
                  "

                />





                <div>



                  <h2
                    className="
                      text-xl
                      font-bold
                      text-gray-900
                      dark:text-white
                    "
                  >

                    {item.name}

                  </h2>





                  <p
                    className="
                      text-gray-700
                      dark:text-gray-300
                    "
                  >

                    Price: ₹{item.price}

                  </p>






                  <div className="flex items-center gap-3 mt-3">



                    <button

                      onClick={() => decreaseQuantity(item.id)}

                      className="
                        bg-red-500
                        text-white
                        px-3
                        py-1
                        rounded
                      "

                    >

                      -

                    </button>





                    <span
                      className="
                        font-bold
                        text-gray-900
                        dark:text-white
                      "
                    >

                      {item.quantity}

                    </span>







                    <button

                      onClick={() => increaseQuantity(item.id)}

                      className="
                        bg-green-500
                        text-white
                        px-3
                        py-1
                        rounded
                      "

                    >

                      +

                    </button>







                    <button

                      onClick={() => removeItem(item.id)}

                      className="
                        bg-gray-800
                        dark:bg-gray-700
                        text-white
                        px-4
                        py-2
                        rounded
                      "

                    >

                      Remove

                    </button>



                  </div>




                </div>



              </div>







              <h2
                className="
                  text-xl
                  font-bold
                  text-gray-900
                  dark:text-white
                "
              >

                ₹{item.price * item.quantity}

              </h2>




            </div>



          ))}









          <div className="mt-8 text-right">





            <h2
              className="
                text-3xl
                font-bold
                text-gray-900
                dark:text-white
              "
            >

              Total : ₹{total}

            </h2>







            <div className="flex justify-end gap-4 mt-6">





              <button

                onClick={clearCart}

                className="
                  bg-red-600
                  text-white
                  px-6
                  py-3
                  rounded-lg
                "

              >

                Clear Cart

              </button>








              <button

                onClick={() => navigate("/checkout")}

                className="
                  bg-green-600
                  text-white
                  px-6
                  py-3
                  rounded-lg
                "

              >

                Proceed to Checkout 🍔

              </button>





            </div>




          </div>





        </>

      )}



    </div>

  );

}


export default Cart;