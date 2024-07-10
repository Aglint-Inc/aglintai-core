import { fetchAndVerifyDb } from '../../services/CandidateScheduleV2/utils/dbFetchScheduleApiDetails';

export const mockFetchDBCase1: typeof fetchAndVerifyDb = async (
  params,
  meeting_details_dates,
) => {
  return {
    interview_sessions: [],
    comp_schedule_setting: null,
    company_cred: null,
    int_meetings: [],
    int_modules_data: [],
    inter_data: [],
  };
};
