import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import API from "../services/api";

function Profile() {
  const [user, setUser] = useState(() => {
    try {
      return JSON.parse(
        localStorage.getItem("user")
      );
    } catch {
      return null;
    }
  });

  const [profile, setProfile] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
  });

  const [business, setBusiness] = useState({
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

  const [application, setApplication] =
    useState(null);

  useEffect(() => {
    if (!user) return;

    setProfile({
      name: user.name || "",
      email: user.email || "",
      phone: user.phone || "",
      address: user.address || "",
    });

    setBusiness((prev) => ({
      ...prev,
      ownerName: user.name || "",
      email: user.email || "",
      phone: user.phone || "",
    }));

    loadApplication();
  }, []);

  const loadApplication = async () => {
    const token =
      localStorage.getItem("token");

    if (!token) return;

    try {
      const response = await API.get(
        "/business-applications/my",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setApplication(
        response.data.application
      );
    } catch (error) {
      console.error(
        "Application load error:",
        error
      );
    }
  };

  const handleProfileChange = (e) => {
    setProfile({
      ...profile,
      [e.target.name]: e.target.value,
    });
  };

  const handleBusinessChange = (e) => {
    setBusiness({
      ...business,
      [e.target.name]: e.target.value,
    });
  };

  const updateProfile = async (e) => {
    e.preventDefault();

    const token =
      localStorage.getItem("token");

    try {
      const response = await API.put(
        "/auth/profile",
        profile,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const updatedUser =
        response.data.user;

      localStorage.setItem(
        "user",
        JSON.stringify(updatedUser)
      );

      setUser(updatedUser);

      window.dispatchEvent(
        new Event("userChanged")
      );

      toast.success(
        "Profile updated successfully"
      );
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          "Failed to update profile"
      );
    }
  };

  const submitBusiness = async (e) => {
    e.preventDefault();

    const token =
      localStorage.getItem("token");

    if (!token) {
      toast.error("Please login first");
      return;
    }

    try {
      const response = await API.post(
        "/auth/register-business",
        business,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      toast.success(
        response.data.message
      );

      await loadApplication();
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          "Business registration failed"
      );
    }
  };

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Link
          to="/login"
          className="bg-orange-500 text-white px-6 py-3 rounded-lg"
        >
          Login to view Profile
        </Link>
      </div>
    );
  }

  const isOwner =
    user.role === "restaurantOwner";

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-6">
      <div className="max-w-5xl mx-auto">

        <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-8">
          👤 My Profile
        </h1>

        {/* PROFILE FORM */}

        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-5">
            Personal Profile
          </h2>

          <form
            onSubmit={updateProfile}
            className="grid md:grid-cols-2 gap-4"
          >
            <input
              name="name"
              value={profile.name}
              onChange={handleProfileChange}
              placeholder="Name"
              className="input"
              required
            />

            <input
              name="email"
              value={profile.email}
              disabled
              className="input bg-gray-100"
            />

            <input
              name="phone"
              value={profile.phone}
              onChange={handleProfileChange}
              placeholder="Phone"
              className="input"
            />

            <input
              name="address"
              value={profile.address}
              onChange={handleProfileChange}
              placeholder="Address"
              className="input"
            />

            <button
              type="submit"
              className="md:col-span-2 bg-orange-500 hover:bg-orange-600 text-white py-3 rounded-lg font-semibold"
            >
              Save Profile
            </button>
          </form>
        </div>

        {/* OWNER DASHBOARD */}

        {isOwner && (
          <div className="bg-green-50 dark:bg-green-900 rounded-xl p-6 mb-8">
            <h2 className="text-2xl font-bold text-green-800 dark:text-green-100">
              🏪 Restaurant Owner
            </h2>

            <p className="mt-2 text-green-700 dark:text-green-200">
              Your business application has been approved.
            </p>

            <Link
              to="/restaurant-owner"
              className="inline-block mt-4 bg-green-600 hover:bg-green-700 text-white px-5 py-2 rounded-lg"
            >
              Manage My Restaurant & Orders
            </Link>
          </div>
        )}

        {/* BUSINESS FORM */}

        {!isOwner &&
          user.role === "user" && (
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                🏪 Register Your Business
              </h2>

              <p className="text-gray-600 dark:text-gray-300 mb-5">
                Submit your restaurant for admin approval.
              </p>

              {application && (
                <div className="mb-5 p-4 rounded-lg bg-gray-100 dark:bg-gray-700">
                  <strong>
                    Application Status:
                  </strong>{" "}
                  <span
                    className={
                      application.status ===
                      "approved"
                        ? "text-green-600"
                        : application.status ===
                          "rejected"
                        ? "text-red-600"
                        : "text-orange-600"
                    }
                  >
                    {application.status}
                  </span>

                  {application.rejectionReason && (
                    <p className="mt-2 text-red-600">
                      Reason:{" "}
                      {
                        application.rejectionReason
                      }
                    </p>
                  )}
                </div>
              )}

              <form
                onSubmit={submitBusiness}
                className="grid md:grid-cols-2 gap-4"
              >
                {[
                  ["businessName", "Business Name"],
                  ["ownerName", "Owner Name"],
                  ["email", "Email"],
                  ["phone", "Phone"],
                  ["restaurantName", "Restaurant Name"],
                  ["cuisine", "Cuisine"],
                  ["address", "Address"],
                  ["city", "City"],
                  ["openingTime", "Opening Time"],
                  ["closingTime", "Closing Time"],
                ].map(
                  ([name, placeholder]) => (
                    <input
                      key={name}
                      name={name}
                      value={business[name]}
                      onChange={
                        handleBusinessChange
                      }
                      placeholder={placeholder}
                      className="input"
                      required={[
                        "businessName",
                        "ownerName",
                        "email",
                        "phone",
                        "restaurantName",
                        "cuisine",
                        "address",
                        "city",
                      ].includes(name)}
                    />
                  )
                )}

                <textarea
                  name="description"
                  value={
                    business.description
                  }
                  onChange={
                    handleBusinessChange
                  }
                  placeholder="Restaurant Description"
                  className="input md:col-span-2 min-h-28"
                />

                <button
                  type="submit"
                  disabled={
                    application?.status ===
                    "pending"
                  }
                  className="md:col-span-2 bg-orange-500 hover:bg-orange-600 disabled:opacity-50 text-white py-3 rounded-lg font-semibold"
                >
                  {application?.status ===
                  "pending"
                    ? "Application Pending"
                    : "Submit Business Registration"}
                </button>
              </form>
            </div>
          )}
      </div>
    </div>
  );
}

export default Profile;