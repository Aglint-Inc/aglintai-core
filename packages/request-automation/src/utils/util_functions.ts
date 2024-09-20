import {
  localScheduleRequestType,
  requestType,
} from "../type/localStorageTypes";
import {
  createLocalStorage,
  getRequestLocalStorage,
  updateLocalStorage,
} from "./localStorageFunctions";

function shuffleArray(array: localScheduleRequestType[]) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

function fullForm(type: requestType) {
  if (type === "schedule_request") return "Schedule";
  else if (type === "reschedule_request") return "Reschedule";
  else if (type === "cancel_schedule_request") return "Cancel";
}
export function shuffleAndSplitAsTwo(
  array: localScheduleRequestType[],
  count: number
) {
  const shuffledArray = shuffleArray([...array]);

  const part1 = shuffledArray.slice(0, count) as localScheduleRequestType[];
  const part2 = shuffledArray.slice(count) as localScheduleRequestType[];

  return [part1, part2];
}

export function shuffleAndSplit(arr: localScheduleRequestType[], num: number) {
  if (num === 0) {
    return [];
  }
  if (arr.length <= num) {
    return arr;
  }

  const shuffled = arr.slice().sort(() => 0.5 - Math.random());
  return shuffled.slice(0, num);
}

const sumbitAva = async ({
  settingsForSubmitAva,
  type,
  setConsoleMessage,
}: {
  settingsForSubmitAva: localScheduleRequestType[];
  type: requestType;
  setConsoleMessage: React.Dispatch<React.SetStateAction<string[]>>;
}) => {
  settingsForSubmitAva.map(async (setting, i) => {
    const payload = {
      request_id: setting["request_id"],
    };

    await fetch(`/api/automation/update_availability`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...payload }),
    })
      .then((res) => {
        if (res.status != 200) {
          return res.json().then((errorData) => {
            throw new Error(errorData.message);
          });
        }
        return res.json();
      })
      .then(() => {
        updateLocalStorage({
          application_id: setting.application_id,
          request_id: setting.request_id,
          field: "isSubmitAvailabilitySubmitted",
          value: true,
          status: "in_progress",
          type: type,
        });
        setConsoleMessage((pre) => [
          ...pre,
          `Avalaibilty succesfully submitted`,
        ]);
      })
      .catch((e) => {
        setConsoleMessage((pre) => [
          ...pre,
          `Avalaibilty submit failed ${e.message}`,
        ]);
      });
  });
};

export const updateRequest = async ({
  count,
  type,
  setConsoleMessage,
}: {
  count: number;
  type: requestType;
  setConsoleMessage: React.Dispatch<React.SetStateAction<string[]>>;
}) => {
  await fetch("/api/automation/update_request", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ count, type }),
  })
    .then((res) => {
      if (res.status != 200) {
        return res.json().then((errorData) => {
          throw new Error(errorData.message);
        });
      }
      return res.json();
    })
    .then((data) => data.data)
    .then((data) => {
      if (data?.length) {
        createLocalStorage(data, type);
        setConsoleMessage((pre) => [
          ...pre,
          `${data.length} Requests processed successfully.`,
        ]);
      } else {
        setConsoleMessage((pre) => [
          ...pre,
          `No new ${fullForm(type)} request found.`,
        ]);
      }
    })
    .catch((e) => {
      console.log(e.message);
      setConsoleMessage((pre) => [...pre, `Something went wrong.`]);
    });
};

export const submitAvailability = async ({
  type,
  count,
  setConsoleMessage,
}: {
  count: number;
  type: requestType;
  setConsoleMessage: React.Dispatch<React.SetStateAction<string[]>>;
}) => {
  const settings: Awaited<localScheduleRequestType[]> =
    await getRequestLocalStorage(type);

  const filteredSettings = settings.filter(
    (setting) =>
      !setting.isSubmitAvailabilitySubmitted && setting.status !== "completed"
  );
  if (!(filteredSettings?.length > 0)) {
    setConsoleMessage((pre) => [
      ...pre,
      `No ${fullForm(type)} requests found to submit availabilit.y`,
    ]);

    return;
  }

  const [settingsForSubmitAva, settingsForSendRemainder] = shuffleAndSplitAsTwo(
    filteredSettings,
    count
  );

  setConsoleMessage((pre) => [
    ...pre,
    `${settingsForSubmitAva.length} to submit availability \n${settingsForSendRemainder.length} to send reminder.`,
  ]);

  if (settingsForSendRemainder?.length > 0) {
    await sendAvailabilityReminder({
      settingsForSendRemainder,
      type,
      setConsoleMessage,
    });
  }
  await sumbitAva({ settingsForSubmitAva, type, setConsoleMessage });
};

