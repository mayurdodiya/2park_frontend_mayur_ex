import style from "./../css/Location.module.css";
import { faPlus, faUpload } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";
import BaseUrl from "../config/apiConfig";
import moment from "moment";
import { LeftArrowIcon, RightArrowIcon, FirstPageIcon, LastPageIcon } from "../utils/customArrowIcon.js";
import DateRangePicker from "../services/datePicker.jsx";
import AddLeadsPopUpMenu from "./AddLeadsPopUpMenu.jsx";
import SheetUploadPopUpMenu from "./SheetUploadPopUpMenu.jsx"
import { faPen, faTrash, faEdit } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import AddLocationPopUpMenu from "./AddLocationPopUpMenu.jsx";

function Locations() {
  const token = localStorage.getItem("token");
  let [apiData, setApiData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [rowPerPage, setRowPerPage] = useState(10);
  const [pageNo, setPageNo] = useState(1);
  const [dateRange, setDateRange] = useState([null, null]);
  const [search, setSearch] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const [isOpenShitMenu, setIsOpenShitMenu] = useState(false);
  const [isActivePopup, setIsActivePopup] = useState(false);
  const [isActivePopupValue, setIsActivePopupValue] = useState({ value: "active", id: "" });
  const [formattedRange, setFormattedRange] = useState({ startDate: null, endDate: null });
  const [statusDropdown, setStatusDropdown] = useState({ dropdown1: { value: null }, dropdown3: { value: null } });
  let currentPageFirstRecord = 1 + pageNo * rowPerPage - rowPerPage;
  let rowNumber = currentPageFirstRecord;
  let originalData;
  let filteredData = apiData;

  useEffect(() => {
    async function apiFun() {
      try {
        let response = await fetch(`${BaseUrl}/dahualocation/getLocationWithDevice?page=${pageNo}&limit=${rowPerPage}${search? `&search=${search}`:""}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "x-auth-token": token ?? "",
            "ngrok-skip-browser-warning": true,
          },
        });

        response = await response.json();
        console.log(response, "------------------- response");
        if (response.success) {
          const apiData = response.payload;
          // console.log(apiData?.pagination, "------------------- apiData?.pagination?.totalCount");

          setApiData({ data: apiData?.locations, count: apiData?.pagination?.totalCount });
          originalData = { data: apiData?.locations, count: apiData?.pagination?.totalCount };
          setLoading(false);
        } else {
          setApiData("No records found.");
        }
      } catch (error) {
        console.log(error);
      }
    }

    apiFun();
  }, [rowPerPage, pageNo, search, isOpen]);

  return (
    <>
      <AddLocationPopUpMenu isOpen={isOpen} setIsOpen={setIsOpen} />
      <div className={style.container}>
        <div className={style.secContainer}>
          <p className={style.mainText}>Locations</p>
          <div className={style.filterBarWarraper}>
            <input type="text" onChange={(e) => setSearch(e.target.value)} placeholder="Search" className={style.inputStyle} />
              <button className={style.addLocation} onClick={() => setIsOpen(true)}>
                Add Location
              </button>
              {/* <AddLocationPopUpMenu isOpen={isOpen} setIsOpen={setIsOpen} /> */}
          </div>
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
                  <th>Location</th>
                  <th>Date</th>
                  <th>Maximum parking time</th>
                  <th>Maximum parking space</th>
                  <th>Daily rate car</th>
                  <th>Daily rate bus</th>
                  <th>Devices</th>
                  <th>Authorized licence plates</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody className={style.tbody}>
                {apiData?.data?.length > 0 ? (
                  apiData?.data?.map((data, index) => (
                    <tr className={style.tableRow} key={data?.id}>
                      <td>{rowNumber++}</td>
                      <td>{data?.name ?? "-"}</td>
                      <td>{data.createdAt ? moment(data?.createdAt).format("DD-MM-YYYY") : "-"}</td> {/* lead */}
                      <td>{"-"}</td>
                      <td>{data?.maxParkingSlots ?? "-"}</td>
                      <td>{data?.hourlyRate ?? "-"}</td>
                      <td>{data?.GrtVehicleRate ?? "-"}</td>
                      <td>{`${data?.devices ? data?.devices?.length : "-"} devices`}</td>
                      <td>{data?.authorizedPlates ? data?.authorizedPlates?.length : "-"}</td>
                      <td className={style.activeBtnWrapper}>
                        <FontAwesomeIcon icon={faEdit} className={style.pen} size="lg" />
                        <FontAwesomeIcon icon={faTrash} className={style.pen} size="lg" />
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

export default Locations;
