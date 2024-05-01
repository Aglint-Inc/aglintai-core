import { Collapse, Stack, Typography } from '@mui/material';
import { IconChevronDown, IconChevronUp } from '@tabler/icons-react';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import dayjs from 'dayjs';
import { marked } from 'marked';
import { useRouter } from 'next/router';
import { useState } from 'react';

import { EmptyState } from '@/devlink2';
import {
  AgentPill,
  AvatarWithName,
  ListCard,
  TaskProgress,
  TranscriptCard,
} from '@/devlink3';
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
import { capitalizeAll } from '@/src/utils/text/textUtils';

import { EmailAgentIcon } from '../../../Components/EmailAgentIcon';
import { PhoneAgentIcon } from '../../../Components/PhoneAgentIcon';
import { useTaskStatesContext } from '../../../TaskStatesContext';
import { EmailAgentId, PhoneAgentId } from '../../../utils';
import SessionCard from './SessionCard';

function SubTaskProgress() {
  const { tasks } = useTasksContext();
  const { assignerList } = useTaskStatesContext();
  const router = useRouter();
  const { data: progressList, isFetchedAfterMount } = useProgress();
  const { data: sessionList } = useScheduleSession();
  const [openTranscript, setOpenTranscript] = useState(false);

  const selectedTask = tasks.find((ele) => ele.id === router.query?.task_id);
  const candidateDetails = selectedTask?.applications?.candidates;
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

              // console.log(CandidateCreator);
              const currentTimeZone = dayjs.tz.guess();

              // console.log(item.title_meta);
              const bookingDate = item.title_meta['{booking_date}']
                ? `<span class="progress_date_section">${dayjs(
                    item.title_meta['{booking_date}'],
                  )
                    .tz(candidateDetails?.timezone || currentTimeZone)
                    .format(
                      'MMM DD',
                    )} (${candidateDetails?.timezone || currentTimeZone})</span>`
                : '';
              const bookingTime = item.title_meta['{booking_time}']
                ? `<span class="progress_date_section">${dayjs(
                    item.title_meta['{booking_time}'],
                  )
                    .tz(candidateDetails?.timezone || currentTimeZone)
                    .format(
                      'MMM DD, hh:mm A',
                    )} (${candidateDetails?.timezone || currentTimeZone})</span>`
                : '';
              const candidateName = item.title_meta['{candidate}']
                ? `<span class='mention'>@${item.title_meta['{candidate}'] || 'unknown'}</span>`
                : '';
              return (
                <TaskProgress
                  isLineVisible={progressList.length !== i + 1}
                  key={i}
                  isTaskProgressVisible={true}
                  textTask={
                    <span
                      dangerouslySetInnerHTML={{
                        __html: String(item.title)
                          .trim()
                          .replaceAll('Pm', 'PM')
                          .replaceAll('{candidate}', candidateName)
                          .replaceAll('{booking_date}', bookingDate)
                          .replaceAll('{booking_time}', bookingTime),
                      }}
                    ></span>
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
                        <MuiAvatar
                          level={CandidateCreator?.first_name}
                          src={CandidateCreator?.avatar}
                          variant='circular'
                          width='24px'
                          height='24px'
                          fontSize='12px'
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
                    item.progress_type === 'call_completed' ||
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
                        isTrue={
                          item.progress_type === 'call_completed' &&
                          Boolean(item.jsonb_data.length)
                        }
                      >
                        <Stack
                          width={'100%'}
                          direction={'column'}
                          px={1}
                          position={'relative'}
                        >
                          <Stack
                            onClick={() => {
                              setOpenTranscript((pre) => !pre);
                            }}
                            direction={'row'}
                            justifyContent={'space-between'}
                            alignItems={'center'}
                            sx={{
                              cursor: 'pointer',
                            }}
                            py={1}
                          >
                            <Typography variant='inherit'>
                              Transcript
                            </Typography>
                            {openTranscript ? (
                              <IconChevronUp />
                            ) : (
                              <IconChevronDown />
                            )}
                          </Stack>
                          <Collapse
                            sx={{
                              '& .MuiCollapse-wrapperInner': {
                                display: 'flex',
                                flexDirection: 'column',
                                gap: '20px',
                              },
                            }}
                            in={openTranscript}
                            collapsedSize={0}
                          >
                            {item.jsonb_data &&
                              item.jsonb_data.length &&
                              (
                                item.jsonb_data as unknown as {
                                  id: string;
                                  message: string;
                                }[]
                              ).map((ele, i) => {
                                const receiver = tasks
                                  .map((item) => item.applications.candidates)
                                  .find((item) => item.id === ele.id);
                                if (ele.message && ele.message.trim())
                                  return (
                                    <Stack width={'100%'} gap={1} key={i}>
                                      <TranscriptCard
                                        isBackgroundActive={
                                          ele.id !== PhoneAgentId
                                        }
                                        slotAgent={
                                          <Stack width={'100%'}>
                                            <ShowCode>
                                              <ShowCode.When
                                                isTrue={ele.id === PhoneAgentId}
                                              >
                                                <AgentPill
                                                  isPhoneAgentVisible={true}
                                                  isEmailAgentVisible={false}
                                                />
                                              </ShowCode.When>
                                              <ShowCode.Else>
                                                <ListCard
                                                  isAvatarWithNameVisible={true}
                                                  isListVisible={false}
                                                  slotAvatarWithName={
                                                    receiver && (
                                                      <AvatarWithName
                                                        isAvatarVisible={false}
                                                        isCandidateIconVisible={
                                                          true
                                                        }
                                                        isRoleVisible={false}
                                                        isReverseShadowVisible={
                                                          false
                                                        }
                                                        isShadowVisible={false}
                                                        slotAvatar={<></>}
                                                        isTickVisible={false}
                                                        textName={capitalizeAll(
                                                          receiver?.first_name +
                                                            ' ' +
                                                            (receiver?.last_name ??
                                                              ''),
                                                        )}
                                                      />
                                                    )
                                                  }
                                                />
                                              </ShowCode.Else>
                                            </ShowCode>
                                          </Stack>
                                        }
                                        textScript={ele.message}
                                      />
                                    </Stack>
                                  );
                              })}
                          </Collapse>
                        </Stack>
                      </ShowCode.When>
                      <ShowCode.When
                        isTrue={item.progress_type === 'interview_schedule'}
                      >
                        <Stack direction={'column'} spacing={3} width={'100%'}>
                          {sessionList
                            ?.sort(
                              (a, b) =>
                                a.interview_session.session_order -
                                b.interview_session.session_order,
                            )
                            ?.map((ses, indOpt) => {
                              return (
                                <SessionCard
                                  indOpt={indOpt}
                                  ses={ses}
                                  key={indOpt}
                                />
                              );
                            })}
                        </Stack>
                      </ShowCode.When>
                    </ShowCode>
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
