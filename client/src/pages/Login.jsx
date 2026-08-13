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

      // Save JWT token
      localStorage.setItem(
        "token",
        response.data.token
      );

      // Save user details
      localStorage.setItem(
        "user",
        JSON.stringify(response.data.user)
      );

      alert("Login successful");

      // Redirect based on user role
      if (response.data.user?.role === "admin") {
        navigate("/admin");
      } else {
        navigate("/profile");
      }

    } catch (error) {
      console.log("Login Error:", error);

      alert(
        error.response?.data?.message ||
        "Login failed"
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
            className="
              w-full
              bg-black
              hover:bg-gray-800
              text-white
              p-3
              rounded
              transition
            "
            disabled={loading}
          >
            {loading
              ? "Logging in..."
              : "Login"}
          </button>

        </form>

      </div>
    </div>
  );
}

export default Login;