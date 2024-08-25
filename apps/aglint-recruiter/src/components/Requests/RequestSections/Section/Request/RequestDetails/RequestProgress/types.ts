import { DatabaseEnums, DatabaseTable } from '@aglint/shared-types';

import type { Request as RequestType } from '@/src/queries/requests/types';

export type TriggerActionsType =
  RequestType['applications']['public_jobs']['workflow_job_relation'][0]['workflow'][];

export type EventTargetMapType = Partial<
  Record<
    DatabaseEnums['workflow_trigger'],
    DatabaseEnums['email_slack_types'][]
  >
>;

export type RequestProgressMapType = Partial<
  Record<
    DatabaseTable['request_progress']['event_type'],
    DatabaseTable['request_progress'][]
  >
>;
