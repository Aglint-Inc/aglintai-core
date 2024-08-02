/* eslint-disable no-console */
/* eslint-disable no-unused-vars */
import { DatabaseTableInsert } from '@aglint/shared-types';
import { getFullName } from '@aglint/shared-utils';
import { dayjsLocal } from '@aglint/shared-utils/src/scheduling/dayjsLocal';
import { Stack, Typography } from '@mui/material';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { useState } from 'react';

import { ButtonSoft } from '@/devlink/ButtonSoft';
import { Skeleton } from '@/devlink2/Skeleton';
import { useAuthDetails } from '@/src/context/AuthContext/AuthContext';
import { useRequests } from '@/src/context/RequestsContext';
import {
  ApiRequestInterviewSessionTask,
  ApiResponseInterviewSessionTask,
} from '@/src/pages/api/scheduling/fetch_interview_session_task';
import {
  createRequest,
  createRequestSessionRelations,
} from '@/src/queries/requests';
import dayjs from '@/src/utils/dayjs';
import { supabase } from '@/src/utils/supabase/client';

import AgentEditor from './AgentEditor';
import {
  ApplicantInfo,
  extractDataFromText,
  ScheduleType,
  scheduleType,
} from './AgentEditor/utils';

function AgentChats() {
  const { recruiterUser, recruiter_id } = useAuthDetails();

  const [textToObject, setTextToObject] = useState<ApplicantInfo | null>(null);
  const [loading, setLoading] = useState(false);
  const { requests } = useRequests();
  const [selectedJob, setSelectedJob] = useState<{
    id: string;
    display: string;
  }>(null);
  const [selectedApplication, setSelectedApplication] = useState<{
    id: string;
    display: string;
  }>(null);
  const [selectedSession, setSelectedSession] = useState<
    {
      id: string;
      display: string;
    }[]
  >([]);
  const [selectedScheduleType, setSelectedScheduleType] = useState<{
    id: string;
    display: string;
  }>(null);
  const [selectedRequest, setSelectedRequest] = useState<{
    id: string;
    display: string;
  }>(null);

  const { data: jobsAndApplications, isFetched: isJobFetched } =
    useAllJobsAndApplications({
      recruiter_id,
    });
  const applications = selectedJob?.id
    ? jobsAndApplications?.applications.filter(
        (application) => application.job_id === selectedJob.id,
      )
    : jobsAndApplications?.applications;

  const applicant_sessions = selectedApplication?.id
    ? applications.find((ele) => ele.id === selectedApplication?.id)
        ?.applicantSessions
    : [];

  function handleSubmit() {
    createRequest({
      application_id: selectedApplication?.id,
      assigner_id: recruiterUser.user_id,
      assignee_id: recruiterUser.user_id,
      title: `${getFullName(recruiterUser.first_name, recruiterUser.last_name)} requested to schedule a ${selectedSession.map((ele) => ele.display).join(' ,')} for ${selectedApplication.display}.`,
      status: 'to_do',
      type: 'schedule_request',
    }).then((res) => {
      const sessionsRelations = selectedSession.map(
        (ele) =>
          ({
            request_id: res.id,
            session_id: ele.id,
            cancel_id: null,
          }) as DatabaseTableInsert['request_relation'],
      );
      createRequestSessionRelations(sessionsRelations).then((res) => {
        requests.refetch();
      });
    });
  }
  return (
    <Stack alignItems={'center'}>
      <Stack>
        {loading ? (
          <>
            <Stack width={'100%'} p={1} direction={'column'} spacing={1}>
              <Stack position={'relative'} width={'480px'} height={'15px'}>
                <Skeleton />
              </Stack>
              <Stack position={'relative'} width={'480px'} height={'15px'}>
                <Skeleton />
              </Stack>
            </Stack>
          </>
        ) : (
          textToObject && (
            <>
              <Stack
                height={'100%'}
                width={'100%'}
                direction={'column'}
                justifyContent={'space-between'}
                alignItems={'flex-end'}
                p={1}
              >
                <Typography
                  width={'100%'}
                  fontSize={18}
                  dangerouslySetInnerHTML={{
                    __html: `Aglint AI will ${textToObject?.assignee === 'user' ? `assign to ${getFullName(recruiterUser.first_name, recruiterUser.last_name)}` : textToObject?.assignee === 'phone' ? 'make a call' : 'send an email'} to <b>${textToObject?.applicant_name}</b> to get ${textToObject?.schedule_type} for the ${Array.isArray(textToObject?.interview_names) && textToObject?.interview_names.join(',')} interview between ${dayjsLocal(textToObject?.date_range.start_date).format('MMM DD')} and ${dayjsLocal(textToObject?.date_range.end_date).format('MMM DD')}. `,
                  }}
                />
                <ButtonSoft
                  size={1}
                  textButton='Proceed'
                  onClickButton={{
                    onClick: handleSubmit,
                  }}
                />
              </Stack>
            </>
          )
        )}
      </Stack>
      <AgentEditor
        handleTextChange={(text) => {
          if (!text) {
            setTextToObject(null);
            setSelectedApplication(null);
            setSelectedJob(null);
            setSelectedScheduleType(null);
            setSelectedSession([]);
          }
        }}
        handleSubmit={(text) => {
          if (!selectedApplication?.id) {
            setLoading(true);
            extractDataFromText(text).then((data: ApplicantInfo) => {
              setTextToObject(data);
              setSelectedJob({
                id: data.job_title,
                display: data.job_title,
              });

              if (!selectedApplication?.id) {
                getApplicationWithName(
                  data.applicant_name,
                  data.interview_names,
                );
              }
              setLoading(false);
            });
          } else {
            setTextToObject({
              applicant_name: selectedApplication.display,
              assignee: 'user',
              date_range: {
                start_date: dayjs().format('MM-DD-YYYY'),
                end_date: dayjs().add(7, 'day').format('MM-DD-YYYY'),
              },
              interview_names: selectedSession.map(
                (session) => session.display,
              ),
              job_title: selectedJob.display,
              schedule_type: selectedScheduleType
                ? (selectedScheduleType?.display as ScheduleType)
                : 'schedule',
            });
          }
        }}
        requestList={
          requests.status === 'success'
            ? requests.data.map((ele) => ({ id: ele.id, display: ele.title }))
            : []
        }
        scheduleTypes={scheduleType}
        jobList={
          isJobFetched &&
          jobsAndApplications.jobs.map((job) => ({
            id: job.id,
            display: job.job_title,
          }))
        }
        applicationsList={
          applications
            ? applications.map((application) => ({
                id: application.id,
                display:
                  application.candidates.first_name +
                  ' ' +
                  application.candidates.last_name,
              }))
            : []
        }
        sessionList={
          applicant_sessions
            ? applicant_sessions.map((session) => ({
                id: session.id,
                display: session.name,
              }))
            : []
        }
        getSelectedJob={({ id, display }) => {
          setSelectedJob({ id, display });
        }}
        getSelectedApplication={({ id, display }) => {
          const selectedApplication = jobsAndApplications.applications.find(
            (application) => application.id === id,
          ) as Awaited<ReturnType<typeof getApplications>>[number];

          setSelectedApplication({ id, display });
          setSelectedJob({
            id: selectedApplication?.public_jobs.id,
            display: selectedApplication?.public_jobs.job_title,
          });
        }}
        getSelectedSession={({ id, display }) => {
          setSelectedSession((pre) => [...pre, { id, display }]);
        }}
        getSelectedScheduleType={({ id, display }) => {
          setSelectedScheduleType({ id, display });
        }}
        getSelectedRequest={({ id, display }) => {
          setSelectedRequest({ id, display });
        }}
      />
    </Stack>
  );
}

