import { Stack } from '@mui/material';
import { useRouter } from 'next/router';

import { InterviewMemberList, ModuleMembers } from '@/devlink2';
import { NewTabPill } from '@/devlink3';
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
import InstructionsComp from '../Instructions';
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
  const router = useRouter();
  const { loading } = useSchedulingContext();
  const { isLoading: schedulesLoading } = useAllSchedulesByModuleId();

  const { data: meetingData } = useGetMeetingsByModuleId({
    schedulesLoading: schedulesLoading,
    user_ids: editModule?.relations?.map((user) => user.user_id) || [],
  });

  const tab = (router.query.tab || 'members') as
    | 'members'
    | 'schedules'
    | 'intructions';

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
            slotNewTabPill={
              <Stack direction={'row'}>
                <NewTabPill
                  textLabel={'Members'}
                  isPillActive={tab === 'members'}
                  onClickPill={{
                    onClick: () => {
                      router.push(
                        `/scheduling/module/members/${editModule.id}?tab=members`,
                        undefined,
                        {
                          shallow: true,
                        },
                      );
                    },
                  }}
                />
                <NewTabPill
                  textLabel={'Schedules'}
                  isPillActive={tab === 'schedules'}
                  onClickPill={{
                    onClick: () => {
                      router.push(
                        `/scheduling/module/members/${editModule.id}?tab=schedules`,
                        undefined,
                        {
                          shallow: true,
                        },
                      );
                    },
                  }}
                />
                <NewTabPill
                  textLabel={'Intructions'}
                  isPillActive={tab === 'intructions'}
                  onClickPill={{
                    onClick: () => {
                      router.push(
                        `/scheduling/module/members/${editModule.id}?tab=intructions`,
                        undefined,
                        {
                          shallow: true,
                        },
                      );
                    },
                  }}
                />
              </Stack>
            }
            textDepartment={editModule.department || '--'}
            textObjective={editModule.description || 'No description'}
            slotModuleContent={
              <>
                {tab === 'members' && (
                  <ModuleMembers
                    isMembersTrainingVisible={
                      editModule.settings?.require_training
                    }
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
                    onClickAddTrainee={{
                      onClick: () => {
                        setIsAddMemberDialogOpen(true);
                        setTrainingStatus('training');
                      },
                    }}
                  />
                )}
                {tab === 'schedules' && (
                  <Stack height={'calc(100vh - 232px)'}>
                    <ModuleSchedules />
                  </Stack>
                )}

                {tab === 'intructions' && (
                  <InstructionsComp editModule={editModule} />
                )}
              </>
            }
          />
        )
      )}
    </>
  );
}

export default SlotBodyComp;
