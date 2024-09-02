import { type DatabaseTable } from '@aglint/shared-types';
import {
  EmailAgentId,
  PhoneAgentId,
  SystemAgentId,
} from '@aglint/shared-utils';
import { Stack, Typography } from '@mui/material';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import dayjs from 'dayjs';
import { marked } from 'marked';
import Image from 'next/image';
import { useRouter } from 'next/router';

import { ButtonSolid } from '@/devlink/ButtonSolid';
import { GlobalBadge } from '@/devlink/GlobalBadge';
import { EmptyState } from '@/devlink2/EmptyState';
import { Skeleton } from '@/devlink2/Skeleton';
import { AgentFollowUp } from '@/devlink3/AgentFollowUp';
import { AvatarWithName } from '@/devlink3/AvatarWithName';
import { SkeletonActivitiesCard } from '@/devlink3/SkeletonActivitiesCard';
import { TaskProgress } from '@/devlink3/TaskProgress';
import MuiAvatar from '@/src/components/Common/MuiAvatar';
import { ShowCode } from '@/src/components/Common/ShowCode';
import {
  setIsScheduleNowOpen,
  setStepScheduling,
} from '@/src/components/Scheduling/CandidateDetails/SchedulingDrawer/store';
import { setRescheduleSessionIds } from '@/src/components/Scheduling/CandidateDetails/store';
import { fetchInterviewMeetingProgresstask } from '@/src/components/Scheduling/CandidateDetails/utils';
import { useTasksContext } from '@/src/context/TasksContextProvider/TasksContextProvider';
import { supabase } from '@/src/utils/supabase/client';

import { EmailAgentIcon } from '../../../Components/EmailAgentIcon';
import { PhoneAgentIcon } from '../../../Components/PhoneAgentIcon';
import FollowUp from '../../../FollowUp';
import { useTaskStatesContext } from '../../../TaskStatesContext';
import AgentFollowUpCard from './AgentFolllowUpCard';
import PhoneTranscript from './PhoneTrancript';
import ProgressTitle from './ProgressTitle';
import RequestAvailabilityList from './RequestAvailabilityList';
import RequestAvailabilityResend from './RequestAvailabilityResend';
import ScheduleNowCard from './ScheduleNowCard';
import SelfScheduleResend from './SelfScheduleResend';
import SessionCard, { type meetingCardType } from './SessionCard';

