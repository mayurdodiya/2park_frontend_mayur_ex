import BaseUrl from "../config/apiConfig";
import style from "./../css/InActivePopUpMenu.module.css";
import { useState } from "react";

export default function NewsLetterPopUpMenu({ isActivePopup, setIsActivePopup, isActivePopupValue }) {
  const token = localStorage.getItem("token");
  const [isClosing, setIsClosing] = useState(false);

  // Handle closing animation
  const handleClose = () => {
    setIsClosing(true);
    setTimeout(() => {
      setIsActivePopup(false);
      setIsClosing(false);
    }, 300);
  };

  const handleDelete = async (id) => {
   try {
    const deleteData = await fetch(`${BaseUrl}/newsLater/deleteNewsLater?id=${id}`,{
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "x-auth-token": token ?? "",
        "ngrok-skip-browser-warning": true,
      },
    })
    deleteData = await deleteData.json();
    
    if (deleteData?.success) {
      console.log(deleteData, "------------------------- success");
    } else {
      console.log(deleteData, "------------------------- error");
    }
   } catch (error) {
    console.log(error)
   }
    
  }

  if (!isActivePopup) return null;

  return (
    <>
      <div className={`${style.backdrop} ${isClosing ? style.fadeOut : style.fadeIn}`}>
        <div className={`${style.containerDiv} ${isClosing ? style.close : style.open}`}>
          <div className={style.warning_icon}>
            <span className={style.exclamation}>!</span>
          </div>
          <p className={style.text}>Are you sure?</p>
          <p className={style.confirmationText}>{`Are you sure you want to delete news?`}</p>
          <div className={style.btnWrraper}>
            <button
              className={`${style.button} ${style.buttonBlue}`}
              onClick={async () => {
                handleDelete(isActivePopupValue?.id);
                handleClose();
              }}
            >
              Yes, delete
            </button>
            <button className={`${style.button} ${style.buttonRed}`} onClick={handleClose}>
              Cancel
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
