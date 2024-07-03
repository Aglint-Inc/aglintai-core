import { DatabaseTable } from '@aglint/shared-types';

import { SchedulingApplication } from '../../store';

export interface ScheduleIndividualCardType {
  isCheckboxVisible?: boolean;
  interview_session: Pick<
    DatabaseTable['interview_session'],
    | 'id'
    | 'name'
    | 'break_duration'
    | 'session_duration'
    | 'schedule_type'
    | 'session_type'
  >;
  interview_meeting: Pick<
    DatabaseTable['interview_meeting'],
    'id' | 'start_time' | 'end_time' | 'status' | 'meeting_flow'
  > | null;
  onClickCheckBox: ({
    // eslint-disable-next-line no-unused-vars
    session_id,
  }: {
    session_id: string;
  }) => void;
  selectedSessionIds: string[];
  candidate: {
    timezone: string;
    fullname: string;
    currentJobTitle: string;
  };
  jobTitle: string;
  users?: SchedulingApplication['initialSessions'][0]['users'];
  isCollapseNeeded?: boolean;
  isEditIconVisible?: boolean;
  cancelReasons?: DatabaseTable['interview_session_cancel'][];
  gridStyle?: '1.1fr 1.7fr 0.6fr' | '1fr 1.7fr 0fr';
  isViewDetailVisible?: boolean;
}
