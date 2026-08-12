import { useState } from "react";

function Profile() {
  // Get logged-in user
  const loggedInUser = JSON.parse(localStorage.getItem("user"));

  // Use email as unique account identifier
  const userEmail = loggedInUser?.email || "guest";

  // Account-specific profile key
  const profileKey = `profile_${userEmail}`;

  const [profile, setProfile] = useState(() => {
    const savedProfile = localStorage.getItem(profileKey);

    if (savedProfile) {
      return JSON.parse(savedProfile);
    }

    return {
      name: loggedInUser?.name || "",
      email: loggedInUser?.email || "",
      phone: loggedInUser?.phone || "",
      address: ""
    };
  });

  const [isEditing, setIsEditing] = useState(false);

  const handleChange = (e) => {
    setProfile({
      ...profile,
      [e.target.name]: e.target.value
    });
  };

  const handleSave = () => {
    // Validation
    if (!profile.name.trim()) {
      alert("Please enter your name.");
      return;
    }

    if (!profile.phone.trim()) {
      alert("Please enter your phone number.");
      return;
    }

    if (!/^[0-9]{10}$/.test(profile.phone)) {
      alert("Please enter a valid 10-digit phone number.");
      return;
    }

    if (!profile.address.trim()) {
      alert("Please enter your delivery address.");
      return;
    }

    // Save account-specific profile
    localStorage.setItem(profileKey, JSON.stringify(profile));

    setIsEditing(false);

    alert("Profile saved successfully! ✅");
  };

  return (
    <div className="max-w-xl mx-auto p-6 mt-10">
      <div
        className="
          bg-white
          dark:bg-gray-800
          shadow-lg
          rounded-xl
          p-6
        "
      >
        <h1
          className="
            text-3xl
            font-bold
            text-center
            text-gray-900
            dark:text-white
          "
        >
          👤 My Profile
        </h1>

        <div className="mt-6 space-y-4">

          {/* Name */}
          <input
            type="text"
            name="name"
            placeholder="Your Name"
            value={profile.name}
            disabled={!isEditing}
            onChange={handleChange}
            className="
              w-full
              border
              rounded-lg
              p-3
              dark:bg-gray-700
              dark:text-white
            "
          />

          {/* Email */}
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={profile.email}
            disabled
            className="
              w-full
              border
              rounded-lg
              p-3
              bg-gray-100
              dark:bg-gray-600
              dark:text-white
            "
          />

          {/* Phone */}
          <input
            type="tel"
            name="phone"
            placeholder="Phone Number"
            value={profile.phone}
            disabled={!isEditing}
            onChange={handleChange}
            maxLength="10"
            className="
              w-full
              border
              rounded-lg
              p-3
              dark:bg-gray-700
              dark:text-white
            "
          />

          {/* Address */}
          <textarea
            name="address"
            placeholder="Delivery Address"
            value={profile.address}
            disabled={!isEditing}
            onChange={handleChange}
            rows="4"
            className="
              w-full
              border
              rounded-lg
              p-3
              dark:bg-gray-700
              dark:text-white
            "
          />
        </div>

        <div className="flex justify-center gap-4 mt-6">

          {!isEditing ? (
            <button
              onClick={() => setIsEditing(true)}
              className="
                bg-orange-500
                hover:bg-orange-600
                text-white
                px-6
                py-2
                rounded-lg
              "
            >
              ✏️ Edit Profile
            </button>
          ) : (
            <button
              onClick={handleSave}
              className="
                bg-green-600
                hover:bg-green-700
                text-white
                px-6
                py-2
                rounded-lg
              "
            >
              💾 Save Profile
            </button>
          )}

        </div>
      </div>
    </div>
  );
}

export default Profile;