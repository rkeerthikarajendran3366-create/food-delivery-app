import { BrowserRouter, Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import ScrollToTop from "./components/ScrollToTop";
import ProtectedRoute from "./components/ProtectedRoute";

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

import NotFound from "./pages/NotFound";


function App() {
  return (
    <BrowserRouter>

      <ScrollToTop />

      <Navbar />

      <Routes>

        {/* Home */}
        <Route
          path="/"
          element={<Home />}
        />


        {/* Restaurants */}
        <Route
          path="/restaurants"
          element={<Restaurants />}
        />


        {/* Restaurant Details */}
        <Route
          path="/restaurant/:id"
          element={<RestaurantDetails />}
        />


        {/* Cart */}
        <Route
          path="/cart"
          element={<Cart />}
        />


        {/* Checkout */}
        <Route
          path="/checkout"
          element={<Checkout />}
        />


        {/* Order Success */}
        <Route
          path="/order-success"
          element={<OrderSuccess />}
        />


        {/* Login */}
        <Route
          path="/login"
          element={<Login />}
        />


        {/* Register */}
        <Route
          path="/register"
          element={<Register />}
        />


        {/* Protected Profile */}
        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        />


        {/* Wishlist */}
        <Route
          path="/wishlist"
          element={<Wishlist />}
        />


        {/* Orders */}
        <Route
          path="/orders"
          element={<OrderHistory />}
        />


        {/* 404 Page */}
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