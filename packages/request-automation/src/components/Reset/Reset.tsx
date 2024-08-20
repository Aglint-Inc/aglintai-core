import axios from "axios";
import { useAppContext } from "../../context/AppContext";
import { clearRequestsLocalStorage } from "../../utils/localStorageFunctions";
import React, { useState } from "react";
import RequestToDefault from "./RequestToDefault";

function Reset() {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { recruiterId } = useAppContext();
  const [consoleMessage, setConsoleMessage] = useState<string[]>([]);

  const seedHandler = async () => {
    setConsoleMessage([]);
    setIsLoading(true);
    await axios.post("/api/pre-seed", {
      record: {
        id: recruiterId,
      },
    });
    setIsLoading(false);
    setConsoleMessage(["Workflow reset successfully"]);
  };

  return (
    <div id="reset">
      <div className="reset-btns-container">
        <div>
          <p style={{ marginBottom: "10px" }}>Reset all request automation.</p>
          <button
            className={"reset-btn"}
            onClick={() => {
              setConsoleMessage([]);
              clearRequestsLocalStorage("schedule_request");
              clearRequestsLocalStorage("reschedule_request");
              clearRequestsLocalStorage("cancel_schedule_request");
              setConsoleMessage([
                "All automation requests reset have been processed successfully.",
              ]);
            }}
          >
            Reset Automation Requests
          </button>
        </div>

        <div>
          <p style={{ marginBottom: "10px" }}>
            Reset all workflows to defualt.
          </p>
          <button onClick={seedHandler} disabled={isLoading}>
            {isLoading ? "Reseting..." : " Reset Workflow"}
          </button>
        </div>

        <div>
          <p style={{ marginBottom: "10px" }}>
            Reset all email templates to defualt.
          </p>
          <button onClick={seedHandler} disabled={isLoading}>
            {isLoading ? "Reseting..." : " Reset Email"}
          </button>
        </div>

        <div>
          <p style={{ marginBottom: "10px" }}>
            Reset Request graph with random dates.
          </p>
          <RequestToDefault setConsoleMessage={setConsoleMessage} />
        </div>
      </div>
      {consoleMessage.length ? (
        <div className="console">
          <h5>Console</h5>
          <div>
            {consoleMessage.length
              ? consoleMessage.map((mes, i) => (
                  <p>
                    {i + 1 < 10 ? "0" + (i + 1) : i + 1} - {mes}
                  </p>
                ))
              : "no message"}
          </div>
        </div>
      ) : (
        ""
      )}
    </div>
  );
}

export default Reset;
