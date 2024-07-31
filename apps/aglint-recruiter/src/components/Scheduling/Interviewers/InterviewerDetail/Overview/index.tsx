import { Stack } from '@mui/material';
import { useRouter } from 'next/router';

import { ButtonSurface } from '@/devlink/ButtonSurface';
import { GlobalEmptyState } from '@/devlink/GlobalEmptyState';
import { InterviewerDetailOverview } from '@/devlink3/InterviewerDetailOverview';
import Loader from '@/src/components/Common/Loader';

import ScheduleMeetingCard from '../../../Common/ModuleSchedules/ScheduleMeetingCard';
import IconPlusFilter from '../../../Schedules/Filters/FilterChip/IconPlusFilter';
import { SchedulesSupabase } from '../../../schedules-query';
import { useModuleRelations } from '../hooks';
import { setAddInterviewType, setIsAddInterviewTypeDialogOpen } from '../store';
import TrainingInterviewerType from '../TabModules/TrainingInterviewerType';

function Overview({ scheduleList }: { scheduleList: SchedulesSupabase }) {
  const router = useRouter();
  const upcomingScheduleList =
    scheduleList?.filter((item) => item.status === 'confirmed') || [];

  const user_id = router?.query?.user_id as string;
  const { data, isLoading } = useModuleRelations({
    user_id,
  });
  const trainingModulesList = data?.filter(
    (rel) => rel.module_training_status === 'training',
  );

  return (
    <>
      <InterviewerDetailOverview
        slotButtonSchedule={
          upcomingScheduleList?.length ? (
            <ButtonSurface
              textButton='View all'
              size={1}
              onClickButton={{
                onClick: () => {
                  router.push(
                    `/scheduling/interviewer/${user_id}?tab=allschedules`,
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
                    `/scheduling/interviewer/${user_id}?tab=interviewtypes`,
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
                <GlobalEmptyState
                  textDesc='No Interview type found.'
                  size={6}
                  iconName='school'
                />
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
