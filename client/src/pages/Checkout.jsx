import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import CheckoutForm from "../components/CheckoutForm";

function Checkout() {
  const { cart, setCart } = useCart();
  const navigate = useNavigate();

  const totalAmount = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  // --------------------------------------------------
  // PHONE HELPERS
  // --------------------------------------------------

  const getCleanPhone = (rawPhone) => {
    if (!rawPhone) return "";

    const digitsOnly = rawPhone
      .toString()
      .replace(/\D/g, "");

    const withoutCountryCode =
      digitsOnly.length === 12 &&
      digitsOnly.startsWith("91")
        ? digitsOnly.slice(2)
        : digitsOnly;

    return withoutCountryCode;
  };

  const isValidIndianMobile = (phone) => {
    return /^[6-9]\d{9}$/.test(phone);
  };

  // --------------------------------------------------
  // GET RESTAURANT ID FROM CART
  // --------------------------------------------------

  const getRestaurantIdFromCart = () => {
    if (!cart || cart.length === 0) {
      return null;
    }

    /*
      New owner-created restaurants will store restaurantId
      inside cart items.

      Existing local restaurants may not have restaurantId.
      In that case we return null so old orders continue
      working exactly as before.
    */

    const restaurantIds = cart
      .map((item) => item.restaurantId)
      .filter(Boolean);

    if (restaurantIds.length === 0) {
      return null;
    }

    // Remove duplicate restaurant IDs
    const uniqueRestaurantIds = [
      ...new Set(
        restaurantIds.map((id) => String(id))
      ),
    ];

    /*
      Existing application works with one checkout/order.

      If cart contains items from multiple restaurants,
      we stop the order rather than assigning the complete
      order to the wrong restaurant owner.
    */

    if (uniqueRestaurantIds.length > 1) {
      return "MULTIPLE_RESTAURANTS";
    }

    return uniqueRestaurantIds[0];
  };

  // --------------------------------------------------
  // PLACE ORDER
  // --------------------------------------------------

  const handlePlaceOrder = async (
    customerDetails,
    paymentInfo = {}
  ) => {
    const loggedInUser =
      JSON.parse(localStorage.getItem("user"));

    if (!loggedInUser) {
      toast.error(
        "Please login before placing an order"
      );

      navigate("/login");
      return;
    }

    if (!cart.length) {
      toast.error("Your cart is empty");
      return;
    }

    // -----------------------------------------------
    // FIND RESTAURANT
    // -----------------------------------------------

    const restaurantId =
      getRestaurantIdFromCart();

    if (
      restaurantId ===
      "MULTIPLE_RESTAURANTS"
    ) {
      toast.error(
        "Please order from one restaurant at a time."
      );

      return;
    }

    // -----------------------------------------------
    // PREPARE ORDER ITEMS
    // -----------------------------------------------

    const orderItems = cart.map((item) => ({
      id: item.id,
      name: item.name,
      price: item.price,
      quantity: item.quantity,
      image: item.image || "",

      // New field.
      // Existing local items will simply have null.
      restaurantId:
        item.restaurantId || null,
    }));

    // -----------------------------------------------
    // ORDER PAYLOAD
    // -----------------------------------------------

    const orderPayload = {
      customer: customerDetails,

      items: orderItems,

      total: totalAmount,

      /*
        New owner restaurant support.

        Existing local restaurants:
        restaurantId = null

        Owner-created restaurants:
        restaurantId = MongoDB restaurant ID
      */
      restaurantId:
        restaurantId || null,

      paymentStatus:
        paymentInfo.paymentStatus ||
        (customerDetails.payment ===
        "Cash on Delivery"
          ? "COD"
          : "Pending"),

      paymentId:
        paymentInfo.paymentId || "",

      razorpayOrderId:
        paymentInfo.razorpayOrderId || "",
    };

    console.log(
      "📦 Order Payload:",
      orderPayload
    );

    const token =
      localStorage.getItem("token");

    if (!token) {
      toast.error(
        "Your session has expired. Please login again."
      );

      navigate("/login");
      return;
    }

    try {
      const response = await fetch(
        "https://foodexpress-backend-p9dv.onrender.com/api/orders",
        {
          method: "POST",

          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },

          body: JSON.stringify(
            orderPayload
          ),
        }
      );

      const data =
        await response.json();

      if (!response.ok || !data.success) {
        console.error(
          "❌ Create Order Failed:",
          data
        );

        toast.error(
          data.message ||
            "Failed to save your order. Please try again."
        );

        return;
      }

      console.log(
        "✅ Order saved to backend:",
        data.order
      );

      // ---------------------------------------------
      // CLEAR CART
      // ---------------------------------------------

      setCart([]);

      localStorage.removeItem("cart");

      toast.success(
        "Order placed successfully 🎉"
      );

      navigate("/order-success");
    } catch (error) {
      console.error(
        "❌ Place Order Error:",
        error
      );

      toast.error(
        "Could not connect to server to place your order"
      );
    }
  };

  // --------------------------------------------------
  // PAYMENT
  // --------------------------------------------------

  const handlePayment = async (
    customerDetails
  ) => {
    // -----------------------------------------------
    // COD
    // -----------------------------------------------

    if (
      customerDetails.payment ===
      "Cash on Delivery"
    ) {
      if (!cart.length) {
        toast.error("Your cart is empty");
        return;
      }

      await handlePlaceOrder(
        customerDetails,
        {
          paymentStatus: "COD",
        }
      );

      return;
    }

    // -----------------------------------------------
    // RAZORPAY
    // -----------------------------------------------

    try {
      if (!cart.length) {
        toast.error("Your cart is empty");
        return;
      }

      if (totalAmount < 1) {
        toast.error("Invalid order amount");
        return;
      }

      // ---------------------------------------------
      // CHECK MULTIPLE RESTAURANTS
      // ---------------------------------------------

      const restaurantId =
        getRestaurantIdFromCart();

      if (
        restaurantId ===
        "MULTIPLE_RESTAURANTS"
      ) {
        toast.error(
          "Please order from one restaurant at a time."
        );

        return;
      }

      // ---------------------------------------------
      // PHONE
      // ---------------------------------------------

      const cleanPhone =
        getCleanPhone(
          customerDetails?.phone
        );

      if (
        !isValidIndianMobile(
          cleanPhone
        )
      ) {
        toast.error(
          "Please enter a valid 10-digit mobile number"
        );

        return;
      }

      // ---------------------------------------------
      // RAZORPAY KEY
      // ---------------------------------------------

      const razorpayKey =
        import.meta.env
          .VITE_RAZORPAY_KEY_ID;

      console.log(
        "🔑 Razorpay Frontend Key:",
        razorpayKey
      );

      if (!razorpayKey) {
        console.error(
          "❌ VITE_RAZORPAY_KEY_ID is undefined"
        );

        toast.error(
          "Razorpay Key ID is missing"
        );

        return;
      }

      // ---------------------------------------------
      // RAZORPAY SCRIPT
      // ---------------------------------------------

      if (!window.Razorpay) {
        console.error(
          "❌ Razorpay script is not loaded"
        );

        toast.error(
          "Razorpay checkout failed to load"
        );

        return;
      }

      // ---------------------------------------------
      // TOKEN
      // ---------------------------------------------

      const token =
        localStorage.getItem("token");

      if (!token) {
        toast.error(
          "Please login again"
        );

        navigate("/login");

        return;
      }

      // ---------------------------------------------
      // CREATE RAZORPAY ORDER
      // ---------------------------------------------

      const response =
        await fetch(
          "https://foodexpress-backend-p9dv.onrender.com/api/payment/create-order",
          {
            method: "POST",

            headers: {
              "Content-Type":
                "application/json",

              Authorization:
                `Bearer ${token}`,
            },

            body: JSON.stringify({
              amount: totalAmount,
            }),
          }
        );

      const responseText =
        await response.text();

      console.log(
        "📡 Create Order Status:",
        response.status
      );

      console.log(
        "📡 Create Order Response:",
        responseText
      );

      let data;

      try {
        data =
          JSON.parse(
            responseText
          );
      } catch (parseError) {
        console.error(
          "❌ Backend did not return JSON:",
          responseText
        );

        toast.error(
          `Backend error (${response.status})`
        );

        return;
      }

      if (
        !response.ok ||
        !data.success
      ) {
        console.error(
          "❌ Create order failed:",
          data
        );

        toast.error(
          data.message ||
            "Unable to create payment"
        );

        return;
      }

      if (
        !data.order ||
        !data.order.id
      ) {
        console.error(
          "❌ Invalid Razorpay order response:",
          data
        );

        toast.error(
          "Invalid payment order received"
        );

        return;
      }

      console.log(
        "✅ Razorpay Order:",
        data.order
      );

      // ---------------------------------------------
      // RAZORPAY OPTIONS
      // ---------------------------------------------

      const options = {
        key: razorpayKey,

        amount:
          data.order.amount,

        currency:
          data.order.currency ||
          "INR",

        name: "FoodExpress",

        description:
          "Food Order Payment",

        order_id:
          data.order.id,

        // -------------------------------------------
        // PAYMENT SUCCESS
        // -------------------------------------------

        handler:
          async function (
            paymentResponse
          ) {
            console.log(
              "✅ Razorpay Payment Response:",
              paymentResponse
            );

            try {
              const token =
                localStorage.getItem(
                  "token"
                );

              if (!token) {
                toast.error(
                  "Please login again"
                );

                navigate("/login");

                return;
              }

              // ---------------------------------------
              // VERIFY PAYMENT
              // ---------------------------------------

              const verifyResponse =
                await fetch(
                  "https://foodexpress-backend-p9dv.onrender.com/api/payment/verify-payment",
                  {
                    method: "POST",

                    headers: {
                      "Content-Type":
                        "application/json",

                      Authorization:
                        `Bearer ${token}`,
                    },

                    body: JSON.stringify({
                      razorpay_order_id:
                        paymentResponse.razorpay_order_id,

                      razorpay_payment_id:
                        paymentResponse.razorpay_payment_id,

                      razorpay_signature:
                        paymentResponse.razorpay_signature,
                    }),
                  }
                );

              const verifyText =
                await verifyResponse.text();

              console.log(
                "📡 Verify Payment Status:",
                verifyResponse.status
              );

              console.log(
                "📡 Verify Payment Response:",
                verifyText
              );

              let verifyData;

              try {
                verifyData =
                  JSON.parse(
                    verifyText
                  );
              } catch (
                parseError
              ) {
                console.error(
                  "❌ Verification response is not JSON:",
                  verifyText
                );

                toast.error(
                  "Payment verification server error"
                );

                return;
              }

              if (
                !verifyResponse.ok ||
                !verifyData.success
              ) {
                console.error(
                  "❌ Payment verification failed:",
                  verifyData
                );

                toast.error(
                  verifyData.message ||
                    "Payment verification failed"
                );

                return;
              }

              console.log(
                "✅ Payment verified successfully"
              );

              // ---------------------------------------
              // SAVE ORDER
              // ---------------------------------------

              await handlePlaceOrder(
                customerDetails,
                {
                  paymentStatus:
                    "Paid",

                  paymentId:
                    paymentResponse.razorpay_payment_id,

                  razorpayOrderId:
                    paymentResponse.razorpay_order_id,
                }
              );
            } catch (error) {
              console.error(
                "❌ PAYMENT VERIFICATION ERROR:",
                error
              );

              console.error(
                "❌ Verification Error Message:",
                error?.message
              );

              toast.error(
                error?.message ||
                  "Payment verification failed"
              );
            }
          },

        // -------------------------------------------
        // PREFILL
        // -------------------------------------------

        prefill: {
          name:
            customerDetails?.name ||
            "",

          email:
            customerDetails?.email ||
            "",

          contact:
            `+91${cleanPhone}`,
        },

        notes: {
          address:
            customerDetails?.address ||
            "",
        },

        theme: {
          color: "#f97316",
        },

        // -------------------------------------------
        // MODAL CLOSED
        // -------------------------------------------

        modal: {
          ondismiss:
            function () {
              console.log(
                "ℹ️ Razorpay payment modal closed"
              );

              toast.error(
                "Payment cancelled"
              );
            },
        },
      };

      console.log(
        "🚀 Opening Razorpay Checkout..."
      );

      const razorpay =
        new window.Razorpay(
          options
        );

      // ---------------------------------------------
      // PAYMENT FAILED
      // ---------------------------------------------

      razorpay.on(
        "payment.failed",
        function (response) {
          console.error(
            "❌ Payment failed:",
            response.error
          );

          console.error(
            "❌ Payment Error Code:",
            response.error?.code
          );

          console.error(
            "❌ Payment Error Description:",
            response.error?.description
          );

          toast.error(
            response.error?.description ||
              "Payment failed"
          );
        }
      );

      razorpay.open();
    } catch (error) {
      console.error(
        "❌ PAYMENT ERROR:",
        error
      );

      console.error(
        "❌ PAYMENT ERROR MESSAGE:",
        error?.message
      );

      console.error(
        "❌ PAYMENT ERROR STACK:",
        error?.stack
      );

      toast.error(
        error?.message ||
          "Something went wrong with payment"
      );
    }
  };

  // --------------------------------------------------
  // UI
  // --------------------------------------------------

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
          {/* ORDER SUMMARY */}

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
                  {item.name} ×{" "}
                  {item.quantity}
                </p>

                <p>
                  ₹
                  {item.price *
                    item.quantity}
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

          {/* CHECKOUT FORM */}

          <CheckoutForm
            onPlaceOrder={
              handlePayment
            }
          />
        </>
      )}
    </div>
  );
}

export default Checkout;