function SubTaskProgress() {
  const { tasks } = useTasksContext();
  const { assignerList, setOpenEmailFollowUp } = useTaskStatesContext();
  const router = useRouter();
  const route = useRouter();
  const taskId = route.query.task_id ? (route.query.task_id as string) : null;
  const { data: progressList, isFetchedAfterMount } = useProgress({ taskId });
  const today = dayjs();
  const selectedTask = tasks.find((ele) => ele.id === router.query?.task_id);
  const { data: sessionList } = useSessionsList();

  return (
    <>
      <FollowUp />
      <ShowCode>
        <ShowCode.When isTrue={!isFetchedAfterMount}>
          <Stack height='100vh' minWidth={600}>
            <SkeletonActivitiesCard slotSkeleton={<Skeleton />} />
            <SkeletonActivitiesCard slotSkeleton={<Skeleton />} />
            <SkeletonActivitiesCard slotSkeleton={<Skeleton />} />
          </Stack>
        </ShowCode.When>
        <ShowCode.When isTrue={progressList && Boolean(progressList.length)}>
          {progressList
            ? progressList.map((item, i) => {
                const lastEmailReminderIndex = progressList.reduce(
                  (lastIndex, item, i) => {
                    return item.progress_type === 'email_follow_up_reminder'
                      ? i
                      : lastIndex;
                  },
                  -1,
                );
                const lastAgentEmailIndex = progressList.reduce(
                  (lastIndex, item, i) => {
                    return item.progress_type === 'send_email' ? i : lastIndex;
                  },
                  -1,
                );
                const lastEmailRequestAvailabilityListIndex =
                  progressList.reduce((lastIndex, item, i) => {
                    return item.progress_type === 'request_availability_list'
                      ? i
                      : lastIndex;
                  }, -1);
                const lastScheduleNowCardIndex = progressList.reduce(
                  (lastIndex, item, i) => {
                    return item.progress_type === 'schedule' ? i : lastIndex;
                  },
                  -1,
                );
                const lastRequestAvailabilityTypeIndex = progressList.reduce(
                  (lastIndex, item, i) => {
                    return item.progress_type === 'request_availability'
                      ? i
                      : lastIndex;
                  },
                  -1,
                );
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
                  try {
                    await axios.post(
                      `${process.env.NEXT_PUBLIC_AGENT_API}/api/retell/call-details`,
                      {
                        call_id: callDetails?.retell_call_id,
                        task_progress_id: item.id,
                        candidate_id: selectedTask?.applications?.candidate_id,
                      },
                    );
                  } catch (error) {
                    return error.message;
                  }
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
                            borderColor={'var(--accent-6)'}
                            bgcolor={'var(--white)'}
                            borderRadius={'var(--radius-2)'}
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
                            borderColor={'var(--accent-6)'}
                            bgcolor={'var(--white)'}
                            borderRadius={'var(--radius-2)'}
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
                            variant='rounded-small'
                          />
                        </ShowCode.When>
                      </ShowCode>
                    }
                    isTaskCompletedVisible={false}
                    textTimeCompleted={'sd'}
                    textTime={dayjs(item.created_at).fromNow()}
                    slotMailContent={
                      <ShowCode>
                        <ShowCode.When
                          isTrue={
                            (item.progress_type === 'email_messages' ||
                              item.progress_type === 'send_email') &&
                            item.jsonb_data?.message
                          }
                        >
                          <Stack
                            p={'var(--space-3)'}
                            borderRadius={'var(--space-2)'}
                            border={'1px solid'}
                            borderColor={'var(--neutral-6)'}
                            bgcolor={'var(--white)'}
                          >
                            <Typography variant='body1'>
                              <span
                                dangerouslySetInnerHTML={{
                                  __html: marked(
                                    String(item.jsonb_data?.message)
                                      ?.replaceAll('- **', '<b>')
                                      ?.replaceAll('**', '</b> '),
                                  ),
                                }}
                              ></span>
                              <ShowCode.When
                                isTrue={
                                  lastAgentEmailIndex === i &&
                                  dayjs(item.created_at).isBefore(
                                    today.add(-2, 'day'),
                                  ) &&
                                  !(
                                    selectedTask.task_action
                                      ?.email_followUp_reminder > 0
                                  )
                                }
                              >
                                <AgentFollowUpCard
                                  progress_created_at={item.created_at}
                                />
                              </ShowCode.When>
                            </Typography>
                          </Stack>
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
                              <Image
                                src={
                                  'https://uploads-ssl.webflow.com/651419e73ebbb12148f96ccc/6661adfc1e7a10e0f552f20f_iiiwG0vJQN.gif'
                                }
                                width={24}
                                height={24}
                                alt=''
                              />
                            </ShowCode.When>
                            <ShowCode.Else>
                              <Stack
                                border={'1px solid'}
                                bgcolor={'var(--white)'}
                                borderRadius={'var(--radius-2)'}
                                borderColor={'var(--neutral-6)'}
                                p={'var(--space-3)'}
                              >
                                <Stack
                                  direction={'column'}
                                  spacing={'8px'}
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
                                  <Stack
                                    width={'100%'}
                                    direction={'row'}
                                    spacing={2}
                                    justifyContent={'end'}
                                  >
                                    <ButtonSolid
                                      size={1}
                                      textButton={'Reschedule'}
                                      onClickButton={{
                                        onClick: () => {
                                          setRescheduleSessionIds(
                                            sessionList.map(
                                              (session) => session.id,
                                            ),
                                          );
                                          setStepScheduling('reschedule');
                                          // setSelectedApplicationLog(act);
                                          setIsScheduleNowOpen(true);
                                          router.push(
                                            `/scheduling/application/${selectedTask.application_id}`,
                                          );
                                        },
                                      }}
                                    />
                                    {/* <ButtonSoft
                                      onClickButton={{
                                        onClick: () => {
                                          router.push(
                                            `/scheduling/application/${selectedTask.application_id}`,
                                          );
                                        },
                                      }}
                                      size={1}
                                      textButton={'View'}
                                    /> */}
                                  </Stack>
                                </Stack>
                              </Stack>
                            </ShowCode.Else>
                          </ShowCode>
                        </ShowCode.When>
                        <ShowCode.When
                          isTrue={
                            selectedTask.trigger_count === 2 &&
                            item.progress_type === 'call_failed' &&
                            selectedTask.assignee[0] === PhoneAgentId
                          }
                        >
                          <AgentFollowUp
                            isNoBorder={false}
                            isSendFollowupEmail={false}
                            isPhoneAgentIcon={true}
                            isMakeAPhoneCall={false}
                            isCallAgain={false}
                            isEmailAgentIcon={false}
                            isConactViaEmail={true}
                            textFollowup={
                              'Candidate didn’t responded to the phone call'
                            }
                            onClickContactViaEmail={{
                              onClick: () => {
                                setOpenEmailFollowUp(true);
                              },
                            }}
                          />
                        </ShowCode.When>
                        <ShowCode.When
                          isTrue={
                            item.progress_type === 'email_follow_up_reminder' &&
                            lastEmailReminderIndex === i &&
                            dayjs(item.created_at).isBefore(
                              today.add(-2, 'day'),
                            )
                          }
                        >
                          <AgentFollowUpCard
                            progress_created_at={item.created_at}
                          />
                        </ShowCode.When>
                        <ShowCode.When
                          isTrue={
                            item.progress_type ===
                              'request_availability_list' &&
                            selectedTask.status !== 'closed' &&
                            selectedTask.status !== 'completed' &&
                            lastEmailRequestAvailabilityListIndex === i &&
                            !progressList
                              .map((ele) => ele.progress_type)
                              .includes('interview_schedule')
                          }
                        >
                          <RequestAvailabilityList item={item} />
                        </ShowCode.When>
                        <ShowCode.When
                          isTrue={
                            selectedTask.assignee[0] !== EmailAgentId &&
                            selectedTask.assignee[0] !== PhoneAgentId &&
                            selectedTask.assignee[0] !== SystemAgentId &&
                            item.progress_type === 'schedule' &&
                            selectedTask.status !== 'closed' &&
                            selectedTask.status !== 'completed' &&
                            lastScheduleNowCardIndex === i &&
                            progressList
                              .map((item) => item.progress_type)
                              .every((item) => item === 'schedule')
                          }
                        >
                          <ScheduleNowCard selectedTask={selectedTask} />
                        </ShowCode.When>
                        <ShowCode.When
                          isTrue={
                            item.progress_type === 'request_availability' &&
                            selectedTask.status !== 'closed' &&
                            selectedTask.status !== 'completed' &&
                            lastRequestAvailabilityTypeIndex === i &&
                            !progressList
                              .map((ele) => ele.progress_type)
                              .includes('request_availability_list')
                          }
                        >
                          <RequestAvailabilityResend
                            selectedTask={selectedTask}
                          />
                        </ShowCode.When>
                        <ShowCode.When
                          isTrue={
                            item.progress_type === 'call_failed' ||
                            item.progress_type === 'email_failed'
                          }
                        >
                          <Stack
                            direction={'row'}
                            justifyContent={'flex-start'}
                            alignItems={'center'}
                          >
                            <GlobalBadge
                              color={'error'}
                              iconName={'error'}
                              showIcon={true}
                              textBadge={'Please Contact to support@aglint.com'}
                            />
                          </Stack>
                        </ShowCode.When>
                        <ShowCode.When
                          isTrue={
                            item.progress_type === 'self_schedule' &&
                            !progressList
                              .map((ele) => ele.progress_type)
                              .includes('interview_schedule')
                          }
                        >
                          <SelfScheduleResend selectedTask={selectedTask} />
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
    </>
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
export const useProgress = ({ taskId }: { taskId: string }) => {
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

  return data as DatabaseTable['new_tasks_progress'][];
}

// progress list
export const useSessionsList = () => {
  const route = useRouter();
  let taskId = route.query.task_id ? (route.query.task_id as string) : null;
  const queryClient = useQueryClient();
  const query = useQuery({
    queryKey: ['get_Sessions_List'],
    queryFn: () => getSessionsList(taskId),
    refetchInterval: 2000,
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
    .from('tasks_view')
    .select('session_ids')
    .eq('id', taskId)
    .single();

  return data.session_ids as meetingCardType[];
}
