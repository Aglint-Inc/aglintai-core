// create storage --------------------------------------------------------

import {
  localScheduleRequestType,
  requestStatusType,
  requestType,
} from "../type/localStorageTypes";

export async function createLocalStorage(
  requests: localScheduleRequestType[],
  type: requestType
) {
  const storedData = await localStorage.getItem(type);
  let oldSettings: localScheduleRequestType[] = storedData
    ? JSON.parse(storedData)
    : [];

  const initalData = [
    ...requests.map((request) => ({
      ...request,
      status: "in_progress",
      isAvailabilityReminders: false,
      isSubmitAvailabilitySubmitted: false,
      isSelfSchedulingReminders: false,
      isSelfScheduleSubmitted: false,
      isReschedule: false,
      isCancelRequest: false,
    })),
    ...oldSettings,
  ] as localScheduleRequestType[];

  localStorage.setItem(type, JSON.stringify(initalData));
}

// update storage --------------------------------------------------------

export const updateLocalStorage = async <
  T extends keyof localScheduleRequestType,
>({
  type,
  field,
  value,
  application_id,
  request_id,
  status,
}: {
  type: requestType;
  field: T;
  value: localScheduleRequestType[T];
  application_id: string;
  request_id: string;
  status: requestStatusType;
}) => {
  const storedData = await localStorage.getItem(type);
  let requestsWithSettings: localScheduleRequestType[] = storedData
    ? JSON.parse(storedData)
    : [];
  requestsWithSettings = requestsWithSettings.map((item) => {
    if (
      item.application_id === application_id &&
      item.request_id === request_id
    ) {
      return {
        ...item,
        [field]: value,
        status: status,
      };
    }
    return item;
  });
  await localStorage.setItem(type, JSON.stringify(requestsWithSettings));
};

// Remove request from storage --------------------------------------------------------

export const removeRequestLocalStorage = async ({
  type,
  application_id,
  request_id,
}: {
  type: requestType;
  application_id: string;
  request_id: string;
}) => {
  const storedData = await localStorage.getItem(type);
  let requestsWithSettings: localScheduleRequestType[] = storedData
    ? JSON.parse(storedData)
    : [];
  requestsWithSettings = requestsWithSettings.filter((item) => {
    if (
      item.application_id !== application_id &&
      item.request_id !== request_id
    )
      return item;
  });
  await localStorage.setItem(type, JSON.stringify(requestsWithSettings));
};

// get request from storage --------------------------------------------------------

export const getRequestLocalStorage = async (type: requestType) => {
  const storedData = await localStorage.getItem(type);
  let localRequest = storedData ? JSON.parse(storedData) : [];
  return localRequest as localScheduleRequestType[];
};

// clear request -----------------------------------------------------------------

export function clearRequestsLocalStorage(type: requestType) {
  localStorage.removeItem(type);
}
