import React from 'react';

import { TextWithIcon } from '@/devlink3/TextWithIcon';

import { type ScheduleIndividualCardType } from './types';

function RequestStatusUnconfirmed({
  interview_meeting,
}: {
  interview_meeting: ScheduleIndividualCardType['interview_meeting'];
}) {
  return (
    <>
      {interview_meeting?.status === 'waiting' && (
        <>
          {interview_meeting?.meeting_flow === 'candidate_request' ? (
            <TextWithIcon
              iconName={'attach_email'}
              textContent={'Availability Requested'}
              color={'warning'}
              fontWeight={'regular'}
              iconSize={2}
              fontSize={1}
            />
          ) : interview_meeting?.meeting_flow === 'self_scheduling' ? (
            <TextWithIcon
              iconName={'attach_email'}
              textContent={'Self Scheduling Requested'}
              color={'warning'}
              fontWeight={'regular'}
              fontSize={1}
              iconSize={2}
            />
          ) : interview_meeting?.meeting_flow === 'mail_agent' ? (
            <TextWithIcon
              iconName={'attach_email'}
              textContent={'Assigned to Email Agent'}
              color={'warning'}
              fontWeight={'regular'}
              fontSize={1}
              iconSize={2}
            />
          ) : interview_meeting?.meeting_flow === 'phone_agent' ? (
            <TextWithIcon
              iconName={'phone_in_talk'}
              textContent={'Assigned to Phone Agent'}
              color={'warning'}
              fontWeight={'regular'}
              fontSize={1}
              iconSize={2}
            />
          ) : (
            ''
          )}
        </>
      )}
    </>
  );
}

export default RequestStatusUnconfirmed;
