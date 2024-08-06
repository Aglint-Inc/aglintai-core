import { Stack, Typography } from '@mui/material';
import { useRouter } from 'next/router';

import { ButtonSurface } from '@/devlink/ButtonSurface';
import { GlobalEmptyState } from '@/devlink/GlobalEmptyState';
import { InterviewerDetailOverview } from '@/devlink3/InterviewerDetailOverview';
import Heatmap from '@/src/components/Common/Heatmap/HeatmapUser';
import Loader from '@/src/components/Common/Loader';
import { ApiResponseGetMember } from '@/src/pages/api/get_member';

import ScheduleMeetingCard from '../../../Common/ModuleSchedules/ScheduleMeetingCard';
import { useAllInterviewModules } from '../../../InterviewTypes/queries/hooks';
import { SchedulesSupabase } from '../../../schedules-query';
import { useModuleRelations } from '../hooks';
import DeleteMemberDialog from '../Popups/DeleteDialog';
import PauseDialog from '../Popups/PauseDialog';
import ResumeDialog from '../Popups/ResumeDialog';
import TrainingInterviewerType from '../TabModules/TrainingInterviewerType';

function Overview({
  scheduleList,
  interviewerDetails,
  // totalHoursThisWeek,
  // totalHoursToday,
  // totalInterviewsThisWeek,
  // totalInterviewsToday,
}: {
  scheduleList: SchedulesSupabase;
  interviewerDetails: ApiResponseGetMember;
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

  const { data: allModules } = useAllInterviewModules();

  const trainingModulesList = data?.filter(
    (rel) => rel.module_training_status === 'training' && !rel.is_archived,
  );

  const trainingModulesListWithGlobalArc = trainingModulesList.map(
    (trainee) => ({
      ...trainee,
      is_global_archived: allModules.find(
        (module) => module.id === trainee.module_id,
      ).is_archived,
    }),
  );

  const todayTypeText =
    interviewerDetails?.scheduling_settings?.interviewLoad?.dailyLimit.type ===
    'Interviews'
      ? 'Interview'
      : 'Hour';

  const weeklyTypeText =
    interviewerDetails?.scheduling_settings?.interviewLoad?.weeklyLimit.type ===
    'Interviews'
      ? 'Interview'
      : 'Hour';
  // const today =
  //   interviewerDetails?.scheduling_settings?.interviewLoad?.dailyLimit.type ===
  //   'Interviews'
  //     ? totalInterviewsToday +
  //         ' / ' +
  //         interviewerDetails.scheduling_settings?.interviewLoad?.dailyLimit
  //           .value || 0
  //     : totalHoursToday +
  //         ' / ' +
  //         interviewerDetails.scheduling_settings?.interviewLoad?.dailyLimit
  //           .value || 0;

  // const weeklyCount =
  //   interviewerDetails?.scheduling_settings?.interviewLoad?.weeklyLimit.type ===
  //   'Interviews'
  //     ? totalInterviewsThisWeek +
  //         ' / ' +
  //         interviewerDetails.scheduling_settings?.interviewLoad?.weeklyLimit
  //           .value || 0
  //     : totalHoursThisWeek +
  //         ' / ' +
  //         interviewerDetails.scheduling_settings?.interviewLoad?.weeklyLimit
  //           .value || 0;

  return (
    <>
      <PauseDialog />
      <ResumeDialog />
      <DeleteMemberDialog refetch={deleteRefetch} />
      <Heatmap
        loadSetting={interviewerDetails.scheduling_settings.interviewLoad}
        interviewLoad={
          <Stack direction={'row'} spacing={1}>
            <Typography fontWeight={500}>
              <span style={{ color: 'var(--error-9)' }}>Load </span> Daily :
            </Typography>
            <Typography>
              {
                interviewerDetails?.scheduling_settings?.interviewLoad
                  ?.dailyLimit.value
              }
            </Typography>
            <Typography>{todayTypeText}</Typography>
            <Typography fontWeight={500}> | Weekly : </Typography>
            <Typography>
              {
                interviewerDetails.scheduling_settings?.interviewLoad
                  ?.weeklyLimit.value
              }
            </Typography>
            <Typography>{weeklyTypeText}</Typography>
          </Stack>
        }
      />
      {/* <Stack ml={2} mb={2}>
        <Typography fontWeight={500} pb={1}>
          Interview Load
        </Typography>
        <Stack direction={'row'} spacing={2} width={'400px'}>
          <Stack width={'200px'}>
            <InterviewLoadCard
              textHeading='Today'
              textLabel={todayTypeText}
              textInterviewCounts={today}
            />
          </Stack>
          <Stack width={'200px'}>
            <InterviewLoadCard
              textHeading='This Week'
              textLabel={weeklyTypeText}
              textInterviewCounts={weeklyCount}
            />
          </Stack>
        </Stack>
      </Stack> */}
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
              textDesc='No upcoming interviews found.'
              size={6}
              iconName='event'
            />
          )
        }
        slotTrainingModules={
          !isLoading ? (
            <>
              {trainingModulesListWithGlobalArc.length ? (
                <>
                  {trainingModulesListWithGlobalArc.map((relation) => {
                    return (
                      <TrainingInterviewerType
                        relation={relation}
                        key={relation.id}
                        refetch={deleteRefetch}
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
