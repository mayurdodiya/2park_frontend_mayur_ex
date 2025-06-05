import style from "./../css/NewsLetter.module.css";
import { useEffect, useState } from "react";
import BaseUrl from "../config/apiConfig";
import moment from "moment";
import { LeftArrowIcon, RightArrowIcon, FirstPageIcon, LastPageIcon } from "../utils/customArrowIcon.js";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import NewsLetterPopUpMenu from "./NewsLetterPopUpMenu.jsx";

function NewsLetter() {
  const token = localStorage.getItem("token");
  let [apiData, setApiData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [rowPerPage, setRowPerPage] = useState(10);
  const [pageNo, setPageNo] = useState(1);
  const [search, setSearch] = useState(null);
  const [isActivePopup, setIsActivePopup] = useState(false);
  const [isActivePopupValue, setIsActivePopupValue] = useState({ value: "active", id: "" });
  let currentPageFirstRecord = 1 + pageNo * rowPerPage - rowPerPage;
  let rowNumber = currentPageFirstRecord;

  useEffect(() => {
    async function apiFun() {
      try {
        const searchQuery = search && search !== "null" ? `&search=${encodeURIComponent(search)}` : "";
        let response = await fetch(`${BaseUrl}/newsLater/getNewsLater?page=${pageNo}&limit=${rowPerPage}${searchQuery}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "x-auth-token": token ?? "",
            "ngrok-skip-browser-warning": true,
          },
        });

        response = await response.json();
        if (response.success) {
          const apiData = response.payload;

          setApiData({ data: apiData.data, count: apiData.count });
          setLoading(false);
        } else {
          setApiData("No records found.");
        }
      } catch (error) {
        console.log(error);
      }
    }

    apiFun();
  }, [rowPerPage, pageNo, search, isActivePopup]);

  return (
    <>
      <NewsLetterPopUpMenu isActivePopup={isActivePopup} setIsActivePopup={setIsActivePopup} isActivePopupValue={isActivePopupValue} setIsActivePopupValue={setIsActivePopupValue} />
      <div className={style.container}>
        <div className={style.secContainer}>
          <p className={style.mainText}> News letter </p>
          <input type="search" placeholder="Search" className={style.searchInput} onChange={(e) => setSearch(e.target.value)} />
        </div>

        <div className={style.tableContainer}>
          {loading ? (
            <div className={style.loaderContainer}>
              <div className="spinner"></div>
              <p>Loading data...</p>
            </div>
          ) : (
            <table className={style.table}>
              <thead className={style.thead}>
                <tr>
                  <th>S.No</th>
                  <th>Date</th>
                  <th>Intersted party email</th>
                  <th>Delete</th>
                </tr>
              </thead>
              <tbody className={style.tbody}>
                {apiData?.data.length > 0 ? (
                  apiData?.data?.map((data, index) => (
                    <tr className={style.tableRow} key={data?.id}>
                      <td>{rowNumber++}</td>
                      <td>{data.createdAt ? moment(data?.createdAt).format("DD-MM-YYYY") : "-"}</td> {/* lead */}
                      <td>{data?.email ?? "-"}</td>
                      <td className={style.activeBtnWrapper}>
                        <FontAwesomeIcon
                          icon={faTrash}
                          className={style.pen}
                          size="lg"
                          onClick={() => {
                            setIsActivePopup(true);
                            setIsActivePopupValue({ value: data.isActive == true ? "active" : "inactive", id: data?._id });
                          }}
                        />
                      </td>
                    </tr>
                  ))
                ) : (
                  <div
                    style={{
                      textAlign: "center",
                      fontSize: "1.5vw",
                      fontWeight: "bold",
                    }}
                  >
                    No data found
                  </div>
                )}
              </tbody>
            </table>
          )}
        </div>

        {/* pagination */}
        <div className={style.paginationWrapper}>
          <span>
            Rows per page:&nbsp;
            <div className={style.rowPerPageWrapper}>
              <select id="rows" className={style.rowPerPage} value={rowPerPage} onChange={(e) => setRowPerPage(Number(e.target.value))}>
                <option value={5}>5</option>
                <option value={10}>10</option>
                <option value={15}>15</option>
              </select>
              {/* <DownArrowIcon /> */}
            </div>
          </span>
          <span>
            {currentPageFirstRecord}-{rowNumber - 1} of {apiData?.count}
          </span>
          <span>
            <button
              className={style.invisibleButton}
              onClick={() => {
                setPageNo(1);
              }}
            >
              <FirstPageIcon />
            </button>
            <button className={style.invisibleButton} onClick={() => setPageNo((prev) => Math.max(1, prev - 1))}>
              <LeftArrowIcon />
            </button>
            <button className={style.invisibleButton} onClick={() => setPageNo((prev) => Math.min(Math.ceil(apiData.count / rowPerPage), prev + 1))}>
              <RightArrowIcon />
            </button>
            <button className={style.invisibleButton} onClick={() => setPageNo(Math.ceil(apiData?.count / rowPerPage))}>
              <LastPageIcon />
            </button>
          </span>
        </div>
      </div>
    </>
  );
}

export default NewsLetter;
