import React, { useState, useEffect, useRef, useContext } from "react";
import "./DrawerComponent.css"; // Assuming your styles are in a separate CSS file
import {
  clearRequestsWithSettings,
  getRequestsWithSettings,
} from "./utils/functions";
// import InfoDisplay from "@components/InfoDisplay";
import {
  bookSelfSchedule,
  requestForReschedule,
  sendAvailabilityReminder,
  sendReminderSelfSchedule,
  shuffleAndSplit,
  shuffleAndSplitAsTwo,
  submitAvailability,
  updateRequest,
} from "./utils/util_functions";
import InfoDisplay from "./components/InfoDisplay";

const DrawerComponent = () => {
  const [isOpen, setIsOpen] = useState(true);
  const [activeDiv, setActiveDiv] = useState("demo"); // 'demo' or 'seed'
  const [loading, setLoading] = useState({
    btn1: false,
    btn2: false,
    btn3: false,
    btn4: false,
  });
  const drawerRef = useRef(null);

  const toggleDrawer = () => {
    setIsOpen(!isOpen);
  };

  const handleApiRequest = async (url, count = 8) => {
    switch (url) {
      case "update_request":
        try {
          setLoading((pre) => ({ ...pre, btn1: true }));
          await updateRequest(count);
        } catch (e) {
          //
        } finally {
          setLoading((pre) => ({ ...pre, btn1: false }));
        }
        break;

      case "update_availability":
        try {
          setLoading((pre) => ({ ...pre, btn2: true }));
          const settings = await getRequestsWithSettings();

          if (!(settings?.length > 0)) {
            alert("No request found");
            break;
          }

          const [settingsForSubmitAva, settingsForSendRemainder] =
            shuffleAndSplitAsTwo(settings, count);

          if (
            !confirm(
              `${settingsForSubmitAva.length} for Submit availability | ${settingsForSendRemainder.length} for send reminder`
            )
          )
            return;

          await submitAvailability(settingsForSubmitAva);
          if (settingsForSendRemainder?.length > 0) {
            await sendAvailabilityReminder(settingsForSendRemainder);
          }
        } catch (e) {
          //
        } finally {
          setLoading((pre) => ({ ...pre, btn2: false }));
        }
        break;

      case "booking_self_schedule":
        try {
          setLoading((pre) => ({ ...pre, btn3: true }));
          const localSettings = await getRequestsWithSettings();

          if (!(localSettings?.length > 0)) {
            alert("No request found");
            return;
          }

          const [settingsForBookSchedule, settingsForSendScheduleReminder] =
            shuffleAndSplitAsTwo(localSettings, count);

          if (
            !confirm(
              `${settingsForBookSchedule.length} for booking self schedule | ${settingsForSendScheduleReminder.length} for send reminder`
            )
          )
            return;

          await bookSelfSchedule(settingsForBookSchedule);
          if (settingsForSendScheduleReminder?.length > 0) {
            await sendReminderSelfSchedule(settingsForSendScheduleReminder);
          }
        } catch (e) {
        } finally {
          setLoading((pre) => ({ ...pre, btn3: false }));
        }
        break;

      case "reSchedule_request":
        try {
          setLoading((pre) => ({ ...pre, btn4: true }));
          const localSettings1 = await getRequestsWithSettings();

          if (!(localSettings1?.length > 0)) {
            alert("No request found");
            return;
          }

          const settingsForreSchedule = shuffleAndSplit(localSettings1, count);

          if (
            !confirm(
              `${settingsForreSchedule.length} requests from re-schedule `
            )
          )
            return;

          await requestForReschedule(settingsForreSchedule);

          // await bookSelfSchedule(settingsForBookSchedule);
          // if (settingsForSendScheduleReminder?.length > 0) {
          //   await sendReminderSelfSchedule(settingsForSendScheduleReminder);
          // }
        } catch (e) {
        } finally {
          setLoading((pre) => ({ ...pre, btn4: false }));
        }
        break;

      default:
        console.error("Unknown API request:", url);
        alert("Unknown API request.");
    }
  };

  const handleClickOutside = (event) => {
    if (drawerRef.current && !drawerRef.current.contains(event.target)) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div
      ref={drawerRef}
      className={`bottom-drawer-container ${isOpen ? "open" : ""}`}
    >
      <div className="bottom-drawer-content">
        <div className="drawer-header">
          <div className="flex-h">
            <span className="drawer-warning">
              <strong>⚠️ Warning:</strong> This is a utility for speeding up
              demos, not a product feature. <InfoDisplay />
            </span>
            <span>
              <span
                button-size-ghost="1"
                color-ghost="neutral"
                onClick={() => setActiveDiv("demo")}
              >
                Demo
              </span>
              <span
                button-color-soft="neutral"
                button-size-ghost="1"
                color-ghost="neutral"
                onClick={() => setActiveDiv("seed")}
              >
                Seed
              </span>
              <span
                button-color-soft="neutral"
                button-size-ghost="1"
                color-ghost="neutral"
                onClick={() => clearRequestsWithSettings()}
              >
                Clear
              </span>
            </span>
          </div>
        </div>
        {activeDiv === "demo" && (
          <div id="demo" className="drawer-body grid3X2">
            <Button
              caseNo={"1:"}
              isLoading={loading.btn1}
              title={"Aglint AI works on."}
              showInput={true}
              defaultCount={8}
              handleSubmit={(count) =>
                handleApiRequest("update_request", count)
              }
            />
            <Button
              caseNo={"2:"}
              isLoading={loading.btn2}
              title={"Submits Availability."}
              defaultCount={4}
              showInput={true}
              handleSubmit={(count) =>
                handleApiRequest("update_availability", count)
              }
            />
            <Button
              caseNo={"3:"}
              isLoading={loading.btn3}
              title={"Coinfirms Interview."}
              defaultCount={2}
              showInput={true}
              handleSubmit={(count) =>
                handleApiRequest("booking_self_schedule", count)
              }
            />
            <Button
              caseNo={"4:"}
              isLoading={loading.btn3}
              title={"Requests for Rescedule"}
              defaultCount={1}
              showInput={true}
              handleSubmit={(count) =>
                handleApiRequest("reSchedule_request", count)
              }
            />
            <Button
              caseNo={"5:"}
              isLoading={loading.btn3}
              defaultCount={2}
              title={"Cancels Interview."}
              showInput={true}
              handleSubmit={() =>
                handleApiRequest("/api/automation/booking_self_schedule")
              }
            />
            <Button
              caseNo={"6:"}
              isLoading={loading.btn3}
              defaultCount={2}
              title={"Declines Interview"}
              showInput={true}
              handleSubmit={() =>
                handleApiRequest("/api/automation/booking_self_schedule")
              }
            />
          </div>
        )}
      </div>
      <div className="drawer-handle" onClick={toggleDrawer}>
        {isOpen ? "↧" : "↥"}
      </div>
    </div>
  );
};

export default DrawerComponent;

const Button = ({
  caseNo,
  title,
  isLoading,
  handleSubmit,
  showInput = false,
  defaultCount,
}) => {
  const [count, setCount] = useState(defaultCount ? defaultCount : 0);
  return (
    <div className="button-container">
      <span className="title">
        <strong>{caseNo}</strong> {title}
      </span>
      <div className="input-button-wrapper">
        {showInput && (
          <input
            min={1}
            type="number"
            className="input-field"
            value={count}
            onChange={(e) => setCount(e.target.value)}
          />
        )}
        <button
          className={isLoading ? `radix-button visible` : "radix-button"}
          disabled={isLoading}
          onClick={() => handleSubmit(count)}
        >
          {isLoading ? "Running" : "Run"}
        </button>
      </div>
    </div>
  );
};
