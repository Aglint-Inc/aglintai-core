import { Stack } from '@mui/material';

import { InterviewMemberList } from '@/devlink2';
import Loader from '@/src/components/Common/Loader';
import { useSchedulingContext } from '@/src/context/SchedulingMain/SchedulingMainProvider';

import ModuleSchedules from '../../../Common/ModuleSchedules';
import {
  useAllSchedulesByModuleId,
  useGetMeetingsByModuleId,
} from '../../queries/hooks';
import { setIsAddMemberDialogOpen, setTrainingStatus } from '../../store';
import { ModuleType } from '../../types';
import AddMemberDialog from '../AddMemberDialog';
import DeleteMemberDialog from '../DeleteMemberDialog';
import PauseDialog from '../PauseDialog';
import ResumeMemberDialog from '../ResumeMemberDialog';
import SlotQualifiedMembers from './SlotQualifiedMembers';
import SlotTrainingMembers from './SlotTrainingMembers';

interface SlotBodyCompProps {
  editModule: ModuleType;
  fetchingModule: boolean;
  isFetching: boolean;
}

function SlotBodyComp({
  editModule,
  fetchingModule,
  isFetching,
}: SlotBodyCompProps) {
  const { loading } = useSchedulingContext();
  const { data: schedules, isLoading: schedulesLoading } =
    useAllSchedulesByModuleId();

  const { data: meetingData } = useGetMeetingsByModuleId({
    schedulesLoading: schedulesLoading,
    user_ids: editModule?.relations?.map((user) => user.user_id) || [],
  });

  return (
    <>
      <AddMemberDialog editModule={editModule} />
      <DeleteMemberDialog />
      <PauseDialog />
      <ResumeMemberDialog editModule={editModule} />

      {fetchingModule || loading || (!editModule && isFetching) ? (
        <Stack height={'100%'} width={'100%'}>
          <Loader />
        </Stack>
      ) : (
        editModule && (
          <InterviewMemberList
            textObjective={editModule.description || 'No description'}
            isMembersTrainingVisible={editModule.settings?.require_training}
            slotInterviewCard={
              <ModuleSchedules
                schedules={schedules}
                loading={schedulesLoading}
              />
            }
            onClickAddTrainee={{
              onClick: () => {
                setIsAddMemberDialogOpen(true);
                setTrainingStatus('training');
              },
            }}
            slotQualifiedMemberList={
              !schedulesLoading && (
                <SlotQualifiedMembers
                  editModule={editModule}
                  meetingData={meetingData}
                />
              )
            }
            slotMembersInTraining={
              <SlotTrainingMembers
                editModule={editModule}
                meetingData={meetingData}
              />
            }
            onClickAddMember={{
              onClick: () => {
                setIsAddMemberDialogOpen(true);
                setTrainingStatus('qualified');
              },
            }}
          />
        )
      )}
    </>
  );
}

export default SlotBodyComp;
