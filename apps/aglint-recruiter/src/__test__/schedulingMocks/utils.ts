import { type fetchAndVerifyDb } from '../../services/CandidateScheduleV2/utils/dbFetchScheduleApiDetails';

export const mockFetchDBCase1: typeof fetchAndVerifyDb = async () => {
  return {
    interview_sessions: [],
    comp_schedule_setting: null,
    company_cred_hash_str: null,
    int_meetings: [],
    int_modules_data: [],
    inter_data: [],
  };
};
