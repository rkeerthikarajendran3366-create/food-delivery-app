import { useEffect, useState } from "react";


function OrderHistory() {


  const [orders, setOrders] = useState([]);




  useEffect(() => {


    const savedOrders = JSON.parse(
      localStorage.getItem("orders")
    ) || [];



    setOrders(savedOrders);



  }, []);







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
          mb-8
          text-gray-900
          dark:text-white
        "

      >

        📦 Order History

      </h1>









      {orders.length === 0 ? (






        <div

          className="
            bg-white
            dark:bg-gray-800
            shadow-lg
            rounded-xl
            p-8
            text-center
          "

        >






          <h2

            className="
              text-xl
              font-semibold
              text-gray-900
              dark:text-white
            "

          >

            No orders found

          </h2>







          <p

            className="
              text-gray-500
              dark:text-gray-300
              mt-2
            "

          >

            Your completed orders will appear here.

          </p>







        </div>







      ) : (







        <div className="space-y-6">







          {orders.map((order) => (








            <div


              key={order.id}


              className="
                bg-white
                dark:bg-gray-800
                shadow-lg
                rounded-xl
                p-6
              "


            >








              <div className="flex justify-between items-center">







                <h2


                  className="
                    text-xl
                    font-bold
                    text-gray-900
                    dark:text-white
                  "


                >

                  Order #{order.id}

                </h2>








                <span


                  className="
                    text-green-600
                    dark:text-green-400
                    font-semibold
                  "


                >

                  {order.status}

                </span>







              </div>









              <p


                className="
                  text-gray-500
                  dark:text-gray-300
                  mt-2
                "


              >

                📅 {order.date}

              </p>









              <h3


                className="
                  font-bold
                  mt-5
                  mb-3
                  text-gray-900
                  dark:text-white
                "


              >

                Items:

              </h3>









              <div className="space-y-3">





                {order.items.map((item) => (





                  <div


                    key={item.id}


                    className="
                      flex
                      justify-between
                      border-b
                      border-gray-200
                      dark:border-gray-700
                      pb-2
                      text-gray-700
                      dark:text-gray-300
                    "


                  >






                    <span>

                      {item.name}

                      {" "}x{item.quantity || 1}

                    </span>








                    <span


                      className="
                        font-semibold
                        text-gray-900
                        dark:text-white
                      "


                    >

                      ₹{item.price * (item.quantity || 1)}

                    </span>







                  </div>







                ))}








              </div>









              <div className="mt-5 text-right">





                <h3


                  className="
                    text-xl
                    font-bold
                    text-orange-600
                  "


                >

                  Total: ₹{order.total}

                </h3>






              </div>









            </div>








          ))}








        </div>







      )}







    </div>



  );

}


export default OrderHistory;