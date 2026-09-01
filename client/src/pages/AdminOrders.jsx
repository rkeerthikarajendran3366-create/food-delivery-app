import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";

const BACKEND_URL =
  "https://foodexpress-backend-p9dv.onrender.com";

const STATUS_OPTIONS = [
  "Confirmed",
  "Preparing",
  "Out for Delivery",
  "Delivered",
  "Cancelled",
];

const STATUS_COLORS = {
  Confirmed:
    "bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-200",
  Preparing:
    "bg-yellow-100 text-yellow-700 dark:bg-yellow-900 dark:text-yellow-200",
  "Out for Delivery":
    "bg-purple-100 text-purple-700 dark:bg-purple-900 dark:text-purple-200",
  Delivered:
    "bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-200",
  Cancelled:
    "bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-200",
};

function AdminOrders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [updatingId, setUpdatingId] = useState(null);

  // =====================================================
  // LOAD ORDERS FROM BACKEND
  // =====================================================

  const loadOrders = async () => {
    setLoading(true);

    try {
      const response = await fetch(
        `${BACKEND_URL}/api/orders/admin`
      );

      const data = await response.json();

      if (!response.ok || !data.success) {
        console.error(
          "❌ Failed to load orders:",
          data
        );

        toast.error(
          data.message || "Failed to load orders"
        );

        setOrders([]);
        return;
      }

      setOrders(data.orders || []);
    } catch (error) {
      console.error(
        "❌ Load Orders Error:",
        error
      );

      toast.error(
        "Could not connect to server to load orders"
      );

      setOrders([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadOrders();
  }, []);

  // =====================================================
  // UPDATE ORDER STATUS
  // =====================================================

  const handleStatusChange = async (
    orderId,
    newStatus
  ) => {
    setUpdatingId(orderId);

    try {
      const response = await fetch(
        `${BACKEND_URL}/api/orders/${orderId}/status`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            status: newStatus,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok || !data.success) {
        console.error(
          "❌ Status update failed:",
          data
        );

        toast.error(
          data.message ||
            "Failed to update order status"
        );

        return;
      }

      // Update the order in local state without a full reload
      setOrders((prevOrders) =>
        prevOrders.map((order) =>
          order._id === orderId
            ? { ...order, status: newStatus }
            : order
        )
      );

      toast.success(
        `Order marked as "${newStatus}"`
      );
    } catch (error) {
      console.error(
        "❌ Update Status Error:",
        error
      );

      toast.error(
        "Could not connect to server to update status"
      );
    } finally {
      setUpdatingId(null);
    }
  };

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
            disabled={loading}
            className="
              bg-blue-600
              hover:bg-blue-700
              disabled:opacity-50
              text-white
              px-5
              py-2
              rounded-lg
              transition
            "
          >
            {loading ? "Loading..." : "🔄 Refresh"}
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

        {/* Loading */}
        {loading ? (
          <div
            className="
              bg-white
              dark:bg-gray-800
              rounded-xl
              shadow-lg
              p-10
              text-center
              text-gray-600
              dark:text-gray-300
            "
          >
            Loading orders...
          </div>
        ) : orders.length === 0 ? (
          /* No Orders */
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
            {orders.map((order) => (
              <div
                key={order._id}
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
                      Order #{order._id?.slice(-8)}
                    </h2>

                    <p
                      className="
                        mt-1
                        text-gray-500
                        dark:text-gray-400
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

                  {/* STATUS DROPDOWN — this is the missing piece */}
                  <div className="flex flex-col items-start md:items-end gap-1">
                    <span
                      className={`
                        self-start
                        px-4
                        py-1
                        rounded-full
                        font-semibold
                        text-sm
                        ${
                          STATUS_COLORS[
                            order.status
                          ] ||
                          "bg-gray-100 text-gray-700"
                        }
                      `}
                    >
                      {order.status || "Confirmed"}
                    </span>

                    <select
                      value={order.status || "Confirmed"}
                      disabled={
                        updatingId === order._id
                      }
                      onChange={(e) =>
                        handleStatusChange(
                          order._id,
                          e.target.value
                        )
                      }
                      className="
                        border
                        border-gray-300
                        dark:border-gray-600
                        bg-white
                        dark:bg-gray-700
                        text-gray-900
                        dark:text-white
                        rounded-lg
                        px-3
                        py-1
                        text-sm
                        outline-none
                        focus:ring-2
                        focus:ring-orange-400
                        disabled:opacity-50
                      "
                    >
                      {STATUS_OPTIONS.map((option) => (
                        <option
                          key={option}
                          value={option}
                        >
                          {option}
                        </option>
                      ))}
                    </select>
                  </div>
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
                      {order.paymentStatus && (
                        <span className="ml-2 text-sm text-gray-500 dark:text-gray-400">
                          ({order.paymentStatus})
                        </span>
                      )}
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
                          key={`${item.id}-${itemIndex}`}
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