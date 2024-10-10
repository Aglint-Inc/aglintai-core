import { type DatabaseEnums, type DatabaseTable } from '@aglint/shared-types';

import type { Request as RequestType } from '@/queries/requests/types';
import { getSchedulFlow } from './utils/getScheduleFlow';
import { getRequestProgress, getRequestWorkflow } from '@/queries/requests';

export type TriggerActionsType = NonNullable<
  NonNullable<RequestType['applications']>['public_jobs']
>['workflow_job_relation'][0]['workflow'][];

export type RequestProgressMapType = Partial<
  Record<
    DatabaseTable['request_progress']['event_type'],
    DatabaseTable['request_progress'][]
  >
>;
export type TriggerActionMapType = Partial<
  Record<DatabaseEnums['workflow_trigger'], DatabaseTable['workflow_action'][]>
>;
export type ProgressTenseType = 'past' | 'present' | 'future' | 'error';

// new types
export type ProgressNodeType =
  | 'SELECT_SCHEDULE'
  | 'CAND_AVAIL_REC'
  | 'INTERVIEW_SCHEDULED';
export type GroupReqProgress = {
  group_id: string;
  heading_progress: DatabaseTable['request_progress'];
  detail_progress: DatabaseTable['request_progress'][];
};

export type ProgressNodeParams = {
  type: ProgressNodeType;
  status: DatabaseTable['request_progress']['status'];
  grouped_progress: GroupReqProgress | null;
  workflows: Awaited<ReturnType<typeof getRequestWorkflow>>;
  banners: [];
};

export type RequesProgressMetaType = {
  meta: {
    scheduleFlow: ReturnType<typeof getSchedulFlow>;
    isScheduled: boolean;
    isCandidateAvailabilityReceived: boolean;
    isManualActionNeeded: boolean;
  };
  scheduleProgressNodes: ProgressNodeParams[];
};
