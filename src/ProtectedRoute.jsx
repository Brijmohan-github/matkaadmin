import { useEffect, useState } from "react";
import { Navigate, Outlet } from "react-router-dom";

export default function ProtectedRoute() {
  const [token, setToken] = useState(localStorage.getItem("token") || "");
  useEffect(() => {
    const findToken = localStorage.getItem("token");
    if (findToken) {
      setToken(findToken);
    }
  }, [token]);
  if (!token) {
    return <Navigate to="/login" replace={true} />;
  }
  return <Outlet />;
}
