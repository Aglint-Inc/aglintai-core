import { Stack } from '@mui/material';
import { useRouter } from 'next/router';
import type React from 'react';

import { JobDetailInterview } from '@/devlink/JobDetailInterview';
import { Skeleton } from '@/devlink2/Skeleton';
import { SkeletonNewInterviewPlanCard } from '@/devlink3/SkeletonNewInterviewPlanCard';
import ScheduleIndividualCard from '@/src/components/Scheduling/CandidateDetails/FullSchedule/ScheduleIndividual';
import { useApplication } from '@/src/context/ApplicationContext';
import ROUTES from '@/src/utils/routing/routes';

import { EmptyState } from '../Common/EmptyState';
import { Loader } from '../Common/Loader';
import { Actions } from './Action2';

const Interview = () => {
  const {
    application_id,
    interview: { data: sessions, status },
  } = useApplication();

  const { push } = useRouter();

  if (status === 'success' && (sessions ?? []).length === 0)
    return <EmptyState tab='Interview' />;

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