export default AgentChats;

async function getApplicationWithName(name: string, sessions_name: string[]) {
  const { data, error } = await supabase
    .from('applications')
    .select(
      `
      *,
      candidates!inner(first_name,last_name) , public_jobs(id,job_title)
    `,
    )
    .eq('status', 'interview')
    .ilike('candidates.first_name', `%${name}%`);
  // .ilike('candidates.last_name', `%${name}%`);
  console.log(data);
  if (error) {
    throw error;
  }

  if (data.length > 1) {
    console.log('More that one applications', data);
  }
  if (data.length === 0) {
    console.log('No application found');
  }
  if (data.length === 1) {
    getSessionList({
      application_id: data[0].id,
      job_id: data[0].public_jobs.id,
    }).then((data) => {
      console.log(
        'There are two interview Sessions',
        data.map((ele) => ele.name),
      );
    });
  }

  return data;
}

export const useAllJobsAndApplications = ({
  recruiter_id,
}: {
  recruiter_id: string;
}) => {
  const queryClient = useQueryClient();
  const query = useQuery({
    queryKey: ['get_All_job_List', recruiter_id],

    queryFn: () =>
      getJobsAndApplications({
        recruiter_id,
      }),
    gcTime: 20000,
    enabled: !!recruiter_id,
  });
  const refetch = () =>
    queryClient.invalidateQueries({ queryKey: ['get_All_job_List'] });
  return { ...query, refetch };
};

