import StatusDropdown from "../services/dropdown";
import style from "./../css/Leads.module.css";
import { statusDropdownData, leadStatusDropdownData, projectDropdownData, leadTabCompanyDropDownData, leadTabAllocatedDropDownData, leadTabSalesPartnerDropDownData, leadTabSortByAddressDropDownData, leadTabSortByPostCodeDropDownData, leadTabProjectDropDownData } from "../dummyData/dropDownData";
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
import AssignLeadPopUpMenu from "./AssignLeadPopUpMenu.jsx";
import { ReleseProtectedRoute } from "./ReleseProtectedRoute.jsx";

function Leads() {
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
        let response = await fetch(`${BaseUrl}/straper/getVattenfall?page=${pageNo}&limit=${rowPerPage}`, {
          method: "POST",
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
      <AssignLeadPopUpMenu isActivePopup={isActivePopup} setIsActivePopup={setIsActivePopup} />
      <div className={style.container}>
        <div className={style.secContainer}>
          <p className={style.mainText}>Leads</p>
          <div className={style.filterBarWarraper}>
            <DateRangePicker data={[dateRange, setDateRange]} dropDownNo={"dropdown4"} state={{ formattedRange, setFormattedRange }} />
            <StatusDropdown data={leadTabCompanyDropDownData} dropDownNo={"dropdown1"} state={{ statusDropdown, setStatusDropdown }} />
            <StatusDropdown data={leadTabAllocatedDropDownData} dropDownNo={"dropdown2"} state={{ statusDropdown, setStatusDropdown }} />
            <StatusDropdown data={leadTabProjectDropDownData} dropDownNo={"dropdown2"} state={{ statusDropdown, setStatusDropdown }} />
            <StatusDropdown data={leadTabSalesPartnerDropDownData} dropDownNo={"dropdown3"} state={{ statusDropdown, setStatusDropdown }} />
            <StatusDropdown data={leadTabSortByAddressDropDownData} dropDownNo={"dropdown3"} state={{ statusDropdown, setStatusDropdown }} />
            <StatusDropdown data={leadTabSortByPostCodeDropDownData} dropDownNo={"dropdown3"} state={{ statusDropdown, setStatusDropdown }} />

            <input type="text" onChange={(e) => setSearch(e.target.value)} placeholder="Search" className={style.inputStyle} />
              <button className={style.searchBtn} onClick={() => setIsOpen(true)}>
                Add Leads
              </button>
              <AddLeadsPopUpMenu isOpen={isOpen} setIsOpen={setIsOpen} />
              <button className={style.searchBtn} onClick={() => setIsOpenShitMenu(true)}>
                <FontAwesomeIcon
                  icon={faUpload}
                  style={{
                    color: "white",
                    width: "1vw",
                    height: "1vw",
                    marginRight: "15px",
                  }}
                />
                Upload sheet
              </button>
              <SheetUploadPopUpMenu isOpen={isOpenShitMenu} setIsOpen={setIsOpenShitMenu}/>
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
                  <th>Assign Sales Partner</th>
                  <th>Status</th>
                  <th>Date</th>
                  <th>Company</th>
                  <th>Salutation</th>
                  <th>Frist name</th>
                  <th>Last name</th>
                  <th>Address</th>
                  <th>Postal code</th>
                  <th>Location</th>
                  <th>Contact</th>
                  <th>E-mail</th>
                  <th>Important Information</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody className={style.tbody}>
                {apiData?.data.length > 0 ? (
                  apiData?.data?.map((data, index) => (
                    <tr className={style.tableRow} key={data?.id}>
                      <td>{rowNumber++}</td>
                      <td className={style.activeBtnWrapper}>
                        demo
                        <FontAwesomeIcon
                          icon={faEdit}
                          className={style.pen}
                          size="lg"
                          onClick={() => {
                            setIsActivePopup(true);
                            setIsActivePopupValue({ value: data.isActive == true ? "active" : "inactive", id: data?._id });
                          }}
                        />
                      </td>
                      <td>
                        <span className={data?.status ? style.statusOrange : style.statusGreen}>{data?.status ?? "-"}</span>
                      </td>
                      <td>{data.createdAt ? moment(data?.createdAt).format("DD-MM-YYYY") : "-"}</td> {/* lead */}
                      <td>{data?.firma ?? "-"}</td>
                      <td>{data?.salutation ?? "-"}</td>
                      <td>{data?.first_name ?? "-"}</td>
                      <td>{data?.last_name ?? "-"}</td>
                      <td>{data?.strabe ?? "-"}</td>
                      <td>{data?.pLZ ?? "-"}</td>
                      <td>{data?.location ?? "-"}</td>
                      <td>{data?.telephon ?? "-"}</td>
                      <td>{data?.email ?? "-"}</td>
                      <td>{data?.important_information ?? "-"}</td>
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

export default Leads;
