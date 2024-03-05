import { DateCalendar } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import dayjs from "dayjs";
function DateSelect({
  getDate,
  dateRef,
}: {
  getDate: any;
  dateRef: any;
}) {

  
  var today = new Date();
  return (
    <div className="rounded-xl border-default-200 border-solid border-2 ">
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DateCalendar
          // sx={calenderStyles}
          // disablePast
          defaultValue={dayjs(today)}
          onChange={getDate}
          ref={dateRef}
        />
      </LocalizationProvider>
    </div>
  );
}

export default DateSelect;