export const useAllSessionsList = ({
  application_id,
  job_id,
}: {
  application_id: string;
  job_id: string;
}) => {
  const queryClient = useQueryClient();
  const query = useQuery({
    queryKey: ['get_All_sessions_List', { application_id, job_id }],

    queryFn: () =>
      getSessionList({
        application_id,
        job_id,
      }),
    gcTime: 20000,
    enabled: !!job_id && !!application_id,
  });
  const refetch = () =>
    queryClient.invalidateQueries({ queryKey: ['get_All_sessions_List'] });

  return { ...query, refetch };
};

async function getJobsAndApplications({ recruiter_id }) {
  const { data: jobs } = await supabase
    .from('public_jobs')
    .select(
      '*, applications(*, candidates(first_name,last_name), public_jobs(id,job_title), request(request_relation(session_id)), interview_schedule(interview_meeting(interview_session(id,name))))',
    )
    .eq('recruiter_id', recruiter_id)
    .eq('status', 'published')
    .throwOnError();
  const applicationsList = (jobs ?? []).flatMap(
    ({ applications }) => applications,
  );
  const applications = applicationsList.map((ele) => {
    const requestSessions =
      ele.request
        ?.map((req) => req.request_relation)
        .flat()
        .map((rel) => rel.session_id)
        .flat() || [];

    const applicantSessions = (
      ele.interview_schedule?.interview_meeting
        ? ele.interview_schedule.interview_meeting
            .map((meeting) => meeting.interview_session)
            .flat()
        : []
    ).filter(
      (session) =>
        !requestSessions.includes(session.id) && session.name !== 'Debrief',
    );
    return { ...ele, applicantSessions };
  });
  return { jobs, applications };
}

async function getApplications({ job_id }: { job_id: string }) {
  const { data } = await supabase
    .from('applications')
    .select(
      '*, candidates(first_name,last_name), public_jobs(id,job_title), request(request_relation(session_id)), interview_schedule(interview_meeting(interview_session(id,name)))',
    )
    .eq('job_id', job_id)
    .eq('status', 'interview');

  return data.map((ele) => {
    const requestSessions =
      ele.request
        ?.map((req) => req.request_relation)
        .flat()
        .map((rel) => rel.session_id)
        .flat() || [];

    const applicantSessions = (
      ele.interview_schedule?.interview_meeting
        ? ele.interview_schedule.interview_meeting
            .map((meeting) => meeting.interview_session)
            .flat()
        : []
    ).filter(
      (session) =>
        !requestSessions.includes(session.id) && session.name !== 'Debrief',
    );
    return { ...ele, applicantSessions };
  });
}

async function getSessionList({
  application_id,
  job_id,
}: {
  application_id: string;
  job_id: string;
}) {
  const {
    data: { data },
  } = await axios.post('/api/scheduling/fetch_interview_session_task', {
    application_id: application_id,
    job_id: job_id,
  } as ApiRequestInterviewSessionTask);
  console.log(data);
  const sessions = data as (ApiResponseInterviewSessionTask['data'][number] & {
    interview_meeting: {
      interview_schedule: {
        application_id: string;
      };
    };
  })[];
  return sessions;
}
