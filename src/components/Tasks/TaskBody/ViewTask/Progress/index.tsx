import { Stack, Typography } from '@mui/material';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import dayjs from 'dayjs';
import { capitalize } from 'lodash';
import { useEffect, useState } from 'react';

import { InviteLinkCard, InvitePills, PanelMemberPill } from '@/devlink2';
import { AgentPill, TaskProgress, TranscriptCard } from '@/devlink3';
import Loader from '@/src/components/Common/Loader';
import MuiAvatar from '@/src/components/Common/MuiAvatar';
import { ShowCode } from '@/src/components/Common/ShowCode';
import {
  TasksAgentContextType,
  useTasksAgentContext,
} from '@/src/context/TaskContext/TaskContextProvider';
import { supabase } from '@/src/utils/supabase/client';

import { useTaskStatesContext } from '../../../TaskStatesContext';
import { EmailAgentId, PhoneAgentId } from '../../../utils';

function SubTaskProgress() {
  const { handelGetTaskLog, tasks } = useTasksAgentContext();
  const { selectedSubTaskId, assignerList } = useTaskStatesContext();
  const [progressList, setProgressList] = useState<
    TasksAgentContextType['progress_logs'] | null
  >(null);
  async function getProgress() {
    const data = await handelGetTaskLog(selectedSubTaskId);
    setProgressList(data);
  }

  //   const { data: emailLog, isLoading: emailLogLoading } = useEmailAgentLog();
  //   if (emailLogLoading) {
  //     console.log('isLoading', emailLogLoading);
  //   } else {
  //     console.log(emailLog);
  //   }

  //   const { data: phoneLog, isLoading: phoneLogLoading } = usePhoneAgentLog();
  //   if (phoneLogLoading) {
  //     console.log('isLoading', phoneLogLoading);
  //   } else {
  //     console.log(phoneLog);
  //   }

  useEffect(() => {
    if (selectedSubTaskId) {
      getProgress();
    }
  }, [selectedSubTaskId]);
  return (
    <ShowCode>
      <ShowCode.When isTrue={progressList === null}>
        <Loader />
      </ShowCode.When>
      <ShowCode.When isTrue={progressList && Boolean(progressList.length)}>
        {progressList
          ? progressList.map((item, i) => {
              const CandidateCreator = tasks
                .map((ele) => ele.applications.candidates)
                .find((ele) => ele.id === item.created_by.id);

              const InterviewerCreator = assignerList.find(
                (ele) => ele.user_id === item.created_by.id,
              );

              return (
                <TaskProgress
                  key={i}
                  isTaskProgressVisible={true}
                  textTask={
                    <div
                      dangerouslySetInnerHTML={{
                        __html: capitalize(item.title),
                      }}
                    ></div>
                  }
                  slotImage={
                    <ShowCode>
                      <ShowCode.When
                        isTrue={item.created_by.id === EmailAgentId}
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
                        isTrue={item.created_by.id === PhoneAgentId}
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
                    item.progress_type === 'email_messages' ||
                    item.progress_type === 'interview_schedule'
                  }
                  slotMailContent={
                    <ShowCode>
                      <ShowCode.When
                        isTrue={item.progress_type === 'email_messages'}
                      >
                        <Typography>{item.jsonb_data?.message}</Typography>
                      </ShowCode.When>
                      <ShowCode.When
                        isTrue={
                          item.progress_type === 'call_completed' &&
                          Boolean(item.jsonb_data.length)
                        }
                      >
                        <Stack
                          maxHeight={400}
                          overflow={'auto'}
                          direction={'column'}
                          gap={2}
                          p={1}
                        >
                          <Typography variant='body1'>Transcript</Typography>
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
                              return (
                                <Stack gap={1} key={i}>
                                  <TranscriptCard
                                    isBackgroundActive={ele.id !== PhoneAgentId}
                                    slotAgent={
                                      <Stack width={150}>
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
                                            <PanelMemberPill
                                              isCloseVisible={false}
                                              textMemberName={
                                                receiver?.first_name +
                                                ' ' +
                                                receiver?.last_name
                                              }
                                              slotImage={
                                                <MuiAvatar
                                                  height={'25px'}
                                                  width={'25px'}
                                                  src={receiver?.avatar}
                                                  variant='circular'
                                                  fontSize='14px'
                                                  level={capitalize(
                                                    receiver?.first_name +
                                                      ' ' +
                                                      receiver?.last_name,
                                                  )}
                                                />
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
                        </Stack>
                      </ShowCode.When>
                      <ShowCode.When
                        isTrue={item.progress_type === 'interview_schedule'}
                      >
                        {item.jsonb_data &&
                          item.jsonb_data.length &&
                          (
                            item.jsonb_data as {
                              name: string;
                              created_at: string;
                            }[]
                          ).map((ele, i) => {
                            return (
                              <Stack width={400} key={i}>
                                <InviteLinkCard
                                  textDate={
                                    <>{dayjs(ele.created_at).format('DD')}</>
                                  }
                                  textDay={dayjs(ele.created_at).format('ddd')}
                                  textMonth={dayjs(ele.created_at).format(
                                    'MMM',
                                  )}
                                  slotInvitePills={
                                    <>
                                      <InvitePills
                                        textTime={'9:30-10:30'}
                                        textTitle={ele.name}
                                      />
                                      <PanelMemberPill
                                        slotImage={
                                          <MuiAvatar
                                            variant='circular'
                                            level={'Chinmai c r'}
                                            fontSize='12px'
                                            width='100%'
                                            height='100%'
                                          />
                                        }
                                        isCloseVisible={false}
                                        textMemberName='Chinmai c r'
                                      />
                                    </>
                                  }
                                />
                              </Stack>
                            );
                          })}
                      </ShowCode.When>
                    </ShowCode>
                  }
                />
              );
            })
          : null}
      </ShowCode.When>
      <ShowCode.Else>Progress not found!</ShowCode.Else>
    </ShowCode>
  );
}

export default SubTaskProgress;

export const useEmailAgentLog = () => {
  const { selectedSubTaskId } = useTaskStatesContext();
  const queryClient = useQueryClient();
  const query = useQuery({
    queryKey: ['email_Agent_Logs'],
    queryFn: () => getEmailAgentLogs(selectedSubTaskId),
  });
  const refetch = () =>
    queryClient.invalidateQueries({
      queryKey: ['email_Agent_Logs'],
    });
  return { ...query, refetch };
};

async function getEmailAgentLogs(selectedSubTaskId: string) {
  const { data, error } = await supabase
    .from('scheduling-agent-chat-history')
    .select()
    .eq('sub_task_id', selectedSubTaskId);
  if (error) throw Error(error.message);
  else return data;
}

// phone log

export const usePhoneAgentLog = () => {
  const { selectedSubTaskId } = useTaskStatesContext();
  const queryClient = useQueryClient();
  const query = useQuery({
    queryKey: ['phone_agent_logs'],
    queryFn: () => getPhoneAgentLogs(selectedSubTaskId),
  });
  const refetch = () =>
    queryClient.invalidateQueries({
      queryKey: ['phone_agent_logs'],
    });
  return { ...query, refetch };
};

async function getPhoneAgentLogs(selectedSubTaskId: string) {
  const { data, error } = await supabase
    .from('scheduling-agent-chat-history')
    .select()
    .eq('sub_task_id', selectedSubTaskId);
  if (error) throw Error(error.message);
  else return data;
}

export function PhoneAgentIcon() {
  return (
    <svg
      width='24'
      height='24'
      viewBox='0 0 24 24'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
    >
      <path
        d='M14.8125 12.4453L17.4375 13.5703C17.6406 13.6641 17.7969 13.8125 17.9062 14.0156C18 14.2031 18.0234 14.4062 17.9766 14.625L17.4141 17.25C17.2891 17.7188 16.9844 17.9688 16.5 18C16.3594 18 16.2188 18 16.0781 18C15.9688 17.9844 15.8594 17.9766 15.75 17.9766C13.9219 17.8203 12.2734 17.2656 10.8047 16.3125C9.33594 15.3594 8.17188 14.1172 7.3125 12.5859C6.45312 11.0703 6.01562 9.375 6 7.5C6.03125 7.01562 6.28125 6.71094 6.75 6.58594L9.375 6.02344C9.59375 5.97656 9.79688 6.00781 9.98438 6.11719C10.1875 6.21094 10.3359 6.35938 10.4297 6.5625L11.5547 9.1875C11.7109 9.60938 11.6172 9.97656 11.2734 10.2891L10.3359 11.0625C10.9766 12.1562 11.8438 13.0234 12.9375 13.6641L13.7109 12.7266C14.0234 12.3828 14.3906 12.2891 14.8125 12.4453ZM16.5 17.25C16.5938 17.25 16.6562 17.2031 16.6875 17.1094L17.25 14.4844C17.2656 14.375 17.2266 14.3047 17.1328 14.2734L14.5078 13.1484C14.4297 13.1172 14.3594 13.1328 14.2969 13.1953L13.5234 14.1562C13.2422 14.4375 12.9219 14.4922 12.5625 14.3203C11.3438 13.6172 10.3828 12.6562 9.67969 11.4375C9.50781 11.0781 9.5625 10.7578 9.84375 10.4766L10.8047 9.70312C10.8672 9.64062 10.8828 9.57031 10.8516 9.49219L9.72656 6.86719C9.67969 6.77344 9.60938 6.73438 9.51562 6.75L6.89062 7.3125C6.79688 7.34375 6.75 7.40625 6.75 7.5C6.76562 9.3125 7.21094 10.9531 8.08594 12.4219C8.94531 13.8906 10.1094 15.0547 11.5781 15.9141C13.0469 16.7891 14.6875 17.2344 16.5 17.25Z'
        fill='#FF6224'
      />
      <path
        d='M16.8947 6.50177L16.8948 6.50178L17.5533 6.66667L16.8948 6.83155L16.8947 6.83156L16.8642 6.8392C16.4101 6.95297 16.0547 7.04203 15.7729 7.14322C15.4806 7.24815 15.2527 7.371 15.0616 7.56075L15.0612 7.5612C14.871 7.75137 14.7481 7.97966 14.6432 8.2721C14.5424 8.553 14.4537 8.90719 14.3406 9.35855L14.3316 9.39474L14.3316 9.39477L14.1667 10.0533L14.0018 9.39477L14.0018 9.39474L13.9941 9.36424C13.8804 8.91014 13.7913 8.55469 13.6901 8.27287C13.5852 7.98061 13.4623 7.75267 13.2726 7.56165L13.2721 7.5612C13.082 7.37103 12.8537 7.2481 12.5612 7.1432C12.2803 7.04244 11.9261 6.9537 11.4748 6.84063C11.4628 6.83762 11.4507 6.8346 11.4386 6.83156L11.4386 6.83155L10.7801 6.66667L11.4386 6.50178L11.4386 6.50177L11.4691 6.49413C11.9232 6.38036 12.2786 6.2913 12.5605 6.19011C12.8527 6.08518 13.0807 5.96233 13.2717 5.77258L13.2721 5.77214C13.4623 5.58196 13.5852 5.35367 13.6901 5.06123C13.7909 4.78034 13.8796 4.42615 13.9927 3.9748L14.0018 3.9386L14.0018 3.93857L14.1667 3.28006L14.3316 3.93857L14.3316 3.9386L14.3392 3.96909C14.453 4.42319 14.542 4.77864 14.6432 5.06046C14.7482 5.35272 14.871 5.58067 15.0607 5.77169L15.0612 5.77214C15.2514 5.96231 15.4797 6.08524 15.7721 6.19013C16.053 6.29089 16.4072 6.37963 16.8585 6.4927L16.8947 6.50177Z'
        fill='#FF6224'
        stroke='white'
        stroke-width='0.378947'
      />
    </svg>
  );
}

export function EmailAgentIcon() {
  return (
    <svg
      width='25'
      height='24'
      viewBox='0 0 25 24'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
    >
      <path
        d='M6 7C5.70833 7 5.46875 7.09375 5.28125 7.28125C5.09375 7.46875 5 7.70833 5 8V9.25L11.125 13.7188C11.7083 14.1146 12.2917 14.1146 12.875 13.7188L19 9.25V8C19 7.70833 18.9062 7.46875 18.7188 7.28125C18.5312 7.09375 18.2917 7 18 7H6ZM5 10.5V16C5 16.2917 5.09375 16.5312 5.28125 16.7188C5.46875 16.9062 5.70833 17 6 17H18C18.2917 17 18.5312 16.9062 18.7188 16.7188C18.9062 16.5312 19 16.2917 19 16V10.5L13.4688 14.5312C13.0312 14.8646 12.5417 15.0312 12 15.0312C11.4583 15.0312 10.9688 14.8646 10.5312 14.5312L5 10.5ZM4 8C4.02083 7.4375 4.21875 6.96875 4.59375 6.59375C4.96875 6.21875 5.4375 6.02083 6 6H18C18.5625 6.02083 19.0312 6.21875 19.4062 6.59375C19.7812 6.96875 19.9792 7.4375 20 8V16C19.9792 16.5625 19.7812 17.0312 19.4062 17.4062C19.0312 17.7812 18.5625 17.9792 18 18H6C5.4375 17.9792 4.96875 17.7812 4.59375 17.4062C4.21875 17.0312 4.02083 16.5625 4 16V8Z'
        fill='#FF6224'
      />
      <path
        d='M22.9395 8.71844L22.9395 8.71845L24.0639 9L22.9395 9.28155L22.9395 9.28156L22.8975 9.29208C22.2419 9.45634 21.732 9.5841 21.3283 9.72903C20.9111 9.87884 20.5895 10.0528 20.3208 10.3197L20.3203 10.3203C20.0529 10.5877 19.8788 10.9097 19.729 11.3272C19.5847 11.7295 19.4574 12.2376 19.2941 12.8892L19.2816 12.9395L19.2815 12.9395L19 14.0639L18.7185 12.9395L18.7184 12.9395L18.7079 12.8975C18.5437 12.2419 18.4159 11.732 18.271 11.3283C18.1212 10.9111 17.9472 10.5895 17.6803 10.3208L17.6797 10.3203C17.4123 10.0529 17.0903 9.87877 16.6728 9.72901C16.2705 9.5847 15.7624 9.4574 15.1108 9.29415L15.0605 9.28156L15.0605 9.28155L13.9361 9L15.0605 8.71845L15.0605 8.71844L15.1025 8.70793C15.7581 8.54366 16.268 8.4159 16.6717 8.27097C17.0889 8.12116 17.4105 7.94716 17.6792 7.68026L17.6797 7.67972C17.9471 7.4123 18.1212 7.09033 18.271 6.67282C18.4153 6.2705 18.5426 5.7624 18.7059 5.11079L18.7184 5.06053L18.7185 5.06049L19 3.93608L19.2815 5.06049L19.2816 5.06053L19.2921 5.1025C19.4563 5.75813 19.5841 6.26804 19.729 6.6717C19.8788 7.08893 20.0528 7.41049 20.3197 7.67918L20.3203 7.67972C20.5877 7.94714 20.9097 8.12123 21.3272 8.27099C21.7295 8.4153 22.2376 8.5426 22.8892 8.70585L22.9395 8.71844Z'
        fill='#FF6224'
        stroke='white'
        stroke-width='0.454737'
      />
    </svg>
  );
}
