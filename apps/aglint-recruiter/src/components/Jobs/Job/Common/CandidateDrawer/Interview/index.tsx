import { Stack } from '@mui/material';
import { useRouter } from 'next/router';
import type React from 'react';

import { JobDetailInterview } from '@/devlink/JobDetailInterview';
import { Skeleton } from '@/devlink2/Skeleton';
import { SkeletonNewInterviewPlanCard } from '@/devlink3/SkeletonNewInterviewPlanCard';
import ScheduleIndividualCard from '@/src/components/Scheduling/CandidateDetails/FullSchedule/ScheduleIndividual';
import { useApplication } from '@/src/context/ApplicationContext';
import { CASCADE_VISIBILITIES } from '@/src/context/ApplicationsContext/hooks';
import ROUTES from '@/src/utils/routing/routes';

import { ActionEmptyState } from '../Common/ActionEmptyState';
import { EmptyState } from '../Common/EmptyState';
import { Loader } from '../Common/Loader';
import { Actions } from './Action2';

const Interview = () => {
  const { job_id, meta, application_id, interview } = useApplication();

  const { push } = useRouter();

  if (meta.status === 'success' && interview.status === 'success') {
    if (!CASCADE_VISIBILITIES.interview.includes(meta.data.status))
      return (
        <ActionEmptyState
          title='Candidate not eligible'
          description='Enable interviews for candidates by moving them to the interview state'
        />
      );
    if ((interview.data ?? []).length === 0)
      return (
        <ActionEmptyState
          title='No interview type found'
          description='Set up interview types'
          action={{
            title: 'Set up',
            onClick: () =>
              push(ROUTES['/jobs/[id]/interview-plan']({ id: job_id })),
          }}
        />
      );
  }
  return (
    <JobDetailInterview
      slotNewInterviewPlanCard={
        <>
          <Actions />
          <Content />
        </>
      }
      onClickViewScheduler={{
        style: { display: status === 'success' ? 'flex' : 'none' },
        onClick: () =>
          push(`/scheduling/application/${application_id ?? null}`),
      }}
    />
  );
};

export { Interview };

const Content = () => {
  const { push } = useRouter();
  const {
    application_id,
    meta: { data: meta, status: meta_status },
    interview: { data: sessions, status: interview_status },
  } = useApplication();

  if (interview_status === 'pending' || meta_status === 'pending')
    return (
      <Loader count={4}>
        <SkeletonNewInterviewPlanCard slotLoader={<Skeleton />} />
      </Loader>
    );

  if (meta_status === 'error' || interview_status === 'error')
    return <>Something went wrong</>;

  if (sessions.length === 0) return <EmptyState tab='Interview' />;

  return sessions.map((session, i) => (
    <Stack
      key={i}
      style={{ cursor: 'pointer' }}
      onClick={() =>
        session.meeting_id
          ? push(
              `${ROUTES['/scheduling/view']()}?meeting_id=${session.meeting_id}`,
            )
          : push(
              ROUTES['/scheduling/application/[application_id]']({
                application_id,
              }),
            )
      }
    >
      <ScheduleIndividualCard
        key={i}
        interview_session={{
          id: session.session_id,
          break_duration: 0,
          name: session.session_name,
          schedule_type: session.schedule_type,
          session_duration: session.session_duration,
          session_type: session.session_type,
        }}
        candidate={{
          fullname: meta.name,
          currentJobTitle: meta.current_job_title,
        }}
        gridStyle={'1fr 1.7fr 0fr'}
        jobTitle=''
        interview_meeting={
          session.meeting_id && {
            id: session.meeting_id,
            status: session.status,
            end_time: session.date?.end_time,
            start_time: session.date?.end_time,
            meeting_flow: session.meeting_flow,
          }
        }
      />
    </Stack>
  ));
};
