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

const sumbitAva = async (
  settingsForSubmitAva: localScheduleRequestType[],
  type: requestType
) => {
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
        alert(`${i + 1} - Avalaibilty succesfully submitted`);
      })
      .catch((e) => {
        alert(`${i + 1} - Avalaibilty submit failed ${e.message}`);
      });
  });
};

export const updateRequest = async (count: number, type: requestType) => {
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
        alert(`${data.length} Request successfully Process.`);
      } else {
        alert(`No New ${fullForm(type)} request found`);
      }
    })
    .catch((e) => {
      console.log(e.message);
      alert(`Something went wrong`);
    });
};

export const submitAvailability = async (type: requestType, count: number) => {
  const settings: Awaited<localScheduleRequestType[]> =
    await getRequestLocalStorage(type);

  const filteredSettings = settings.filter(
    (setting) =>
      !setting.isSubmitAvailabilitySubmitted && setting.status !== "completed"
  );
  if (!(filteredSettings?.length > 0)) {
    alert(`No ${fullForm(type)} request found for submit Availability`);
    return;
  }

  const [settingsForSubmitAva, settingsForSendRemainder] = shuffleAndSplitAsTwo(
    filteredSettings,
    count
  );

  if (
    !confirm(
      `${settingsForSubmitAva.length} for Submit availability \n${settingsForSendRemainder.length} for send reminder`
    )
  )
    return;

  if (settingsForSendRemainder?.length > 0) {
    await sendAvailabilityReminder(settingsForSendRemainder, type);
  }
  await sumbitAva(settingsForSubmitAva, type);
};

export const sendAvailabilityReminder = async (
  settingsForSendRemainder: localScheduleRequestType[],
  type: requestType
) => {
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
        alert(`${i + 1} - Availability Reminder sent succesfully`);
      })

      .catch((e) => {
        alert(`${i + 1} - Availability Reminder sending failed ${e.message}`);
      });
  });
  await sumbitAva(settingsForSendRemainder, type);
};

const bookSchedule = async (
  settingsForBookSchedule: localScheduleRequestType[],
  type: requestType
) => {
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
        alert(`${i + 1} - self schudle succesfully submitted`);
      })

      .catch((e) => {
        console.log("selfschedule booking error:", e.message);
        alert(`${i + 1} - self schudle booking failed `);
      });
  });
};
export const bookSelfSchedule = async (count: number, type: requestType) => {
  const localSettings = await getRequestLocalStorage(type);

  const filteredSettings = localSettings.filter(
    (setting) =>
      setting.isSubmitAvailabilitySubmitted && !setting.isSelfScheduleSubmitted
  );
  console.log(filteredSettings);
  if (!(filteredSettings?.length > 0)) {
    alert(`No ${fullForm(type)} request found for booking`);
    return;
  }

  const [settingsForBookSchedule, settingsForSendScheduleReminder] =
    shuffleAndSplitAsTwo(filteredSettings, count);

  if (
    !confirm(
      `${settingsForBookSchedule.length} for booking self schedule | ${settingsForSendScheduleReminder.length} for send reminder`
    )
  )
    return;

  await bookSchedule(settingsForBookSchedule, type);
  if (settingsForSendScheduleReminder?.length > 0) {
    await sendReminderSelfSchedule(settingsForSendScheduleReminder, type);
  }
};

export const sendReminderSelfSchedule = async (
  settingsForSendScheduleReminder: localScheduleRequestType[],
  type: requestType
) => {
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
        alert(`${i + 1} - Self schedule Reminder sent succesfully`);
      })
      .catch((e) => {
        alert(`${i + 1} - Self schedule Reminder sending failed ${e.message}`);
      });
  });
  await bookSchedule(settingsForSendScheduleReminder, type);
};

export const requestForReschedule = async (
  type: requestType,
  count: number
) => {
  const localSettings = await getRequestLocalStorage(type);

  const filteredSettings = localSettings.filter(
    (set) =>
      set.status === "completed" && !set.isReschedule && !set.isCancelRequest
  );

  if (!(filteredSettings?.length > 0)) {
    alert("No request found for Reschedule");
    return;
  }

  const settingsForreSchedule = shuffleAndSplit(filteredSettings, count);

  if (!confirm(`${settingsForreSchedule.length} requests from re-schedule `))
    return;

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
        alert(`${i + 1} - reSchedule request succesfully`);
      })
      .catch((e) => {
        alert(`${i + 1} - reSchedule requesting failed ${e.message}`);
      });
  });
};

export const requestForCancel = async (type: requestType, count: number) => {
  const localSettings2 = await getRequestLocalStorage(type);

  const filteredSettings = localSettings2.filter(
    (set) =>
      set.status === "completed" && !set.isCancelRequest && !set.isReschedule
  );

  if (!(filteredSettings?.length > 0)) {
    alert("No request found for cancel");
    return;
  }

  const settingsforCancel = shuffleAndSplit(filteredSettings, count);

  if (!confirm(`${settingsforCancel.length} requests for cancel `)) return;

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
        alert(`${i + 1} - Cancel request succesfully`);
      })
      .catch((e) => {
        alert(`${i + 1} - Cancel requesting failed ${e.message}`);
      });
  });
};
