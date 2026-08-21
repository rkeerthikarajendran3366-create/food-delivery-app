import { Navigate } from "react-router-dom";

function CustomerRoute({ children }) {
  const userData = localStorage.getItem("user");

  let user = null;

  try {
    user = userData ? JSON.parse(userData) : null;
  } catch (error) {
    console.error("User data parsing error:", error);
  }

  // Admin cannot access customer shopping pages
  if (user?.role === "admin") {
    return <Navigate to="/admin" replace />;
  }

  return children;
}

export default CustomerRoute;