export const sendAvailabilityReminder = async ({
  settingsForSendRemainder,
  type,
  setConsoleMessage,
}: {
  settingsForSendRemainder: localScheduleRequestType[];
  type: requestType;
  setConsoleMessage: React.Dispatch<React.SetStateAction<string[]>>;
}) => {
  settingsForSendRemainder.map(async (setting, i) => {
    const payload = {
      request_id: setting["request_id"],
      target_api: "sendAvailReqReminder_email_applicant",
    };

    await fetch(`/api/automation/send_availability_reminder`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...payload }),
    })
      .then((res) => {
        if (res.status != 200) {
          return res.json().then((errorData) => {
            throw new Error(errorData.message);
          });
        }
        return res.json();
      })
      .then(() => {
        updateLocalStorage({
          application_id: setting.application_id,
          request_id: setting.request_id,
          field: "isAvailabilityReminders",
          status: "in_progress",
          type: type,
          value: true,
        });
        setConsoleMessage((pre) => [
          ...pre,
          `Availability reminder sent succesfully.`,
        ]);
      })

      .catch((e) => {
        setConsoleMessage((pre) => [
          ...pre,
          `Failed to send availability reminder. ${e.message}`,
        ]);
      });
  });
  await sumbitAva({
    settingsForSubmitAva: settingsForSendRemainder,
    type,
    setConsoleMessage,
  });
};

const bookSchedule = async ({
  settingsForBookSchedule,
  type,
  setConsoleMessage,
}: {
  settingsForBookSchedule: localScheduleRequestType[];
  type: requestType;
  setConsoleMessage: React.Dispatch<React.SetStateAction<string[]>>;
}) => {
  settingsForBookSchedule.map(async (setting, i) => {
    const payload = {
      request_id: setting["request_id"],
    };

    await fetch("/api/automation/booking_self_schedule", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...payload }),
    })
      .then((res) => {
        if (res.status != 200) {
          return res.json().then((errorData) => {
            throw new Error(errorData.message);
          });
        }
        return res.json();
      })
      .then(() => {
        updateLocalStorage({
          application_id: setting.application_id,
          request_id: setting.request_id,
          field: "isSelfScheduleSubmitted",
          status: "completed",
          type,
          value: true,
        });
        setConsoleMessage((pre) => [
          ...pre,
          "Interviews booked successfully.",
        ]);
      })

      .catch((e) => {
        setConsoleMessage((pre) => [...pre, "Interviews booking failed."]);
      });
  });
};
export const bookSelfSchedule = async ({
  count,
  type,
  setConsoleMessage,
}: {
  count: number;
  type: requestType;
  setConsoleMessage: React.Dispatch<React.SetStateAction<string[]>>;
}) => {
  const localSettings = await getRequestLocalStorage(type);

  const filteredSettings = localSettings.filter(
    (setting) =>
      setting.isSubmitAvailabilitySubmitted && !setting.isSelfScheduleSubmitted
  );
  if (!(filteredSettings?.length > 0)) {
    setConsoleMessage((pre) => [
      ...pre,
      `No ${fullForm(type)} requests found for booking.`,
    ]);
    return;
  }

  const [settingsForBookSchedule, settingsForSendScheduleReminder] =
    shuffleAndSplitAsTwo(filteredSettings, count);

  setConsoleMessage((pre) => [
    ...pre,
    `${settingsForBookSchedule.length} to book interview | ${settingsForSendScheduleReminder.length} to send reminder.`,
  ]);

  await bookSchedule({ settingsForBookSchedule, type, setConsoleMessage });
  if (settingsForSendScheduleReminder?.length > 0) {
    await sendReminderSelfSchedule({
      settingsForSendScheduleReminder,
      type,
      setConsoleMessage,
    });
  }
};

