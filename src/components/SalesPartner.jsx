import StatusDropdown from "../services/dropdown";
import style from "./../css/SalesPartner.module.css";
import { statusDropdownData, leadStatusDropdownData, projectDropdownData } from "../dummyData/dropDownData";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";
import BaseUrl from "../config/apiConfig";
import moment from "moment";
import { LeftArrowIcon, RightArrowIcon, FirstPageIcon, LastPageIcon } from "../utils/customArrowIcon.js";
import DateRangePicker from "../services/datePicker.jsx";
import PopUpMenu from "./PopUpMenu.jsx";
import { faPen } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import InActivePopUpMenu from "./InActivePopUpMenu.jsx";
import { ReleseProtectedRoute } from "./ReleseProtectedRoute.jsx";

function SalesPartner() {
  const token = localStorage.getItem("token");
  let [apiData, setApiData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [rowPerPage, setRowPerPage] = useState(10);
  const [pageNo, setPageNo] = useState(1);
  const [dateRange, setDateRange] = useState([null, null]);
  const [search, setSearch] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const [isActivePopup, setIsActivePopup] = useState(false);
  const [isActivePopupValue, setIsActivePopupValue] = useState({ value: "active", id: "" });
  const [formattedRange, setFormattedRange] = useState({ startDate: null, endDate: null });
  const [statusDropdown, setStatusDropdown] = useState({ dropdown1: { value: null }, dropdown3: { value: null } });
  let currentPageFirstRecord = 1 + pageNo * rowPerPage - rowPerPage;
  let rowNumber = currentPageFirstRecord;
  let filteredData = apiData;

  useEffect(() => {
    async function apiFun() {
      try {
        let response = await fetch(`${BaseUrl}/user/get?page=${pageNo}&limit=${rowPerPage}`, {
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

          // dropdown 1
          if (statusDropdown.dropdown1.value != null) {
            filteredData = apiData.data.filter((item) => item?.isActive == statusDropdown?.dropdown1?.value);
            setApiData((prev) => ({
              ...prev,
              data: filteredData,
              count: filteredData?.length,
            }));
          }

          // dropdown 3
          if (statusDropdown.dropdown3.value != null) {
            filteredData = apiData.data.filter((item) => item?.projectName == statusDropdown?.dropdown3?.value);
            setApiData((prev) => ({
              ...prev,
              data: filteredData,
              count: apiData.count,
            }));
          }

          // date range filter
          if (formattedRange?.startDate != null && formattedRange.endDate != null && formattedRange.endDate !== "Invalid date") {
            const parseDate = (dateStr) => {
              const [day, month, year] = dateStr.split("/");
              return new Date(`${year}-${month}-${day}`);
            };

            const startDate = parseDate(formattedRange.startDate);
            const endDate = parseDate(formattedRange.endDate);

            filteredData = apiData.data.filter((item) => {
              const itemDate = new Date(item?.createdAt);
              const itemDateOnly = new Date(itemDate.toDateString());
              return itemDateOnly >= startDate && itemDateOnly <= endDate;
            });
          }

          console.log(filteredData);

          // search filter
          if (search != null) {
            const regex = new RegExp(search, "i");
            filteredData = apiData.data.filter((item) => regex.test(item?.name));

            setApiData((prev) => ({
              data: filteredData,
              count: apiData.count,
            }));
          }

          // when no dropdown
          if (statusDropdown?.dropdown1?.value == null && statusDropdown?.dropdown3?.value == null && formattedRange?.startDate == null && formattedRange?.endDate == null && search == null) {
            filteredData = apiData.data;
          }

          setApiData({ data: filteredData, count: apiData.count });
          originalData = { data: filteredData, count: apiData.count };
          setLoading(false);
        } else {
          setApiData("No records found.");
        }
      } catch (error) {
        console.log(error);
      }
    }

    apiFun();
  }, [rowPerPage, pageNo, statusDropdown, formattedRange, search, isActivePopup]);

  return (
    <>
      <ReleseProtectedRoute />
      <InActivePopUpMenu isActivePopup={isActivePopup} setIsActivePopup={setIsActivePopup} isActivePopupValue={isActivePopupValue} setIsActivePopupValue={setIsActivePopupValue} />
      <div className={style.container}>
        <div className={style.secContainer}>
          <p className={style.mainText}>Sales partner</p>
          <div className={style.filterBarWarraper}>
            <StatusDropdown data={statusDropdownData} dropDownNo={"dropdown1"} state={{ statusDropdown, setStatusDropdown }} />
            <StatusDropdown data={leadStatusDropdownData} dropDownNo={"dropdown2"} state={{ statusDropdown, setStatusDropdown }} />
            <StatusDropdown data={projectDropdownData} dropDownNo={"dropdown3"} state={{ statusDropdown, setStatusDropdown }} />
            <DateRangePicker data={[dateRange, setDateRange]} dropDownNo={"dropdown4"} state={{ formattedRange, setFormattedRange }} />

            <input type="text" onChange={(e) => setSearch(e.target.value)} placeholder="Search" className={style.inputStyle} />
            <div>
              <button className={style.searchBtn} onClick={() => setIsOpen(true)}>
                <FontAwesomeIcon
                  icon={faPlus}
                  style={{
                    color: "white",
                    width: "1.2vw",
                    height: "1.2vw",
                    marginRight: "6px",
                  }}
                />
                Sales partner
              </button>
              <PopUpMenu isOpen={isOpen} setIsOpen={setIsOpen} />
            </div>
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
                  <th>Action</th>
                  <th>Unique ID</th>
                  <th>Lead</th>
                  <th>User name</th>
                  <th>Compansaction/Lead</th>
                  <th>Compansaction/Team</th>
                  <th>First name</th>
                  <th>Last name</th>
                  <th>E-mail</th>
                  <th>Project</th>
                  <th>Leads</th>
                  <th>Birthday</th>
                  <th>Phone</th>
                  <th>Street and house number</th>
                  <th>Postal code</th>
                  <th>Location</th>
                  <th>IBAN</th>
                  <th>Account holder</th>
                  <th>Credit institution</th>
                  <th>Tax number</th>
                  <th>Gender</th>

                  <th>Sales partner</th>
                  <th>Birthday</th>
                  <th>Phone</th>
                  <th>Street and house number</th>
                  <th>Location</th>
                  <th>Postal code</th>
                  <th>Credit institution</th>
                  <th>Signature</th>
                  <th>Profile image</th>
                  <th>Date</th>
                </tr>
              </thead>
              <tbody className={style.tbody}>
                {apiData?.data.length > 0 ? (
                  apiData?.data?.map((data, index) => (
                    <tr className={style.tableRow} key={data?.id}>
                      <td>{rowNumber++}</td>
                      <td className={style.activeBtnWrraper}>
                        <FontAwesomeIcon icon={faPen} className={style.pen} size="lg" />
                        {/* <button className={style.activeBtn}>active</button> */}
                        <button
                          onClick={() => {
                            setIsActivePopup(true);
                            setIsActivePopupValue({ value: data.isActive == true ? "active" : "inactive", id: data?._id });
                          }}
                          className={data.isActive ? style.activeBtn : style.inActiveBtn}
                        >
                          {data.isActive ? "active" : "inactive"}
                        </button>
                      </td>
                      <td>{data?.userId}</td>
                      <td>{"-"}</td> {/* lead */}
                      <td>{data?.name ?? "-"}</td>
                      <td>{data?.compensation_Lead ?? "-"}</td>
                      <td>{data?.compensation_Team ?? "-"}</td>
                      <td>{data?.name ?? "-"}</td>
                      <td>{data?.nachname ?? "-"}</td>
                      <td>{data?.email ?? "-"}</td>
                      <td>{data?.projectName ?? "-"}</td>
                      <td>{data?.userLead ?? "-"}</td>
                      <td>{data.birthday ? moment(data?.birthday).format("DD-MM-YYYY") : "-"}</td>
                      <td>{data?.phone ?? "-"}</td>
                      <td>{data?.streetHouseNumber ?? "-"}</td>
                      <td>{data?.postalCode ?? "-"}</td>
                      <td>{data?.location ?? "-"}</td>
                      <td>{data?.iban ?? "-"}</td>
                      <td>{data?.accountOwner ?? "-"}</td>
                      <td>{data?.creditInstitution ?? "-"}</td>
                      <td>{data?.taxNumber ?? "-"}</td>
                      <td>{data?.gender !== "" ? data?.gender : "-"}</td>
                      <td>{data?.patners[0]?.name ?? "-"}</td>
                      <td>{data.birthday ? moment(data?.birthday).format("DD-MM-YYYY") : "-"}</td>
                      <td>{data?.phone ?? "-"}</td>
                      <td>{data?.streetHouseNumber ?? "-"}</td>
                      <td>{data?.location ?? "-"}</td>
                      <td>{data?.postalCode ?? "-"}</td>
                      <td>{data?.creditInstitution ?? "-"}</td>
                      <td>
                        {data?.signature ? (
                          <a href={data?.signature} target="_blank" rel="noopener noreferrer">
                            View
                          </a>
                        ) : (
                          "-"
                        )}
                      </td>
                      <td>
                        {data?.profileImage ? (
                          <a href={data?.profileImage} target="_blank" rel="noopener noreferrer">
                            View
                          </a>
                        ) : (
                          "-"
                        )}
                      </td>
                      <td>{data.createdAt ? moment(data?.createdAt).format("DD-MM-YYYY") : "-"}</td>
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

export default SalesPartner;
