import { EmailAgentId, PhoneAgentId } from '@aglint/shared-utils';
import { Stack, Typography } from '@mui/material';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import dayjs from 'dayjs';
import { marked } from 'marked';
import { useRouter } from 'next/router';

import { EmptyState } from '@/devlink2';
import { AvatarWithName, TaskProgress } from '@/devlink3';
import MuiAvatar from '@/src/components/Common/MuiAvatar';
import { ShowCode } from '@/src/components/Common/ShowCode';
import { fetchInterviewMeetingProgresstask } from '@/src/components/Scheduling/AllSchedules/SchedulingApplication/utils';
import DynamicLoader from '@/src/components/Scheduling/Interviewers/DynamicLoader';
// import { fetchInterviewMeetingProgresstask } from '@/src/components/Scheduling/AllSchedules/SchedulingApplication/hooks';
import {
  TasksAgentContextType,
  useTasksContext,
} from '@/src/context/TasksContextProvider/TasksContextProvider';
import { supabase } from '@/src/utils/supabase/client';

import { EmailAgentIcon } from '../../../Components/EmailAgentIcon';
import { PhoneAgentIcon } from '../../../Components/PhoneAgentIcon';
import { useTaskStatesContext } from '../../../TaskStatesContext';
import PhoneTranscript from './PhoneTrancript';
import ProgressTitle from './ProgressTitle';
import SessionCard, { meetingCardType } from './SessionCard';

function SubTaskProgress() {
  const { tasks } = useTasksContext();
  const { assignerList } = useTaskStatesContext();
  const router = useRouter();
  const { data: progressList, isFetchedAfterMount } = useProgress();

  const selectedTask = tasks.find((ele) => ele.id === router.query?.task_id);
  const { data: sessionList } = useSessionsList();

  return (
    <ShowCode>
      <ShowCode.When isTrue={!isFetchedAfterMount}>
        <Stack height='100vh' minWidth={600}>
          <DynamicLoader height='200px' />
        </Stack>
      </ShowCode.When>
      <ShowCode.When isTrue={progressList && Boolean(progressList.length)}>
        {progressList
          ? progressList.map((item, i) => {
              let CandidateCreator = tasks
                .map((ele) => ele.applications.candidates)
                .find((ele) => ele.id === (item.created_by as any).id);

              const InterviewerCreator = assignerList.find(
                (ele) => ele.user_id === (item.created_by as any).id,
              );

              let callDetails = item.jsonb_data as {
                audio_url: string;
                transcript: {
                  id: string;
                  message: string;
                }[];
                retell_call_id: string;
              };

              if (
                item.progress_type === 'call_completed' &&
                callDetails?.retell_call_id &&
                !callDetails?.audio_url
              ) {
                getUpdateCallAudio();
              }
              async function getUpdateCallAudio() {
                await axios.post(
                  `${process.env.NEXT_PUBLIC_AGENT_API}/api/retell/call-details`,
                  {
                    call_id: callDetails?.retell_call_id,
                    task_progress_id: item.id,
                    candidate_id: selectedTask?.applications?.candidate_id,
                  },
                );
              }

              return (
                <TaskProgress
                  isLineVisible={progressList.length !== i + 1}
                  key={i}
                  isTaskProgressVisible={true}
                  textTask={
                    <ProgressTitle
                      title={item.title}
                      titleMetaData={item.title_meta}
                      selectedTask={selectedTask}
                    />
                  }
                  slotImage={
                    <ShowCode>
                      <ShowCode.When
                        isTrue={(item.created_by as any).id === EmailAgentId}
                      >
                        <Stack
                          border={'1px solid'}
                          borderColor={'grey.300'}
                          borderRadius={'100%'}
                          direction={'row'}
                          alignItems={'center'}
                          justifyContent={'center'}
                          width={'24px'}
                          height={'24px'}
                        >
                          <EmailAgentIcon />
                        </Stack>
                      </ShowCode.When>
                      <ShowCode.When
                        isTrue={(item.created_by as any).id === PhoneAgentId}
                      >
                        <Stack
                          border={'1px solid'}
                          borderColor={'grey.300'}
                          borderRadius={'100%'}
                          direction={'row'}
                          alignItems={'center'}
                          justifyContent={'center'}
                          width={'24px'}
                          height={'24px'}
                        >
                          <PhoneAgentIcon />
                        </Stack>
                      </ShowCode.When>
                      <ShowCode.When isTrue={!!CandidateCreator?.id}>
                        <AvatarWithName
                          isAvatarVisible={false}
                          isCandidateIconVisible={true}
                          isRoleVisible={false}
                          isReverseShadowVisible={false}
                          isShadowVisible={false}
                          slotAvatar={<></>}
                          isTickVisible={false}
                          textName={''}
                        />
                      </ShowCode.When>
                      <ShowCode.When isTrue={!!InterviewerCreator?.user_id}>
                        <MuiAvatar
                          level={InterviewerCreator?.first_name}
                          src={InterviewerCreator?.profile_image}
                          variant='circular'
                          width='24px'
                          height='24px'
                          fontSize='12px'
                        />
                      </ShowCode.When>
                    </ShowCode>
                  }
                  isTaskCompletedVisible={false}
                  textTimeCompleted={'sd'}
                  textTime={dayjs(item.created_at).fromNow()}
                  isMailContentVisible={
                    (item.progress_type === 'email_messages' &&
                      item.jsonb_data?.message) ||
                    item.progress_type === 'interview_schedule'
                  }
                  slotMailContent={
                    <ShowCode>
                      <ShowCode.When
                        isTrue={
                          item.progress_type === 'email_messages' &&
                          item.jsonb_data?.message
                        }
                      >
                        <Typography
                          // sx={{
                          //   whiteSpace: 'pre-wrap',
                          // }}
                          variant='body2'
                        >
                          <span
                            dangerouslySetInnerHTML={{
                              __html: marked(
                                String(item.jsonb_data?.message)
                                  ?.replaceAll('- **', '<b>')
                                  ?.replaceAll('**', '</b> '),
                              ),
                            }}
                          ></span>
                        </Typography>
                      </ShowCode.When>

                      <ShowCode.When
                        isTrue={item.progress_type === 'interview_schedule'}
                      >
                        <ShowCode>
                          <ShowCode.When
                            isTrue={
                              sessionList &&
                              !sessionList[0]?.interview_meeting?.id
                            }
                          >
                            <>Scheduling...</>
                          </ShowCode.When>
                          <ShowCode.Else>
                            <Stack
                              direction={'column'}
                              spacing={3}
                              width={'100%'}
                            >
                              {sessionList &&
                                sessionList?.map((ses, indOpt) => {
                                  return (
                                    <SessionCard
                                      indOpt={indOpt}
                                      ses={ses as meetingCardType}
                                      key={indOpt}
                                      sessionList={sessionList}
                                    />
                                  );
                                })}
                            </Stack>
                          </ShowCode.Else>
                        </ShowCode>
                      </ShowCode.When>
                    </ShowCode>
                  }
                  isSoundTaskVisible={
                    item.progress_type === 'call_completed' &&
                    Boolean(item.jsonb_data?.transcript.length)
                  }
                  slotSoundTask={
                    <ShowCode.When
                      isTrue={
                        item.progress_type === 'call_completed' &&
                        Boolean(callDetails?.transcript.length)
                      }
                    >
                      <PhoneTranscript
                        audio_url={callDetails?.audio_url}
                        transcript={
                          callDetails?.transcript as {
                            id: string;
                            message: string;
                          }[]
                        }
                      />
                    </ShowCode.When>
                  }
                />
              );
            })
          : null}
      </ShowCode.When>
      <ShowCode.Else>
        <EmptyState textDescription={'No progress found.'} />
      </ShowCode.Else>
    </ShowCode>
  );
}

