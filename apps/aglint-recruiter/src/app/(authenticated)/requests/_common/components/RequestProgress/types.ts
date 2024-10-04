import { type DatabaseEnums, type DatabaseTable } from '@aglint/shared-types';

import type { Request as RequestType } from '@/queries/requests/types';

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
