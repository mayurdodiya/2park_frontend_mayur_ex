import style from "./../css/DashboardHeader.module.css";
import twoParkLogo from "./../images/2park.svg";
import leftArrow from "./../images/left_arrow.svg";
import { DoubleLeftArrowIcon } from "../utils/customArrowIcon";

function DashboardHeader() {
  return (
    <>
      <div className={style.container}>
        <div className={style.firstDiv}>
          <img className={style.img} src={twoParkLogo} alt="logo" />
          {<DoubleLeftArrowIcon /* className={style.arrow}  */ />}
          <span className={style.text}> 2PARK | admin</span>
        </div>

        <div className={style.secondDiv}>
          Super Admin
          <span className={style.profile}>A.</span>
        </div>
      </div>
      <hr className={style.hr} />
    </>
  );
}

export default DashboardHeader;
