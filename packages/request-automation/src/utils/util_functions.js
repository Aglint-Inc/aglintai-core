import { storeRequestsWithSettings, updateField } from "./functions";

function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

export function shuffleAndSplitAsTwo(array, count) {
  const shuffledArray = shuffleArray([...array]);

  const part1 = shuffledArray.slice(0, count);
  const part2 = shuffledArray.slice(count);

  return [part1, part2];
}

export function shuffleAndSplit(arr, num) {
  if (num === 0) {
    return [];
  }
  if (arr.length <= num) {
    return arr;
  }

  const shuffled = arr.slice().sort(() => 0.5 - Math.random());
  return shuffled.slice(0, num);
}

export const updateRequest = async (count) => {
  await fetch("/api/automation/update_request", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ count }),
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
        alert(`${data.length} Request successfully Process.`);
        storeRequestsWithSettings(data);
      } else {
        alert(`No new request found`);
      }
    })
    .catch((e) => {
      console.log(e.message);
      alert(`Something went wrong`);
    });
};

export const submitAvailability = async (settingsForSubmitAva) => {
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
        updateField(
          setting.application_id,
          setting.request_id,
          "isSubmitAvailability",
          true
        );
        alert(`${i + 1} - Avalaibilty succesfully submitted`);
      })
      .catch((e) => {
        alert(`${i + 1} - Avalaibilty submit failed ${e.message}`);
      });
  });
};

export const sendAvailabilityReminder = (settingsForSendRemainder) => {
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
        submitAvailability([setting]);
        updateField(
          setting.application_id,
          setting.request_id,
          "isTriggerAvailabilityReminders",
          true
        );
        alert(`${i + 1} - Availability Reminder sent succesfully`);
      })

      .catch((e) => {
        console.log(e.message);
        alert(`${i + 1} - Availability Reminder sending failed ${e.message}`);
      });
  });
};

export const bookSelfSchedule = async (settingsForBookSchedule) => {
  console.log(settingsForBookSchedule);
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
        // removeRequestFromLocal(setting.application_id, setting.request_id);
        updateField(
          setting.application_id,
          setting.request_id,
          "isSelfSchedule",
          true
        );
        alert(`${i + 1} - self schudle succesfully submitted`);
      })

      .catch((e) => {
        console.log("selfschedule booking error:", e.message);
        alert(`${i + 1} - self schudle booking failed `);
      });
  });
};

export const sendReminderSelfSchedule = async (
  settingsForSendScheduleReminder
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
        bookSelfSchedule([setting]);
        updateField(
          setting.application_id,
          setting.request_id,
          "isTriggerSelfSchedulingReminders",
          true
        );
        alert(`${i + 1} - Self schedule Reminder sent succesfully`);
      })
      .catch((e) => {
        alert(`${i + 1} - Self schedule Reminder sending failed ${e.message}`);
      });
  });
};

export const requestForReschedule = async (settingsForReschedule) => {
  settingsForReschedule.map(async (setting, i) => {
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
        alert(`${i + 1} - reSchedule request succesfully`);
      })
      .catch((e) => {
        alert(`${i + 1} - reSchedule requesting failed ${e.message}`);
      });
  });
};
