import { Stack } from '@mui/material';

import { InterviewMemberList } from '@/devlink2';
import Loader from '@/src/components/Common/Loader';
import { useSchedulingContext } from '@/src/context/SchedulingMain/SchedulingMainProvider';

import SlotQualifiedMembers from './SlotQualifiedMembers';
import SlotTrainingMembers from './SlotTrainingMembers';
import AddMemberDialog from '../AddMemberDialog';
import DeleteMemberDialog from '../DeleteMemberDialog';
import PauseDialog from '../PauseDialog';
import ResumeMemberDialog from '../ResumeMemberDialog';
import { useAllSchedulesByModuleId } from '../../queries/hooks';
import { setIsAddMemberDialogOpen, setTrainingStatus } from '../../store';
import { ModuleType } from '../../types';
import ModuleSchedules from '../../../Common/ModuleSchedules';

interface SlotBodyCompProps {
  editModule: ModuleType;
  fetchingModule: boolean;
  isFetching: boolean;
}

function SlotBodyComp({
  editModule,
  fetchingModule,
  isFetching
}: SlotBodyCompProps) {
  const { loading } = useSchedulingContext();
  const { data: schedules, isLoading: schedulesLoading } =
    useAllSchedulesByModuleId();

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
              }
            }}
            slotQualifiedMemberList={
              <SlotQualifiedMembers editModule={editModule} />
            }
            onClickAddMember={{
              onClick: () => {
                setIsAddMemberDialogOpen(true);
                setTrainingStatus('qualified');
              }
            }}
            slotMembersInTraining={
              <SlotTrainingMembers editModule={editModule} />
            }
          />
        )
      )}
    </>
  );
}

export default SlotBodyComp;
