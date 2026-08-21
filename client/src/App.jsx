import { BrowserRouter, Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import ScrollToTop from "./components/ScrollToTop";

import ProtectedRoute from "./components/ProtectedRoute";
import AdminRoute from "./components/AdminRoute";
import CustomerRoute from "./components/CustomerRoute";

import Home from "./pages/Home";
import Restaurants from "./pages/Restaurants";
import RestaurantDetails from "./pages/RestaurantDetails";

import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import OrderSuccess from "./pages/OrderSuccess";

import Login from "./pages/Login";
import Register from "./pages/Register";
import Profile from "./pages/Profile";

import Wishlist from "./pages/Wishlist";
import OrderHistory from "./pages/OrderHistory";

import AdminDashboard from "./pages/AdminDashboard";
import AdminUsers from "./pages/AdminUsers";
import AdminRestaurants from "./pages/AdminRestaurants";
import AdminOrders from "./pages/AdminOrders";

import NotFound from "./pages/NotFound";

function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />

      <Navbar />

      <Routes>

        {/* =========================
            PUBLIC ROUTES
        ========================== */}

        <Route
          path="/"
          element={<Home />}
        />

        <Route
          path="/restaurants"
          element={<Restaurants />}
        />

        <Route
          path="/login"
          element={<Login />}
        />

        <Route
          path="/register"
          element={<Register />}
        />


        {/* =========================
            CUSTOMER ROUTES
        ========================== */}

        <Route
          path="/restaurant/:id"
          element={
            <CustomerRoute>
              <RestaurantDetails />
            </CustomerRoute>
          }
        />

        <Route
          path="/cart"
          element={
            <CustomerRoute>
              <Cart />
            </CustomerRoute>
          }
        />

        <Route
          path="/checkout"
          element={
            <CustomerRoute>
              <ProtectedRoute>
                <Checkout />
              </ProtectedRoute>
            </CustomerRoute>
          }
        />

        <Route
          path="/order-success"
          element={
            <CustomerRoute>
              <ProtectedRoute>
                <OrderSuccess />
              </ProtectedRoute>
            </CustomerRoute>
          }
        />


        {/* =========================
            PROTECTED CUSTOMER ROUTES
        ========================== */}

        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        />

        <Route
          path="/wishlist"
          element={
            <ProtectedRoute>
              <Wishlist />
            </ProtectedRoute>
          }
        />

        <Route
          path="/orders"
          element={
            <ProtectedRoute>
              <OrderHistory />
            </ProtectedRoute>
          }
        />


        {/* =========================
            ADMIN ROUTES
        ========================== */}

        <Route
          path="/admin"
          element={
            <AdminRoute>
              <AdminDashboard />
            </AdminRoute>
          }
        />

        {/* Admin Users */}
        <Route
          path="/admin/users"
          element={
            <AdminRoute>
              <AdminUsers />
            </AdminRoute>
          }
        />

        {/* Admin Restaurants */}
        <Route
          path="/admin/restaurants"
          element={
            <AdminRoute>
              <AdminRestaurants />
            </AdminRoute>
          }
        />
        <Route
          path="/admin/orders"
          element={
            <AdminRoute>
              <AdminOrders />
            </AdminRoute>
          }
        />


        {/* =========================
            404 PAGE
        ========================== */}

        <Route
          path="*"
          element={<NotFound />}
        />

      </Routes>

      <Footer />

    </BrowserRouter>
  );
}

export default App;