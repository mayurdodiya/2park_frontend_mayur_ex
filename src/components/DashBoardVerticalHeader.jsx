import { NavLink } from "react-router-dom";
import style from "./../css/DashboardVerticalHeader.module.css";
import { leftMenuData } from "./../dummyData/leftMenuData";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown, faChevronUp } from "@fortawesome/free-solid-svg-icons";

function DashBoardVerticalHeader() {
  const [openMenu, setOpenMenu] = useState(null);

  const toggleDropdown = (name) => {
    setOpenMenu((prev) => (prev === name ? null : name));
  };

  const withoutChildren = (data) => (
    <NavLink
      to={data.path}
      className={({ isActive }) =>
        isActive ? style.menuContent_active : style.menuContent
      }
    >
      <FontAwesomeIcon icon={data.icon} className={style.icon} />
      {data.name}
    </NavLink>
  );

  const withChildren = (data) => (
    <>
      <div
        className={style.menuContent}
        onClick={() => toggleDropdown(data.name)}
      >
        <FontAwesomeIcon icon={data.icon} className={style.icon} />
        {data.name}
        <FontAwesomeIcon
          icon={openMenu === data.name ? faChevronUp : faChevronDown}
          className={`${style.arrow} ${style.dropdownIcon}`}
        />
      </div>
      {openMenu === data.name && (
        <div>
          {data.children.map((child) => (
            <NavLink
              to={child.path}
              key={child.name}
              className={({ isActive }) =>
                isActive
                  ? `${style.menuContent_active} ${style.subMenuItem}`
                  : `${style.menuContent} ${style.subMenuItem}`
              }
            >
              {child.name}
            </NavLink>
          ))}
        </div>
      )}
    </>
  );

  return (
    <div className={style.container}>
      {leftMenuData.map((data) => (
        <div key={data.name}>
          {data.children ? withChildren(data) : withoutChildren(data)}
        </div>
      ))}
    </div>
  );
}

export default DashBoardVerticalHeader;
