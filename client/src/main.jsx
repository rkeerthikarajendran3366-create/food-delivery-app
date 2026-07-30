import React from "react";
import ReactDOM from "react-dom/client";

import App from "./App.jsx";

import CartProvider from "./context/CartContext.jsx";
import WishlistProvider from "./context/WishlistContext.jsx";
import ThemeProvider from "./context/ThemeContext.jsx";

import { Toaster } from "react-hot-toast";

import "./index.css";


ReactDOM.createRoot(
  document.getElementById("root")
).render(

  <React.StrictMode>

    <ThemeProvider>

      <CartProvider>

        <WishlistProvider>

          <App />

          {/* Toast Notifications */}
          <Toaster
            position="top-right"
            reverseOrder={false}
            toastOptions={{
              duration: 2000,
              style: {
                fontFamily: "Poppins, sans-serif",
                fontSize: "14px",
              },
            }}
          />

        </WishlistProvider>

      </CartProvider>

    </ThemeProvider>

  </React.StrictMode>

);