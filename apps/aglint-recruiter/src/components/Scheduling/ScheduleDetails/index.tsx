// import Feedback from './Feedback';
import { DatabaseTable } from '@aglint/shared-types';
import { Stack } from '@mui/material';
import { useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

import { PageLayout } from '@/devlink2/PageLayout';
import { NewTabPill } from '@/devlink3/NewTabPill';
import { ScheduleDetailTabs } from '@/devlink3/ScheduleDetailTabs';
import { useAuthDetails } from '@/src/context/AuthContext/AuthContext';
import { useBreadcrumContext } from '@/src/context/BreadcrumContext/BreadcrumContext';
import { useKeyPress } from '@/src/hooks/useKeyPress';
import ROUTES from '@/src/utils/routing/routes';
import { supabase } from '@/src/utils/supabase/client';
import toast from '@/src/utils/toast';

import Loader from '../../Common/Loader';
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
import ButtonGroup from './Overview/ButtonGroup';
import RequestRescheduleDialog from './RequestRescheduleDialog';
import RescheduleDialog from './RescheduleDialog';
import { fetchFilterJson } from './utils';

function SchedulingViewComp() {
  const router = useRouter();
  const { recruiterUser } = useAuthDetails();
  const { data, refetch, isLoading } = useScheduleDetails();
  const [isChangeInterviewerOpen, setIsChangeInterviewerOpen] = useState(false);
  const [isCancelOpen, setIsCancelOpen] = useState(false);
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

  const schedule = data?.schedule_data;
  const cancelReasons = data?.cancel_data?.filter(
    (item) =>
      !item.interview_session_cancel.cancel_user_id &&
      item.interview_session_cancel.is_ignored === false &&
      item.interview_session_cancel.is_resolved === false,
  );

  const viewScheduleTabs = [
    { name: 'Candidate Details', tab: 'candidate_details', hide: false },
    { name: 'Job Details', tab: 'job_details', hide: false },
    { name: 'Instructions', tab: 'instructions', hide: false },
    {
      name: 'Feedback',
      tab: 'feedback',
      hide: false,
    },
  ];
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

  const { breadcrum, setBreadcrum } = useBreadcrumContext();
  useEffect(() => {
    if (data?.schedule_data?.candidates.id) {
      setBreadcrum([
        {
          name: 'Scheduling',
          route: ROUTES['/scheduling']() + `?tab=dashboard`,
        },
        {
          name: 'Schedules',
          route: ROUTES['/scheduling']() + `?tab=schedules`,
        },
        {
          name: `${data.schedule_data.schedule.schedule_name}`.trim(),
        },
      ]);
    }
  }, [data?.schedule_data?.candidates.id]);

  const isMeetingJobHiringTeam =
    schedule?.hiring_manager?.id === recruiterUser.user_id ||
    schedule?.organizer?.id === recruiterUser.user_id ||
    schedule?.recruiting_coordinator?.id === recruiterUser.user_id ||
    schedule?.recruiter?.id === recruiterUser.user_id;

  // if logged in user is interviewer session relation will be there or else null
  const [sessionRelation, setSessionRelation] = useState<
    DatabaseTable['interview_session_relation'] | null
  >();

  useEffect(() => {
    if (schedule?.users) {
      setSessionRelation(
        schedule?.users?.find((user) => user.email === recruiterUser.email)
          ?.interview_session_relation,
      );
    }
  }, [schedule?.users]);
  // if logged in user is interviewer session relation will be there or else null

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

  const sections = viewScheduleTabs
    .filter(
      (item) =>
        !item.hide &&
        (item.tab !== 'feedback' ||
          schedule?.interview_meeting?.status === 'completed'),
    )
    .map((item) => item.tab);

  const tabCount: number = sections.length - 1;
  const currentTab: string = router.query.tab as string;
  const currentIndex: number = sections.indexOf(currentTab);

  const handlePrevious = () => {
    const pre =
      // eslint-disable-next-line security/detect-object-injection
      currentIndex === 0 ? sections[tabCount] : sections[currentIndex - 1];

    router.replace(
      `/scheduling/view?meeting_id=${router.query.meeting_id}&tab=${pre}`,
    );
  };
  const handleNext = () => {
    const next =
      currentIndex === tabCount ? sections[0] : sections[currentIndex + 1];

    router.replace(
      `/scheduling/view?meeting_id=${router.query.meeting_id}&tab=${next}`,
    );
  };

  const { pressed: right } = useKeyPress('ArrowRight');
  const { pressed: left } = useKeyPress('ArrowLeft');

  useEffect(() => {
    if (left) handlePrevious();
    else if (right) handleNext();
  }, [left, right]);

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <>
          <PageLayout
            slotTopbarLeft={<>{breadcrum}</>}
            slotBody={
              <ScheduleDetailTabs
                slotScheduleTabOverview={
                  <Stack spacing={'var(--space-4)'}>
                    {(recruiterUser.role === 'admin' ||
                      recruiterUser.role === 'recruiter' ||
                      recruiterUser.role === 'hiring manager') && (
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
                      />
                    )}
                    <Overview schedule={schedule} />
                  </Stack>
                }
                slotDarkPills={viewScheduleTabs
                  .filter(
                    (item) =>
                      !item.hide &&
                      (item.tab !== 'feedback' ||
                        schedule?.interview_meeting?.status === 'completed'),
                  )
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
                        router.query.tab === 'candidate_details' ||
                        !router.query.tab
                      }
                    >
                      {schedule && (
                        <CandidateInfo
                          application_id={schedule.schedule.application_id}
                          job_id={schedule.job.id}
                        />
                      )}
                    </ShowCode.When>
                    <ShowCode.When isTrue={router.query.tab === 'instructions'}>
                      <Instructions
                        instruction={
                          schedule?.interview_meeting.instructions as string
                        }
                        setTextValue={setTextValue}
                        showEditButton={
                          recruiterUser.role === 'admin' ||
                          recruiterUser.role === 'recruiter' ||
                          schedule?.schedule.coordinator_id ===
                            recruiterUser.user_id
                        }
                        updateInstruction={updateInstruction}
                      />
                    </ShowCode.When>
                    <ShowCode.When isTrue={router.query.tab === 'feedback'}>
                      <Stack margin={'var(--space-4)'}>
                        <FeedbackWindow
                          interview_sessions={[
                            {
                              id: schedule?.interview_session.id,
                              title: schedule?.interview_session.name,
                              created_at:
                                schedule?.interview_session.created_at,
                              time: {
                                start: schedule?.interview_meeting.start_time,
                                end: schedule?.interview_meeting.end_time,
                              },
                              status: schedule?.interview_meeting.status,
                            },
                          ]}
                          candidate={{
                            email: schedule?.candidates.email,
                            name: `${schedule?.candidates.first_name || ''} ${schedule?.candidates.last_name || ''}`.trim(),
                            job_id: schedule?.job?.id,
                          }}
                        />
                      </Stack>
                    </ShowCode.When>
                    <ShowCode.When isTrue={router.query.tab === 'job_details'}>
                      <JobDetails schedule={schedule} />
                    </ShowCode.When>
                  </ShowCode>
                }
              />
            }
            slotTopbarRight={
              <ButtonGroup
                setIsCancelOpen={setIsCancelOpen}
                isMeetingJobHiringTeam={isMeetingJobHiringTeam}
                cancelReasons={cancelReasons}
                schedule={schedule}
                setIsRequestRescheduleOpen={setIsRequestRescheduleOpen}
                setIsRescheduleOpen={setIsRescheduleOpen}
              />
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
        </>
      )}
    </>
  );
}

export default SchedulingViewComp;
