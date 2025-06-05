import BaseUrl from "../config/apiConfig";
import style from "./../css/AssignLeadPopUpMenu.module.css";
import { faClose } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";

export default function AssignLeadPopUpMenu({ isActivePopup, setIsActivePopup }) {
  const token = localStorage.getItem("token");
  const [isClosing, setIsClosing] = useState(false);
  let [apiData, setApiData] = useState({ data: [], originalData: [] });
  const [selectedData, setSelectedData] = useState([]);
  const [searchData, setSearchData] = useState("");

  // Handle closing animation
  const handleClose = () => {
    setSelectedData([])
    setSearchData("")
    setIsClosing(true);

    setTimeout(() => {
      setIsActivePopup(false);
      setIsClosing(false);
    }, 300);
  };

  // Handle search
  const handleSearch = (inputValue) => {
    setSearchData(inputValue);
    if (inputValue == "") {
      setApiData((prev) => ({ ...prev, data: prev.originalData }));
    } else {
      setApiData((prev) => ({ ...prev, data: prev.originalData.filter((item) => new RegExp(inputValue, "i").test(item?.name)) }));
    }
  };

  // fetch api data once
  useEffect(() => {
    fetch(`${BaseUrl}/user/get`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "x-auth-token": token ?? "",
        "ngrok-skip-browser-warning": true,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        // console.log(data);
        // setApiData(data?.payload?.data);
        setApiData({
          data: data?.payload?.data,
          originalData: data?.payload?.data,
        });
      });
  }, []);

  if (!isActivePopup) return null;

  return (
    <div className={`${style.backdrop} ${isClosing ? style.fadeOut : style.fadeIn}`}>
      <div className={`${style.containerDiv} ${isClosing ? style.close : style.open}`}>
        {/* Title */}
        <div className={style.salesPartnerTitle}>
          <h3>Sales partner</h3>
          <FontAwesomeIcon icon={faClose} className={style.faCloseIcon} onClick={handleClose} />
        </div>
        <hr className={style.hrTag} />

        {/* Scroll div */}
        <div className={style.scrollDiv}>
          <div className={style.searchWrapper}>
            <input
              type="search"
              placeholder="Search"
              className={style.input}
              onChange={(e) => {
                handleSearch(e.target.value);
              }}
            />
            {/* selected item show here */}
            <span>
              {selectedData.length > 0
                ? selectedData?.map((data) => (
                    <span className={style.showSelectedData}>
                      {data}
                      <FontAwesomeIcon icon={faClose} className={style.closeSelectedData} onClick={() => setSelectedData((prev) => prev.filter((item) => item !== data))} />
                    </span>
                  ))
                : ""}
            </span>
          </div>
          <hr />

          {/* listing */}
          {apiData?.data?.map((data) => (
            <div className={style.checkBoxWrapper}>
              <input
                type="checkbox"
                checked={selectedData.includes(data?.name)}
                onChange={(e) => {
                  const dataName = data?.name;
                  if (e.target.checked) {
                    setSelectedData((prev) => [...prev, dataName]);
                  } else if (e.target.checked == false) {
                    setSelectedData((prev) => prev.filter((item) => item !== dataName));
                  }
                }}
              />
              <p>{data?.name}</p>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className={style.footer}>
          <hr className={style.hrTag} />
          <button
            className={`${style.button}`}
            onClick={async () => {
              handleClose();
            }}
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
}
