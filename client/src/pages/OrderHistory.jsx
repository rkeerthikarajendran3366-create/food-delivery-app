import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";

function OrderHistory() {
  const [orders, setOrders] = useState([]);

  const user = JSON.parse(localStorage.getItem("user"));

  const currentUserId = user?._id || user?.id;
  const currentUserEmail = user?.email?.toLowerCase();

  useEffect(() => {
    if (!user) {
      setOrders([]);
      return;
    }

    const savedOrders =
      JSON.parse(localStorage.getItem("orders")) || [];

    const userOrders = savedOrders.filter((order) => {
      const orderUserId = order.userId
        ? String(order.userId)
        : null;

      const orderUserEmail = order.userEmail
        ? order.userEmail.toLowerCase()
        : null;

      // Match user ID
      if (
        currentUserId &&
        orderUserId &&
        orderUserId === String(currentUserId)
      ) {
        return true;
      }

      // Match email as fallback
      if (
        currentUserEmail &&
        orderUserEmail &&
        orderUserEmail === currentUserEmail
      ) {
        return true;
      }

      return false;
    });

    // Latest orders first
    userOrders.sort(
      (a, b) => b.id - a.id
    );

    setOrders(userOrders);
  }, [currentUserId, currentUserEmail]);

  // Not logged in
  if (!user) {
    return <Navigate to="/login" replace />;
  }

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
              {/* Order Header */}
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

              {/* Date */}
              <p
                className="
                  text-gray-500
                  dark:text-gray-300
                  mt-2
                "
              >
                📅 {order.date}
              </p>

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
                      mb-2
                      text-gray-900
                      dark:text-white
                    "
                  >
                    🚚 Delivery Details
                  </h3>

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
                  </p>
                </div>
              )}

              {/* Items */}
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
                {order.items?.map((item, index) => (
                  <div
                    key={`${item.id}-${index}`}
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
                      {item.name} x{item.quantity || 1}
                    </span>

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