import { useNavigate } from "react-router-dom";

export const CustomHomeIcon = ({ className }) => {
  const navigate = useNavigate();

  return (
    <svg
      className={className}
      width="1vw"
      viewBox="0 0 24 24"
      fill="none"
      stroke="#A8A7A7"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      onClick={() => navigate("/dashboard/dashboard-data")}
      style={{ cursor: "pointer" }}
    >
      <path d="M3 10L12 3l9 7v10a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V10z" />
      <line x1="8" y1="17" x2="16" y2="17" />
    </svg>
  );
};
