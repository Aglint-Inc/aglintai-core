import CandAvailRecived from '@request/components/RequestNextSteps/CandAvailRecived';
import RequestProceed from '@request/components/RequestNextSteps/RequestProceed';
import SelectScheduleFlow from '@request/components/RequestNextSteps/SelectScheduleFlow';

import { type NextStepEventType } from '../types';

export const requestNextStepMap: Record<
  NextStepEventType,
  (_param: any) => JSX.Element
> = {
  CAND_AVAIL_RECIEVED: CandAvailRecived,
  CHOOSE_SCHEDULE_MODE: SelectScheduleFlow,
  SCHEDULE_DEBRIEF: () => <></>,

  REQUEST_PROCEED: RequestProceed,
};
