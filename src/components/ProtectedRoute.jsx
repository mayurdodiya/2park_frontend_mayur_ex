import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export const Protected = () => {
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  useEffect(() => {
    if (token) {
      navigate("/dashboard/dashboard-data");
    } else {
      navigate("/login");
    }
  }, []);
};
