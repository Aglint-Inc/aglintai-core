import { Stack, Typography } from '@mui/material';
import { useRouter } from 'next/router';

import { ButtonSurface } from '@/devlink/ButtonSurface';
import { GlobalEmptyState } from '@/devlink/GlobalEmptyState';
import { InterviewerDetailOverview } from '@/devlink3/InterviewerDetailOverview';
import { InterviewLoadCard } from '@/devlink3/InterviewLoadCard';
import Loader from '@/src/components/Common/Loader';

import ScheduleMeetingCard from '../../../Common/ModuleSchedules/ScheduleMeetingCard';
import IconPlusFilter from '../../../Schedules/Filters/FilterChip/IconPlusFilter';
import { SchedulesSupabase } from '../../../schedules-query';
import { useModuleRelations } from '../hooks';
import DeleteMemberDialog from '../Popups/DeleteDialog';
import PauseDialog from '../Popups/PauseDialog';
import ResumeDialog from '../Popups/ResumeDialog';
import { setAddInterviewType, setIsAddInterviewTypeDialogOpen } from '../store';
import TrainingInterviewerType from '../TabModules/TrainingInterviewerType';

function Overview({
  scheduleList,
  interviewerDetails,
  totalHoursThisWeek,
  totalHoursToday,
  totalInterviewsThisWeek,
  totalInterviewsToday,
}: {
  scheduleList: SchedulesSupabase;
  interviewerDetails;
  totalHoursThisWeek: number;
  totalHoursToday: number;
  totalInterviewsThisWeek: number;
  totalInterviewsToday: number;
}) {
  const router = useRouter();
  const upcomingScheduleList =
    scheduleList?.filter((item) => item.status === 'confirmed') || [];

  const user_id = router?.query?.user_id as string;
  const {
    data,
    isLoading,
    refetch: deleteRefetch,
  } = useModuleRelations({
    user_id,
  });
  const trainingModulesList = data?.filter(
    (rel) => rel.module_training_status === 'training' && !rel.is_archived,
  );

  return (
    <>
      <PauseDialog />
      <ResumeDialog />
      <DeleteMemberDialog refetch={deleteRefetch} />
      <Stack m={2}>
        <Typography fontWeight={500} pb={1}>
          Interview Load
        </Typography>
        <Stack direction={'row'} spacing={2} width={'400px'}>
          <Stack width={'200px'}>
            <InterviewLoadCard
              textHeading='Today'
              textLabel={
                interviewerDetails?.scheduling_settings?.interviewLoad
                  ?.dailyLimit.type === 'Interviews'
                  ? 'Interview'
                  : 'Hour'
              }
              textInterviewCounts={
                interviewerDetails?.scheduling_settings?.interviewLoad
                  ?.dailyLimit.type === 'Interviews'
                  ? totalInterviewsToday +
                      ' / ' +
                      interviewerDetails.scheduling_settings?.interviewLoad
                        ?.dailyLimit.value || 0
                  : totalHoursToday +
                      ' / ' +
                      interviewerDetails.scheduling_settings?.interviewLoad
                        ?.dailyLimit.value || 0
              }
            />
          </Stack>
          <Stack width={'200px'}>
            <InterviewLoadCard
              textHeading='This Week'
              textLabel={
                interviewerDetails?.scheduling_settings?.interviewLoad
                  ?.weeklyLimit.type === 'Interviews'
                  ? 'Interview'
                  : 'Hour'
              }
              textInterviewCounts={
                interviewerDetails?.scheduling_settings?.interviewLoad
                  ?.weeklyLimit.type === 'Interviews'
                  ? totalInterviewsThisWeek +
                      ' / ' +
                      interviewerDetails.scheduling_settings?.interviewLoad
                        ?.weeklyLimit.value || 0
                  : totalHoursThisWeek +
                      ' / ' +
                      interviewerDetails.scheduling_settings?.interviewLoad
                        ?.weeklyLimit.value || 0
              }
            />
          </Stack>
          {/* <InterviewLoadCard textHeading='This Month' />
          <InterviewLoadCard textHeading='All month' /> */}
        </Stack>
      </Stack>
      <InterviewerDetailOverview
        slotButtonSchedule={
          upcomingScheduleList?.length ? (
            <ButtonSurface
              textButton='View all'
              size={1}
              onClickButton={{
                onClick: () => {
                  router.push(
                    `/user/profile/${user_id}?profile=true&tab=allschedules`,
                  );
                },
              }}
            />
          ) : (
            <></>
          )
        }
        slotButtonTraining={
          trainingModulesList?.length ? (
            <ButtonSurface
              textButton='View all'
              size={1}
              onClickButton={{
                onClick: () => {
                  router.push(
                    `/user/profile/${user_id}?profile=true&tab=interviewtypes`,
                  );
                },
              }}
            />
          ) : (
            <></>
          )
        }
        slotUpcomingSchedule={
          upcomingScheduleList.length > 0 ? (
            upcomingScheduleList.map((meetingDetails, i) => {
              return (
                <ScheduleMeetingCard key={i} meetingDetails={meetingDetails} />
              );
            })
          ) : (
            <GlobalEmptyState
              textDesc='No upcoming schedules found.'
              size={6}
              iconName='event'
            />
          )
        }
        slotTrainingModules={
          !isLoading ? (
            <>
              {trainingModulesList.length ? (
                <>
                  {trainingModulesList.map((relation) => {
                    return (
                      <TrainingInterviewerType
                        relation={relation}
                        key={relation.id}
                      />
                    );
                  })}
                </>
              ) : (
                <>
                  <GlobalEmptyState
                    textDesc='No Interview type found.'
                    size={6}
                    iconName='school'
                  />
                </>
              )}
              <Stack direction={'row'} pt={'var(--space-2)'}>
                <ButtonSurface
                  size={1}
                  isRightIcon={false}
                  slotIcon={<IconPlusFilter />}
                  textButton={'Add'}
                  onClickButton={{
                    onClick: () => {
                      setAddInterviewType('training');
                      setIsAddInterviewTypeDialogOpen(true);
                    },
                  }}
                />
              </Stack>
            </>
          ) : (
            <Loader />
          )
        }
      />
    </>
  );
}

export default Overview;
