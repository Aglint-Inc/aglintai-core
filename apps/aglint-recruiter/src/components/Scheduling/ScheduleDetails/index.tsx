// import Feedback from './Feedback';
import { Stack } from '@mui/material';
import { useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

import { PageLayout } from '@/devlink2/PageLayout';
import { NewTabPill } from '@/devlink3/NewTabPill';
import { ScheduleDetailTabs } from '@/devlink3/ScheduleDetailTabs';
import { useAuthDetails } from '@/src/context/AuthContext/AuthContext';
import { useBreadcrumContext } from '@/src/context/BreadcrumContext/BreadcrumContext';
import { useRolesAndPermissions } from '@/src/context/RolesAndPermissions/RolesAndPermissionsContext';
import ROUTES from '@/src/utils/routing/routes';
import { supabase } from '@/src/utils/supabase/client';
import toast from '@/src/utils/toast';

import Loader from '../../Common/Loader';
import { ShowCode } from '../../Common/ShowCode';
import CandidateInfo from '../Common/CandidateInfo';
import CancelReasonCards from './CancelReasonCards';
import ChangeInterviewerDialog from './ChangeInterviewerDialog';
import FeedbackWindow from './Feedback';
import { useScheduleDetails } from './hooks';
import Instructions from './Instructions';
import JobDetails from './JobDetails';
import Overview from './Overview';

function SchedulingViewComp() {
  const router = useRouter();
  const { recruiterUser } = useAuthDetails();
  const { checkPermissions } = useRolesAndPermissions();
  const { data, isPending, refetch, isFetched } = useScheduleDetails();
  const [isChangeInterviewerOpen, setIsChangeInterviewerOpen] = useState(false);
  const [isCancelOpen, setIsCancelOpen] = useState(false);
  const [cancelUserId, setCancelUserId] = useState('');
  const [textValue, setTextValue] = useState('');

  const schedule = data?.schedule_data;
  const cancelReasons = data?.cancel_data?.filter(
    (item) =>
      !item.interview_session_cancel.cancel_user_id &&
      item.interview_session_cancel.is_ignored === false,
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

  return (
    <ShowCode>
      <ShowCode.When isTrue={isPending || !isFetched}>
        <Loader />
      </ShowCode.When>
      <ShowCode.Else>
        <ChangeInterviewerDialog
          isChangeInterviewerOpen={isChangeInterviewerOpen}
          setIsChangeInterviewerOpen={setIsChangeInterviewerOpen}
          schedule={schedule}
          cancelUserId={cancelUserId}
          setCancelUserId={setCancelUserId}
        />
        <PageLayout
          slotTopbarLeft={<>{breadcrum}</>}
          slotBody={
            <ScheduleDetailTabs
              slotScheduleTabOverview={
                <Stack spacing={'var(--space-4)'}>
                  {checkPermissions(['scheduler_create']) && (
                    <CancelReasonCards
                      cancelReasons={cancelReasons}
                      schedule={schedule}
                      setCancelUserId={setCancelUserId}
                      cancelUserId={cancelUserId}
                      setIsChangeInterviewerOpen={setIsChangeInterviewerOpen}
                    />
                  )}
                  <Overview
                    refetch={refetch}
                    cancelReasons={cancelReasons}
                    schedule={schedule}
                    isCancelOpen={isCancelOpen}
                    setIsCancelOpen={setIsCancelOpen}
                  />
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
                        schedule.schedule.coordinator_id ===
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
                            created_at: schedule?.interview_session.created_at,
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
        />
      </ShowCode.Else>
    </ShowCode>
  );
}

export default SchedulingViewComp;
