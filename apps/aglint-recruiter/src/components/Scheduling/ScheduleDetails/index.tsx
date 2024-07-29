// import Feedback from './Feedback';
import { Stack } from '@mui/material';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

import { PageLayout } from '@/devlink2/PageLayout';
import { useAuthDetails } from '@/src/context/AuthContext/AuthContext';
import { useBreadcrumContext } from '@/src/context/BreadcrumContext/BreadcrumContext';
import { useRolesAndPermissions } from '@/src/context/RolesAndPermissions/RolesAndPermissionsContext';
import { useKeyPress } from '@/src/hooks/useKeyPress';
import ROUTES from '@/src/utils/routing/routes';

import Loader from '../../Common/Loader';
import { useAllActivities } from '../CandidateDetails/queries/hooks';
import RightPanel from '../CandidateDetails/RightPanel';
import ButtonGroup from './ButtonGroup';
import DetailsOverview from './DetailsOverview';
import { useScheduleDetails } from './hooks';

function SchedulingViewComp() {
  const router = useRouter();
  const { recruiterUser } = useAuthDetails();
  const { checkPermissions } = useRolesAndPermissions();
  const { data, refetch, isLoading } = useScheduleDetails();
  const [isCancelOpen, setIsCancelOpen] = useState(false);

  const schedule = data?.schedule_data;

  const viewScheduleTabs = [
    { name: 'Candidate Details', tab: 'candidate_details', hide: false },
    { name: 'Job Details', tab: 'job_details', hide: false },
    { name: 'Instructions', tab: 'instructions', hide: false },
    {
      name: 'Feedback',
      tab: 'feedback',
      hide: schedule?.interview_session?.session_type === 'debrief',
    },
  ];

  const { breadcrum, setBreadcrum } = useBreadcrumContext();

  useEffect(() => {
    if (data?.schedule_data?.candidates.id) {
      setBreadcrum([
        {
          name: 'Scheduling',
          route: checkPermissions(['scheduling_settings_and_reports'])
            ? ROUTES['/scheduling']() + `?tab=dashboard`
            : ROUTES['/scheduling']() + `?tab=myschedules`,
        },
        {
          name: 'Schedules',
          route: checkPermissions(['scheduling_actions'])
            ? ROUTES['/scheduling']() + `?tab=schedules`
            : ROUTES['/scheduling']() + `?tab=myschedules`,
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

  const allActivities = useAllActivities({
    application_id: schedule?.schedule?.application_id,
    session_id: schedule?.interview_session?.id,
  });

  return (
    <>
      <PageLayout
        slotTopbarLeft={<>{breadcrum}</>}
        slotBody={
          <Stack height={'calc(100vh - 48px)'} overflow={'hidden'}>
            {!isLoading ? (
              <Stack direction={'row'} justifyContent={'space-between'}>
                <Stack height={'100vh'} overflow={'auto'} width={'100%'}>
                  <DetailsOverview
                    data={data}
                    refetch={refetch}
                    isCancelOpen={isCancelOpen}
                    setIsCancelOpen={setIsCancelOpen}
                    viewScheduleTabs={viewScheduleTabs}
                  />
                </Stack>

                <Stack
                  height={'100vh'}
                  minWidth={'400px'}
                  overflow={'auto'}
                  p={'var(--space-4)'}
                  sx={{
                    borderLeft: '1px solid',
                    borderColor: 'var(--neutral-6)',
                  }}
                >
                  <RightPanel allActivities={allActivities} />
                </Stack>
              </Stack>
            ) : (
              <Loader />
            )}
          </Stack>
        }
        slotTopbarRight={
          <ButtonGroup
            setIsCancelOpen={setIsCancelOpen}
            isMeetingJobHiringTeam={isMeetingJobHiringTeam}
            schedule={schedule}
          />
        }
      />
    </>
  );
}

export default SchedulingViewComp;
