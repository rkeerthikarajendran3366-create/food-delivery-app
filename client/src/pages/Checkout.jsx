import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import CheckoutForm from "../components/CheckoutForm";

function Checkout() {
  const { cart, setCart } = useCart();

  const navigate = useNavigate();

  // =====================================================
  // CALCULATE TOTAL AMOUNT
  // =====================================================

  const totalAmount = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  // =====================================================
  // CLEAN + VALIDATE PHONE NUMBER
  // =====================================================
  // Razorpay's contact-details screen needs a plain 10-digit
  // Indian mobile number (no +91, spaces, or dashes).
  // If we pass something invalid/empty in `prefill.contact`,
  // Razorpay shows its own "Enter mobile number" screen and
  // blocks Continue until a valid one is typed.

  const getCleanPhone = (rawPhone) => {
    if (!rawPhone) return "";

    // Remove +91, spaces, dashes, brackets — keep digits only
    const digitsOnly = rawPhone
      .toString()
      .replace(/\D/g, "");

    // Strip leading "91" if user included the country code
    const withoutCountryCode =
      digitsOnly.length === 12 &&
      digitsOnly.startsWith("91")
        ? digitsOnly.slice(2)
        : digitsOnly;

    return withoutCountryCode;
  };

  const isValidIndianMobile = (phone) => {
    // Indian mobile numbers: 10 digits, starts with 6-9
    return /^[6-9]\d{9}$/.test(phone);
  };

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
      // -------------------------------------------------
      // Check cart
      // -------------------------------------------------

      if (!cart.length) {
        toast.error("Your cart is empty");
        return;
      }

      // -------------------------------------------------
      // Check amount
      // -------------------------------------------------

      if (totalAmount < 1) {
        toast.error("Invalid order amount");
        return;
      }

      // -------------------------------------------------
      // Check + clean customer phone number
      // -------------------------------------------------
      // Validate BEFORE opening Razorpay so the customer
      // fixes it on our own form instead of getting stuck
      // on Razorpay's contact-details screen.

      const cleanPhone = getCleanPhone(
        customerDetails?.phone
      );

      if (!isValidIndianMobile(cleanPhone)) {
        toast.error(
          "Please enter a valid 10-digit mobile number"
        );
        return;
      }

      // -------------------------------------------------
      // Check Razorpay frontend key
      // -------------------------------------------------

      const razorpayKey =
        import.meta.env.VITE_RAZORPAY_KEY_ID;

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

      // -------------------------------------------------
      // Check Razorpay script
      // -------------------------------------------------

      if (!window.Razorpay) {
        console.error(
          "❌ Razorpay script is not loaded"
        );

        toast.error(
          "Razorpay checkout failed to load"
        );

        return;
      }

      // -------------------------------------------------
      // Step 1:
      // Create Razorpay order from backend
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

      // -------------------------------------------------
      // Read backend response
      // -------------------------------------------------

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
        data = JSON.parse(responseText);
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

      // -------------------------------------------------
      // Check backend response
      // -------------------------------------------------

      if (!response.ok || !data.success) {
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

      // -------------------------------------------------
      // Check order data
      // -------------------------------------------------

      if (!data.order || !data.order.id) {
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

      // -------------------------------------------------
      // Step 2:
      // Razorpay Checkout Options
      // -------------------------------------------------

      const options = {
        key: razorpayKey,

        amount: data.order.amount,

        currency:
          data.order.currency || "INR",

        name: "FoodExpress",

        description:
          "Food Order Payment",

        order_id: data.order.id,

        // ------------------------------------------------
        // Step 3:
        // Payment successful
        // ------------------------------------------------

        handler: async function (
          paymentResponse
        ) {
          console.log(
            "✅ Razorpay Payment Response:",
            paymentResponse
          );

          try {
            // --------------------------------------------
            // Verify payment with backend
            // --------------------------------------------

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

            // --------------------------------------------
            // Read verification response
            // --------------------------------------------

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
                JSON.parse(verifyText);
            } catch (parseError) {
              console.error(
                "❌ Verification response is not JSON:",
                verifyText
              );

              toast.error(
                "Payment verification server error"
              );

              return;
            }

            // --------------------------------------------
            // Payment verification failed
            // --------------------------------------------

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

            // --------------------------------------------
            // Payment verified successfully
            // Create food order
            // --------------------------------------------

            console.log(
              "✅ Payment verified successfully"
            );

            handlePlaceOrder(
              customerDetails
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

        // ------------------------------------------------
        // Razorpay prefill
        // ------------------------------------------------
        // Using the cleaned, validated phone number here is
        // what stops Razorpay's own mobile-number screen
        // from blocking the user with its default validation.

        prefill: {
          name:
            customerDetails?.name || "",

          email:
            customerDetails?.email || "",

          contact: cleanPhone,
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
            console.log(
              "ℹ️ Razorpay payment modal closed"
            );

            toast.error(
              "Payment cancelled"
            );
          },
        },
      };

      // -------------------------------------------------
      // Create Razorpay instance
      // -------------------------------------------------

      console.log(
        "🚀 Opening Razorpay Checkout..."
      );

      const razorpay =
        new window.Razorpay(options);

      // -------------------------------------------------
      // Razorpay payment failed
      // -------------------------------------------------

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

      // -------------------------------------------------
      // Open Razorpay
      // -------------------------------------------------

      razorpay.open();
    } catch (error) {
      // =================================================
      // MAIN PAYMENT ERROR
      // =================================================

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