export const sendReminderSelfSchedule = async ({
  settingsForSendScheduleReminder,
  type,
  setConsoleMessage,
}: {
  settingsForSendScheduleReminder: localScheduleRequestType[];
  type: requestType;
  setConsoleMessage: React.Dispatch<React.SetStateAction<string[]>>;
}) => {
  settingsForSendScheduleReminder.map(async (setting, i) => {
    const payload = {
      request_id: setting["request_id"],
      target_api: "selfScheduleReminder_email_applicant",
    };
    await fetch(`/api/automation/send_selfSchedule_reminder`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...payload }),
    })
      .then((res) => {
        if (res.status != 200) {
          return res.json().then((errorData) => {
            throw new Error(errorData.message);
          });
        }
        return res.json();
      })
      .then(() => {
        updateLocalStorage({
          application_id: setting.application_id,
          request_id: setting.request_id,
          field: "isSelfSchedulingReminders",
          value: true,
          status: "in_progress",
          type: type,
        });
        setConsoleMessage((pre) => [
          ...pre,
          "Self Schedule reminder sent succesfully.",
        ]);
      })
      .catch((e) => {
        setConsoleMessage((pre) => [
          ...pre,
          `Self Schedule reminder failed. ${e.message}`,
        ]);
      });
  });
  await bookSchedule({
    settingsForBookSchedule: settingsForSendScheduleReminder,
    type,
    setConsoleMessage,
  });
};

export const requestForReschedule = async ({
  type,
  count,
  setConsoleMessage,
}: {
  type: requestType;
  count: number;
  setConsoleMessage: React.Dispatch<React.SetStateAction<string[]>>;
}) => {
  const localSettings = await getRequestLocalStorage(type);

  const filteredSettings = localSettings.filter(
    (set) =>
      set.status === "completed" && !set.isReschedule && !set.isCancelRequest
  );

  if (!(filteredSettings?.length > 0)) {
    setConsoleMessage((pre) => [...pre, "No requests found for Reschedule."]);
    return;
  }

  const settingsForreSchedule = shuffleAndSplit(filteredSettings, count);

  setConsoleMessage((pre) => [
    ...pre,
    `${settingsForreSchedule.length} requests from Reschedule.`,
  ]);

  settingsForreSchedule.map(async (setting, i) => {
    const payload = {
      request_id: setting.request_id,
      application_id: setting.application_id,
    };

    await fetch(`api/automation/reschedule_request`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    })
      .then((res) => {
        if (res.status != 200) {
          return res.json().then((errorData) => {
            throw new Error(errorData.message);
          });
        }
        return res.json();
      })
      .then(() => {
        updateLocalStorage({
          application_id: setting.application_id,
          request_id: setting.request_id,
          field: "isReschedule",
          status: "completed",
          type,
          value: true,
        });
        setConsoleMessage((pre) => [...pre, "Reschedule request succesfully"]);
      })
      .catch((e) => {
        setConsoleMessage((pre) => [
          ...pre,
          `Reschedule request failed. ${e.message}`,
        ]);
      });
  });
};

export const requestForCancel = async ({
  type,
  count,
  setConsoleMessage,
}: {
  type: requestType;
  count: number;
  setConsoleMessage: React.Dispatch<React.SetStateAction<string[]>>;
}) => {
  const localSettings1 = await getRequestLocalStorage("schedule_request");
  const localSettings2 = await getRequestLocalStorage("reschedule_request");
  const localSettings = [...localSettings1, ...localSettings2];

  const filteredSettings = localSettings.filter(
    (set) =>
      set.status === "completed" && !set.isCancelRequest && !set.isReschedule
  );

  if (!(filteredSettings?.length > 0)) {
    setConsoleMessage((pre) => [...pre, "No request found to cancel."]);
    return;
  }

  const settingsforCancel = shuffleAndSplit(filteredSettings, count);

  setConsoleMessage((pre) => [
    ...pre,
    `${settingsforCancel.length} requests for cancel `,
  ]);

  settingsforCancel.map(async (setting, i) => {
    const payload = {
      request_id: setting.request_id,
      application_id: setting.application_id,
    };

    await fetch(`api/automation/cancel_request`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    })
      .then((res) => {
        if (res.status != 200) {
          return res.json().then((errorData) => {
            throw new Error(errorData.message);
          });
        }
        return res.json();
      })
      .then(() => {
        updateLocalStorage({
          application_id: setting.application_id,
          request_id: setting.request_id,
          field: "isCancelRequest",
          status: "completed",
          type: type,
          value: true,
        });
        setConsoleMessage((pre) => [...pre, "Raised cancel requests  succesfully."]);
      })
      .catch((e) => {
        setConsoleMessage((pre) => [
          ...pre,

          `Failed to raise cancel requests  ${e.message}`,
        ]);
      });
  });
};
