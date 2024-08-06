import { DatabaseTable } from '@aglint/shared-types';
import { Collapse, Stack, Typography } from '@mui/material';
import React, { useState } from 'react';

import { ButtonGhost } from '@/devlink/ButtonGhost';
import { IconButtonSoft } from '@/devlink/IconButtonSoft';
import { Text } from '@/devlink/Text';
import { TrainingDetailList } from '@/devlink2/TrainingDetailList';
import { TrainingProgressDetail } from '@/devlink2/TrainingProgressDetail';
import { TrainingStatus } from '@/devlink2/TrainingStatus';
import MuiNumberfield from '@/src/components/CompanyDetailComp/SettingsSchedule/Components/MuiNumberfield';
import { SessionIcon } from '@/src/components/Scheduling/Common/ScheduleProgress/ScheduleProgressPillComp';
import { useAuthDetails } from '@/src/context/AuthContext/AuthContext';
import { getFullName } from '@/src/utils/jsonResume';
import { numberToOrdinalText } from '@/src/utils/number/numberToOrdinalText';
import { supabase } from '@/src/utils/supabase/client';
import toast from '@/src/utils/toast';

import { useProgressModuleUsers } from '../../../../queries/hooks';

function CollapseTrainingProgress({
  isCollapseOpen,
  refetchTrainingProgress,
  shadow_to_complete,
  reverse_shadow_to_complete,
  module_realtion_id,
  relationRefetch,
  refetch, //module relations
  mutatedShadowProgress,
  shadowProgress,
  mutatedReverseShadowProgress,
  reverseShadowProgress,
}: {
  isCollapseOpen: boolean;
  setIsCollapseOpen: React.Dispatch<React.SetStateAction<boolean>>;
  refetchTrainingProgress: () => void;
  relationRefetch: () => void;
  shadow_to_complete: number;
  reverse_shadow_to_complete: number;
  module_realtion_id: string;
  refetch: () => void;
  mutatedShadowProgress: any[];
  shadowProgress: ReturnType<typeof useProgressModuleUsers>['data'];
  mutatedReverseShadowProgress: any[];
  reverseShadowProgress: ReturnType<typeof useProgressModuleUsers>['data'];
}) {
  const { recruiterUser } = useAuthDetails();
  const [isSaving, setIsSaving] = useState(false);

  const approveTrainingProgress = async (id: string) => {
    await supabase
      .from('interview_training_progress')
      .update({
        is_approved: true,
        approved_user_id: recruiterUser.user_id,
      })
      .eq('id', id);

    await refetchTrainingProgress();
    toast.success('Approved');
  };

  const alterCount = async ({
    type,
    count,
    module_relation_id,
  }: {
    type: DatabaseTable['interview_session_relation']['training_type'];
    count: number;
    module_relation_id: string;
  }) => {
    try {
      if (count === 0) {
        toast.warning('Minimum count should be 1');
        return;
      }
      setIsSaving(true);
      if (type === 'shadow') {
        await supabase
          .from('interview_module_relation')
          .update({
            number_of_shadow: count,
          })
          .eq('id', module_relation_id);
      } else {
        await supabase
          .from('interview_module_relation')
          .update({
            number_of_reverse_shadow: count,
          })
          .eq('id', module_relation_id);
      }
      await refetch();
      await relationRefetch();
    } catch (e) {
      console.error(e);
    } finally {
      setTimeout(() => {
        setIsSaving(false);
      }, 1000); // added for refetching react query
    }
  };

  return (
    <>
      <Collapse
        in={isCollapseOpen}
        sx={{
          opacity: !isSaving ? 1 : 0.5,
        }}
      >
        <Stack spacing={'var(--space-2)'}>
          <TrainingProgressDetail
            slotTrainingDetailList={
              <>
                {shadowProgress.map((prog, ind) => {
                  return (
                    <TrainingDetailList
                      key={ind}
                      isReverse={false}
                      isShadow={true}
                      textTraining={`${numberToOrdinalText(ind + 1)} Shadow`}
                      slotTrainingStatus={
                        <TrainingStatus
                          isNotCompletedVisible={false}
                          isCompletedVisible={true}
                          isReverseShadow={false}
                          isShadow={true}
                        />
                      }
                      slotPanelBlock={
                        <>
                          <Stack direction={'row'} spacing={'var(--space-2)'}>
                            <SessionIcon
                              session_type={prog.interview_session.session_type}
                            />
                            <Text content={prog.interview_session.name} />

                            {prog.is_approved ? (
                              <Typography
                                color={'var(--accent-11)'}
                                fontSize={11}
                              >
                                Approved by{' '}
                                <span
                                  style={{
                                    fontWeight: 600,
                                  }}
                                >
                                  {getFullName(
                                    prog.recruiter_user?.first_name,
                                    prog.recruiter_user?.last_name,
                                  )}
                                </span>
                              </Typography>
                            ) : (
                              <ButtonGhost
                                textButton={'Approve'}
                                size={1}
                                onClickButton={{
                                  onClick: async () => {
                                    await approveTrainingProgress(prog.id);
                                  },
                                }}
                              />
                            )}
                          </Stack>
                        </>
                      }
                    />
                  );
                })}
                {mutatedShadowProgress.map((_, index) => (
                  <TrainingDetailList
                    key={index}
                    isReverse={false}
                    isShadow={true}
                    textTraining={`${numberToOrdinalText(index + 1 + shadowProgress.length)} Shadow Session`}
                    slotTrainingStatus={
                      <TrainingStatus
                        isNotCompletedVisible={true}
                        isCompletedVisible={false}
                        isReverseShadow={false}
                        isShadow={true}
                      />
                    }
                    slotPanelBlock={<></>}
                  />
                ))}
                {reverseShadowProgress.map((prog, ind) => {
                  return (
                    <TrainingDetailList
                      key={ind}
                      isReverse={true}
                      isShadow={false}
                      textTraining={`${numberToOrdinalText(ind + 1)} Reverse Shadow`}
                      slotTrainingStatus={
                        <TrainingStatus
                          isNotCompletedVisible={false}
                          isCompletedVisible={true}
                          isReverseShadow={true}
                          isShadow={false}
                          isPendingApprovalVisible={false}
                        />
                      }
                      slotPanelBlock={
                        <>
                          <Stack direction={'row'} spacing={'var(--space-2)'}>
                            <SessionIcon
                              session_type={prog.interview_session.session_type}
                            />
                            <Text content={prog.interview_session.name} />
                          </Stack>

                          {prog.is_approved ? (
                            <Typography
                              color={'var(--accent-11)'}
                              fontSize={11}
                            >
                              Approved by{' '}
                              <span
                                style={{
                                  fontWeight: 600,
                                }}
                              >
                                {getFullName(
                                  prog.recruiter_user?.first_name,
                                  prog.recruiter_user?.last_name,
                                )}
                              </span>
                            </Typography>
                          ) : (
                            <ButtonGhost
                              textButton={'Approve'}
                              size={1}
                              onClickButton={{
                                onClick: async () => {
                                  await approveTrainingProgress(prog.id);
                                },
                              }}
                            />
                          )}
                        </>
                      }
                    />
                  );
                })}
                {mutatedReverseShadowProgress.map((_, index) => (
                  <TrainingDetailList
                    key={index}
                    isReverse={true}
                    isShadow={false}
                    textTraining={`${numberToOrdinalText(index + 1 + reverseShadowProgress.length)} Reverse Shadow Session`}
                    slotTrainingStatus={
                      <TrainingStatus
                        isNotCompletedVisible={true}
                        isCompletedVisible={false}
                        isReverseShadow={true}
                        isShadow={false}
                        isPendingApprovalVisible={false}
                      />
                    }
                    slotPanelBlock={<></>}
                  />
                ))}
              </>
            }
          />
        </Stack>
        <Stack
          direction={'row'}
          spacing={'var(--space-2)'}
          px={'var(--space-4)'}
          pb={'var(--space-4)'}
          gap={3}
        >
          <Stack direction={'row'} gap={1} alignItems={'center'}>
            Shadow
            <IconButtonSoft
              isDisabled={
                shadowProgress.length // shadow complete
                  ? mutatedShadowProgress.length === 0
                  : mutatedShadowProgress.length === 1
              }
              color={'neutral'}
              iconName='remove'
              size={1}
              onClickButton={{
                onClick: async () => {
                  await alterCount({
                    type: 'shadow',
                    count: shadow_to_complete - 1,
                    module_relation_id: module_realtion_id,
                  });
                },
              }}
            />
            <MuiNumberfield
              width='80px'
              height='26px'
              isDisable={isSaving}
              value={mutatedShadowProgress.length + shadowProgress.length}
              handleSelect={(value) =>
                alterCount({
                  type: 'shadow',
                  count: Number(value),
                  module_relation_id: module_realtion_id,
                })
              }
            />
            <IconButtonSoft
              iconName='Add'
              size={1}
              color={'neutral'}
              onClickButton={{
                onClick: () => {
                  if (isSaving) return;
                  alterCount({
                    type: 'shadow',
                    count: shadow_to_complete + 1,
                    module_relation_id: module_realtion_id,
                  });
                },
              }}
            />
          </Stack>
          <Stack direction={'row'} gap={1} alignItems={'center'}>
            Reverse Shadow
            <IconButtonSoft
              iconName='remove'
              isDisabled={
                reverseShadowProgress.length
                  ? mutatedReverseShadowProgress.length === 0
                  : mutatedReverseShadowProgress.length === 1
              }
              color={'neutral'}
              size={1}
              onClickButton={{
                onClick: async () => {
                  await alterCount({
                    type: 'reverse_shadow',
                    count: reverse_shadow_to_complete - 1,
                    module_relation_id: module_realtion_id,
                  });
                },
              }}
            />
            <MuiNumberfield
              width='80px'
              height='26px'
              isDisable={isSaving}
              value={
                mutatedReverseShadowProgress.length +
                reverseShadowProgress.length
              }
              handleSelect={(value) =>
                alterCount({
                  type: 'reverse_shadow',
                  count: value,
                  module_relation_id: module_realtion_id,
                })
              }
            />
            <IconButtonSoft
              iconName='Add'
              size={1}
              color={'neutral'}
              onClickButton={{
                onClick: () => {
                  if (isSaving) return;
                  alterCount({
                    type: 'reverse_shadow',
                    count: reverse_shadow_to_complete + 1,
                    module_relation_id: module_realtion_id,
                  });
                },
              }}
            />
          </Stack>
        </Stack>
      </Collapse>
    </>
  );
}

export default CollapseTrainingProgress;
