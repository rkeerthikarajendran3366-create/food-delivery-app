import { Navigate } from "react-router-dom";

function AdminRoute({ children }) {
  console.log("🔥 ADMIN ROUTE RENDERED");

  const token = localStorage.getItem("token");

  let user = null;

  try {
    user = JSON.parse(localStorage.getItem("user"));
  } catch (error) {
    console.log("❌ Error reading user:", error);
  }

  console.log("Admin token:", !!token);
  console.log("Admin user:", user);
  console.log("Admin role:", user?.role);

  if (!token) {
    console.log("❌ AdminRoute → /login");

    return <Navigate to="/login" replace />;
  }

  if (user?.role !== "admin") {
    console.log("❌ AdminRoute → /");

    return <Navigate to="/" replace />;
  }

  console.log("✅ AdminRoute → allowed");

  return children;
}

export default AdminRoute;