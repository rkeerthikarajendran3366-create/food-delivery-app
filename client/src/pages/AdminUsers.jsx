import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function AdminUsers() {
    const navigate = useNavigate();

    const BACKEND_URL =
        "https://foodexpress-backend-p9dv.onrender.com";

    const [users, setUsers] = useState([]);
    const [restaurants, setRestaurants] = useState([]);

    const [selectedRestaurants, setSelectedRestaurants] =
        useState({});

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    const [actionLoading, setActionLoading] =
        useState(null);

    // ==========================================
    // LOAD USERS + MONGODB RESTAURANTS
    // ==========================================
    const loadData = async () => {
        try {
            setLoading(true);
            setError("");

            const token = localStorage.getItem("token");

            if (!token) {
                setError("Authentication token not found.");
                return;
            }

            const headers = {
                Authorization: `Bearer ${token}`,
            };

            // ======================================
            // LOAD USERS
            // ======================================
            const usersResponse = await fetch(
                `${BACKEND_URL}/api/auth/users`,
                {
                    headers,
                }
            );

            const usersData =
                await usersResponse.json();

            if (!usersResponse.ok) {
                throw new Error(
                    usersData.message ||
                    "Failed to load users"
                );
            }

            // ======================================
            // LOAD RESTAURANTS FROM MONGODB
            // ======================================
            const restaurantsResponse = await fetch(
                `${BACKEND_URL}/api/restaurants`
            );

            const restaurantsData =
                await restaurantsResponse.json();

            if (!restaurantsResponse.ok) {
                throw new Error(
                    restaurantsData.message ||
                    "Failed to load restaurants"
                );
            }

            setUsers(usersData.users || []);

            /*
             * Backend GET /api/restaurants
             * currently returns the restaurant array
             * directly.
             */
            setRestaurants(
                Array.isArray(restaurantsData)
                    ? restaurantsData
                    : restaurantsData.restaurants || []
            );

        } catch (err) {
            console.error(
                "Admin Users Error:",
                err
            );

            setError(
                err.message ||
                "Failed to load users"
            );
        } finally {
            setLoading(false);
        }
    };

    // ==========================================
    // LOAD DATA WHEN PAGE OPENS
    // ==========================================
    useEffect(() => {
        loadData();
    }, []);

    // ==========================================
    // RESTAURANT SELECTION
    // ==========================================
    const handleRestaurantChange = (
        userId,
        restaurantId
    ) => {
        setSelectedRestaurants((prev) => ({
            ...prev,
            [userId]: restaurantId,
        }));
    };

    // ==========================================
    // MAKE USER RESTAURANT OWNER
    // ==========================================
    const makeRestaurantOwner = async (user) => {
        const restaurantId =
            selectedRestaurants[user._id];

        if (!restaurantId) {
            alert(
                "Please select a restaurant first."
            );
            return;
        }

        try {
            setActionLoading(user._id);

            const token =
                localStorage.getItem("token");

            if (!token) {
                throw new Error(
                    "Authentication token not found."
                );
            }

            const response = await fetch(
                `${BACKEND_URL}/api/auth/users/${user._id}/role`,
                {
                    method: "PUT",

                    headers: {
                        "Content-Type":
                            "application/json",

                        Authorization:
                            `Bearer ${token}`,
                    },

                    body: JSON.stringify({
                        role: "restaurantOwner",
                        restaurantId,
                    }),
                }
            );

            const data =
                await response.json();

            if (!response.ok) {
                throw new Error(
                    data.message ||
                    "Failed to make restaurant owner"
                );
            }

            alert(
                "Restaurant Owner assigned successfully."
            );

            // Clear selected restaurant
            setSelectedRestaurants((prev) => {
                const updated = {
                    ...prev,
                };

                delete updated[user._id];

                return updated;
            });

            await loadData();

        } catch (err) {
            console.error(
                "Make Owner Error:",
                err
            );

            alert(
                err.message ||
                "Failed to assign restaurant owner."
            );
        } finally {
            setActionLoading(null);
        }
    };

    // ==========================================
    // REMOVE RESTAURANT OWNER ROLE
    // ==========================================
    const makeNormalUser = async (user) => {
        const confirmed = window.confirm(
            `Remove Restaurant Owner role from ${user.name}?`
        );

        if (!confirmed) {
            return;
        }

        try {
            setActionLoading(user._id);

            const token =
                localStorage.getItem("token");

            if (!token) {
                throw new Error(
                    "Authentication token not found."
                );
            }

            const response = await fetch(
                `${BACKEND_URL}/api/auth/users/${user._id}/role`,
                {
                    method: "PUT",

                    headers: {
                        "Content-Type":
                            "application/json",

                        Authorization:
                            `Bearer ${token}`,
                    },

                    body: JSON.stringify({
                        role: "user",
                    }),
                }
            );

            const data =
                await response.json();

            if (!response.ok) {
                throw new Error(
                    data.message ||
                    "Failed to change user role"
                );
            }

            alert(
                "User role updated successfully."
            );

            await loadData();

        } catch (err) {
            console.error(
                "Remove Owner Error:",
                err
            );

            alert(
                err.message ||
                "Failed to remove owner role."
            );
        } finally {
            setActionLoading(null);
        }
    };

    // ==========================================
    // ROLE LABEL
    // ==========================================
    const getRoleLabel = (role) => {
        if (role === "admin") {
            return "Admin";
        }

        if (role === "restaurantOwner") {
            return "Business";
        }

        return "User";
    };

    // ==========================================
    // SUMMARY
    // ==========================================
    const totalUsers = users.length;

    const totalOwners = users.filter(
        (user) =>
            user.role === "restaurantOwner"
    ).length;

    const totalAdmins = users.filter(
        (user) =>
            user.role === "admin"
    ).length;

    // ==========================================
    // LOADING SCREEN
    // ==========================================
    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <p className="text-lg">
                    Loading users...
                </p>
            </div>
        );
    }

    // ==========================================
    // PAGE
    // ==========================================
    return (
        <div className="min-h-screen p-6">

            <div className="max-w-7xl mx-auto">

                {/* BACK BUTTON */}
                <button
                    onClick={() =>
                        navigate("/admin")
                    }
                    className="mb-6 text-sm hover:underline"
                >
                    ← Back to Dashboard
                </button>

                {/* HEADER */}
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">

                    <div>
                        <h1 className="text-3xl font-bold">
                            👥 Registered Users
                        </h1>

                        <p className="mt-2 text-gray-600 dark:text-gray-300">
                            Manage FoodExpress users and
                            restaurant business accounts.
                        </p>
                    </div>

                    <button
                        onClick={loadData}
                        className="px-5 py-2 rounded-lg border"
                    >
                        🔄 Refresh
                    </button>

                </div>

                {/* SUMMARY CARDS */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-8">

                    <div className="p-5 rounded-xl shadow bg-white dark:bg-gray-800">

                        <p className="text-sm text-gray-500">
                            Total Users
                        </p>

                        <p className="text-3xl font-bold mt-2">
                            {totalUsers}
                        </p>

                    </div>

                    <div className="p-5 rounded-xl shadow bg-white dark:bg-gray-800">

                        <p className="text-sm text-gray-500">
                            Business Accounts
                        </p>

                        <p className="text-3xl font-bold mt-2">
                            {totalOwners}
                        </p>

                    </div>

                    <div className="p-5 rounded-xl shadow bg-white dark:bg-gray-800">

                        <p className="text-sm text-gray-500">
                            Admins
                        </p>

                        <p className="text-3xl font-bold mt-2">
                            {totalAdmins}
                        </p>

                    </div>

                </div>

                {/* ERROR */}
                {error && (
                    <div className="mb-6 p-4 rounded-lg bg-red-100 text-red-700">

                        <p className="font-semibold">
                            Failed to Load Users
                        </p>

                        <p className="mt-1">
                            {error}
                        </p>

                    </div>
                )}

                {/* MONGODB RESTAURANT INFORMATION */}
                <div className="mb-6 p-4 rounded-lg bg-blue-50 dark:bg-blue-900/20">

                    <p className="font-semibold">
                        🍽️ Restaurants available for assignment:{" "}
                        {restaurants.length}
                    </p>

                    <p className="text-sm mt-1">
                        These are restaurants stored in MongoDB.
                        Your existing frontend restaurant list is
                        not changed.
                    </p>

                </div>

                {/* USERS TABLE */}
                <div className="overflow-x-auto rounded-xl shadow">

                    <table className="min-w-full bg-white dark:bg-gray-800">

                        <thead>

                            <tr className="border-b dark:border-gray-700">

                                <th className="p-4 text-left">
                                    #
                                </th>

                                <th className="p-4 text-left">
                                    Name
                                </th>

                                <th className="p-4 text-left">
                                    Email
                                </th>

                                <th className="p-4 text-left">
                                    Phone
                                </th>

                                <th className="p-4 text-left">
                                    Role
                                </th>

                                <th className="p-4 text-left">
                                    Restaurant
                                </th>

                                <th className="p-4 text-left">
                                    Action
                                </th>

                            </tr>

                        </thead>

                        <tbody>

                            {users.length === 0 ? (

                                <tr>

                                    <td
                                        colSpan="7"
                                        className="p-8 text-center"
                                    >
                                        No users found.
                                    </td>

                                </tr>

                            ) : (

                                users.map(
                                    (user, index) => (

                                        <tr
                                            key={user._id}
                                            className="border-b dark:border-gray-700"
                                        >

                                            {/* NUMBER */}
                                            <td className="p-4">
                                                {index + 1}
                                            </td>

                                            {/* NAME */}
                                            <td className="p-4 font-semibold">
                                                {user.name}
                                            </td>

                                            {/* EMAIL */}
                                            <td className="p-4">
                                                {user.email}
                                            </td>

                                            {/* PHONE */}
                                            <td className="p-4">
                                                {user.phone ||
                                                    "Not available"}
                                            </td>

                                            {/* ROLE */}
                                            <td className="p-4">

                                                <span
                                                    className={
                                                        user.role ===
                                                            "admin"
                                                            ? "font-semibold"
                                                            : user.role ===
                                                                "restaurantOwner"
                                                                ? "font-semibold"
                                                                : ""
                                                    }
                                                >
                                                    {getRoleLabel(
                                                        user.role
                                                    )}
                                                </span>

                                            </td>

                                            {/* RESTAURANT */}
                                            <td className="p-4">

                                                {user.role ===
                                                    "admin" ? (

                                                    <span>
                                                        Platform Admin
                                                    </span>

                                                ) : user.role ===
                                                    "restaurantOwner" ? (

                                                    <div>

                                                        <p className="font-semibold">
                                                            {
                                                                user
                                                                    .restaurantId
                                                                    ?.name ||
                                                                "Not assigned"
                                                            }
                                                        </p>

                                                        {user
                                                            .restaurantId
                                                            ?.cuisine && (

                                                                <p className="text-sm text-gray-500">
                                                                    {
                                                                        user
                                                                            .restaurantId
                                                                            .cuisine
                                                                    }
                                                                </p>

                                                            )}

                                                    </div>

                                                ) : (

                                                    <select
                                                        value={
                                                            selectedRestaurants[
                                                            user._id
                                                            ] || ""
                                                        }
                                                        onChange={(e) =>
                                                            handleRestaurantChange(
                                                                user._id,
                                                                e.target.value
                                                            )
                                                        }
                                                        className="p-2 border rounded-lg dark:bg-gray-700"
                                                    >

                                                        <option value="">
                                                            Select Restaurant
                                                        </option>

                                                        {restaurants.length ===
                                                            0 ? (

                                                            <option
                                                                value=""
                                                                disabled
                                                            >
                                                                No MongoDB restaurants
                                                                available
                                                            </option>

                                                        ) : (

                                                            restaurants.map(
                                                                (
                                                                    restaurant
                                                                ) => (

                                                                    <option
                                                                        key={
                                                                            restaurant._id
                                                                        }
                                                                        value={
                                                                            restaurant._id
                                                                        }
                                                                    >
                                                                        {
                                                                            restaurant.name
                                                                        }
                                                                    </option>

                                                                )
                                                            )

                                                        )}

                                                    </select>

                                                )}

                                            </td>

                                            {/* ACTION */}
                                            <td className="p-4">

                                                {user.role ===
                                                    "admin" ? (

                                                    <span>
                                                        🔒 Protected
                                                    </span>

                                                ) : user.role ===
                                                    "restaurantOwner" ? (

                                                    <button
                                                        onClick={() =>
                                                            makeNormalUser(
                                                                user
                                                            )
                                                        }
                                                        disabled={
                                                            actionLoading ===
                                                            user._id
                                                        }
                                                        className="px-4 py-2 rounded-lg border"
                                                    >

                                                        {actionLoading ===
                                                            user._id
                                                            ? "Updating..."
                                                            : "Remove Business"}

                                                    </button>

                                                ) : (

                                                    <button
                                                        onClick={() =>
                                                            makeRestaurantOwner(
                                                                user
                                                            )
                                                        }
                                                        disabled={
                                                            actionLoading ===
                                                            user._id
                                                        }
                                                        className="px-4 py-2 rounded-lg bg-black text-white"
                                                    >

                                                        {actionLoading ===
                                                            user._id
                                                            ? "Updating..."
                                                            : "Make Business"}

                                                    </button>

                                                )}

                                            </td>

                                        </tr>

                                    )
                                )

                            )}

                        </tbody>

                    </table>

                </div>

            </div>

        </div>
    );
}

export default AdminUsers;