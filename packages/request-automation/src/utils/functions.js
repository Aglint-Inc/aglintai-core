import { settings } from "./constant";

export function storeRequestsWithSettings(requests) {
  const combinedData = requests.map((request, index) => {
    return {
      ...request,
      ...settings[index],
      isSubmitAvailability: null, // All is* fields are empty
      isTriggerAvailabilityReminders: null,
      isTriggerSelfSchedulingReminders: null,
      isRequestReschedule: null,
      isCancelInterview: null,
      isSelfSchedule: null,
    };
  });
  localStorage.setItem("requestsWithSettings", JSON.stringify(combinedData));
}

export async function updateField(applicationId, requestId, field, value) {
  const storedData = await localStorage.getItem("requestsWithSettings");
  let requestsWithSettings = storedData ? JSON.parse(storedData) : [];
  requestsWithSettings = requestsWithSettings.map((item) => {
    if (
      item.application_id === applicationId &&
      item.request_id === requestId
    ) {
      return {
        ...item,
        [field]: value,
      };
    }
    return item;
  });
  await localStorage.setItem(
    "requestsWithSettings",
    JSON.stringify(requestsWithSettings)
  );
}

export function getRequestsWithSettings() {
  const storedData = localStorage.getItem("requestsWithSettings");
  return storedData ? JSON.parse(storedData) : [];
}

export function clearRequestsWithSettings() {
  localStorage.removeItem("requestsWithSettings");
}
