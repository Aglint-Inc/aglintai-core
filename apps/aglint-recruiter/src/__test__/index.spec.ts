import { CandidatesScheduling } from '../services/CandidateSchedule/CandidatesScheduling';
import * as db_fetchFun from '../services/CandidateSchedule/utils/dbFetchScheduleApiDetails';
import { mockFetchDBCase1 } from './schedulingMocks/utils';

jest.mock('../services/CandidateScheduleV2/utils/dbFetchScheduleApiDetails');

test('nfkewjnkefwjn', async () => {
  jest
    .spyOn(db_fetchFun, 'fetchAndVerifyDb')
    .mockImplementation(mockFetchDBCase1);
  const cand_schedule = new CandidatesScheduling({});
  await cand_schedule.fetchDetails({
    params: {
      company_id: '',
      end_date_str: '',
      req_user_tz: '',
      session_ids: [],
      start_date_str: '',
    },
  });
});
