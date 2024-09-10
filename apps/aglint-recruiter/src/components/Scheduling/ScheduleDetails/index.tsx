// import Feedback from './Feedback';
import { GlobalBanner } from '@devlink2/GlobalBanner';
import { PageLayout } from '@devlink2/PageLayout';

import { WorkflowConnectedCard } from '@devlink3/WorkflowConnectedCard';
import { Stack, Typography } from '@mui/material';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

import { useAuthDetails } from '@/context/AuthContext/AuthContext';
import { useBreadcrumContext } from '@/context/BreadcrumContext/BreadcrumContext';
import { useRolesAndPermissions } from '@/context/RolesAndPermissions/RolesAndPermissionsContext';
import { useKeyPress } from '@/hooks/useKeyPress';
import ROUTES from '@/utils/routing/routes';
import { capitalizeFirstLetter } from '@/utils/text/textUtils';

import Loader from '../../Common/Loader';
import ButtonGroup from './ButtonGroup';
import DetailsOverview from './DetailsOverview';
import { useScheduleDetails } from './hooks';
import Requests from './Requests';
import { Skeleton } from '@components/ui/skeleton';

function SchedulingViewComp() {
  const router = useRouter();
  const { recruiterUser } = useAuthDetails();
  const { checkPermissions } = useRolesAndPermissions();
  const { data, refetch, isLoading } = useScheduleDetails();
  const [isCancelOpen, setIsCancelOpen] = useState(false);

  const schedule = data?.schedule_data;
  const job = schedule?.job;

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
            ? ROUTES['/scheduling']() + `?tab=matrics`
            : ROUTES['/scheduling']() + `?tab=my_interviews`,
        },
        {
          name: 'Schedules',
          route: checkPermissions(['scheduling_actions'])
            ? ROUTES['/scheduling']() + `?tab=schedules`
            : ROUTES['/scheduling']() + `?tab=my_interviews`,
        },
        {
          name: `${schedule.interview_session.name}`.trim(),
        },
      ]);
    }
  }, [data?.schedule_data?.candidates.id]);

  const isMeetingJobHiringTeam =
    schedule?.hiring_manager?.user_id === recruiterUser.user_id ||
    schedule?.organizer?.user_id === recruiterUser.user_id ||
    schedule?.recruiter?.user_id === recruiterUser.user_id;

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
      <PageLayout
        slotTopbarLeft={
          isLoading ? (
            <div className='w-[150px] h-[20px]'>
              <Skeleton className='w-full h-full' />
            </div>
          ) : (
            <>{breadcrum}</>
          )
        }
        slotBody={
          <Stack height={'calc(100vh - 48px)'} overflow={'hidden'}>
            {!isLoading ? (
              <Stack direction={'row'} justifyContent={'space-between'}>
                <Stack height={'100vh'} overflow={'auto'} width={'100%'}>
                  {data?.schedule_data ? (
                    <DetailsOverview
                      data={data}
                      refetch={refetch}
                      isCancelOpen={isCancelOpen}
                      setIsCancelOpen={setIsCancelOpen}
                      viewScheduleTabs={viewScheduleTabs}
                    />
                  ) : (
                    <Stack padding={2}>
                      <GlobalBanner
                        textTitle={'Meeting Not Found'}
                        iconName={'schedule'}
                        isDescriptionVisible={false}
                        isAdditionalNotes={false}
                        slotButtons={<></>}
                      />
                    </Stack>
                  )}
                </Stack>

                {checkPermissions(['scheduling_actions']) && (
                  <Stack
                    height={'calc(100vh - 48px)'}
                    minWidth={'400px'}
                    overflow={'auto'}
                    p={'var(--space-4)'}
                    sx={{
                      borderLeft: '1px solid',
                      borderColor: 'var(--neutral-6)',
                    }}
                  >
                    <Stack mb={2} direction={'column'} spacing={1}>
                      <Typography fontWeight={500}>Job</Typography>
                      <WorkflowConnectedCard
                        isLinkOffVisible={false}
                        textRoleCategory={
                          capitalizeFirstLetter(job?.departments?.name) || '--'
                        }
                        role={job.job_title || '--'}
                        textLocation={
                          !job.office_locations?.city ||
                          !job.office_locations?.country
                            ? '--'
                            : `${job.office_locations?.city}, ${job.office_locations?.country}`
                        }
                        onClickJob={{
                          onClick: () => {
                            window.open(
                              `/jobs/${job.id}?section=interview`,
                              '_blank',
                            );
                          },
                        }}
                        // textRoleCategory={job.}
                      />
                    </Stack>
                    <Requests session_id={schedule?.interview_session?.id} />
                  </Stack>
                )}
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
          />
        }
      />
    </>
  );
}

export default SchedulingViewComp;
