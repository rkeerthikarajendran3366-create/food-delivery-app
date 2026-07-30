import { Navigate } from "react-router-dom";

function ProtectedRoute({ children }) {
  const token = localStorage.getItem("token");

  console.log("ProtectedRoute - Token:", token);

  if (!token) {
    console.log("No token found. Redirecting to login...");
    return <Navigate to="/login" replace />;
  }

  console.log("Token found. Showing protected page...");
  return children;
}

export default ProtectedRoute;