export const sessionDurations = [15, 20, 30, 45, 60, 90, 120, 180];
export const breakDurations = [30, 45, 60, 120, 1440, 2880, 4320];

export const userDetails = `recruiter_user(user_id,first_name,last_name,email,profile_image,position,scheduling_settings,schedule_auth,is_calendar_connected)`;
export const interviewCancelReasons = `interview_session_cancel(*,interview_session_relation(*,interview_module_relation(*,${userDetails})),admin:${userDetails})`;
