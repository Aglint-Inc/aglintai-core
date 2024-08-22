import { getFullName } from '@aglint/shared-utils';
import { Avatar, Stack } from '@mui/material';

import { InterviewerWorkload } from '@/devlink3/InterviewerWorkload';
import { InterviewWorkloadList } from '@/devlink3/InterviewWorkloadList';
import { useAuthDetails } from '@/src/context/AuthContext/AuthContext';
import dayjs from '@/src/utils/dayjs';

import Loader from '../../Common/Loader';
import { useAllInterviewer, useAllInterviewerType } from '../Hook';
import LineGraph from './LineGraph';

function InterviewerLoad() {
  const { recruiter } = useAuthDetails();

  const { data: interviewers, isLoading } = useAllInterviewer(recruiter.id);

  // to calculate a maximum number for count per day on over all | default is 5 meeting per day
  let maxCount = 5;

  if (interviewers?.length)
    interviewers.map((interviewer) => {
      if (interviewer.completed_meeting_last_month) {
        const value = Math.max(
          ...Object.values(interviewer.completed_meeting_last_month),
        );
        if (value > maxCount) maxCount = value;
      }
    });

  if (isLoading)
    return (
      <Stack
        height={'100%'}
        width={'100%'}
        direction={'row'}
        alignItems={'center'}
        justifyContent={'center'}
      >
        <Loader />
      </Stack>
    );
  return (
    <>
      <InterviewerWorkload
        textDateRange={`${dayjs().subtract(1, 'month').format('DD MMM YYYY')} - ${dayjs().format('DD MMM YYYY')}`}
        slotInterviewWorkloadList={interviewers.map((interviewer) => (
          <InterviewerCard
            key={interviewer.user_id}
            interviewer={interviewer}
            maxMeetingCount={maxCount}
          />
        ))}
      />
    </>
  );
}

export default InterviewerLoad;

const InterviewerCard = ({
  interviewer,
  maxMeetingCount,
}: {
  interviewer: useAllInterviewerType['data'][number];
  maxMeetingCount: number;
}) => {
  const pastMonthDates = Array.from({ length: 30 }, (_, i) =>
    dayjs().subtract(i, 'day').toISOString(),
  );

  const pastMontCount = interviewer.completed_meeting_last_month || {};

  // eslint-disable-next-line security/detect-object-injection
  const resultArray = pastMonthDates.map((date) => pastMontCount[date] || 0);

  return (
    <InterviewWorkloadList
      key={interviewer.user_id}
      slotImage={
        <Avatar
          src={interviewer.profile_image}
          variant='rounded'
          alt={interviewer.first_name}
          sx={{ height: '24px', width: '24px' }}
        />
      }
      slotWorkloadGraph={
        <LineGraph lineData={resultArray} maxMeetingCount={maxMeetingCount} />
      }
      textRole={interviewer.position}
      textName={getFullName(interviewer.first_name, interviewer.last_name)}
    />
  );
};
