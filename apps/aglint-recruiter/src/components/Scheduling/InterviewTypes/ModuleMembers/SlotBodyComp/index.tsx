import { Stack } from '@mui/material';
import { useRouter } from 'next/router';

import { InterviewMemberList } from '@/devlink2/InterviewMemberList';
import { ModuleMembers } from '@/devlink2/ModuleMembers';
import { NewTabPill } from '@/devlink3/NewTabPill';
import Loader from '@/src/components/Common/Loader';
import { useSchedulingContext } from '@/src/context/SchedulingMain/SchedulingMainProvider';
import { pages } from '@/src/utils/pageRouting';

import ModuleSchedules from '../../../Common/ModuleSchedules';
import {
  useAllSchedulesByModuleId,
  useGetMeetingsByModuleId,
} from '../../queries/hooks';
import {
  setIsAddMemberDialogOpen,
  setIsSettingsDialogOpen,
  setTrainingStatus,
} from '../../store';
import { ModuleType } from '../../types';
import AddMemberDialog from '../AddMemberDialog';
import DeleteMemberDialog from '../DeleteMemberDialog';
import InstructionsComp from '../Instructions';
import ModuleSettingComp from '../ModuleSetting';
import PauseDialog from '../PauseDialog';
import ResumeMemberDialog from '../ResumeMemberDialog';
import { TabsModuleMembers } from '../type';
import SettingsDialog from './AddMemberDialog';
import SlotQualifiedMembers from './SlotQualifiedMembers';
import SlotTrainingMembers from './SlotTrainingMembers';
import { tabsModuleMembers } from './utils';

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
  const {
    data: scheduleList,
    isLoading: schedulesLoading,
    isFetched,
  } = useAllSchedulesByModuleId();

  const { data: meetingData } = useGetMeetingsByModuleId({
    schedulesLoading: schedulesLoading,
    user_ids: editModule?.relations?.map((user) => user.user_id) || [],
  });

  const currentTab = router.query.tab as TabsModuleMembers['queryParams'];

  return (
    <>
      <SettingsDialog editModule={editModule} />
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
            onClickEdit={{
              onClick: () => {
                setIsSettingsDialogOpen(true);
              },
            }}
            slotNewTabPill={
              <Stack direction={'row'}>
                {tabsModuleMembers.map((tab) => {
                  return (
                    <NewTabPill
                      key={tab.queryParams}
                      textLabel={tab.name}
                      isPillActive={
                        currentTab === tab.queryParams ||
                        (!currentTab && tab.queryParams == 'members')
                      }
                      onClickPill={{
                        onClick: () => {
                          router.push(
                            pages['/scheduling/module/members/[module_id]']({
                              module_id: editModule.id,
                            }) + `?tab=${tab.queryParams}`,
                            undefined,
                            {
                              shallow: true,
                            },
                          );
                        },
                      }}
                    />
                  );
                })}
              </Stack>
            }
            textDepartment={editModule.department || '--'}
            textObjective={editModule.description || 'No description'}
            slotModuleContent={
              <>
                {(currentTab === 'members' || !currentTab) && (
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
                {currentTab === 'schedules' && (
                  <ModuleSchedules
                    newScheduleList={scheduleList}
                    isFetched={isFetched}
                  />
                )}

                {currentTab === 'instructions' && (
                  <InstructionsComp editModule={editModule} />
                )}

                {currentTab === 'training' && (
                  <ModuleSettingComp editModule={editModule} />
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
