import axios from "axios";
import { useAppContext } from "../../context/AppContext";
import { clearRequestsLocalStorage } from "../../utils/localStorageFunctions";
import React, { useState } from "react";
import RequestToDefault from "./RequestToDefault";

type loading = {
  request: boolean;
  workflow: boolean;
  workflow_connect: boolean;
  template: boolean;
};

function Reset() {
  const [isLoading, setIsLoading] = useState<loading>({
    request: false,
    workflow: false,
    workflow_connect: false,
    template: false,
  });
  const { recruiterId } = useAppContext();
  const [consoleMessage, setConsoleMessage] = useState<string[]>([]);

  const seedWorkflows = async () => {
    try {
      setConsoleMessage([]);
      setIsLoading((pre) => ({ ...pre, workflow: true }));

      await axios.post("/api/automation/seed_default_data", {
        recruiter_id: recruiterId,
        type: "workflow",
      });
      setIsLoading((pre) => ({ ...pre, workflow: false }));
      setConsoleMessage(["Workflow reset successfully"]);
    } catch (e: any) {
      setConsoleMessage(["Workflow reset failed", e.message]);
    }
  };

  const seedTemplates = async () => {
    try {
      setConsoleMessage([]);
      setIsLoading((pre) => ({ ...pre, template: true }));

      await axios.post("/api/automation/seed_default_data", {
        recruiter_id: recruiterId,
        type: "email_template",
      });
      setIsLoading((pre) => ({ ...pre, template: false }));
      setConsoleMessage(["Template reset successfully"]);
    } catch (e: any) {
      setConsoleMessage(["Template reset failed", e.message]);
    }
  };

  const resetAllRequestInLocalstorage = () => {
    setIsLoading((pre) => ({ ...pre, request: true }));
    setConsoleMessage([]);
    clearRequestsLocalStorage("schedule_request");
    clearRequestsLocalStorage("reschedule_request");
    clearRequestsLocalStorage("cancel_schedule_request");
    setConsoleMessage([
      "All automation requests reset have been processed successfully.",
    ]);
    setIsLoading((pre) => ({ ...pre, request: false }));
  };

  const workflowConnectToJob = async () => {
    try {
      setConsoleMessage([]);
      setIsLoading((pre) => ({ ...pre, workflow_connect: true }));

      await axios.post("/api/automation/workflow_connect_to_jobs", {
        recruiter_id: recruiterId,
      });
      setIsLoading((pre) => ({ ...pre, workflow_connect: false }));
      setConsoleMessage(["Workflows join to job successfully"]);
    } catch (e: any) {
      console.log(e);
      setConsoleMessage(["Workflows join to job failed", e.message]);
    }
  };

  return (
    <div id="reset">
      <div className="reset-btns-container">
        <div>
          <p style={{ marginBottom: "10px" }}>Reset all requests.</p>
          <button
            className={"reset-btn"}
            onClick={resetAllRequestInLocalstorage}
          >
            Reset Requests
          </button>
        </div>

        <div>
          <p style={{ marginBottom: "10px" }}>Workflow connect to job</p>
          <button
            onClick={workflowConnectToJob}
            disabled={isLoading.workflow_connect}
          >
            {isLoading.workflow_connect
              ? "Connecting..."
              : " Connect Workflows"}
          </button>
        </div>

        <div>
          <p style={{ marginBottom: "10px" }}>Reset all workflows.</p>
          <button onClick={seedWorkflows} disabled={isLoading.workflow}>
            {isLoading.workflow ? "Reseting..." : " Reset Workflows"}
          </button>
        </div>

        <div>
          <p style={{ marginBottom: "10px" }}>Reset all email templates.</p>
          <button onClick={seedTemplates} disabled={isLoading.template}>
            {isLoading.template ? "Reseting..." : " Reset Templates"}
          </button>
        </div>

        <div>
          <p style={{ marginBottom: "10px" }}>Beautify Request trends.</p>
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
