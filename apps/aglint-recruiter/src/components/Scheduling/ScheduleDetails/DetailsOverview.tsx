import { DatabaseTable } from '@aglint/shared-types';
import { Stack, Typography } from '@mui/material';
import { useQueryClient } from '@tanstack/react-query';
import { capitalize } from 'lodash';
import { useRouter } from 'next/router';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';

import { ButtonSolid } from '@/devlink/ButtonSolid';
import { GlobalBadge } from '@/devlink/GlobalBadge';
import { GlobalEmptyState } from '@/devlink/GlobalEmptyState';
import { GlobalBanner } from '@/devlink2/GlobalBanner';
import { NewTabPill } from '@/devlink3/NewTabPill';
import { ScheduleDetailTabs } from '@/devlink3/ScheduleDetailTabs';
import { useAuthDetails } from '@/src/context/AuthContext/AuthContext';
import { supabase } from '@/src/utils/supabase/client';
import { capitalizeAll } from '@/src/utils/text/textUtils';
import toast from '@/src/utils/toast';

import { ShowCode } from '../../Common/ShowCode';
import CandidateInfo from '../Common/CandidateInfo';
import Banners from './Banners';
import CancelScheduleDialog from './CancelScheduleDialog';
import ChangeInterviewerDialog from './ChangeInterviewerDialog';
import DeclineScheduleDialog from './DeclineScheduleDialog';
import FeedbackWindow from './Feedback';
import { useScheduleDetails } from './hooks';
import Instructions from './Instructions';
import JobDetails from './JobDetails';
import Overview from './Overview';
import RequestRescheduleDialog from './RequestRescheduleDialog';
import RescheduleDialog from './RescheduleDialog';
import { fetchFilterJson } from './utils';

