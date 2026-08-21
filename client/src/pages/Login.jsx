import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";

function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      const response = await API.post("/auth/login", {
        email,
        password,
      });

      console.log("Login Response:", response.data);

      const { token, user } = response.data;

      // Check login response
      if (!token || !user) {
        alert("Invalid login response from server");
        return;
      }

      console.log("Logged-in User:", user);
      console.log("User Role:", user.role);

      // Clear old login data
      localStorage.removeItem("token");
      localStorage.removeItem("user");

      // Save JWT token
      localStorage.setItem("token", token);

      // Save user details including role
      localStorage.setItem(
        "user",
        JSON.stringify({
          ...user,
          role: user.role,
        })
      );
      window.dispatchEvent(new Event("userChanged"));

      alert("Login successful");

      // Redirect based on user role
      if (user.role === "admin") {
        console.log("Admin detected → Redirecting to /admin");
        navigate("/admin", { replace: true });
      } else {
        console.log("Customer detected → Redirecting to /profile");
        navigate("/profile", { replace: true });
      }
    } catch (error) {
      console.log("Login Error:", error);

      alert(
        error.response?.data?.message ||
        "Login failed. Please check your email and password."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="
        min-h-screen
        flex
        items-center
        justify-center
        bg-gray-50
        dark:bg-gray-900
        px-4
      "
    >
      <div
        className="
          w-full
          max-w-md
          p-8
          bg-white
          dark:bg-gray-800
          shadow-lg
          rounded-lg
        "
      >
        {/* Heading */}
        <h1
          className="
            text-4xl
            text-center
            mb-8
            font-bold
            text-gray-900
            dark:text-white
          "
        >
          👤 Login
        </h1>

        <form onSubmit={handleLogin}>
          {/* Email */}
          <input
            type="email"
            placeholder="Email"
            className="
              w-full
              p-3
              mb-4
              border
              rounded
              dark:bg-gray-700
              dark:text-white
            "
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          {/* Password */}
          <input
            type="password"
            placeholder="Password"
            className="
              w-full
              p-3
              mb-6
              border
              rounded
              dark:bg-gray-700
              dark:text-white
            "
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          {/* Login Button */}
          <button
            type="submit"
            disabled={loading}
            className="
              w-full
              bg-black
              hover:bg-gray-800
              text-white
              p-3
              rounded
              transition
              disabled:opacity-50
              disabled:cursor-not-allowed
            "
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;