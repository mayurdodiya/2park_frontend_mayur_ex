import { Outlet } from "react-router-dom";
import DashboardHeader from "./DashBoardHeader";
import DashBoardVerticalHeader from "./DashBoardVerticalHeader";
import style from "./../css/Dashboard.module.css";
import { CustomHomeIcon } from "../utils/customHomeIcon";
import { ReleseProtectedRoute } from "./ReleseProtectedRoute";

function Dashboard() {
  const currentYear = new Date().getFullYear();

  return (
    <div>
      <DashboardHeader />
      <div className={style.childContainer}>
        <DashBoardVerticalHeader />
        <div className={style.container}>
          {/* <ReleseProtectedRoute /> */}
          <div className={style.upprDiv}>
            <div className={style.goToUpTextWrapper}>Go to up {<CustomHomeIcon className={style.customHomeIcon} />}</div>
          </div>
          <Outlet />
          <div className={style.copyRight}>Copyright © {currentYear} 2Park</div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
