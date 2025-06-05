
import BaseUrl from "../config/apiConfig";
import style from "./../css/InActivePopUpMenu.module.css";
import { useState, useEffect } from "react";

export default function InActivePopUpMenu({ isActivePopup, setIsActivePopup, isActivePopupValue, setIsActivePopupValue }) {
  const token = localStorage.getItem("token");
  const [isClosing, setIsClosing] = useState(false);

  // Handle closing animation
  const handleClose = () => {
    setIsClosing(true);
    // Wait for animation to complete before hiding the popup
    setTimeout(() => {
      setIsActivePopup(false);
      setIsClosing(false);
    }, 300); // set the animation duration (300ms)
  };

  const handleConfirmation = async (data) => {
    const { id, value } = data;
    let response;

    try {
      if (value === "active") {
        // status deactive
        response = await fetch(`${BaseUrl}/user/deleteUser?id=${id}`, {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            "x-auth-token": token ?? "",
            "ngrok-skip-browser-warning": true,
          },
        });
        response = await response.json();
      } else {
        // status active
        response = await fetch(`${BaseUrl}/user/reactivateUser?id=${id}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            "x-auth-token": token ?? "",
            "ngrok-skip-browser-warning": true,
          },
        });
        response = await response.json();
      }
    } catch (error) {
      console.log(error);
    }

    if (response?.success) {
      console.log(response, "------------------------- success");
    } else {
      console.log(response, "------------------------- error");
    }
  };

  if (!isActivePopup) return null;

  return (
    <>
      <div className={`${style.backdrop} ${isClosing ? style.fadeOut : style.fadeIn}`}>
        <div className={`${style.containerDiv} ${isClosing ? style.close : style.open}`}>
          <div className={style.warning_icon}>
            <span className={style.exclamation}>!</span>
          </div>
          <p className={style.text}>Are you sure?</p>
          <p className={style.confirmationText}>
            {`${isActivePopupValue?.value === "active" ? "Confirm deactivation" : "Confirm keep active"}`}
          </p>
          <div className={style.btnWrraper}>
            <button
              className={`${style.button} ${style.buttonBlue}`}
              onClick={async () => {
                await handleConfirmation({
                  value: isActivePopupValue?.value === "active" ? "active" : "deactive",
                  id: isActivePopupValue?.id,
                });
                handleClose();
              }}
            >
              {isActivePopupValue?.value === "active" ? "Yes, deactivate" : "Yes, activate"}
            </button>
            <button
              className={`${style.button} ${style.buttonRed}`}
              onClick={handleClose}
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </>
  );
}