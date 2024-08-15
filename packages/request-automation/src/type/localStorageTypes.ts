export type requestStatusType = "to_do" | "in_progress" | "completed";

export type localScheduleRequestType = {
  request_id: string;
  application_id: string;
  status?: requestStatusType;
  isAvailabilityReminders?: boolean;
  isSubmitAvailabilitySubmitted?: boolean;
  isSelfSchedulingReminders?: boolean;
  isSelfScheduleSubmitted?: boolean;
  isReschedule?: boolean;
  isCancelRequest?: boolean;
};

export type requestType =
  | "schedule_request"
  | "reschedule_request"
  | "cancel_schedule_request";
