import { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { CartContext } from "../context/CartContext";

function Navbar() {
  const [open, setOpen] = useState(false);

  const { cartCount } = useContext(CartContext);

  const navigate = useNavigate();

  const isLoggedIn = !!localStorage.getItem("token");

  const userData = localStorage.getItem("user");

  let user = null;

  try {
    user = userData ? JSON.parse(userData) : null;
  } catch (error) {
    console.error("User data parsing error:", error);
  }

  const isAdmin = user?.role === "admin";

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    setOpen(false);

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

        {/* ================================
            DESKTOP MENU
        ================================= */}

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
          {/* Home */}

          <Link to="/">
            Home
          </Link>

          {/* Restaurants */}

          <Link to="/restaurants">
            Restaurants
          </Link>

          {/* ================================
              CUSTOMER NAVIGATION
          ================================= */}

          {isLoggedIn && !isAdmin && (
            <>
              {/* Wishlist */}

              <Link to="/wishlist">
                ❤️ Wishlist
              </Link>

              {/* Orders */}

              <Link to="/orders">
                📦 Orders
              </Link>

              {/* Cart */}

              <Link
                to="/cart"
                className="relative"
              >
                🛒 Cart

                {cartCount > 0 && (
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
                      min-w-5
                      text-center
                    "
                  >
                    {cartCount}
                  </span>
                )}
              </Link>
            </>
          )}

          {/* ================================
              ADMIN NAVIGATION
          ================================= */}

          {isLoggedIn && isAdmin && (
            <Link
              to="/admin"
              className="
                text-orange-500
                font-semibold
              "
            >
              🛠️ Admin Dashboard
            </Link>
          )}

          {/* ================================
              LOGIN / PROFILE / LOGOUT
          ================================= */}

          {isLoggedIn ? (
            <>
              {/* Customer Profile */}

              {!isAdmin && (
                <Link to="/profile">
                  👤 Profile
                </Link>
              )}

              {/* Admin Label */}

              {isAdmin && (
                <span
                  className="
                    text-sm
                    text-gray-500
                    dark:text-gray-300
                  "
                >
                  Admin
                </span>
              )}

              {/* Logout */}

              <button
                type="button"
                onClick={handleLogout}
                className="
                  text-red-500
                  font-semibold
                  hover:text-red-600
                "
              >
                🚪 Logout
              </button>
            </>
          ) : (
            <>
              {/* Login */}

              <Link to="/login">
                🔐 Login
              </Link>

              {/* Register */}

              <Link to="/register">
                📝 Register
              </Link>
            </>
          )}

          {/* ================================
              DARK MODE
          ================================= */}

          <button
            type="button"
            className="
              bg-gray-200
              dark:bg-gray-700
              px-3
              py-2
              rounded-full
            "
            onClick={() =>
              document.documentElement.classList.toggle(
                "dark"
              )
            }
          >
            🌙
          </button>
        </div>

        {/* ================================
            MOBILE MENU BUTTON
        ================================= */}

        <button
          type="button"
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

      {/* ================================
          MOBILE MENU
      ================================= */}

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
          {/* Home */}

          <Link
            to="/"
            onClick={() => setOpen(false)}
            className="block"
          >
            Home
          </Link>

          {/* Restaurants */}

          <Link
            to="/restaurants"
            onClick={() => setOpen(false)}
            className="block"
          >
            Restaurants
          </Link>

          {/* ================================
              CUSTOMER MOBILE NAVIGATION
          ================================= */}

          {isLoggedIn && !isAdmin && (
            <>
              {/* Wishlist */}

              <Link
                to="/wishlist"
                onClick={() => setOpen(false)}
                className="block"
              >
                ❤️ Wishlist
              </Link>

              {/* Orders */}

              <Link
                to="/orders"
                onClick={() => setOpen(false)}
                className="block"
              >
                📦 Orders
              </Link>

              {/* Cart */}

              <Link
                to="/cart"
                onClick={() => setOpen(false)}
                className="block"
              >
                🛒 Cart ({cartCount})
              </Link>

              {/* Profile */}

              <Link
                to="/profile"
                onClick={() => setOpen(false)}
                className="block"
              >
                👤 Profile
              </Link>
            </>
          )}

          {/* ================================
              ADMIN MOBILE NAVIGATION
          ================================= */}

          {isLoggedIn && isAdmin && (
            <Link
              to="/admin"
              onClick={() => setOpen(false)}
              className="
                block
                text-orange-500
                font-semibold
              "
            >
              🛠️ Admin Dashboard
            </Link>
          )}

          {/* ================================
              LOGIN / LOGOUT
          ================================= */}

          {isLoggedIn ? (
            <button
              type="button"
              onClick={handleLogout}
              className="
                block
                text-red-500
                font-semibold
              "
            >
              🚪 Logout
            </button>
          ) : (
            <>
              {/* Login */}

              <Link
                to="/login"
                onClick={() => setOpen(false)}
                className="block"
              >
                🔐 Login
              </Link>

              {/* Register */}

              <Link
                to="/register"
                onClick={() => setOpen(false)}
                className="block"
              >
                📝 Register
              </Link>
            </>
          )}

          {/* ================================
              DARK MODE
          ================================= */}

          <button
            type="button"
            onClick={() =>
              document.documentElement.classList.toggle(
                "dark"
              )
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