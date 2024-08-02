import { Stack } from '@mui/material';

import { TextWithIcon } from '@/devlink2/TextWithIcon';
import { TextWithIconSkeleton } from '@/devlink2/TextWithIconSkeleton';
import { ShowCode } from '@/src/components/Common/ShowCode';
import { useRequest } from '@/src/context/RequestContext';

function RequestProgress({ index }: { index: number }) {
  const {
    request_progress: { status },
  } = useRequest();
  const dummyProgressData =
    index == 0
      ? schedulingFlows.allSuccess
      : index == 1
        ? schedulingFlows.cancel
        : index == 2
          ? schedulingFlows.decline
          : index == 3
            ? schedulingFlows.error
            : index == 4
              ? schedulingFlows.followUpRequired
              : index == 5
                ? schedulingFlows.followUpSelfScheduling
                : index == 6
                  ? schedulingFlows.manualInterventionRequired
                  : index == 7
                    ? schedulingFlows.partialAcceptance
                    : schedulingFlows.allSuccess;

  return (
    <Stack gap={1}>
      <ShowCode>
        <ShowCode.When isTrue={status === 'pending'}>
          <RequestProgressSkeleton />
        </ShowCode.When>
        <ShowCode.When isTrue={status === 'error'}>
          <>Error</>
        </ShowCode.When>
        <ShowCode.Else>
          {dummyProgressData.map(({ title, tense, isExpired }, i) => {
            return (
              <TextWithIcon
                key={i}
                textContent={title}
                iconSize={3}
                fontSize={1}
                color={
                  tense === 'past' && !isExpired
                    ? 'success'
                    : tense === 'future' && !isExpired
                      ? 'neutral'
                      : tense === 'present' && !isExpired
                        ? 'info'
                        : 'error'
                }
                iconName={
                  tense === 'past' ? (
                    <CheckCircleFilled />
                  ) : tense === 'future' ? (
                    'circle'
                  ) : (
                    <AtrIconFilled />
                  )
                }
              />
            );
          })}
        </ShowCode.Else>
      </ShowCode>
    </Stack>
  );
}

export default RequestProgress;

export function RequestProgressSkeleton() {
  return (
    <Stack gap={1}>
      <TextWithIconSkeleton />
      <TextWithIconSkeleton />
      <TextWithIconSkeleton />
    </Stack>
  );
}

function AtrIconFilled() {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      height='16px'
      viewBox='0 -960 960 960'
      width='16px'
      fill='#00749E'
    >
      <path d='M230-160q-45 0-77.5-32.5T120-270q0-45 32.5-77.5T230-380q45 0 77.5 32.5T340-270q0 45-32.5 77.5T230-160Zm500 0q-45 0-77.5-32.5T620-270q0-45 32.5-77.5T730-380q46 0 78 32.5t32 77.5q0 45-32 77.5T730-160ZM480-580q-45 0-77.5-32.5T370-690q0-45 32.5-77.5T480-800q45 0 77.5 32.5T590-690q0 45-32.5 77.5T480-580Z' />
    </svg>
  );
}

function CheckCircleFilled() {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      height='16px'
      viewBox='0 -960 960 960'
      width='16px'
      fill='#29A383'
    >
      <path d='m421-298 283-283-46-45-237 237-120-120-45 45 165 166Zm59 218q-82 0-155-31.5t-127.5-86Q143-252 111.5-325T80-480q0-83 31.5-156t86-127Q252-817 325-848.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 82-31.5 155T763-197.5q-54 54.5-127 86T480-80Z' />
    </svg>
  );
}

