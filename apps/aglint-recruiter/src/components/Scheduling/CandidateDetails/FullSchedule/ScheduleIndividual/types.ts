import { DatabaseTable } from '@aglint/shared-types';

import { SchedulingApplication } from '../../store';
import { SessionsType } from '../../types';

export interface ScheduleIndividualCardType {
  interview_session: Pick<
    DatabaseTable['interview_session'],
    | 'id'
    | 'name'
    | 'break_duration'
    | 'session_duration'
    | 'schedule_type'
    | 'session_type'
  >;
  candidate: {
    timezone?: string;
    fullname: string;
    currentJobTitle: string;
  };
  isCheckboxVisible?: boolean;
  interview_meeting?: Pick<
    DatabaseTable['interview_meeting'],
    'id' | 'start_time' | 'end_time' | 'status' | 'meeting_flow'
  > | null;
  onClickCheckBox?: ({
    // eslint-disable-next-line no-unused-vars
    session_id,
  }: {
    session_id: string;
  }) => void;
  selectedSessionIds?: string[];
  jobTitle?: string;
  users?: SchedulingApplication['initialSessions'][0]['users'];
  isCollapseNeeded?: boolean;
  isEditIconVisible?: boolean;
  cancelReasons?: SchedulingApplication['initialSessions'][0]['cancel_reasons'];
  gridStyle?: '1fr 1.8fr 0.8fr' | '1fr 1.7fr 0fr';
  isViewDetailVisible?: boolean;
  isCollapseButtonsVisible?: boolean;
  currentSession?: SessionsType | null;
}
