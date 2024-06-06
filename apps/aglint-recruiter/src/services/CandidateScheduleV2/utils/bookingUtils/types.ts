import {
  PlanCombinationRespType,
  SessionInterviewerType,
} from '@aglint/shared-types';
import { FilterJSON } from '@aglint/shared-types/src/db/tables/interview_filter_json';

import { createMeetingEvents } from './createMeetingEvents';

export type FilterJsonData = {
  created_at: string;
  id: string;
  created_by: string;
  session_ids: string[];
  schedule_id: string;
  selected_options: PlanCombinationRespType[];
  filter_json: FilterJSON;
  interview_schedule: {
    recruiter_id: string;
    id: string;
  };
};

export type BookedMeetingDetails = Awaited<
  ReturnType<typeof createMeetingEvents>
>;

export type ConfirmInt = Pick<
  SessionInterviewerType,
  'session_id' | 'user_id' | 'interview_module_relation_id'
>;
