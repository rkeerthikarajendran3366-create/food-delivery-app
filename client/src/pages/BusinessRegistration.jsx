import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";

function BusinessRegistration() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    businessName: "",
    ownerName: "",
    email: "",
    phone: "",
    restaurantName: "",
    cuisine: "",
    address: "",
    city: "",
    description: "",
    openingTime: "",
    closingTime: "",
  });

  const [loading, setLoading] = useState(false);

  // =====================================================
  // HANDLE INPUT CHANGES
  // =====================================================
  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // =====================================================
  // SUBMIT BUSINESS REGISTRATION
  // =====================================================
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      // ---------------------------------------------
      // Get logged-in user's JWT token
      // ---------------------------------------------
      const token = localStorage.getItem("token");

      if (!token) {
        alert(
          "Please login first before registering your business."
        );

        navigate("/login");
        return;
      }

      // ---------------------------------------------
      // Send business application with JWT
      // ---------------------------------------------
      const response = await API.post(
        "/auth/register-business",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log(
        "Business Registration Response:",
        response.data
      );

      // ---------------------------------------------
      // Success
      // ---------------------------------------------
      alert(
        response.data?.message ||
        "Business registration submitted successfully."
      );

      navigate("/restaurants");
    } catch (error) {
      console.error(
        "Business Registration Error:",
        error
      );

      // ---------------------------------------------
      // Handle authentication error
      // ---------------------------------------------
      if (error.response?.status === 401) {
        alert(
          "Your login session has expired. Please login again."
        );

        localStorage.removeItem("token");
        localStorage.removeItem("user");

        navigate("/login");
        return;
      }

      // ---------------------------------------------
      // Handle other errors
      // ---------------------------------------------
      alert(
        error.response?.data?.message ||
        "Business registration failed."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 px-4 py-10">
      <div className="max-w-3xl mx-auto">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8">
          {/* =====================================================
              HEADING
          ===================================================== */}
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            🏪 Register Your Business
          </h1>

          <p className="text-gray-600 dark:text-gray-300 mb-8">
            Submit your restaurant details for admin approval.
          </p>

          {/* =====================================================
              FORM
          ===================================================== */}
          <form onSubmit={handleSubmit} className="space-y-5">

            {/* Business Name */}
            <div>
              <label className="block mb-2 font-medium text-gray-700 dark:text-gray-200">
                Business Name
              </label>

              <input
                type="text"
                name="businessName"
                value={formData.businessName}
                onChange={handleChange}
                placeholder="Enter business name"
                required
                className="w-full p-3 border rounded dark:bg-gray-700 dark:text-white"
              />
            </div>

            {/* Owner Name */}
            <div>
              <label className="block mb-2 font-medium text-gray-700 dark:text-gray-200">
                Owner Name
              </label>

              <input
                type="text"
                name="ownerName"
                value={formData.ownerName}
                onChange={handleChange}
                placeholder="Enter owner name"
                required
                className="w-full p-3 border rounded dark:bg-gray-700 dark:text-white"
              />
            </div>

            {/* Email */}
            <div>
              <label className="block mb-2 font-medium text-gray-700 dark:text-gray-200">
                Business Email
              </label>

              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter business email"
                required
                className="w-full p-3 border rounded dark:bg-gray-700 dark:text-white"
              />
            </div>

            {/* Phone */}
            <div>
              <label className="block mb-2 font-medium text-gray-700 dark:text-gray-200">
                Phone Number
              </label>

              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="Enter phone number"
                required
                className="w-full p-3 border rounded dark:bg-gray-700 dark:text-white"
              />
            </div>

            {/* Restaurant Name */}
            <div>
              <label className="block mb-2 font-medium text-gray-700 dark:text-gray-200">
                Restaurant Name
              </label>

              <input
                type="text"
                name="restaurantName"
                value={formData.restaurantName}
                onChange={handleChange}
                placeholder="Enter restaurant name"
                required
                className="w-full p-3 border rounded dark:bg-gray-700 dark:text-white"
              />
            </div>

            {/* Cuisine */}
            <div>
              <label className="block mb-2 font-medium text-gray-700 dark:text-gray-200">
                Cuisine
              </label>

              <input
                type="text"
                name="cuisine"
                value={formData.cuisine}
                onChange={handleChange}
                placeholder="Example: Indian, Chinese, Italian"
                required
                className="w-full p-3 border rounded dark:bg-gray-700 dark:text-white"
              />
            </div>

            {/* Address */}
            <div>
              <label className="block mb-2 font-medium text-gray-700 dark:text-gray-200">
                Address
              </label>

              <textarea
                name="address"
                value={formData.address}
                onChange={handleChange}
                placeholder="Enter restaurant address"
                required
                rows="3"
                className="w-full p-3 border rounded dark:bg-gray-700 dark:text-white"
              />
            </div>

            {/* City */}
            <div>
              <label className="block mb-2 font-medium text-gray-700 dark:text-gray-200">
                City
              </label>

              <input
                type="text"
                name="city"
                value={formData.city}
                onChange={handleChange}
                placeholder="Enter city"
                required
                className="w-full p-3 border rounded dark:bg-gray-700 dark:text-white"
              />
            </div>

            {/* Description */}
            <div>
              <label className="block mb-2 font-medium text-gray-700 dark:text-gray-200">
                Description
              </label>

              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                placeholder="Describe your restaurant"
                rows="4"
                className="w-full p-3 border rounded dark:bg-gray-700 dark:text-white"
              />
            </div>

            {/* Opening / Closing Time */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

              <div>
                <label className="block mb-2 font-medium text-gray-700 dark:text-gray-200">
                  Opening Time
                </label>

                <input
                  type="time"
                  name="openingTime"
                  value={formData.openingTime}
                  onChange={handleChange}
                  className="w-full p-3 border rounded dark:bg-gray-700 dark:text-white"
                />
              </div>

              <div>
                <label className="block mb-2 font-medium text-gray-700 dark:text-gray-200">
                  Closing Time
                </label>

                <input
                  type="time"
                  name="closingTime"
                  value={formData.closingTime}
                  onChange={handleChange}
                  className="w-full p-3 border rounded dark:bg-gray-700 dark:text-white"
                />
              </div>

            </div>

            {/* =====================================================
                INFO
            ===================================================== */}
            <div className="bg-blue-50 dark:bg-blue-900/30 border border-blue-200 dark:border-blue-700 rounded-lg p-4">
              <p className="text-sm text-blue-800 dark:text-blue-200">
                ℹ️ Your business registration will be reviewed by
                an admin. Your account will become a Restaurant
                Owner only after approval.
              </p>
            </div>

            {/* =====================================================
                SUBMIT BUTTON
            ===================================================== */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-black hover:bg-gray-800 text-white p-3 rounded-lg transition disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading
                ? "Submitting..."
                : "Submit Business Registration"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default BusinessRegistration;