function DetailsOverview({
  data,
  refetch,
  isCancelOpen,
  setIsCancelOpen,
  viewScheduleTabs,
}: {
  data: ReturnType<typeof useScheduleDetails>['data'];
  refetch: () => void;
  isCancelOpen: boolean;
  setIsCancelOpen: Dispatch<SetStateAction<boolean>>;
  viewScheduleTabs: {
    name: string;
    tab: string;
    hide: boolean;
  }[];
}) {
  const router = useRouter();
  const { recruiterUser } = useAuthDetails();
  const [isChangeInterviewerOpen, setIsChangeInterviewerOpen] = useState(false);
  const [isRequestRescheduleOpen, setIsRequestRescheduleOpen] = useState(false); //role interviewers will ask for reschedule
  const [isRescheduleOpen, setIsRescheduleOpen] = useState(false); // role who have permission to reschedule
  const [isDeclineOpen, setIsDeclineOpen] = useState(false);
  const [cancelUserId, setCancelUserId] = useState('');
  const [textValue, setTextValue] = useState('');
  const [filterJson, setFilterJson] =
    useState<Awaited<ReturnType<typeof fetchFilterJson>>>(null);
  const [requestAvailibility, setRequestAvailibility] = useState<
    DatabaseTable['candidate_request_availability'] | null
  >(null);

  const queryClient = useQueryClient();

  const refetchInstruction = () => {
    queryClient.invalidateQueries({
      queryKey: ['schedule_details', schedule.interview_meeting.id],
    });
  };

  async function updateInstruction() {
    try {
      if (textValue) {
        const { error } = await supabase
          .from('interview_meeting')
          .update({ instructions: textValue })
          .eq('id', schedule.interview_meeting.id);
        if (error) throw Error(error.message);
        refetchInstruction();
        toast.success('Instruction updated successfully.');
      } else {
        toast.warning('Please provide instructions.');
      }
    } catch (error) {
      toast.error(error.message);
    }
  }

  const schedule = data?.schedule_data;
  const cancelReasons = data?.cancel_data?.filter(
    (item) =>
      item.interview_session_cancel.is_ignored === false &&
      item.interview_session_cancel.is_resolved === false,
  );

  useEffect(() => {
    if (schedule?.interview_meeting) {
      if (
        schedule?.interview_meeting.meeting_flow === 'self_scheduling' ||
        schedule?.interview_meeting.meeting_flow === 'debrief' ||
        schedule?.interview_meeting.meeting_flow === 'phone_agent' ||
        schedule?.interview_meeting.meeting_flow === 'mail_agent'
      ) {
        (async () => {
          const res = await fetchFilterJson([schedule.interview_session.id]);
          setFilterJson(res);
        })();
      } else if (
        schedule?.interview_meeting.meeting_flow === 'candidate_request'
      ) {
        fetchRequestAvailibilty();
      }
    }
  }, [schedule?.interview_meeting]);

  const fetchRequestAvailibilty = async () => {
    try {
      const { data } = await supabase
        .from('candidate_request_availability')
        .select('*, request_session_relation(*)')
        .eq('application_id', schedule.schedule.application_id);

      // TODO: verify
      const reqAvail = data.find((item) =>
        item.request_session_relation.some(
          (ses) => ses.session_id === schedule.interview_session.id,
        ),
      );

      setRequestAvailibility(reqAvail);
    } catch (e) {
      //
    }
  };

  // if logged in user is interviewer session relation will be there or else null
  const [sessionRelation, setSessionRelation] = useState<
    DatabaseTable['interview_session_relation'] | null
  >();

  const confirmedUsers = schedule?.users?.filter(
    (user) => user.interview_session_relation.is_confirmed,
  );

  useEffect(() => {
    if (confirmedUsers?.length > 0) {
      setSessionRelation(
        confirmedUsers.find((user) => user.email === recruiterUser.email)
          ?.interview_session_relation,
      );
    }
  }, [confirmedUsers]);
  // if logged in user is interviewer session relation will be there or else null

  const [task, setTask] = useState<DatabaseTable['new_tasks']>();
  const fetchTask = async () => {
    const { data: tasks } = await supabase
      .from('task_session_relation')
      .select('task_id,new_tasks(*)')
      .eq('session_id', schedule.interview_session.id)
      .order('new_tasks(created_at)', { ascending: false });
    if (tasks?.length) setTask(tasks[0].new_tasks);
  };
  useEffect(() => {
    fetchTask();
  }, []);
  return (
    <Stack pb={'var(--space-8)'}>
      <ScheduleDetailTabs
        slotScheduleTabOverview={
          <Stack spacing={'var(--space-2)'}>
            {((schedule?.interview_meeting.meeting_flow === 'phone_agent' &&
              schedule.interview_meeting.status === 'waiting') ||
              (schedule?.interview_meeting.meeting_flow === 'mail_agent' &&
                schedule.interview_meeting.status === 'waiting')) && (
              <GlobalBanner
                iconName={
                  schedule?.interview_meeting.meeting_flow === 'phone_agent'
                    ? 'smartphone'
                    : 'mail'
                }
                textTitle={
                  <Stack direction={'row'} spacing={2}>
                    <Typography>
                      This schedule is handling by{' '}
                      {capitalizeAll(
                        schedule.interview_meeting.meeting_flow.replaceAll(
                          '_',
                          ' ',
                        ),
                      )}
                    </Typography>
                    <GlobalBadge
                      textBadge={capitalize(
                        // eslint-disable-next-line no-unsafe-optional-chaining
                        (task?.status ? task?.status : 'Loading...').replaceAll(
                          '_',
                          ' ',
                        ),
                      )}
                      color={'info'}
                    />
                  </Stack>
                }
                slotButtons={
                  task?.id ? (
                    <ButtonSolid
                      color={'neutral'}
                      textButton='view task'
                      size={1}
                      onClickButton={{
                        onClick: () => {
                          router.push(`/tasks?task_id=${task.id}`);
                        },
                      }}
                    />
                  ) : (
                    <></>
                  )
                }
                textDescription={''}
                color={'info'}
              />
            )}
            {
              <Banners
                cancelReasons={cancelReasons}
                schedule={schedule}
                setCancelUserId={setCancelUserId}
                cancelUserId={cancelUserId}
                setIsChangeInterviewerOpen={setIsChangeInterviewerOpen}
                filterJson={filterJson}
                requestAvailibility={requestAvailibility}
                sessionRelation={sessionRelation}
                refetch={refetch}
                setIsDeclineOpen={setIsDeclineOpen}
                setIsRequestRescheduleOpen={setIsRequestRescheduleOpen}
              />
            }
            <Overview schedule={schedule} cancelReasons={data?.cancel_data} />
          </Stack>
        }
        slotDarkPills={viewScheduleTabs
          .filter((item) => !item.hide)
          .map((item, i: number) => {
            return (
              <NewTabPill
                textLabel={item.name}
                key={i}
                isPillActive={router.query.tab === item.tab}
                onClickPill={{
                  onClick: () => {
                    router.replace(
                      `/scheduling/view?meeting_id=${router.query.meeting_id}&tab=${item.tab}`,
                    );
                  },
                }}
              />
            );
          })}
        slotTabContent={
          <ShowCode>
            <ShowCode.When
              isTrue={
                router.query.tab === 'candidate_details' || !router.query.tab
              }
            >
              {schedule && (
                <CandidateInfo
                  application_id={schedule.schedule.application_id}
                />
              )}
            </ShowCode.When>
            <ShowCode.When isTrue={router.query.tab === 'instructions'}>
              <Instructions
                instruction={schedule?.interview_meeting.instructions as string}
                setTextValue={setTextValue}
                showEditButton={
                  recruiterUser.role === 'admin' ||
                  recruiterUser.role === 'recruiter' ||
                  schedule?.schedule.coordinator_id === recruiterUser.user_id
                }
                updateInstruction={updateInstruction}
                isBorder={false}
                isPadding={false}
              />
            </ShowCode.When>
            <ShowCode.When isTrue={router.query.tab === 'feedback'}>
              <Stack>
                {schedule?.interview_meeting?.status === 'completed' ? (
                  <FeedbackWindow
                    interview_sessions={[
                      {
                        id: schedule?.interview_session.id,
                        title: schedule?.interview_session.name,
                        created_at: schedule?.interview_session.created_at,
                        time: {
                          start: schedule?.interview_meeting.start_time,
                          end: schedule?.interview_meeting.end_time,
                        },
                        status: schedule?.interview_meeting.status,
                        session_type: schedule?.interview_session.session_type,
                      },
                    ]}
                    candidate={{
                      email: schedule?.candidates.email,
                      name: `${schedule?.candidates.first_name || ''} ${schedule?.candidates.last_name || ''}`.trim(),
                      job_id: schedule?.job?.id,
                    }}
                  />
                ) : (
                  <Stack
                    direction={'row'}
                    width={'100%'}
                    height={'200px'}
                    justifyContent={'center'}
                    alignItems={'center'}
                  >
                    <GlobalEmptyState
                      textDesc='Feedback will be enabled once the interview is completed'
                      iconName='chat'
                    />
                  </Stack>
                )}
              </Stack>
            </ShowCode.When>
            <ShowCode.When isTrue={router.query.tab === 'job_details'}>
              <JobDetails schedule={schedule} />
            </ShowCode.When>
          </ShowCode>
        }
      />
      <>
        <DeclineScheduleDialog
          sessionRelation={sessionRelation}
          isDeclineOpen={isDeclineOpen}
          setIsDeclineOpen={setIsDeclineOpen}
          schedule={schedule}
          refetch={refetch}
        />
        <CancelScheduleDialog
          isDeclineOpen={isCancelOpen}
          setIsDeclineOpen={setIsCancelOpen}
          refetch={refetch}
          metaDetails={[
            {
              application_id: schedule.schedule.application_id,
              meeting_id: schedule.interview_meeting.id,
              session_name: schedule.interview_session.name,
              session_id: schedule.interview_session.id,
            },
          ]}
          closeDialog={() => {}}
          application_log_id={null}
        />
        <RequestRescheduleDialog
          isRequestRescheduleOpen={isRequestRescheduleOpen}
          setIsRequestRescheduleOpen={setIsRequestRescheduleOpen}
          sessionRelation={sessionRelation}
          schedule={schedule}
          refetch={refetch}
        />
        <RescheduleDialog
          refetch={() => {}}
          isRescheduleOpen={isRescheduleOpen}
          setIsRescheduleOpen={setIsRescheduleOpen}
          application_id={schedule.schedule.application_id}
          meeting_id={schedule.interview_meeting.id}
          session_id={schedule.interview_session.id}
          meeting_flow={schedule.interview_meeting.meeting_flow}
          session_name={schedule.interview_session.name}
        />
        <ChangeInterviewerDialog
          isChangeInterviewerOpen={isChangeInterviewerOpen}
          setIsChangeInterviewerOpen={setIsChangeInterviewerOpen}
          schedule={schedule}
          cancelUserId={cancelUserId}
          setCancelUserId={setCancelUserId}
        />
      </>
    </Stack>
  );
}

export default DetailsOverview;
