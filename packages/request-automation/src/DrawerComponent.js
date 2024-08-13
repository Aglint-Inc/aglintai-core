import React, { useState, useEffect, useRef, useContext } from "react";
import axios from "axios";
import { AppContext } from "./AppContext"; // Import the context
import "./DrawerComponent.css"; // Assuming your styles are in a separate CSS file
import {
  clearRequestsWithSettings,
  getRequestsWithSettings,
  storeRequestsWithSettings,
  updateField,
} from "./utils/functions";

const DrawerComponent = () => {
  const [isOpen, setIsOpen] = useState(true);
  const [activeDiv, setActiveDiv] = useState("demo"); // 'demo' or 'seed'
  const [loading, setLoading] = useState({
    btn1: false,
    btn2: false,
    btn3: false,
  });

  const drawerRef = useRef(null);

  const toggleDrawer = () => {
    setIsOpen(!isOpen);
    // setIsOpen(true);
  };

  const handleApiRequest = async (url) => {
    try {
      switch (url) {
        case "/api/automation/update_request":
          setLoading((pre) => ({ ...pre, btn1: true }));
          await fetch(url)
            .then((res) => {
              if (res.status === 200) return res.json();
              throw new Error();
            })
            .then((data) => data.data)
            .then((data) => {
              if (data?.length) {
                alert(`${data.length} Request successfully Process.`);
                storeRequestsWithSettings(data);
              } else {
                alert(`No new request found`);
              }
            })
            .catch((e) => {
              console.log(e.message);
              alert(`Something went wrong`);
            })
            .finally(() => {
              setLoading((pre) => ({ ...pre, btn1: false }));
            });

          break;

        case "/api/automation/update_availability":
          setLoading((pre) => ({ ...pre, btn2: true }));
          const settings = await getRequestsWithSettings();

          if (!(settings?.length > 0)) {
            alert("No request found");
            break;
          }

          settings.map(async (setting, i) => {
            const payload = {
              application_id: setting["application_id"],
            };

            await fetch(url, {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ ...payload }),
            })
              .then((res) => {
                if (res.status === 200) return res.json();
                throw new Error();
              })
              .then(() => {
                updateField(
                  setting.application_id,
                  setting.request_id,
                  "isSubmitAvailability",
                  true
                );
                alert(`${i + 1} - request succesfully submitted`);
              })

              .catch((e) => {
                alert(`${i + 1} - request Something went wrong`);
              })
              .finally(() => {
                if (settings.length - 1 === i)
                  setLoading((pre) => ({ ...pre, btn2: false }));
              });
          });

          break;

        case "/api/automation/booking_self_schedule":
          // Loop through each providedRequestId and make the API call
          setLoading((pre) => ({ ...pre, btn3: true }));
          const localSettings = await getRequestsWithSettings();

          if (!(localSettings?.length > 0)) {
            alert("No request found");
            break;
          }

          localSettings.map(async (setting, i) => {
            const payload = {
              request_id: setting["request_id"],
            };

            await fetch(url, {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ ...payload }),
            })
              .then((res) => {
                if (res.status === 200) return res.json();
                throw new Error();
              })
              .then(() => {
                updateField(
                  setting.application_id,
                  setting.request_id,
                  "isSelfSchedule",
                  true
                );
                alert(`${i + 1} - self schudle succesfully submitted`);
              })

              .catch((e) => {
                alert(`${i + 1} - self schudle Something went wrong`);
              })
              .finally(() => {
                if (localSettings?.length - 1 === i)
                  setLoading((pre) => ({ ...pre, btn3: false }));
              });
          });

          break;

        default:
          console.error("Unknown API request:", url);
          alert("Unknown API request.");
      }
    } catch (error) {
      console.error("Error:", error);
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
              demos, not a product feature.
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
              caseNo={"Case 1:"}
              isloading={loading.btn1}
              title={"Process the top 15 requests."}
              onClick={() => handleApiRequest("/api/automation/update_request")}
            />
            <Button
              caseNo={"Case 2:"}
              isloading={loading.btn2}
              title={"Few candidates submit availability on time."}
              onClick={() =>
                handleApiRequest("/api/automation/update_availability")
              }
            />
            <Button
              caseNo={"Case 3:"}
              isloading={loading.btn3}
              title={"Self-schedule slot booking."}
              onClick={() =>
                handleApiRequest("/api/automation/booking_self_schedule")
              }
            />

            {/* <div className="flex-h">
              <span>
                <strong>Case 1:</strong> Process the top 15 requests.
              </span>
              <button
                className="radix-button"
                onClick={() =>
                  handleApiRequest("/api/automation/update_request")
                }
              >
                Run
              </button>
            </div>
            <div className="flex-h">
              <span>
                <strong>Case 2:</strong> Few candidates submit availability on
                time.
              </span>
              <button
                className="radix-button"
                onClick={() =>
                  handleApiRequest("/api/automation/update_availability")
                }
              >
                Run
              </button>
            </div>
            <div className="flex-h">
              <span>
                <strong>Case 3:</strong> Self-schedule slot booking.
              </span>
              <button
                className="radix-button"
                onClick={() =>
                  handleApiRequest("/api/automation/booking_self_schedule")
                }
              >
                Run
              </button>
            </div> */}
          </div>
        )}

        {activeDiv === "seed" && (
          <div id="seed" className="drawer-body grid3X2">
            <label className="flex-h">
              <div className="drawer-seed-options-child">
                Select a job to seed
                <select>
                  <option>Job 1</option>
                  <option>Job 2</option>
                  <option>Job 3</option>
                </select>
              </div>
              <button className="radix-button" onClick={() => {}}>
                Seed
              </button>
            </label>
            <label className="flex-h">
              <div className="drawer-seed-options-child">
                Select a Workflow for a job
                <select>
                  <option>Job 1</option>
                  <option>Job 2</option>
                  <option>Job 3</option>
                </select>
                <select>
                  <option>Workflow 1</option>
                  <option>Workflow 2</option>
                  <option>Workflow 3</option>
                </select>
              </div>
              <button className="radix-button" onClick={() => {}}>
                Seed
              </button>
            </label>
            <label className="flex-h">
              <div className="drawer-seed-options-child">
                Reset selected job
                <select>
                  <option>Job 1</option>
                  <option>Job 2</option>
                  <option>Job 3</option>
                </select>
              </div>
              <button className="radix-button" onClick={() => {}}>
                Reset
              </button>
            </label>
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

const Button = ({ caseNo, title, isloading, onClick }) => {
  return (
    <div className="flex-h">
      <span>
        <strong>{caseNo}</strong>
        {title}
      </span>
      <button className="radix-button" disabled={isloading} onClick={onClick}>
        {isloading ? "Running" : "Run"}
      </button>
    </div>
  );
};
