import { Stack } from '@mui/material';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

import { ButtonSoft } from '@/devlink/ButtonSoft';
import { ButtonSolid } from '@/devlink/ButtonSolid';
import { GlobalBanner } from '@/devlink2/GlobalBanner';
import { InterviewMemberList } from '@/devlink2/InterviewMemberList';
import { ModuleMembers } from '@/devlink2/ModuleMembers';
import { NewTabPill } from '@/devlink3/NewTabPill';
import Loader from '@/src/components/Common/Loader';
import { useSchedulingContext } from '@/src/context/SchedulingMain/SchedulingMainProvider';
import { useKeyPress } from '@/src/hooks/useKeyPress';
import ROUTES from '@/src/utils/routing/routes';
import { supabase } from '@/src/utils/supabase/client';
import toast from '@/src/utils/toast';

import Instructions from '../../../ScheduleDetails/Instructions';
import {
  setIsAddMemberDialogOpen,
  setIsSettingsDialogOpen,
  setTrainingStatus,
} from '../../store';
import { ModuleType } from '../../types';
import { unArchiveModuleById } from '../../utils';
import AddMemberDialog from '../AddMemberDialog';
import DeleteMemberDialog from '../DeleteMemberDialog';
import PauseDialog from '../PauseDialog';
import ResumeMemberDialog from '../ResumeMemberDialog';
import SchedulesModules from '../Schedules';
import ModuleSettingComp from '../Training';
import { TabsModuleMembers } from '../type';
import SettingsDialog from './EditModule';
import SlotQualifiedMembers from './SlotQualifiedMembers';
import SlotTrainingMembers from './SlotTrainingMembers';
import { tabsModuleMembers } from './utils';

interface SlotBodyCompProps {
  editModule: ModuleType;
  fetchingModule: boolean;
  isFetching: boolean;
  refetch: () => void;
}

function SlotBodyComp({
  editModule,
  fetchingModule,
  isFetching,
  refetch,
}: SlotBodyCompProps) {
  const router = useRouter();
  const { loading } = useSchedulingContext();

  const currentTab = (router.query.tab ||
    'qualified_members') as TabsModuleMembers['queryParams'];

  const [textValue, setTextValue] = useState(null);

  async function updateInstruction() {
    if (textValue) {
      const { data } = await supabase
        .from('interview_module')
        .update({ instructions: textValue })
        .eq('id', editModule?.id)
        .select();
      if (data) {
        toast.success('Instructions updated successfully.');
        refetch();
      }
    }
  }

  let sections = tabsModuleMembers.map((item) => item.queryParams);
  const tabCount: number = sections.length - 1;
  const currentIndex: number = sections.indexOf(currentTab);

  const handlePrevious = () => {
    const pre =
      // eslint-disable-next-line security/detect-object-injection
      currentIndex === 0 ? sections[tabCount] : sections[currentIndex - 1];
    router.push(
      ROUTES['/scheduling/module/members/[module_id]']({
        module_id: editModule.id,
      }) + `?tab=${pre}`,
      undefined,
      {
        shallow: true,
      },
    );
  };
  const handleNext = () => {
    const next =
      currentIndex === tabCount ? sections[0] : sections[currentIndex + 1];

    router.push(
      ROUTES['/scheduling/module/members/[module_id]']({
        module_id: editModule.id,
      }) + `?tab=${next}`,
      undefined,
      {
        shallow: true,
      },
    );
  };

  const { pressed: right } = useKeyPress('ArrowRight');
  const { pressed: left } = useKeyPress('ArrowLeft');

  useEffect(() => {
    if (left) handlePrevious();
    else if (right) handleNext();
  }, [left, right]);

  const unArcheive = async () => {
    const isUnArchived = await unArchiveModuleById(editModule.id);
    if (isUnArchived) {
      refetch();
      toast.success('Interview type unarchived successfully.');
    }
  };

  return (
    <>
      <SettingsDialog editModule={editModule} />
      <AddMemberDialog editModule={editModule} refetch={refetch} />
      <DeleteMemberDialog refetch={refetch} />
      <PauseDialog />
      <ResumeMemberDialog editModule={editModule} />
      {editModule?.is_archived && (
        <Stack maxWidth={'866px'} margin={'16px 0 0 16px'}>
          <GlobalBanner
            color={'warning'}
            slotButtons={
              <>
                <ButtonSolid
                  textButton='Unarchive'
                  size={1}
                  onClickButton={{
                    onClick: unArcheive,
                  }}
                />
              </>
            }
            isDescriptionVisible={false}
            textTitle={
              'This interview type is archived. Click "Unarchive" to reactivate.'
            }
          />
        </Stack>
      )}
      {fetchingModule || loading || (!editModule && isFetching) ? (
        <Stack height={'100%'} width={'100%'}>
          <Loader />
        </Stack>
      ) : (
        <>
          {editModule && (
            <InterviewMemberList
              slotEditButton={
                <ButtonSoft
                  color={'neutral'}
                  size={2}
                  textButton='Edit'
                  onClickButton={{
                    onClick: () => {
                      setIsSettingsDialogOpen(true);
                    },
                  }}
                />
              }
              slotNewTabPill={
                <Stack direction={'row'}>
                  {tabsModuleMembers.map((tab) => {
                    return (
                      <NewTabPill
                        key={tab.queryParams}
                        textLabel={tab.name}
                        isPillActive={
                          currentTab === tab.queryParams ||
                          (!currentTab &&
                            tab.queryParams == 'qualified_members')
                        }
                        onClickPill={{
                          onClick: () => {
                            router.push(
                              ROUTES['/scheduling/module/members/[module_id]']({
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
              textDepartment={editModule.department_id || '--'}
              textObjective={editModule.description || 'No description'}
              slotModuleContent={
                <>
                  {(currentTab === 'qualified_members' || !currentTab) && (
                    <ModuleMembers
                      isMembersTrainingVisible={false}
                      slotQualifiedMemberList={
                        <SlotQualifiedMembers editModule={editModule} />
                      }
                      slotMembersInTraining={
                        <SlotTrainingMembers
                          editModule={editModule}
                          refetch={refetch}
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
                  {currentTab === 'schedules' && <SchedulesModules />}

                  {currentTab === 'instructions' && (
                    <>
                      <Instructions
                        instruction={editModule?.instructions}
                        setTextValue={setTextValue}
                        showEditButton={true}
                        updateInstruction={updateInstruction}
                        isBorder={true}
                        isPadding={true}
                      />
                    </>
                  )}

                  {currentTab === 'training' && (
                    <ModuleSettingComp
                      editModule={editModule}
                      refetch={refetch}
                    />
                  )}
                </>
              }
            />
          )}
        </>
      )}
    </>
  );
}

export default SlotBodyComp;
