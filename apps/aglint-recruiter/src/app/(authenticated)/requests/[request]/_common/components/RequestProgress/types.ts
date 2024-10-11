import { type DatabaseEnums, type DatabaseTable } from '@aglint/shared-types';

import {} from '@/queries/requests';
import type { Request as RequestType } from '@/queries/requests/types';

import { type WorkflowBanner } from './utils/bannerMap';
import { type getSchedulFlow } from './utils/getScheduleFlow';

export type TriggerActionsType = NonNullable<
  NonNullable<RequestType['applications']>['public_jobs']
>['workflow_job_relation'][0]['workflow'][];

export type RequestProgressMapType = Partial<
  Record<
    DatabaseTable['request_progress']['event_type'],
    DatabaseTable['request_progress'][]
  >
>;

// new types

export type TriggerActions = {
  trigger_details: DatabaseTable['workflow'];
  actions: DatabaseTable['workflow_action'][];
};
export type TriggerActionMapType = Partial<
  Record<DatabaseEnums['workflow_trigger'], TriggerActions>
>;
export type ProgressTenseType = 'past' | 'present' | 'future' | 'error';

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
  grouped_progress: GroupReqProgress[];
  workflows: TriggerActions[];
  banners: WorkflowBanner[];
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
