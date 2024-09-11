import { GlobalEmptyState } from '@devlink/GlobalEmptyState';
import { InterviewerDetailOverview } from '@devlink3/InterviewerDetailOverview';
import { useRouter } from 'next/router';

import Heatmap from '@/components/Common/Heatmap/HeatmapUser';
import Loader from '@/components/Common/Loader';
import { UIButton } from '@/components/Common/UIButton';
import { type ApiResponseGetMember } from '@/pages/api/get_member';

import { useAllInterviewModules } from '../../../InterviewTypes/queries/hooks';
import { type SchedulesSupabase } from '../../../schedules-query';
import { useModuleRelations } from '../hooks';
import DeleteMemberDialog from '../Popups/DeleteDialog';
import PauseDialog from '../Popups/PauseDialog';
import ResumeDialog from '../Popups/ResumeDialog';
import TrainingInterviewerType from '../TabModules/TrainingInterviewerType';

function Overview({
  scheduleList,
  interviewerDetails,
}: {
  scheduleList: SchedulesSupabase;
  interviewerDetails: ApiResponseGetMember;
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

  const filteredtrainingModulesList = trainingModulesList?.filter(
    (qualified) =>
      !allModules?.find((module) => module.id === qualified.module_id)
        .is_archived,
  );

  return (
    <>
      <PauseDialog />
      <ResumeDialog />
      <DeleteMemberDialog refetch={deleteRefetch} />
      <Heatmap
        loadSetting={interviewerDetails.scheduling_settings.interviewLoad}
      />

      <InterviewerDetailOverview
        slotButtonSchedule={
          upcomingScheduleList?.length ? (
            <UIButton
              size='sm'
              variant='secondary'
              onClick={() => {
                router.push(
                  `/user/profile/${user_id}?profile=true&tab=allschedules`,
                );
              }}
            >
              View all
            </UIButton>
          ) : (
            <></>
          )
        }
        slotButtonTraining={
          trainingModulesList?.length ? (
            <UIButton
              size='sm'
              variant='secondary'
              onClick={() => {
                router.push(
                  `/user/profile/${user_id}?profile=true&tab=qualified`,
                );
              }}
            >
              View all
            </UIButton>
          ) : (
            <></>
          )
        }
        isUpcomingVisible={false}
        slotUpcomingSchedule={<></>}
        slotTrainingModules={
          !isLoading ? (
            <>
              {filteredtrainingModulesList?.length ? (
                <>
                  {filteredtrainingModulesList?.map((relation) => {
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
