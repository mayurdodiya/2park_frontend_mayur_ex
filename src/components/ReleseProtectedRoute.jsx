import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export const ReleseProtectedRoute = () => {
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  useEffect(() => {
    if (!token) {
      // navigate("/dashboard/dashboard-data");
      navigate("/login");
    } else {
      return;
    }
  }, []);
};
