import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import toast from "react-hot-toast";

const BACKEND_URL =
  "https://foodexpress-backend-p9dv.onrender.com";

function OrderHistory() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  const user = JSON.parse(localStorage.getItem("user"));

  const currentUserId = user?._id || user?.id;

  // =====================================================
  // LOAD ORDERS FROM BACKEND
  // =====================================================

  useEffect(() => {
    if (!user || !currentUserId) {
      setOrders([]);
      setLoading(false);
      return;
    }

    const fetchOrders = async () => {
      try {
        setLoading(true);

        const response = await fetch(
          `${BACKEND_URL}/api/orders/${currentUserId}`
        );

        const data = await response.json();

        if (!response.ok || !data.success) {
          console.error(
            "❌ Failed to load orders:",
            data
          );

          toast.error(
            data.message || "Failed to load your orders"
          );

          setOrders([]);
          return;
        }

        // Backend already returns newest first (sorted by createdAt)
        setOrders(data.orders || []);
      } catch (error) {
        console.error(
          "❌ Load Order History Error:",
          error
        );

        toast.error(
          "Could not connect to server to load your orders"
        );

        setOrders([]);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [currentUserId]);

  // Not logged in
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // Status styling
  const getStatusStyle = (status) => {
    switch (status) {
      case "Confirmed":
        return "bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-200";

      case "Preparing":
        return "bg-yellow-100 text-yellow-700 dark:bg-yellow-900 dark:text-yellow-200";

      case "Out for Delivery":
        return "bg-purple-100 text-purple-700 dark:bg-purple-900 dark:text-purple-200";

      case "Delivered":
        return "bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-200";

      case "Cancelled":
        return "bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-200";

      default:
        return "bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-200";
    }
  };

  // Status icon
  const getStatusIcon = (status) => {
    switch (status) {
      case "Confirmed":
        return "✅";

      case "Preparing":
        return "👨‍🍳";

      case "Out for Delivery":
        return "🚴";

      case "Delivered":
        return "🎉";

      case "Cancelled":
        return "❌";

      default:
        return "📦";
    }
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
      <div className="max-w-5xl mx-auto">

        {/* Page Header */}
        <div className="mb-8">
          <h1
            className="
              text-4xl
              font-bold
              text-gray-900
              dark:text-white
            "
          >
            📦 Order History
          </h1>

          <p
            className="
              mt-2
              text-gray-600
              dark:text-gray-300
            "
          >
            Track your orders and delivery status.
          </p>
        </div>

        {loading ? (
          /* Loading */
          <div
            className="
              bg-white
              dark:bg-gray-800
              shadow-lg
              rounded-xl
              p-8
              text-center
              text-gray-600
              dark:text-gray-300
            "
          >
            Loading your orders...
          </div>
        ) : orders.length === 0 ? (
          /* No Orders */
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
            <div className="text-5xl mb-4">
              📦
            </div>

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

            {orders.map((order) => {
              const status = order.status || "Confirmed";

              return (
                <div
                  key={order._id}
                  className="
                    bg-white
                    dark:bg-gray-800
                    shadow-lg
                    rounded-xl
                    p-6
                  "
                >

                  {/* Order Header */}
                  <div
                    className="
                      flex
                      flex-col
                      sm:flex-row
                      justify-between
                      gap-4
                      items-start
                      sm:items-center
                    "
                  >
                    <div>
                      <h2
                        className="
                          text-xl
                          font-bold
                          text-gray-900
                          dark:text-white
                        "
                      >
                        Order #{order._id?.slice(-8)}
                      </h2>

                      <p
                        className="
                          text-gray-500
                          dark:text-gray-300
                          mt-2
                        "
                      >
                        📅{" "}
                        {order.createdAt
                          ? new Date(
                              order.createdAt
                            ).toLocaleString()
                          : "N/A"}
                      </p>
                    </div>

                    {/* Order Status */}
                    <span
                      className={`
                        inline-flex
                        items-center
                        gap-2
                        px-4
                        py-2
                        rounded-full
                        font-semibold
                        ${getStatusStyle(status)}
                      `}
                    >
                      {getStatusIcon(status)}
                      {status}
                    </span>
                  </div>

                  {/* Delivery Progress */}
                  {status !== "Cancelled" && (
                    <div
                      className="
                        mt-6
                        p-5
                        bg-gray-50
                        dark:bg-gray-700
                        rounded-xl
                      "
                    >
                      <h3
                        className="
                          font-bold
                          text-gray-900
                          dark:text-white
                          mb-4
                        "
                      >
                        🚚 Order Tracking
                      </h3>

                      <div
                        className="
                          grid
                          grid-cols-4
                          gap-2
                          text-center
                        "
                      >
                        {/* Confirmed */}
                        <div>
                          <div
                            className={`
                              w-10
                              h-10
                              mx-auto
                              rounded-full
                              flex
                              items-center
                              justify-center
                              ${
                                [
                                  "Confirmed",
                                  "Preparing",
                                  "Out for Delivery",
                                  "Delivered",
                                ].includes(status)
                                  ? "bg-green-500 text-white"
                                  : "bg-gray-300 text-gray-600"
                              }
                            `}
                          >
                            ✓
                          </div>

                          <p
                            className="
                              text-xs
                              mt-2
                              text-gray-700
                              dark:text-gray-200
                            "
                          >
                            Confirmed
                          </p>
                        </div>

                        {/* Preparing */}
                        <div>
                          <div
                            className={`
                              w-10
                              h-10
                              mx-auto
                              rounded-full
                              flex
                              items-center
                              justify-center
                              ${
                                [
                                  "Preparing",
                                  "Out for Delivery",
                                  "Delivered",
                                ].includes(status)
                                  ? "bg-green-500 text-white"
                                  : "bg-gray-300 text-gray-600"
                              }
                            `}
                          >
                            👨‍🍳
                          </div>

                          <p
                            className="
                              text-xs
                              mt-2
                              text-gray-700
                              dark:text-gray-200
                            "
                          >
                            Preparing
                          </p>
                        </div>

                        {/* Out for Delivery */}
                        <div>
                          <div
                            className={`
                              w-10
                              h-10
                              mx-auto
                              rounded-full
                              flex
                              items-center
                              justify-center
                              ${
                                [
                                  "Out for Delivery",
                                  "Delivered",
                                ].includes(status)
                                  ? "bg-green-500 text-white"
                                  : "bg-gray-300 text-gray-600"
                              }
                            `}
                          >
                            🚴
                          </div>

                          <p
                            className="
                              text-xs
                              mt-2
                              text-gray-700
                              dark:text-gray-200
                            "
                          >
                            Out for Delivery
                          </p>
                        </div>

                        {/* Delivered */}
                        <div>
                          <div
                            className={`
                              w-10
                              h-10
                              mx-auto
                              rounded-full
                              flex
                              items-center
                              justify-center
                              ${
                                status === "Delivered"
                                  ? "bg-green-500 text-white"
                                  : "bg-gray-300 text-gray-600"
                              }
                            `}
                          >
                            🎉
                          </div>

                          <p
                            className="
                              text-xs
                              mt-2
                              text-gray-700
                              dark:text-gray-200
                            "
                          >
                            Delivered
                          </p>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Cancelled Message */}
                  {status === "Cancelled" && (
                    <div
                      className="
                        mt-5
                        p-4
                        bg-red-50
                        dark:bg-red-900/30
                        rounded-lg
                        border
                        border-red-200
                        dark:border-red-800
                      "
                    >
                      <p
                        className="
                          text-red-700
                          dark:text-red-300
                          font-semibold
                        "
                      >
                        ❌ This order has been cancelled.
                      </p>
                    </div>
                  )}

                  {/* Customer Details */}
                  {order.customer && (
                    <div
                      className="
                        mt-5
                        p-4
                        bg-orange-50
                        dark:bg-gray-700
                        rounded-lg
                      "
                    >
                      <h3
                        className="
                          font-bold
                          mb-3
                          text-gray-900
                          dark:text-white
                        "
                      >
                        🚚 Delivery Details
                      </h3>

                      <div className="space-y-2">

                        <p className="text-gray-700 dark:text-gray-200">
                          👤 <strong>Name:</strong>{" "}
                          {order.customer.name}
                        </p>

                        <p className="text-gray-700 dark:text-gray-200">
                          📱 <strong>Phone:</strong>{" "}
                          {order.customer.phone}
                        </p>

                        <p className="text-gray-700 dark:text-gray-200">
                          📍 <strong>Address:</strong>{" "}
                          {order.customer.address}
                        </p>

                        <p className="text-gray-700 dark:text-gray-200">
                          💳 <strong>Payment:</strong>{" "}
                          {order.customer.payment}
                          {order.paymentStatus && (
                            <span className="ml-2 text-sm text-gray-500 dark:text-gray-400">
                              ({order.paymentStatus})
                            </span>
                          )}
                        </p>

                      </div>
                    </div>
                  )}

                  {/* Items */}
                  <h3
                    className="
                      font-bold
                      mt-6
                      mb-3
                      text-gray-900
                      dark:text-white
                    "
                  >
                    🍽️ Ordered Items
                  </h3>

                  <div className="space-y-3">

                    {order.items?.map((item, index) => (
                      <div
                        key={`${item.id}-${index}`}
                        className="
                          flex
                          justify-between
                          items-center
                          border-b
                          border-gray-200
                          dark:border-gray-700
                          pb-3
                          text-gray-700
                          dark:text-gray-300
                        "
                      >
                        <div>
                          <p className="font-semibold">
                            {item.name}
                          </p>

                          <p className="text-sm text-gray-500 dark:text-gray-400">
                            ₹{item.price} ×{" "}
                            {item.quantity || 1}
                          </p>
                        </div>

                        <span
                          className="
                            font-semibold
                            text-gray-900
                            dark:text-white
                          "
                        >
                          ₹
                          {item.price *
                            (item.quantity || 1)}
                        </span>
                      </div>
                    ))}

                  </div>

                  {/* Total */}
                  <div
                    className="
                      mt-5
                      pt-4
                      border-t
                      border-gray-200
                      dark:border-gray-700
                      text-right
                    "
                  >
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
              );
            })}

          </div>
        )}
      </div>
    </div>
  );
}

export default OrderHistory;