export const schedulingFlows = {
  allSuccess: [
    {
      title: 'Get availability from the candidate',
      tense: 'past',
      isExpired: false,
    },
    {
      title: 'Availability received from the candidate',
      tense: 'past',
      isExpired: false,
    },
    {
      title: 'Find available slots',
      tense: 'past',
      isExpired: false,
    },
    {
      title: 'Send self-scheduling link to the candidate',
      tense: 'present',
      isExpired: false,
    },
    {
      title: 'Candidate confirmed the schedule',
      tense: 'future',
      isExpired: false,
    },
  ],
  followUpRequired: [
    {
      title: 'Get availability from the candidate',
      tense: 'past',
      isExpired: false,
    },
    {
      title: 'Waiting for availability',
      tense: 'past',
      isExpired: false,
    },
    {
      title: 'Candidate did not provide availability within SLA',
      tense: 'past',
      isExpired: true,
    },
    {
      title: 'Follow up with the candidate',
      tense: 'past',
      isExpired: false,
    },
    {
      title: 'Follow-up request sent',
      tense: 'past',
      isExpired: false,
    },
    {
      title: 'Candidate provides availability',
      tense: 'present',
      isExpired: false,
    },
    {
      title: 'Find available slots',
      tense: 'future',
      isExpired: false,
    },
    {
      title: 'Slots found',
      tense: 'future',
      isExpired: false,
    },
  ],
  followUpSelfScheduling: [
    {
      title: 'Get availability from the candidate',
      tense: 'past',
      isExpired: false,
    },
    {
      title: 'Availability received from the candidate',
      tense: 'past',
      isExpired: false,
    },
    {
      title: 'Find available slots',
      tense: 'past',
      isExpired: false,
    },
    {
      title: 'Send self-scheduling link to the candidate',
      tense: 'past',
      isExpired: false,
    },
    {
      title: 'Candidate did not respond to self-scheduling link within SLA',
      tense: 'past',
      isExpired: true,
    },
    {
      title: 'Follow up with the candidate',
      tense: 'past',
      isExpired: false,
    },
    {
      title: 'Follow-up request sent',
      tense: 'past',
      isExpired: false,
    },
    {
      title: 'Candidate confirmed the schedule',
      tense: 'present',
      isExpired: false,
    },
  ],
  decline: [
    {
      title: 'Get availability from the candidate',
      tense: 'past',
      isExpired: false,
    },
    {
      title: 'Availability received from the candidate',
      tense: 'past',
      isExpired: false,
    },
    {
      title: 'Find available slots',
      tense: 'past',
      isExpired: false,
    },
    {
      title: 'Send self-scheduling link to the candidate',
      tense: 'past',
      isExpired: false,
    },
    {
      title: 'Candidate did not respond to self-scheduling link within SLA',
      tense: 'past',
      isExpired: true,
    },
    {
      title: 'Follow up with the candidate',
      tense: 'past',
      isExpired: false,
    },
    {
      title: 'Follow-up request sent',
      tense: 'present',
      isExpired: false,
    },
    {
      title: 'Candidate confirmed the schedule',
      tense: 'future',
      isExpired: false,
    },
  ],
  cancel: [
    {
      title: 'Get availability from the candidate',
      tense: 'past',
      isExpired: false,
    },
    {
      title: 'Availability received from the candidate',
      tense: 'past',
      isExpired: false,
    },
    {
      title: 'Find available slots',
      tense: 'past',
      isExpired: false,
    },
    {
      title: 'Send self-scheduling link to the candidate',
      tense: 'past',
      isExpired: false,
    },
    {
      title: 'Candidate confirmed the schedule',
      tense: 'past',
      isExpired: false,
    },
    {
      title: 'Send invites to interviewers',
      tense: 'past',
      isExpired: false,
    },
    {
      title: 'Candidate cancels the interview',
      tense: 'past',
      isExpired: true,
    },
    {
      title: 'Get new availability from the candidate',
      tense: 'past',
      isExpired: false,
    },
    {
      title: 'New availability received from the candidate',
      tense: 'present',
      isExpired: false,
    },
    {
      title: 'Find new available slots',
      tense: 'future',
      isExpired: false,
    },
    {
      title: 'Resend self-scheduling link to the candidate',
      tense: 'future',
      isExpired: false,
    },
    {
      title: 'Candidate confirmed the new schedule',
      tense: 'future',
      isExpired: false,
    },
  ],
  partialAcceptance: [
    {
      title: 'Get availability from the candidate',
      tense: 'past',
      isExpired: false,
    },
    {
      title: 'Availability received from the candidate',
      tense: 'past',
      isExpired: false,
    },
    {
      title: 'Find available slots',
      tense: 'past',
      isExpired: false,
    },
    {
      title: 'Send self-scheduling link to the candidate',
      tense: 'past',
      isExpired: false,
    },
    {
      title: 'Candidate confirmed the schedule',
      tense: 'past',
      isExpired: false,
    },
    {
      title: 'Send invites to interviewers',
      tense: 'past',
      isExpired: false,
    },
    {
      title: 'Some interviewers declined the invite',
      tense: 'past',
      isExpired: true,
    },
    {
      title: 'Find new available slots for declined interviewers',
      tense: 'past',
      isExpired: false,
    },
    {
      title: 'Resend self-scheduling link to the candidate',
      tense: 'past',
      isExpired: false,
    },
    {
      title: 'Candidate confirmed the new schedule',
      tense: 'present',
      isExpired: false,
    },
  ],
  error: [
    {
      title: 'Get availability from the candidate',
      tense: 'past',
      isExpired: false,
    },
    {
      title: 'Availability received from the candidate',
      tense: 'past',
      isExpired: false,
    },
    {
      title: 'Find available slots',
      tense: 'past',
      isExpired: false,
    },
    {
      title: 'Send self-scheduling link to the candidate',
      tense: 'past',
      isExpired: false,
    },
    {
      title: 'Error in sending self-scheduling link',
      tense: 'present',
      isExpired: true,
    },
    {
      title: 'Retry sending self-scheduling link to the candidate',
      tense: 'future',
      isExpired: false,
    },
    {
      title: 'Link sent successfully',
      tense: 'future',
      isExpired: false,
    },
    {
      title: 'Candidate confirmed the schedule',
      tense: 'future',
      isExpired: false,
    },
  ],
  manualInterventionRequired: [
    {
      title: 'Get availability from the candidate',
      tense: 'past',
      isExpired: false,
    },
    {
      title: 'Availability received from the candidate',
      tense: 'past',
      isExpired: false,
    },
    {
      title: 'Error in finding available slots',
      tense: 'past',
      isExpired: true,
    },
    {
      title: 'Manual intervention to find slots',
      tense: 'past',
      isExpired: false,
    },
    {
      title: 'Slots found through manual intervention',
      tense: 'past',
      isExpired: false,
    },
    {
      title: 'Send self-scheduling link to the candidate',
      tense: 'past',
      isExpired: false,
    },
    {
      title: 'Link sent successfully',
      tense: 'past',
      isExpired: false,
    },
    {
      title: 'Candidate confirmed the schedule',
      tense: 'present',
      isExpired: false,
    },
  ],
};
