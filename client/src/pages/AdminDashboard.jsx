import { useNavigate } from "react-router-dom";

function AdminDashboard() {
  console.log("🔥🔥🔥 ADMIN DASHBOARD IS RENDERING 🔥🔥🔥");

  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("user"));

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 p-6">
      <div className="max-w-6xl mx-auto">

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
              👨‍💼 Admin Dashboard
            </h1>

            <p
              className="
                mt-2
                text-gray-600
                dark:text-gray-300
              "
            >
              Welcome, {user?.name || "Admin"}!
            </p>
          </div>

          <button
            type="button"
            onClick={handleLogout}
            className="
              bg-red-600
              hover:bg-red-700
              text-white
              px-5
              py-2
              rounded-lg
              transition
            "
          >
            Logout
          </button>
        </div>

        {/* Dashboard Cards */}
        <div
          className="
            grid
            grid-cols-1
            md:grid-cols-3
            gap-6
          "
        >
          {/* Users */}
          <button
            type="button"
            onClick={() => navigate("/admin/users")}
            className="
              w-full
              text-left
              bg-white
              dark:bg-gray-800
              p-6
              rounded-xl
              shadow-lg
              hover:shadow-2xl
              hover:-translate-y-1
              transition
              cursor-pointer
            "
          >
            <div className="text-4xl">👥</div>

            <h2
              className="
                text-xl
                font-bold
                mt-4
                text-gray-900
                dark:text-white
              "
            >
              Users
            </h2>

            <p
              className="
                mt-2
                text-gray-600
                dark:text-gray-300
              "
            >
              View and manage registered users.
            </p>

            <div
              className="
                mt-4
                inline-block
                bg-orange-500
                hover:bg-orange-600
                text-white
                px-4
                py-2
                rounded-lg
                text-sm
                font-semibold
              "
            >
              View Users →
            </div>
          </button>

          {/* Restaurants */}
          <button
            type="button"
            onClick={() => navigate("/admin/restaurants")}
            className="
              w-full
              text-left
              bg-white
              dark:bg-gray-800
              p-6
              rounded-xl
              shadow-lg
              hover:shadow-2xl
              hover:-translate-y-1
              transition
              cursor-pointer
            "
          >
            <div className="text-4xl">🍔</div>

            <h2
              className="
                text-xl
                font-bold
                mt-4
                text-gray-900
                dark:text-white
              "
            >
              Restaurants
            </h2>

            <p
              className="
                mt-2
                text-gray-600
                dark:text-gray-300
              "
            >
              Manage restaurants and menu items.
            </p>

            <div
              className="
                mt-4
                inline-block
                bg-orange-500
                hover:bg-orange-600
                text-white
                px-4
                py-2
                rounded-lg
                text-sm
                font-semibold
              "
            >
              View Restaurants →
            </div>
          </button>

          {/* Orders */}
          <button
            type="button"
            onClick={() => navigate("/admin/orders")}
            className="
              w-full
              text-left
              bg-white
              dark:bg-gray-800
              p-6
              rounded-xl
              shadow-lg
              hover:shadow-2xl
              hover:-translate-y-1
              transition
              cursor-pointer
            "
          >
            <div className="text-4xl">📦</div>

            <h2
              className="
                text-xl
                font-bold
                mt-4
                text-gray-900
                dark:text-white
              "
            >
              Orders
            </h2>

            <p
              className="
                mt-2
                text-gray-600
                dark:text-gray-300
              "
            >
              View and manage customer orders.
            </p>

            <div
              className="
                mt-4
                inline-block
                bg-orange-500
                hover:bg-orange-600
                text-white
                px-4
                py-2
                rounded-lg
                text-sm
                font-semibold
              "
            >
              View Orders →
            </div>
          </button>
        </div>

        {/* Admin Information */}
        <div
          className="
            mt-8
            bg-white
            dark:bg-gray-800
            p-6
            rounded-xl
            shadow-lg
          "
        >
          <h2
            className="
              text-2xl
              font-bold
              text-gray-900
              dark:text-white
            "
          >
            Admin Information
          </h2>

          <div
            className="
              mt-4
              space-y-2
              text-gray-700
              dark:text-gray-300
            "
          >
            <p>
              <strong>Name:</strong>{" "}
              {user?.name || "Admin"}
            </p>

            <p>
              <strong>Email:</strong>{" "}
              {user?.email || "Not available"}
            </p>

            <p>
              <strong>Role:</strong>{" "}
              {user?.role || "admin"}
            </p>
          </div>
        </div>

        {/* Back to Home */}
        <button
          type="button"
          onClick={() => navigate("/")}
          className="
            mt-8
            bg-orange-500
            hover:bg-orange-600
            text-white
            px-6
            py-3
            rounded-lg
            transition
          "
        >
          ← Back to Home
        </button>

      </div>
    </div>
  );
}

export default AdminDashboard;