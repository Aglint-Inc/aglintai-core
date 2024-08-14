export async function storeRequestsWithSettings(requests) {
  const localData = await localStorage.getItem("requestsWithSettings");
  const combinedData = requests.map((request) => {
    return {
      ...request,
      status: "in_progress",
      isSubmitAvailabilitySubmitted: null,
      isSelfScheduleSubmitted: null,
      isRequestRescheduleSubmitted: null,
      isAvailabilityReminders: null,
      isSelfSchedulingReminders: null,
      isCancelRequestSubmitted: null,
    };
  });
  const data = localData ? [...combinedData, ...localData] : combinedData;
  localStorage.setItem("requestsWithSettings", JSON.stringify(data));
}

export async function updateField(
  applicationId,
  requestId,
  field,
  value,
  status = "in_progress"
) {
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
        status: status,
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

export async function removeRequestFromLocal(application_id, request_id) {
  const storedData = await localStorage.getItem("requestsWithSettings");
  let requestsWithSettings = storedData ? JSON.parse(storedData) : [];

  requestsWithSettings = requestsWithSettings.filter((item) => {
    if (
      item.application_id !== application_id &&
      item.request_id !== request_id
    ) {
      return item;
    }
  });
  await localStorage.setItem(
    "requestsWithSettings",
    JSON.stringify(requestsWithSettings)
  );
}
