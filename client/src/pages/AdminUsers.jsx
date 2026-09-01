import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function AdminUsers() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchUsers = async () => {
    try {
      setLoading(true);
      setError("");

      const token = localStorage.getItem("token");

      const response = await fetch(
        "https://foodexpress-backend-p9dv.onrender.com/api/auth/users",
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            ...(token && {
              Authorization: `Bearer ${token}`,
            }),
          },
        }
      );

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(
          data.message || "Failed to load users"
        );
      }

      setUsers(data.users || []);
    } catch (error) {
      console.error("Failed to fetch users:", error);
      setError(error.message || "Failed to load users");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
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
              👥 Registered Users
            </h1>

            <p
              className="
                mt-2
                text-gray-600
                dark:text-gray-300
              "
            >
              View all registered FoodExpress users.
            </p>
          </div>

          <button
            type="button"
            onClick={fetchUsers}
            disabled={loading}
            className="
              bg-blue-600
              hover:bg-blue-700
              disabled:bg-gray-400
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

        {/* User Count */}
        {!loading && !error && (
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
              Total Users:{" "}
              <span className="text-orange-500">
                {users.length}
              </span>
            </p>
          </div>
        )}

        {/* Loading */}
        {loading && (
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
            <div className="text-4xl mb-4">⏳</div>

            <p
              className="
                text-gray-700
                dark:text-gray-300
                font-semibold
              "
            >
              Loading users...
            </p>
          </div>
        )}

        {/* Error */}
        {!loading && error && (
          <div
            className="
              bg-white
              dark:bg-gray-800
              rounded-xl
              shadow-lg
              p-8
              text-center
            "
          >
            <div className="text-5xl mb-4">⚠️</div>

            <h2
              className="
                text-xl
                font-bold
                text-red-600
                dark:text-red-400
                mb-2
              "
            >
              Failed to Load Users
            </h2>

            <p
              className="
                text-gray-600
                dark:text-gray-300
                mb-5
              "
            >
              {error}
            </p>

            <button
              type="button"
              onClick={fetchUsers}
              className="
                bg-orange-500
                hover:bg-orange-600
                text-white
                px-5
                py-2
                rounded-lg
                transition
              "
            >
              Try Again
            </button>
          </div>
        )}

        {/* No Users */}
        {!loading && !error && users.length === 0 && (
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
            <div className="text-5xl mb-4">👤</div>

            <h2
              className="
                text-xl
                font-bold
                text-gray-900
                dark:text-white
              "
            >
              No Users Found
            </h2>

            <p
              className="
                mt-2
                text-gray-600
                dark:text-gray-300
              "
            >
              No registered users are available.
            </p>
          </div>
        )}

        {/* Users Table */}
        {!loading && !error && users.length > 0 && (
          <div
            className="
              bg-white
              dark:bg-gray-800
              rounded-xl
              shadow-lg
              overflow-hidden
            "
          >
            <div className="overflow-x-auto">
              <table className="w-full">

                <thead
                  className="
                    bg-gray-200
                    dark:bg-gray-700
                  "
                >
                  <tr>
                    <th
                      className="
                        px-6
                        py-4
                        text-left
                        font-bold
                        text-gray-900
                        dark:text-white
                      "
                    >
                      #
                    </th>

                    <th
                      className="
                        px-6
                        py-4
                        text-left
                        font-bold
                        text-gray-900
                        dark:text-white
                      "
                    >
                      Name
                    </th>

                    <th
                      className="
                        px-6
                        py-4
                        text-left
                        font-bold
                        text-gray-900
                        dark:text-white
                      "
                    >
                      Email
                    </th>

                    <th
                      className="
                        px-6
                        py-4
                        text-left
                        font-bold
                        text-gray-900
                        dark:text-white
                      "
                    >
                      Phone
                    </th>

                    <th
                      className="
                        px-6
                        py-4
                        text-left
                        font-bold
                        text-gray-900
                        dark:text-white
                      "
                    >
                      Role
                    </th>
                  </tr>
                </thead>

                <tbody>
                  {users.map((user, index) => (
                    <tr
                      key={
                        user._id ||
                        user.id ||
                        index
                      }
                      className="
                        border-t
                        border-gray-200
                        dark:border-gray-700
                        hover:bg-gray-50
                        dark:hover:bg-gray-750
                        transition
                      "
                    >
                      <td
                        className="
                          px-6
                          py-4
                          text-gray-700
                          dark:text-gray-300
                        "
                      >
                        {index + 1}
                      </td>

                      <td
                        className="
                          px-6
                          py-4
                          font-semibold
                          text-gray-900
                          dark:text-white
                        "
                      >
                        {user.name || "Not available"}
                      </td>

                      <td
                        className="
                          px-6
                          py-4
                          text-gray-700
                          dark:text-gray-300
                        "
                      >
                        {user.email || "Not available"}
                      </td>

                      <td
                        className="
                          px-6
                          py-4
                          text-gray-700
                          dark:text-gray-300
                        "
                      >
                        {user.phone || "Not available"}
                      </td>

                      <td className="px-6 py-4">
                        <span
                          className={`
                            inline-block
                            px-3
                            py-1
                            rounded-full
                            text-sm
                            font-semibold
                            ${
                              user.role === "admin"
                                ? "bg-purple-100 text-purple-700 dark:bg-purple-900 dark:text-purple-200"
                                : "bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-200"
                            }
                          `}
                        >
                          {user.role || "user"}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>

              </table>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}

export default AdminUsers;