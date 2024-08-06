/* eslint-disable security/detect-object-injection */
import { FunctionNames } from '@aglint/shared-types';
import { getFullName } from '@aglint/shared-utils';
import { dayjsLocal } from '@aglint/shared-utils/src/scheduling/dayjsLocal';
import { Stack, Typography } from '@mui/material';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { useState } from 'react';

import { ButtonSoft } from '@/devlink2/ButtonSoft';
import { useAuthDetails } from '@/src/context/AuthContext/AuthContext';
import { useRequests } from '@/src/context/RequestsContext';
import {
  ApiRequestInterviewSessionTask,
  ApiResponseInterviewSessionTask,
} from '@/src/pages/api/scheduling/fetch_interview_session_task';
import { useUserChat } from '@/src/queries/userchat';
import { supabase } from '@/src/utils/supabase/client';

import { useAgentIEditor } from '../AgentEditorContext';
import AgentEditor from './AgentEditor';
import { scheduleTypes } from './utils';

type selectedItemsType = {
  schedule_type: { id: string; name: string }[];
  job_title: { id: string; name: string }[];
  applicant_name: { id: string; name: string }[];
  interview_name: { id: string; name: string }[];
  request_name: { id: string; name: string }[];
};
function AgentInputBox() {
  const { recruiterUser, recruiter_id, recruiter } = useAuthDetails();
  const { handleAsyncCreateRequests } = useRequests();
  const { text, setText, inputRef } = useAgentIEditor();

  const [selectedItems, setSelectedItems] = useState<selectedItemsType>(null);
  // eslint-disable-next-line no-unused-vars
  const [selectedDateRange, setSelectedDateRange] = useState<{
    start_date: string;
    end_date: string;
  }>({
    end_date: dayjsLocal().format('MM-DD-YYYY'),
    start_date: dayjsLocal().add(7, 'day').format('MM-DD-YYYY'),
  });

  const { requests } = useRequests();

  const { data: jobsAndApplications, isFetched: isJobFetched } =
    useAllJobsAndApplications({
      recruiter_id,
    });
  const applications = selectedItems?.job_title[0]?.id
    ? jobsAndApplications?.applications.filter(
        (application) => application.job_id === selectedItems?.job_title[0]?.id,
      )
    : jobsAndApplications?.applications;

  const applicant_sessions = selectedItems?.applicant_name[0]?.id
    ? applications.find(
        (ele) => ele.id === selectedItems?.applicant_name[0]?.id,
      )?.applicantSessions
    : [];

  const [loading, setLoading] = useState(false);
  async function createNewRequest() {
    const selectedSession = selectedItems?.interview_name;
    if (selectedSession.length && selectedItems.applicant_name.length) {
      setLoading(true);
      await handleAsyncCreateRequests({
        request: {
          priority: 'urgent',
          assigner_id: recruiterUser.user_id,
          assignee_id: recruiterUser.user_id,
          title: `${getFullName(recruiterUser.first_name, recruiterUser.last_name)} requested to schedule a ${selectedSession.map((ele) => ele.name).join(' ,')} for ${selectedItems.applicant_name[0].name}`,
          status: 'to_do',
          type: 'schedule_request',
        },
        applications: [selectedItems.applicant_name[0].id],
        sessions: selectedItems.interview_name.map((ele) => ele.id),
      });
      setLoading(false);
      setSelectedItems(null);
      setText('');
    }
  }

  const {
    submitUserChat,
    insertAIChat,
    data: allChat,
  } = useUserChat({
    user_id: recruiterUser.user_id,
  });

  const handleSubmit = async ({ planText }: { planText: string }) => {
    // eslint-disable-next-line no-console
    console.log(selectedItems, planText);
    const newMessage = {
      value: planText,
      type: 'user',
    };
    const oldMessages = allChat.slice(-6).map((ele) => ({
      value: ele.title,
      type: ele.type === 'user' ? 'user' : 'assistant',
    }));
    submitUserChat(planText); // save to db
    setText('');
    const { data } = await axios.post(
      `${process.env.NEXT_PUBLIC_AGENT_API}/api/supervisor/agent`,
      {
        recruiter_id: recruiter.id,
        history: [...oldMessages, newMessage],
      },
    );
    const resp = data as {
      display: {
        node: string;
        message: string;
        function: FunctionNames;
        payload: any;
      }[];
    };
    if (resp.display.length === 0) {
      insertAIChat({
        function_name: null,
        message:
          'Sorry unable to process your request. Please try again later.',
        payload: null,
      });
    } else {
      const lastMessage = resp.display[resp.display.length - 1];
      insertAIChat({
        function_name: lastMessage.function,
        message: lastMessage.message,
        payload: lastMessage.payload,
      });
    }
  };

  function handleTextChange({
    newValue,
  }: {
    newValue: string;
    newPlainTextValue: string;
  }) {
    function extractIdsAndNames(input: string) {
      const regex = /(\w+)\[([^[\]]+)\]:\[([^[\]]+)\]/g;
      let match;
      const result = {
        schedule_type: [],
        job_title: [],
        applicant_name: [],
        interview_name: [],
        request_name: [],
      };

      while ((match = regex.exec(input)) !== null) {
        result[match[1]].push({ id: match[2], name: match[3] });
      }

      return result;
    }

    const items = extractIdsAndNames(newValue);
    if (selectedItems?.applicant_name.length) {
      const id = selectedItems.applicant_name[0].id;
      const selectedApplication = jobsAndApplications.applications.find(
        (application) => application.id === id,
      ) as Awaited<
        ReturnType<typeof getJobsAndApplications>
      >['applications'][number];
      items.job_title = [
        {
          id: selectedApplication.public_jobs.id,
          name: selectedApplication.public_jobs.job_title,
        },
      ];
    }
    setSelectedItems(items);
  }

  const assigner = 'user';
  const assignerText =
    assigner === 'user'
      ? `assign to ${getFullName(recruiterUser.first_name, recruiterUser.last_name)}`
      : assigner === 'email'
        ? 'send an email'
        : assigner === 'phone'
          ? 'make a phone call'
          : '';
  const candidate = selectedItems?.applicant_name.length
    ? selectedItems?.applicant_name[0]?.name
    : `{{candidate}}`;
  const scheduleType = selectedItems?.schedule_type.length
    ? selectedItems?.schedule_type[0]?.name
    : '{{schedule_type}}';
  const interviewName = selectedItems?.interview_name.length
    ? selectedItems?.interview_name.map((ele) => ele.name).join(',')
    : '{{interviews}}';
  return (
    <>
      <Stack alignItems={'center'}>
        <>
          {selectedItems?.schedule_type[0]?.id === 'schedule' && (
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
                fontSize={14}
                dangerouslySetInnerHTML={{
                  __html: `Aglint AI will ${assignerText} to <b>${candidate}</b> to get ${scheduleType} for the ${interviewName} interview between ${dayjsLocal(selectedDateRange?.start_date).format('MMM DD')} and ${dayjsLocal(selectedDateRange?.end_date).format('MMM DD')}. `,
                }}
              />
              <ButtonSoft
                isLoading={loading}
                isDisabled={
                  Boolean(!selectedItems.interview_name.length) ||
                  Boolean(!selectedItems.applicant_name.length)
                }
                iconName={'send'}
                isRightIcon={true}
                size={1}
                textButton='Schedule'
                onClickButton={{
                  onClick: createNewRequest,
                }}
              />
            </Stack>
          )}
        </>
        <AgentEditor
          inputRef={inputRef}
          text={text}
          setText={setText}
          handleTextChange={handleTextChange}
          handleSubmit={handleSubmit}
          requestList={
            requests.status === 'success'
              ? requests.data.map((ele) => ({
                  id: ele.id,
                  display: ele.title,
                }))
              : []
          }
          scheduleTypes={scheduleTypes}
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
        />
      </Stack>
    </>
  );
}

export default AgentInputBox;

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
    .eq('applications.status', 'interview')
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
  const sessions = data as (ApiResponseInterviewSessionTask['data'][number] & {
    interview_meeting: {
      interview_schedule: {
        application_id: string;
      };
    };
  })[];
  return sessions;
}
