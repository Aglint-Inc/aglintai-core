import React, { useState, useEffect, useRef, useContext } from "react";
import "./DrawerComponent.css"; // Assuming your styles are in a separate CSS file

import {
  bookSelfSchedule,
  requestForCancel,
  requestForReschedule,
  sendAvailabilityReminder,
  sendReminderSelfSchedule,
  shuffleAndSplit,
  shuffleAndSplitAsTwo,
  submitAvailability,
  updateRequest,
} from "./utils/util_functions";
import {
  localScheduleRequestType,
  requestType,
} from "./type/localStorageTypes";
import { buttonsType, radioBtnOptions } from "./type/UITypes";
import {
  clearRequestsLocalStorage,
  getRequestLocalStorage,
} from "./utils/localStorageFunctions";

export const DrawerComponent = () => {
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

  const handleApiRequest = async ({
    btn,
    count = 8,
    type = "schedule_request",
  }: {
    btn: buttonsType;
    count: number;
    type: requestType;
  }) => {
    switch (btn) {
      case "proceed":
        try {
          setLoading((pre) => ({ ...pre, btn1: true }));
          await updateRequest(count, type);
        } catch (e) {
          //
        } finally {
          setLoading((pre) => ({ ...pre, btn1: false }));
        }
        break;

      case "update_availability":
        try {
          setLoading((pre) => ({ ...pre, btn2: true }));

          await submitAvailability(type, count);
        } catch (e) {
          //
        } finally {
          setLoading((pre) => ({ ...pre, btn2: false }));
        }
        break;

      case "booking_self_schedule":
        console.log(type, count);
        try {
          setLoading((pre) => ({ ...pre, btn3: true }));
          await bookSelfSchedule(count, type);
        } catch (e) {
        } finally {
          setLoading((pre) => ({ ...pre, btn3: false }));
        }
        break;

      case "reSchedule_request":
        console.log(type);
        try {
          setLoading((pre) => ({ ...pre, btn4: true }));
          await requestForReschedule(type, count);
        } catch (e) {
        } finally {
          setLoading((pre) => ({ ...pre, btn4: false }));
        }
        break;

      case "cancel_request":
        try {
          setLoading((pre) => ({ ...pre, btn4: true }));
          await requestForCancel(type, count);
        } catch (e) {
        } finally {
          setLoading((pre) => ({ ...pre, btn4: false }));
        }
        break;
    }
  };

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
                onClick={() => {
                  clearRequestsLocalStorage("schedule_request");
                  clearRequestsLocalStorage("reschedule_request");
                  clearRequestsLocalStorage("cancel_schedule_request");
                }}
              >
                Clear
              </span>
            </span>
          </div>
        </div>
        {activeDiv === "demo" && (
          <div id="demo" className="drawer-body">
            <Button
              isLoading={loading.btn1}
              title={"Proceed request"}
              showInput={true}
              defaultCount={8}
              isRadio
              options={[
                { name: "Schedule", value: "schedule_request" },
                { name: "Re-schedule", value: "reschedule_request" },
                { name: "Cancel schedule", value: "cancel_schedule_request" },
              ]}
              handleSubmit={({
                count,
                type,
              }: {
                count: number;
                type: requestType;
              }) => handleApiRequest({ btn: "proceed", count, type })}
            />
            <Button
              isLoading={loading.btn2}
              title={"Submits Availability."}
              defaultCount={4}
              showInput={true}
              isRadio
              options={[
                { name: "Schedule", value: "schedule_request" },
                { name: "Re-schedule", value: "reschedule_request" },
              ]}
              handleSubmit={({
                count,
                type,
              }: {
                count: number;
                type: requestType;
              }) =>
                handleApiRequest({ btn: "update_availability", count, type })
              }
            />
            <Button
              isLoading={loading.btn3}
              title={"Coinfirms Interview."}
              defaultCount={2}
              showInput={true}
              isRadio
              options={[
                { name: "Schedule", value: "schedule_request" },
                { name: "Re-schedule", value: "reschedule_request" },
              ]}
              handleSubmit={({
                count,
                type,
              }: {
                count: number;
                type: requestType;
              }) =>
                handleApiRequest({ btn: "booking_self_schedule", count, type })
              }
            />
            <Button
              isLoading={loading.btn3}
              title={"Requests for Rescedule"}
              defaultCount={1}
              showInput={true}
              handleSubmit={({ count }: { count: number }) =>
                handleApiRequest({
                  btn: "reSchedule_request",
                  count,
                  type: "schedule_request",
                })
              }
            />
            <Button
              isLoading={loading.btn3}
              defaultCount={2}
              title={"Cancels Interview."}
              showInput={true}
              handleSubmit={({ count }: { count: number }) =>
                handleApiRequest({
                  btn: "cancel_request",
                  count,
                  type: "schedule_request",
                })
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

// export default DrawerComponent;

const Button = ({
  title,
  isLoading,
  handleSubmit,
  defaultCount,
  showInput = false,
  isRadio = false,
  options,
}: {
  title: string;
  isLoading: boolean;
  handleSubmit: any;
  defaultCount: number;
  showInput?: boolean;
  isRadio?: boolean;
  options?: radioBtnOptions[];
}) => {
  const [count, setCount] = useState(defaultCount ? defaultCount : 0);
  const [selectedOption, setSelectedOption] = useState(
    options ? options[0].value : ""
  );

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedOption(event.target.value);
  };

  return (
    <div className="button-container">
      <h4>{title}</h4>

      {isRadio &&
        options &&
        options.map((option) => (
          <label className="radio-lable">
            <input
              type="radio"
              name={title}
              value={option.value}
              checked={selectedOption === option.value}
              onChange={handleChange}
            />
            {option.name}
          </label>
        ))}
      {showInput && (
        <input
          min={1}
          type="number"
          className="input-field"
          value={count}
          onChange={(e) => setCount(+e.target.value)}
        />
      )}
      <button
        className={isLoading ? `radix-button visible` : "radix-button"}
        disabled={isLoading}
        onClick={() => handleSubmit({ count, type: selectedOption })}
      >
        {isLoading ? "Running" : "Run"}
      </button>
    </div>
  );
};
