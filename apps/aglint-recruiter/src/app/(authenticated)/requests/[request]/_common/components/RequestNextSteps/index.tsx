import { Alert, AlertDescription, AlertTitle } from '@components/ui/alert';
import { useRequest } from '@request/hooks';
import React from 'react';

import { ShowCode } from '@/common/ShowCode';

import SelfSchedulingDrawer from '../SelfSchedulingDrawer';
import CandidateCancelRequest from './CandidateCancelRequest';
import RequestDecline from './RequestDecline';
import ScheduleOptions from './ScheduleOptions';

const RequestNextSteps = () => {
  const { progressMetaInfo, declineProgressMeta, requestDetails } =
    useRequest();

  let nextStep: any = null;
  if (progressMetaInfo) {
    nextStep = progressMetaInfo.nextStep;
  } else if (declineProgressMeta) {
    nextStep = declineProgressMeta.nextStep;
  }
  if (requestDetails.type !== 'cancel_schedule_request' && nextStep === null) {
    return <></>;
  }
  if (
    requestDetails.type === 'cancel_schedule_request' &&
    requestDetails.status === 'completed'
  ) {
    return <></>;
  }
  return (
    <div>
      <Alert className='border border-border'>
        <AlertTitle>Next Step</AlertTitle>
        <AlertDescription>
          Here is your next step on the request.
        </AlertDescription>

        <div className='flex flex-row gap-2'>
          <ShowCode.When
            isTrue={
              requestDetails.type === 'schedule_request' ||
              requestDetails.type === 'reschedule_request'
            }
          >
            <ScheduleOptions nextStep={nextStep} />
          </ShowCode.When>
          <ShowCode.When isTrue={requestDetails.type === 'decline_request'}>
            <RequestDecline />
          </ShowCode.When>
          <ShowCode.When
            isTrue={requestDetails.type === 'cancel_schedule_request'}
          >
            <CandidateCancelRequest />
          </ShowCode.When>
        </div>
      </Alert>
      <SelfSchedulingDrawer />
    </div>
  );
};

export default RequestNextSteps;
