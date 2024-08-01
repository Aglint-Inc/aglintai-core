/* eslint-disable no-unused-vars */
import { EmailAgentId, getFullName } from '@aglint/shared-utils';
import { dayjsLocal } from '@aglint/shared-utils/src/scheduling/dayjsLocal';
import { Button, Stack, Typography } from '@mui/material';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { useState } from 'react';

import { useAuthDetails } from '@/src/context/AuthContext/AuthContext';
import { supabase } from '@/src/utils/supabase/client';

import AgentEditor from './AgentEditor';
import {
  ApplicantInfo,
  extractDataFromText,
  scheduleType,
} from './AgentEditor/utils';
import {
  ApiRequestInterviewSessionTask,
  ApiResponseInterviewSessionTask,
} from '@/src/pages/api/scheduling/fetch_interview_session_task';
import { ButtonSoft } from '@/devlink';
import { useRequestsActions } from '@/src/context/RequestsContext/hooks';
import { useRequests } from '@/src/context/RequestsContext';
import { createRequest } from '@/src/queries/requests';

function AgentChats() {
  const { recruiterUser, recruiter_id } = useAuthDetails();
  const [textToObject, setTextToObject] = useState<ApplicantInfo | null>(null);
  const [selectedJob, setSelectedJob] = useState<{
    id: string;
    display: string;
  }>(null);
  const [selectedApplication, setSelectedApplication] = useState<{
    id: string;
    display: string;
  }>(null);
  const [selectedSession, setSelectedSession] = useState<{
    id: string;
    display: string;
  }>(null);
  const [selectedScheduleType, setSelectedScheduleType] = useState<{
    id: string;
    display: string;
  }>(null);

  const { data: jobs, isFetched: isJobFetched } = useAllJobList({
    recruiter_id,
  });
  const { data: applications, isFetched: isFetchedApplications } =
    useAllApplicationsList({
      job_id: selectedJob?.id,
    });
  const { data: sessions, isFetched: isFetchedSessions } = useAllSessionsList({
    application_id: selectedApplication?.id,
    job_id: selectedJob?.id,
  });

  function handleSubmit() {
    console.log('object');
    createRequest({
      application_id: selectedApplication?.id,
      assigner_id: recruiterUser.user_id,
      assignee_id: recruiterUser.user_id,
      title: 'Request for ' + textToObject?.schedule_type,
    });
  }
  return (
    <Stack alignItems={'center'}>
      <Stack>
        {textToObject && (
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
        )}
      </Stack>
      <AgentEditor
        handleTextChange={() => {}}
        handleSubmit={(text) => {
          extractDataFromText(text).then((data: ApplicantInfo) => {
            setTextToObject(data);
            if (!selectedApplication?.id) {
              getApplicationWithName(data.applicant_name, data.interview_names);
            }
          });
        }}
        isFetchedApplications={isFetchedApplications}
        isFetchedSessions={isFetchedSessions}
        scheduleTypes={scheduleType}
        jobList={
          isJobFetched &&
          jobs.map((job) => ({ id: job.id, display: job.job_title }))
        }
        applicationsList={
          isFetchedApplications && applications
            ? applications.map((job) => ({
                id: job.id,
                display: getFullName(
                  job.candidates.first_name,
                  job.candidates.last_name,
                ),
              }))
            : []
        }
        sessionList={
          isFetchedSessions
            ? sessions.map((session) => ({
                id: session.id,
                display: session.name,
              }))
            : []
        }
        getSelectedJob={({ id, display }) => {
          setSelectedJob({ id, display });
        }}
        getSelectedApplication={({ id, display }) => {
          setSelectedApplication({ id, display });
        }}
        getSelectedScheduleType={({ id, display }) => {
          setSelectedScheduleType({ id, display });
        }}
        getSelectedSession={({ id, display }) => {
          setSelectedSession({ id, display });
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
    console.log(data);
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

export const useAllJobList = ({ recruiter_id }: { recruiter_id: string }) => {
  const queryClient = useQueryClient();
  const query = useQuery({
    queryKey: ['get_All_job_List', recruiter_id],

    queryFn: () =>
      getJobs({
        recruiter_id,
      }),
    gcTime: 20000,
  });
  const refetch = () =>
    queryClient.invalidateQueries({ queryKey: ['get_All_job_List'] });
  return { ...query, refetch };
};

export const useAllApplicationsList = ({ job_id }: { job_id: string }) => {
  const queryClient = useQueryClient();
  const query = useQuery({
    queryKey: ['get_All_applications_List', job_id],

    queryFn: () =>
      getApplications({
        job_id,
      }),
    gcTime: 20000,
    enabled: !!job_id,
  });
  const refetch = () =>
    queryClient.invalidateQueries({
      queryKey: ['get_All_applications_List', job_id],
    });

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
    enabled: !!application_id,
  });
  const refetch = () =>
    queryClient.invalidateQueries({ queryKey: ['get_All_sessions_List'] });

  return { ...query, refetch };
};

async function getJobs({ recruiter_id }: { recruiter_id: string }) {
  const { data, error } = await supabase
    .from('public_jobs')
    .select()
    .eq('recruiter_id', recruiter_id)
    .eq('status', 'published');
  if (!error) {
    return data;
  }
}

async function getApplications({ job_id }: { job_id: string }) {
  const { data, error } = await supabase
    .from('applications')
    .select('*, candidates(*)')
    .eq('job_id', job_id)
    .eq('status', 'interview');
  if (!error) {
    return data;
  }
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
  const sessions = data as ApiResponseInterviewSessionTask['data'];
  return sessions;
}
