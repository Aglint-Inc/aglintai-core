import React, { useState } from "react";
import { requestType } from "../../type/localStorageTypes";
import { buttonsType, radioBtnOptions } from "../../type/UITypes";
import {
  bookSelfSchedule,
  requestForCancel,
  requestForReschedule,
  submitAvailability,
  updateRequest,
} from "../../utils/util_functions";
import RequestGraphLook from "./GraphLook";

function Demo() {
  const [consoleMessage, setConsoleMessage] = useState<string[]>([]);
  const [loading, setLoading] = useState({
    btn1: false,
    btn2: false,
    btn3: false,
    btn4: false,
    btn5: false,
  });
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
          console.clear();
          setConsoleMessage([]);
          setLoading((pre) => ({ ...pre, btn1: true }));
          await updateRequest({ count, type, setConsoleMessage });
        } catch (e) {
          //
        } finally {
          setLoading((pre) => ({ ...pre, btn1: false }));
        }
        break;

      case "update_availability":
        try {
          console.clear();
          setConsoleMessage([]);
          setLoading((pre) => ({ ...pre, btn2: true }));

          await submitAvailability({ type, count, setConsoleMessage });
        } catch (e) {
          //
        } finally {
          setLoading((pre) => ({ ...pre, btn2: false }));
        }
        break;

      case "booking_self_schedule":
        try {
          console.clear();
          setConsoleMessage([]);
          setLoading((pre) => ({ ...pre, btn3: true }));
          await bookSelfSchedule({ count, type, setConsoleMessage });
        } catch (e) {
        } finally {
          setLoading((pre) => ({ ...pre, btn3: false }));
        }
        break;

      case "reSchedule_request":
        try {
          setConsoleMessage([]);
          setLoading((pre) => ({ ...pre, btn4: true }));
          await requestForReschedule({ type, count, setConsoleMessage });
        } catch (e) {
        } finally {
          setLoading((pre) => ({ ...pre, btn4: false }));
        }
        break;

      case "cancel_request":
        try {
          console.clear();
          setConsoleMessage([]);
          setLoading((pre) => ({ ...pre, btn5: true }));
          await requestForCancel({ type, count, setConsoleMessage });
        } catch (e) {
        } finally {
          setLoading((pre) => ({ ...pre, btn5: false }));
        }
        break;
    }
  };

  return (
    <div id="demo">
      <div className="drawer-body">
        <Button
          isLoading={loading.btn1}
          title={"Proceed Request."}
          showInput={true}
          defaultCount={8}
          isRadio
          options={[
            { name: "Schedule", value: "schedule_request" },
            { name: "ReSchedule", value: "reschedule_request" },
            { name: "Cancel Schedule", value: "cancel_schedule_request" },
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
          }) => handleApiRequest({ btn: "update_availability", count, type })}
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
            handleApiRequest({
              btn: "booking_self_schedule",
              count,
              type,
            })
          }
        />
        <Button
          isLoading={loading.btn4}
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
          isLoading={loading.btn5}
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
      <RequestGraphLook setConsoleMessage={setConsoleMessage} />
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
    </div>
  );
}

export default Demo;

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
      <h5>{title}</h5>

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