export default SubTaskProgress;
// schedule session list
export const useScheduleSession = () => {
  const route = useRouter();
  const { tasks } = useTasksContext();
  let taskId = route.query.task_id ? (route.query.task_id as string) : null;

  let selectedTask = tasks.find((item) => item.id === taskId);

  const queryClient = useQueryClient();
  const query = useQuery({
    queryKey: ['schedule_sessions'],
    queryFn: () =>
      getScheduleSessions(
        selectedTask.session_ids.map((ele: any) => ele.id) as string[],
      ),
  });
  const refetch = () =>
    queryClient.invalidateQueries({
      queryKey: ['schedule_sessions'],
    });
  return { ...query, refetch };
};

async function getScheduleSessions(session_ids: string[]) {
  const data = await fetchInterviewMeetingProgresstask({
    session_ids,
  });

  return data;
}

// progress list
export const useProgress = () => {
  const route = useRouter();
  let taskId = route.query.task_id ? (route.query.task_id as string) : null;
  const queryClient = useQueryClient();
  const query = useQuery({
    queryKey: ['get_new_tasks_progress'],
    queryFn: () => getTaskProgress(taskId),
    refetchInterval: 3000,
    enabled: true,
  });
  const refetch = () =>
    queryClient.invalidateQueries({
      queryKey: ['get_new_tasks_progress'],
    });
  return { ...query, refetch };
};

async function getTaskProgress(taskId: string) {
  const { data } = await supabase
    .from('new_tasks_progress')
    .select()
    .order('created_at', {
      ascending: true,
    })
    .eq('task_id', taskId);

  return data as TasksAgentContextType['taskProgress'];
}

// progress list
export const useSessionsList = () => {
  const route = useRouter();
  let taskId = route.query.task_id ? (route.query.task_id as string) : null;
  const queryClient = useQueryClient();
  const query = useQuery({
    queryKey: ['get_Sessions_List'],
    queryFn: () => getSessionsList(taskId),
    refetchInterval: 1000,
    enabled: true,
  });
  const refetch = () =>
    queryClient.invalidateQueries({
      queryKey: ['get_Sessions_List'],
    });
  return { ...query, refetch };
};

async function getSessionsList(taskId: string) {
  const { data } = await supabase
    .from('new_tasks')
    .select('session_ids')
    .eq('id', taskId)
    .single();

  return data.session_ids as meetingCardType[];
}
