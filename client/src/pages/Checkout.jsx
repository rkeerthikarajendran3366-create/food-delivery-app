import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";

import CheckoutForm from "../components/CheckoutForm";

function Checkout() {
  const { cart, setCart } = useCart();

  const navigate = useNavigate();

  // Calculate total amount
  const totalAmount = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  // =====================================================
  // CREATE FOOD ORDER
  // =====================================================

  const handlePlaceOrder = (customerDetails) => {
    const existingOrders =
      JSON.parse(localStorage.getItem("orders")) || [];

    // Get currently logged-in user
    const loggedInUser =
      JSON.parse(localStorage.getItem("user"));

    // User must be logged in
    if (!loggedInUser) {
      toast.error("Please login before placing an order");
      navigate("/login");
      return;
    }

    // Create new order
    const newOrder = {
      id: Date.now(),

      // Logged-in user information
      userId:
        loggedInUser._id || loggedInUser.id,

      userEmail: loggedInUser.email,

      // Customer / delivery details
      customer: customerDetails,

      // Cart items
      items: cart,

      // Total amount
      total: totalAmount,

      // Order date
      date: new Date().toLocaleString(),

      // Order status
      status: "Confirmed",
    };

    // Add new order
    const updatedOrders = [
      ...existingOrders,
      newOrder,
    ];

    // Save orders
    localStorage.setItem(
      "orders",
      JSON.stringify(updatedOrders)
    );

    // Clear cart
    setCart([]);

    localStorage.removeItem("cart");

    // Success message
    toast.success("Order placed successfully 🎉");

    // Go to success page
    navigate("/order-success");
  };

  // =====================================================
  // PAYMENT
  // =====================================================

  const handlePayment = async (customerDetails) => {
    // ===================================================
    // CASH ON DELIVERY
    // ===================================================

    if (
      customerDetails.payment ===
      "Cash on Delivery"
    ) {
      if (!cart.length) {
        toast.error("Your cart is empty");
        return;
      }

      // Directly create order
      handlePlaceOrder(customerDetails);

      return;
    }

    // ===================================================
    // RAZORPAY
    // ===================================================

    try {
      if (!cart.length) {
        toast.error("Your cart is empty");
        return;
      }

      if (totalAmount < 1) {
        toast.error("Invalid order amount");
        return;
      }

      // -------------------------------------------------
      // Step 1: Create Razorpay order from backend
      // -------------------------------------------------

      const response = await fetch(
        "https://foodexpress-backend-p9dv.onrender.com/api/payment/create-order",
        {
          method: "POST",

          headers: {
            "Content-Type": "application/json",
          },

          body: JSON.stringify({
            amount: totalAmount,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok || !data.success) {
        toast.error(
          data.message ||
          "Unable to create payment"
        );

        return;
      }

      console.log(
        "Razorpay Frontend Key:",
        import.meta.env.VITE_RAZORPAY_KEY_ID
      );

      // -------------------------------------------------
      // Step 2: Razorpay Checkout Options
      // -------------------------------------------------

      const options = {
        key:
          import.meta.env
            .VITE_RAZORPAY_KEY_ID,

        amount: data.order.amount,

        currency: data.order.currency,

        name: "FoodExpress",

        description: "Food Order Payment",

        order_id: data.order.id,

        // ------------------------------------------------
        // Step 3: Payment successful
        // ------------------------------------------------

        handler: async function (
          paymentResponse
        ) {
          try {
            // Verify payment with backend
            const verifyResponse =
              await fetch(
                "https://foodexpress-backend-p9dv.onrender.com/api/payment/verify-payment",
                {
                  method: "POST",

                  headers: {
                    "Content-Type":
                      "application/json",
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

            const verifyData =
              await verifyResponse.json();

            // Payment verification failed
            if (
              !verifyResponse.ok ||
              !verifyData.success
            ) {
              toast.error(
                verifyData.message ||
                "Payment verification failed"
              );

              return;
            }

            // --------------------------------------------
            // Payment verified successfully
            // Create food order
            // --------------------------------------------

            handlePlaceOrder(
              customerDetails
            );
          } catch (error) {
            console.error(
              "Payment verification error:",
              error
            );

            toast.error(
              "Payment verification failed"
            );
          }
        },

        // ------------------------------------------------
        // Razorpay prefill
        // ------------------------------------------------

        prefill: {
          name:
            customerDetails?.name || "",

          email:
            customerDetails?.email || "",

          contact:
            customerDetails?.phone || "",
        },

        // ------------------------------------------------
        // Razorpay notes
        // ------------------------------------------------

        notes: {
          address:
            customerDetails?.address || "",
        },

        // ------------------------------------------------
        // Razorpay theme
        // ------------------------------------------------

        theme: {
          color: "#f97316",
        },

        // ------------------------------------------------
        // Payment modal closed
        // ------------------------------------------------

        modal: {
          ondismiss: function () {
            toast.error(
              "Payment cancelled"
            );
          },
        },
      };

      // =================================================
      // Check Razorpay Script
      // =================================================

      if (!window.Razorpay) {
        toast.error(
          "Razorpay checkout failed to load"
        );

        return;
      }

      // Create Razorpay instance
      const razorpay =
        new window.Razorpay(options);

      // =================================================
      // Payment Failed
      // =================================================

      razorpay.on(
        "payment.failed",
        function (response) {
          console.error(
            "Payment failed:",
            response.error
          );

          toast.error(
            response.error?.description ||
            "Payment failed"
          );
        }
      );

      // Open Razorpay
      razorpay.open();
    } catch (error) {
      console.error(
        "Payment error:",
        error
      );

      toast.error(
        "Something went wrong with payment"
      );
    }
  };

  // =====================================================
  // UI
  // =====================================================

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
      {/* Page Title */}

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

      {/* Empty Cart */}

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
          {/* ============================================
              ORDER SUMMARY
          ============================================ */}

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

            {/* Cart Items */}

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

            {/* Total */}

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

          {/* ============================================
              CHECKOUT FORM
          ============================================ */}

          <CheckoutForm
            onPlaceOrder={handlePayment}
          />
        </>
      )}
    </div>
  );
}

export default Checkout;