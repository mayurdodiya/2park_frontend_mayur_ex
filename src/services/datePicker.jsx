import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import style from "./../css/DatePicker.module.css";
import moment from "moment";

const DateRangePicker = ({ data, dropDownNo, state }) => {
  const [dateRange, setDateRange] = data;
  const { formattedRange, setFormattedRange } = state;
  const [startDate, endDate] = dateRange;

  return (
    <div className={style.datePickerWrapper}>
      <DatePicker
        className={style.datePickerInput}
        selectsRange
        startDate={startDate}
        endDate={endDate}
        onChange={(update) => {
          setDateRange(update);
          const startDateFormatted = moment(update[0]).format("DD/MM/YYYY");
          const endDateFormatted = moment(update[1]).format("DD/MM/YYYY");
          setFormattedRange({ startDate: startDateFormatted, endDate: endDateFormatted });
        }}
        isClearable
        placeholderText="Select date range"
        // dateFormat="dd/MM/yyyy"
        dateFormat="yyyy/MM/dd"
        popperPlacement="bottom-start"
        shouldCloseOnScroll={true}
        portalId="root-portal"
        withPortal
      />
    </div>
  );
};

export default DateRangePicker;
