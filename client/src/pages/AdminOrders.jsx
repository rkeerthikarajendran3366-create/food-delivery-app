import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function AdminOrders() {
  const [orders, setOrders] = useState([]);

  const loadOrders = () => {
    const savedOrders =
      JSON.parse(localStorage.getItem("orders")) || [];

    const sortedOrders = [...savedOrders].sort(
      (a, b) => Number(b.id) - Number(a.id)
    );

    setOrders(sortedOrders);
  };

  useEffect(() => {
    loadOrders();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 p-6">
      <div className="max-w-6xl mx-auto">

        {/* Back Button */}
        <Link
          to="/admin"
          className="
            inline-block
            mb-6
            bg-orange-500
            hover:bg-orange-600
            text-white
            px-5
            py-2
            rounded-lg
            transition
          "
        >
          ← Back to Dashboard
        </Link>

        {/* Header */}
        <div
          className="
            flex
            flex-col
            md:flex-row
            justify-between
            items-start
            md:items-center
            gap-4
            mb-8
          "
        >
          <div>
            <h1
              className="
                text-4xl
                font-bold
                text-gray-900
                dark:text-white
              "
            >
              📦 Customer Orders
            </h1>

            <p
              className="
                mt-2
                text-gray-600
                dark:text-gray-300
              "
            >
              View and manage all customer orders.
            </p>
          </div>

          <button
            type="button"
            onClick={loadOrders}
            className="
              bg-blue-600
              hover:bg-blue-700
              text-white
              px-5
              py-2
              rounded-lg
              transition
            "
          >
            🔄 Refresh
          </button>
        </div>

        {/* Order Count */}
        <div
          className="
            mb-6
            bg-white
            dark:bg-gray-800
            rounded-xl
            shadow-lg
            p-5
          "
        >
          <p
            className="
              text-lg
              font-semibold
              text-gray-900
              dark:text-white
            "
          >
            Total Orders:{" "}
            <span className="text-orange-500">
              {orders.length}
            </span>
          </p>
        </div>

        {/* No Orders */}
        {orders.length === 0 ? (
          <div
            className="
              bg-white
              dark:bg-gray-800
              rounded-xl
              shadow-lg
              p-10
              text-center
            "
          >
            <div className="text-5xl mb-4">
              📦
            </div>

            <h2
              className="
                text-xl
                font-bold
                text-gray-900
                dark:text-white
              "
            >
              No Orders Found
            </h2>

            <p
              className="
                mt-2
                text-gray-600
                dark:text-gray-300
              "
            >
              Customer orders will appear here.
            </p>
          </div>
        ) : (
          <div className="space-y-6">
            {orders.map((order, index) => (
              <div
                key={order.id || index}
                className="
                  bg-white
                  dark:bg-gray-800
                  rounded-xl
                  shadow-lg
                  p-6
                "
              >
                {/* Order Header */}
                <div
                  className="
                    flex
                    flex-col
                    md:flex-row
                    justify-between
                    gap-3
                    border-b
                    border-gray-200
                    dark:border-gray-700
                    pb-4
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
                      Order #{order.id}
                    </h2>

                    <p
                      className="
                        mt-1
                        text-gray-500
                        dark:text-gray-400
                      "
                    >
                      📅 {order.date}
                    </p>
                  </div>

                  <span
                    className="
                      self-start
                      px-4
                      py-2
                      rounded-full
                      bg-green-100
                      text-green-700
                      dark:bg-green-900
                      dark:text-green-200
                      font-semibold
                    "
                  >
                    {order.status || "Confirmed"}
                  </span>
                </div>

                {/* Customer Details */}
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
                      text-lg
                      text-gray-900
                      dark:text-white
                      mb-3
                    "
                  >
                    🚚 Delivery Details
                  </h3>

                  <div className="space-y-2">
                    <p
                      className="
                        text-gray-700
                        dark:text-gray-200
                      "
                    >
                      👤 <strong>Name:</strong>{" "}
                      {order.customer?.name ||
                        "Not available"}
                    </p>

                    <p
                      className="
                        text-gray-700
                        dark:text-gray-200
                      "
                    >
                      📱 <strong>Phone:</strong>{" "}
                      {order.customer?.phone ||
                        "Not available"}
                    </p>

                    <p
                      className="
                        text-gray-700
                        dark:text-gray-200
                      "
                    >
                      📍 <strong>Address:</strong>{" "}
                      {order.customer?.address ||
                        "Not available"}
                    </p>

                    <p
                      className="
                        text-gray-700
                        dark:text-gray-200
                      "
                    >
                      💳 <strong>Payment:</strong>{" "}
                      {order.customer?.payment ||
                        "Not available"}
                    </p>

                    {order.userEmail && (
                      <p
                        className="
                          text-gray-700
                          dark:text-gray-200
                        "
                      >
                        📧 <strong>Account:</strong>{" "}
                        {order.userEmail}
                      </p>
                    )}
                  </div>
                </div>

                {/* Items */}
                <div className="mt-5">
                  <h3
                    className="
                      text-lg
                      font-bold
                      text-gray-900
                      dark:text-white
                      mb-3
                    "
                  >
                    🍽️ Ordered Items
                  </h3>

                  <div className="space-y-3">
                    {order.items?.map(
                      (item, itemIndex) => (
                        <div
                          key={
                            `${item.id}-${itemIndex}`
                          }
                          className="
                            flex
                            justify-between
                            items-center
                            border-b
                            border-gray-200
                            dark:border-gray-700
                            pb-3
                          "
                        >
                          <div>
                            <p
                              className="
                                font-semibold
                                text-gray-900
                                dark:text-white
                              "
                            >
                              {item.name}
                            </p>

                            <p
                              className="
                                text-sm
                                text-gray-500
                                dark:text-gray-400
                              "
                            >
                              ₹{item.price} ×{" "}
                              {item.quantity || 1}
                            </p>
                          </div>

                          <p
                            className="
                              font-bold
                              text-gray-900
                              dark:text-white
                            "
                          >
                            ₹
                            {item.price *
                              (item.quantity || 1)}
                          </p>
                        </div>
                      )
                    )}
                  </div>
                </div>

                {/* Total */}
                <div
                  className="
                    mt-5
                    flex
                    justify-end
                    border-t
                    border-gray-200
                    dark:border-gray-700
                    pt-4
                  "
                >
                  <h3
                    className="
                      text-2xl
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
    </div>
  );
}

export default AdminOrders;