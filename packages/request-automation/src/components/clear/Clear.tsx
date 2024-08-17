import { clearRequestsLocalStorage } from "../../utils/localStorageFunctions";
import React from "react";

function Clear() {
  return (
    <div id="clear">
      <span
        className={"clear-btn"}
        onClick={() => {
          clearRequestsLocalStorage("schedule_request");
          clearRequestsLocalStorage("reschedule_request");
          clearRequestsLocalStorage("cancel_schedule_request");
        }}
      >
        Clear
      </span>
    </div>
  );
}

export default Clear;
