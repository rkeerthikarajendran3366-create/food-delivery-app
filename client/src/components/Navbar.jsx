import { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { CartContext } from "../context/CartContext";

function Navbar() {
  const [open, setOpen] = useState(false);

  const { cart } = useContext(CartContext);

  const navigate = useNavigate();

  const isLoggedIn = !!localStorage.getItem("token");

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    alert("Logged out successfully");

    navigate("/login");
  };

  return (
    <nav
      className="
        bg-white
        dark:bg-gray-900
        shadow-md
        sticky
        top-0
        z-50
      "
    >
      <div
        className="
          max-w-7xl
          mx-auto
          px-6
          py-4
          flex
          justify-between
          items-center
        "
      >
        {/* Logo */}
        <Link
          to="/"
          className="
            text-2xl
            font-bold
            text-orange-500
          "
        >
          🍔 FoodExpress
        </Link>

        {/* Desktop Menu */}
        <div
          className="
            hidden
            md:flex
            items-center
            gap-6
            font-medium
            text-gray-800
            dark:text-white
          "
        >
          <Link to="/">Home</Link>

          <Link to="/restaurants">Restaurants</Link>

          <Link to="/wishlist">❤️ Wishlist</Link>

          <Link to="/orders">📦 Orders</Link>

          <Link
            to="/cart"
            className="relative"
          >
            🛒 Cart

            {cart.length > 0 && (
              <span
                className="
                  absolute
                  -top-3
                  -right-4
                  bg-red-500
                  text-white
                  text-xs
                  rounded-full
                  px-2
                "
              >
                {cart.length}
              </span>
            )}
          </Link>

          {isLoggedIn ? (
            <>
              <Link to="/profile">👤 Profile</Link>

              <button
                onClick={handleLogout}
                className="text-red-500 font-semibold"
              >
                🚪 Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login">🔐 Login</Link>

              <Link to="/register">📝 Register</Link>
            </>
          )}

          <button
            className="
              bg-gray-200
              dark:bg-gray-700
              px-3
              py-2
              rounded-full
            "
            onClick={() =>
              document.documentElement.classList.toggle("dark")
            }
          >
            🌙
          </button>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="
            md:hidden
            text-3xl
            text-gray-900
            dark:text-white
          "
          onClick={() => setOpen(!open)}
        >
          {open ? "✕" : "☰"}
        </button>
      </div>

      {/* Mobile Menu */}
      {open && (
        <div
          className="
            md:hidden
            bg-white
            dark:bg-gray-900
            px-6
            pb-6
            space-y-4
            text-gray-800
            dark:text-white
          "
        >
          <Link
            to="/"
            onClick={() => setOpen(false)}
            className="block"
          >
            Home
          </Link>

          <Link
            to="/restaurants"
            onClick={() => setOpen(false)}
            className="block"
          >
            Restaurants
          </Link>

          <Link
            to="/wishlist"
            onClick={() => setOpen(false)}
            className="block"
          >
            ❤️ Wishlist
          </Link>

          <Link
            to="/orders"
            onClick={() => setOpen(false)}
            className="block"
          >
            📦 Orders
          </Link>

          <Link
            to="/cart"
            onClick={() => setOpen(false)}
            className="block"
          >
            🛒 Cart ({cart.length})
          </Link>

          {isLoggedIn ? (
            <>
              <Link
                to="/profile"
                onClick={() => setOpen(false)}
                className="block"
              >
                👤 Profile
              </Link>

              <button
                onClick={() => {
                  handleLogout();
                  setOpen(false);
                }}
                className="block text-red-500 font-semibold"
              >
                🚪 Logout
              </button>
            </>
          ) : (
            <>
              <Link
                to="/login"
                onClick={() => setOpen(false)}
                className="block"
              >
                🔐 Login
              </Link>

              <Link
                to="/register"
                onClick={() => setOpen(false)}
                className="block"
              >
                📝 Register
              </Link>
            </>
          )}

          <button
            onClick={() =>
              document.documentElement.classList.toggle("dark")
            }
            className="
              bg-gray-200
              dark:bg-gray-700
              px-4
              py-2
              rounded-full
            "
          >
            🌙 Dark Mode
          </button>
        </div>
      )}
    </nav>
  );
}

export default Navbar;