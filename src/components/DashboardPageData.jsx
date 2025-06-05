import { useEffect, useState } from "react";
import style from "./../css/DashboardPageData.module.css";
import BaseUrl from "../config/apiConfig";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUsers, faCar } from "@fortawesome/free-solid-svg-icons";
import { useCounter } from "../hooks/useCounter";

function DashboardPageData() {
  const token = localStorage.getItem("token");
  const [dashboardData, setDashboardData] = useState({});

  useEffect(() => {
    async function fetchingData() {
      try {
        let response = await fetch(`${BaseUrl}/user/dashboard`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "x-auth-token": token ?? "",
            "ngrok-skip-browser-warning": true,
          },
        });

        response = await response.json();
        if (response.success) {
          console.log(response.message);
          setDashboardData(response.payload);
        } else {
          console.log(response.message);
        }
      } catch (error) {
        console.log(error);
      }
    }

    fetchingData();
  }, []);

  // Use animated counters
  const userCount = useCounter(dashboardData?.userCount);
  const leadCount = useCounter(dashboardData?.vattenfallCount);
  console.log(userCount, "-------------------- userCount");

  return (
    <>
      <div className={style.dPageContainer}>
        <div className={style.item}>
          <div>
            SALES PARTNER <br />
            <b>{userCount}</b>
          </div>
          <FontAwesomeIcon icon={faUsers} style={{ marginRight: 8, fontSize: "1.2vw" }} />
        </div>
        <div className={style.item}>
          <div>
            LEADS <br />
            <b>{leadCount}</b>
          </div>
          <FontAwesomeIcon icon={faCar} style={{ marginRight: 8, fontSize: "1.2vw" }} />
        </div>
      </div>
    </>
  );
}

export default DashboardPageData;
