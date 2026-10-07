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

// ================= NEW: IMAGE UPLOAD HELPER =================
// Image select pannina, size kuraichu (compress) data aa maathum

const compressImage = (file, maxWidth = 900, quality = 0.7) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onerror = reject;

    reader.onload = () => {
      const img = new Image();

      img.onerror = reject;

      img.onload = () => {
        const scale = Math.min(1, maxWidth / img.width);

        const canvas = document.createElement("canvas");
        canvas.width = Math.round(img.width * scale);
        canvas.height = Math.round(img.height * scale);

        canvas
          .getContext("2d")
          .drawImage(img, 0, 0, canvas.width, canvas.height);

        resolve(canvas.toDataURL("image/jpeg", quality));
      };

      img.src = reader.result;
    };

    reader.readAsDataURL(file);
  });

// ============================================================

function RestaurantOwnerDashboard() {
  const [restaurant, setRestaurant] =
    useState(null);

  const [orders, setOrders] = useState([]);

  const [loading, setLoading] =
    useState(true);

  const [form, setForm] = useState({
    name: "",
    cuisine: "",
    image: "",
    rating: 4.5,
    deliveryTime: "",
    description: "",
  });

  // ================= MENU =================

  const [menu, setMenu] = useState([]);

  const [dishForm, setDishForm] = useState({
    name: "",
    price: "",
    image: "",
  });

  const [savingMenu, setSavingMenu] =
    useState(false);

  // file input reset panna
  const [dishFileKey, setDishFileKey] =
    useState(0);

  // =============================================

  const token =
    localStorage.getItem("token");

  const loadData = async () => {
    try {
      setLoading(true);

      const restaurantResponse =
        await fetch(
          `${BACKEND_URL}/api/restaurants/owner/my-restaurant`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

      const restaurantData =
        await restaurantResponse.json();

      if (
        restaurantResponse.ok &&
        restaurantData.success
      ) {
        setRestaurant(
          restaurantData.restaurant
        );

        setMenu(
          restaurantData.restaurant.menu ||
            []
        );

        setForm({
          name:
            restaurantData.restaurant.name ||
            "",
          cuisine:
            restaurantData.restaurant.cuisine ||
            "",
          image:
            restaurantData.restaurant.image ||
            "",
          rating:
            restaurantData.restaurant.rating ||
            4.5,
          deliveryTime:
            restaurantData.restaurant
              .deliveryTime || "",
          description:
            restaurantData.restaurant
              .description || "",
        });
      }

      const ordersResponse =
        await fetch(
          `${BACKEND_URL}/api/orders/owner`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

      const ordersData =
        await ordersResponse.json();

      if (
        ordersResponse.ok &&
        ordersData.success
      ) {
        setOrders(
          ordersData.orders || []
        );
      }
    } catch (error) {
      console.error(error);
      toast.error(
        "Failed to load restaurant data"
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  // ================= NEW: RESTAURANT IMAGE UPLOAD =================

  const handleRestaurantImageUpload = async (e) => {
    const file = e.target.files?.[0];

    if (!file) return;

    if (!file.type.startsWith("image/")) {
      toast.error("Please select an image file");
      return;
    }

    try {
      const compressed = await compressImage(file);

      setForm((previous) => ({
        ...previous,
        image: compressed,
      }));

      toast.success(
        "Image selected. Click Save Restaurant Details."
      );
    } catch (error) {
      console.error(error);
      toast.error("Could not read the image");
    }
  };

  // ================================================================

  const updateRestaurant = async (e) => {
    e.preventDefault();

    if (!form.image) {
      toast.error(
        "Please upload an image or paste an image URL"
      );
      return;
    }

    try {
      const response = await fetch(
        `${BACKEND_URL}/api/restaurants/owner/my-restaurant`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(form),
        }
      );

      const data = await response.json();

      if (!response.ok || !data.success) {
        toast.error(
          data.message ||
            "Failed to update restaurant"
        );
        return;
      }

      setRestaurant(data.restaurant);

      toast.success(
        "Restaurant updated successfully"
      );
    } catch (error) {
      console.error(error);

      toast.error(
        "Could not update restaurant"
      );
    }
  };

  // ================= MENU FUNCTIONS =================

  const handleDishChange = (e) => {
    setDishForm({
      ...dishForm,
      [e.target.name]: e.target.value,
    });
  };

  // ================= NEW: DISH IMAGE UPLOAD =================

  const handleDishImageUpload = async (e) => {
    const file = e.target.files?.[0];

    if (!file) return;

    if (!file.type.startsWith("image/")) {
      toast.error("Please select an image file");
      return;
    }

    try {
      const compressed = await compressImage(
        file,
        600,
        0.7
      );

      setDishForm((previous) => ({
        ...previous,
        image: compressed,
      }));
    } catch (error) {
      console.error(error);
      toast.error("Could not read the image");
    }
  };

  // ==========================================================

  const saveMenu = async (newMenu, successMessage) => {
    try {
      setSavingMenu(true);

      const response = await fetch(
        `${BACKEND_URL}/api/restaurants/owner/my-restaurant`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            menu: newMenu,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok || !data.success) {
        toast.error(
          data.message ||
            "Failed to save menu"
        );
        return false;
      }

      setRestaurant(data.restaurant);
      setMenu(data.restaurant.menu || []);

      toast.success(successMessage);
      return true;
    } catch (error) {
      console.error(error);
      toast.error("Could not save menu");
      return false;
    } finally {
      setSavingMenu(false);
    }
  };

  const addDish = async (e) => {
    e.preventDefault();

    if (
      !dishForm.name.trim() ||
      Number(dishForm.price) <= 0
    ) {
      toast.error(
        "Enter dish name and a valid price"
      );
      return;
    }

    const newMenu = [
      ...menu,
      {
        name: dishForm.name.trim(),
        price: Number(dishForm.price),
        image: dishForm.image.trim(),
      },
    ];

    const saved = await saveMenu(
      newMenu,
      "Dish added successfully 🍽️"
    );

    if (saved) {
      setDishForm({
        name: "",
        price: "",
        image: "",
      });

      setDishFileKey((previous) => previous + 1);
    }
  };

  const deleteDish = async (dishId) => {
    const newMenu = menu.filter(
      (dish) => dish.id !== dishId
    );

    await saveMenu(
      newMenu,
      "Dish removed 🗑️"
    );
  };

  // =======================================================

  const updateOrderStatus = async (
    orderId,
    status
  ) => {
    try {
      const response = await fetch(
        `${BACKEND_URL}/api/orders/${orderId}/status`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ status }),
        }
      );

      const data = await response.json();

      if (!response.ok || !data.success) {
        toast.error(
          data.message ||
            "Failed to update order"
        );
        return;
      }

      setOrders((previous) =>
        previous.map((order) =>
          order._id === orderId
            ? {
                ...order,
                status,
              }
            : order
        )
      );

      toast.success(
        "Order status updated"
      );
    } catch (error) {
      toast.error(
        "Could not update order"
      );
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Loading...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 p-6">
      <div className="max-w-6xl mx-auto">

        <Link
          to="/profile"
          className="inline-block mb-6 bg-orange-500 text-white px-5 py-2 rounded-lg"
        >
          ← Profile
        </Link>

        <h1 className="text-4xl font-bold text-gray-900 dark:text-white">
          🏪 Restaurant Owner Dashboard
        </h1>

        {/* ORDER COUNT */}

        <div className="mt-6 bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white">
            Total Orders for My Restaurant
          </h2>

          <p className="text-4xl font-bold text-orange-500 mt-3">
            {orders.length}
          </p>
        </div>

        {/* RESTAURANT FORM */}

        {restaurant && (
          <div className="mt-6 bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-5">
              🍔 My Restaurant Details
            </h2>

            <form
              onSubmit={updateRestaurant}
              className="grid md:grid-cols-2 gap-4"
            >
              <input
                name="name"
                value={form.name}
                onChange={handleChange}
                placeholder="Restaurant Name"
                className="input"
                required
              />

              <input
                name="cuisine"
                value={form.cuisine}
                onChange={handleChange}
                placeholder="Cuisine"
                className="input"
                required
              />

              {/* IMAGE URL (optional, upload pannina idhu empty ah theriyum) */}

              <input
                name="image"
                value={
                  form.image.startsWith("data:")
                    ? ""
                    : form.image
                }
                onChange={handleChange}
                placeholder="Restaurant Image URL (or upload below)"
                className="input md:col-span-2"
              />

              {/* ================= NEW: IMAGE UPLOAD ================= */}

              <div className="md:col-span-2">
                <label className="block mb-2 font-semibold text-gray-800 dark:text-gray-200">
                  📷 Upload Restaurant Image
                </label>

                <input
                  type="file"
                  accept="image/*"
                  onChange={handleRestaurantImageUpload}
                  className="input w-full"
                />
              </div>

              {/* ===================================================== */}

              <input
                name="deliveryTime"
                value={form.deliveryTime}
                onChange={handleChange}
                placeholder="Delivery Time"
                className="input"
                required
              />

              <input
                name="rating"
                type="number"
                min="0"
                max="5"
                step="0.1"
                value={form.rating}
                onChange={handleChange}
                className="input"
              />

              <textarea
                name="description"
                value={form.description}
                onChange={handleChange}
                placeholder="Description"
                className="input md:col-span-2 min-h-28"
              />

              <button
                type="submit"
                className="md:col-span-2 bg-green-600 hover:bg-green-700 text-white py-3 rounded-lg font-semibold"
              >
                Save Restaurant Details
              </button>
            </form>

            {form.image && (
              <img
                src={form.image}
                alt={form.name}
                className="mt-5 w-full h-64 object-cover rounded-xl"
              />
            )}
          </div>
        )}

        {/* ================= MENU ================= */}

        {restaurant && (
          <div className="mt-6 bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-5">
              🍽️ My Menu
            </h2>

            <form
              onSubmit={addDish}
              className="grid md:grid-cols-3 gap-4"
            >
              <input
                name="name"
                value={dishForm.name}
                onChange={handleDishChange}
                placeholder="Dish Name (e.g. Masala Dosa)"
                className="input"
                required
              />

              <input
                name="price"
                type="number"
                min="1"
                value={dishForm.price}
                onChange={handleDishChange}
                placeholder="Price (₹)"
                className="input"
                required
              />

              <input
                name="image"
                value={
                  dishForm.image.startsWith("data:")
                    ? ""
                    : dishForm.image
                }
                onChange={handleDishChange}
                placeholder="Dish Image URL (or upload below)"
                className="input"
              />

              {/* ================= NEW: DISH IMAGE UPLOAD ================= */}

              <div className="md:col-span-3">
                <label className="block mb-2 font-semibold text-gray-800 dark:text-gray-200">
                  📷 Upload Dish Image
                </label>

                <input
                  key={dishFileKey}
                  type="file"
                  accept="image/*"
                  onChange={handleDishImageUpload}
                  className="input w-full"
                />

                {dishForm.image && (
                  <img
                    src={dishForm.image}
                    alt="Dish preview"
                    className="mt-3 w-40 h-32 object-cover rounded-lg"
                  />
                )}
              </div>

              {/* ========================================================== */}

              <button
                type="submit"
                disabled={savingMenu}
                className="md:col-span-3 bg-orange-500 hover:bg-orange-600 disabled:opacity-60 text-white py-3 rounded-lg font-semibold"
              >
                {savingMenu
                  ? "Saving..."
                  : "➕ Add Dish"}
              </button>
            </form>

            {menu.length === 0 ? (
              <p className="mt-6 text-center text-gray-600 dark:text-gray-300">
                No dishes added yet.
              </p>
            ) : (
              <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-5">
                {menu.map((dish) => (
                  <div
                    key={dish.id}
                    className="bg-gray-50 dark:bg-gray-700 rounded-xl overflow-hidden shadow"
                  >
                    {dish.image ? (
                      <img
                        src={dish.image}
                        alt={dish.name}
                        className="w-full h-40 object-cover"
                      />
                    ) : (
                      <div className="w-full h-40 flex items-center justify-center bg-gray-200 dark:bg-gray-600 text-gray-500 dark:text-gray-300">
                        No image
                      </div>
                    )}

                    <div className="p-4">
                      <h3 className="font-bold text-gray-900 dark:text-white">
                        {dish.name}
                      </h3>

                      <p className="text-orange-600 font-semibold mt-1">
                        ₹{dish.price}
                      </p>

                      <button
                        type="button"
                        disabled={savingMenu}
                        onClick={() =>
                          deleteDish(dish.id)
                        }
                        className="mt-3 w-full bg-red-500 hover:bg-red-600 disabled:opacity-60 text-white py-2 rounded-lg font-semibold"
                      >
                        Remove 🗑️
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* =============================================== */}

        {/* ORDERS */}

        <div className="mt-6">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            📦 My Restaurant Orders
          </h2>

          {orders.length === 0 ? (
            <div className="bg-white dark:bg-gray-800 rounded-xl p-8 text-center">
              No orders for your restaurant yet.
            </div>
          ) : (
            <div className="space-y-5">
              {orders.map((order) => (
                <div
                  key={order._id}
                  className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6"
                >
                  <div className="flex justify-between items-center">
                    <h3 className="font-bold text-lg text-gray-900 dark:text-white">
                      Order #
                      {order._id?.slice(-8)}
                    </h3>

                    <select
                      value={
                        order.status ||
                        "Confirmed"
                      }
                      onChange={(e) =>
                        updateOrderStatus(
                          order._id,
                          e.target.value
                        )
                      }
                      className="border rounded-lg px-3 py-2 dark:bg-gray-700 dark:text-white"
                    >
                      {STATUS_OPTIONS.map(
                        (status) => (
                          <option
                            key={status}
                            value={status}
                          >
                            {status}
                          </option>
                        )
                      )}
                    </select>
                  </div>

                  <div className="mt-4 text-gray-700 dark:text-gray-300">
                    <p>
                      👤{" "}
                      {order.customer?.name}
                    </p>

                    <p>
                      📱{" "}
                      {order.customer?.phone}
                    </p>

                    <p>
                      📍{" "}
                      {order.customer?.address}
                    </p>

                    <p className="mt-2 font-bold">
                      Total: ₹{order.total}
                    </p>
                  </div>

                  <div className="mt-4 border-t pt-4">
                    {order.items?.map(
                      (item, index) => (
                        <div
                          key={index}
                          className="flex justify-between py-2"
                        >
                          <span>
                            {item.name} ×{" "}
                            {item.quantity}
                          </span>

                          <span>
                            ₹
                            {item.price *
                              item.quantity}
                          </span>
                        </div>
                      )
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

      </div>
    </div>
  );
}

export default RestaurantOwnerDashboard;