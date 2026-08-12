import { useEffect, useState } from "react";
import toast from "react-hot-toast";

function CheckoutForm({ onPlaceOrder }) {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    address: "",
    payment: "Cash on Delivery",
  });

  const [errors, setErrors] = useState({});

  // =====================================================
  // LOAD LOGGED-IN USER PROFILE
  // =====================================================

  useEffect(() => {
    const loggedInUser = JSON.parse(
      localStorage.getItem("user")
    );

    if (!loggedInUser) {
      return;
    }

    const userEmail = loggedInUser.email;

    const profileKey = `profile_${userEmail}`;

    const savedProfile = localStorage.getItem(profileKey);

    if (savedProfile) {
      const profile = JSON.parse(savedProfile);

      setFormData((prev) => ({
        ...prev,
        name: profile.name || loggedInUser.name || "",
        phone: profile.phone || loggedInUser.phone || "",
        address: profile.address || "",
      }));
    } else {
      // If profile doesn't exist yet,
      // use logged-in user's basic details.
      setFormData((prev) => ({
        ...prev,
        name: loggedInUser.name || "",
        phone: loggedInUser.phone || "",
      }));
    }
  }, []);

  // =====================================================
  // HANDLE INPUT CHANGE
  // =====================================================

  const handleChange = (e) => {
    const { name, value } = e.target;

    // Phone - allow numbers only
    if (name === "phone") {
      const numbersOnly = value.replace(/\D/g, "");

      setFormData((prev) => ({
        ...prev,
        phone: numbersOnly,
      }));

      setErrors((prev) => ({
        ...prev,
        phone: "",
      }));

      return;
    }

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    setErrors((prev) => ({
      ...prev,
      [name]: "",
    }));
  };

  // =====================================================
  // VALIDATION
  // =====================================================

  const validateForm = () => {
    const newErrors = {};

    const nameRegex = /^[A-Za-z\s]{3,50}$/;
    const phoneRegex = /^[6-9]\d{9}$/;

    // Name
    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
    } else if (!nameRegex.test(formData.name.trim())) {
      newErrors.name =
        "Please enter a valid name using letters only";
    }

    // Phone
    if (!formData.phone.trim()) {
      newErrors.phone = "Phone number is required";
    } else if (!phoneRegex.test(formData.phone.trim())) {
      newErrors.phone =
        "Enter a valid 10-digit Indian mobile number";
    }

    // Address
    if (!formData.address.trim()) {
      newErrors.address =
        "Delivery address is required";
    } else if (formData.address.trim().length < 10) {
      newErrors.address =
        "Address must contain at least 10 characters";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  // =====================================================
  // SUBMIT
  // =====================================================

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validateForm()) {
      toast.error(
        "Please correct the highlighted fields"
      );

      return;
    }

    onPlaceOrder(formData);
  };

  // =====================================================
  // UI
  // =====================================================

  return (
    <div
      className="
        bg-white
        dark:bg-gray-800
        shadow-md
        rounded-xl
        p-6
      "
    >
      <h2
        className="
          text-2xl
          font-bold
          mb-5
          text-gray-900
          dark:text-white
        "
      >
        Delivery Details 🚚
      </h2>

      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-4"
      >

        {/* =================================================
            NAME
        ================================================= */}

        <div>
          <label
            className="
              block
              mb-1
              font-semibold
              text-gray-700
              dark:text-gray-200
            "
          >
            Full Name
          </label>

          <input
            type="text"
            name="name"
            placeholder="Enter your full name"
            value={formData.name}
            onChange={handleChange}
            maxLength="50"
            className={`
              w-full
              border
              ${
                errors.name
                  ? "border-red-500"
                  : "border-gray-300 dark:border-gray-600"
              }
              bg-white
              dark:bg-gray-700
              text-gray-900
              dark:text-white
              rounded-lg
              p-3
              outline-none
              focus:ring-2
              focus:ring-orange-400
            `}
          />

          {errors.name && (
            <p className="text-red-500 text-sm mt-1">
              {errors.name}
            </p>
          )}
        </div>

        {/* =================================================
            PHONE
        ================================================= */}

        <div>
          <label
            className="
              block
              mb-1
              font-semibold
              text-gray-700
              dark:text-gray-200
            "
          >
            Phone Number
          </label>

          <input
            type="tel"
            name="phone"
            placeholder="Enter 10-digit mobile number"
            value={formData.phone}
            onChange={handleChange}
            maxLength="10"
            inputMode="numeric"
            className={`
              w-full
              border
              ${
                errors.phone
                  ? "border-red-500"
                  : "border-gray-300 dark:border-gray-600"
              }
              bg-white
              dark:bg-gray-700
              text-gray-900
              dark:text-white
              rounded-lg
              p-3
              outline-none
              focus:ring-2
              focus:ring-orange-400
            `}
          />

          {errors.phone && (
            <p className="text-red-500 text-sm mt-1">
              {errors.phone}
            </p>
          )}
        </div>

        {/* =================================================
            ADDRESS
        ================================================= */}

        <div>
          <label
            className="
              block
              mb-1
              font-semibold
              text-gray-700
              dark:text-gray-200
            "
          >
            Delivery Address
          </label>

          <textarea
            name="address"
            placeholder="Enter your complete delivery address"
            value={formData.address}
            onChange={handleChange}
            rows="4"
            maxLength="300"
            className={`
              w-full
              border
              ${
                errors.address
                  ? "border-red-500"
                  : "border-gray-300 dark:border-gray-600"
              }
              bg-white
              dark:bg-gray-700
              text-gray-900
              dark:text-white
              rounded-lg
              p-3
              outline-none
              resize-none
              focus:ring-2
              focus:ring-orange-400
            `}
          />

          {errors.address && (
            <p className="text-red-500 text-sm mt-1">
              {errors.address}
            </p>
          )}
        </div>

        {/* =================================================
            PAYMENT
        ================================================= */}

        <div>
          <label
            className="
              block
              mb-1
              font-semibold
              text-gray-700
              dark:text-gray-200
            "
          >
            Payment Method
          </label>

          <select
            name="payment"
            value={formData.payment}
            onChange={handleChange}
            className="
              w-full
              border
              border-gray-300
              dark:border-gray-600
              bg-white
              dark:bg-gray-700
              text-gray-900
              dark:text-white
              rounded-lg
              p-3
              outline-none
              focus:ring-2
              focus:ring-orange-400
            "
          >
            <option value="Cash on Delivery">
              💵 Cash on Delivery
            </option>

            <option value="Razorpay">
              💳 Razorpay
            </option>
          </select>
        </div>

        {/* =================================================
            SUBMIT
        ================================================= */}

        <button
          type="submit"
          className="
            bg-orange-500
            hover:bg-orange-600
            text-white
            py-3
            rounded-lg
            font-semibold
            transition
            mt-2
          "
        >
          {formData.payment === "Cash on Delivery"
            ? "Place Order 🎉"
            : "Pay with Razorpay 💳"}
        </button>
      </form>
    </div>
  );
}

export default CheckoutForm;