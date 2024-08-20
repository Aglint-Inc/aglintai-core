import axios from "axios";
import { useAppContext } from "../../context/AppContext";
import { clearRequestsLocalStorage } from "../../utils/localStorageFunctions";
import React, { useState } from "react";
import RequestToDefault from "./RequestToDefault";

type loading = {
  request: boolean;
  workflow: boolean;
  template: boolean;
};

function Reset() {
  const [isLoading, setIsLoading] = useState<loading>({
    request: false,
    workflow: false,
    template: false,
  });
  const { recruiterId } = useAppContext();
  const [consoleMessage, setConsoleMessage] = useState<string[]>([]);

  const seedWorkflows = async () => {
    setConsoleMessage([]);
    setIsLoading((pre) => ({ ...pre, workflow: true }));

    await axios.post("/api/automation/seed_default_data", {
      recruiter_id: recruiterId,
      type: "workflow",
    });
    setIsLoading((pre) => ({ ...pre, workflow: false }));
    setConsoleMessage(["Workflow reset successfully"]);
  };
  const seedTemplates = async () => {
    setConsoleMessage([]);
    setIsLoading((pre) => ({ ...pre, template: true }));

    await axios.post("/api/automation/seed_default_data", {
      recruiter_id: recruiterId,
      type: "email_template",
    });
    setIsLoading((pre) => ({ ...pre, template: false }));
    setConsoleMessage(["Template reset successfully"]);
  };

  return (
    <div id="reset">
      <div className="reset-btns-container">
        <div>
          <p style={{ marginBottom: "10px" }}>Reset all requests.</p>
          <button
            className={"reset-btn"}
            onClick={() => {
              setIsLoading((pre) => ({ ...pre, request: true }));
              setConsoleMessage([]);
              clearRequestsLocalStorage("schedule_request");
              clearRequestsLocalStorage("reschedule_request");
              clearRequestsLocalStorage("cancel_schedule_request");
              setConsoleMessage([
                "All automation requests reset have been processed successfully.",
              ]);
              setIsLoading((pre) => ({ ...pre, request: false }));
            }}
          >
            Reset Requests
          </button>
        </div>

        <div>
          <p style={{ marginBottom: "10px" }}>
            Reset all workflows.
          </p>
          <button onClick={seedWorkflows} disabled={isLoading.workflow}>
            {isLoading.workflow ? "Reseting..." : " Reset Workflows"}
          </button>
        </div>

        <div>
          <p style={{ marginBottom: "10px" }}>
            Reset all email templates.
          </p>
          <button onClick={seedTemplates} disabled={isLoading.template}>
            {isLoading.template ? "Reseting..." : " Reset Templates"}
          </button>
        </div>

        <div>
          <p style={{ marginBottom: "10px" }}>
            Beautify Request trends.
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
              : "No message"}
          </div>
        </div>
      ) : (
        ""
      )}
    </div>
  );
}

export default Reset;
