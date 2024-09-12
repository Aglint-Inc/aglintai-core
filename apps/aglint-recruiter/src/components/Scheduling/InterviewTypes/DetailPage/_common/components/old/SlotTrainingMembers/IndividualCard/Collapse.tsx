import { type DatabaseTable } from '@aglint/shared-types';
import { useToast } from '@components/hooks/use-toast';
import { Minus, Plus } from 'lucide-react';
import React, { useState } from 'react';

import { UIButton } from '@/components/Common/UIButton';
import MuiNumberfield from '@/components/CompanyDetailComp/OldSettingsSchedule/Components/MuiNumberfield';
import { SessionIcon } from '@/components/Scheduling/Common/ScheduleProgress/ScheduleProgressPillComp';
import { useAuthDetails } from '@/context/AuthContext/AuthContext';
import { getFullName } from '@/utils/jsonResume';
import { numberToOrdinalText } from '@/utils/number/numberToOrdinalText';
import { supabase } from '@/utils/supabase/client';

import { type useProgressModuleUsers } from '../../../../../../queries/hooks';
import { TrainingDetailList } from './TrainingDetailList';
import { TrainingStatus } from './TraniningStatus';

function CollapseTrainingProgress({
  isCollapseOpen,
  refetchTrainingProgress,
  shadow_to_complete,
  reverse_shadow_to_complete,
  module_realtion_id,
  relationRefetch,
  refetch,
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
  const { toast } = useToast();
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
    toast({
      title: 'Approved',
      description: 'Approved successfully.',
    });
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
        toast({
          variant: 'destructive',
          title: 'Error',
          description: 'Minimum count should be 1',
        });
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
      <div
        className={`transition-all duration-300 ease-in-out ${
          isCollapseOpen ? 'max-h-[1000px] opacity-100' : 'max-h-0 opacity-0'
        } overflow-hidden ${!isSaving ? 'opacity-100' : 'opacity-50'}`}
      >
        <div>
          <div className='flex flex-col gap-3 p-4 sm:p-5'>
            <div className='flex flex-col gap-4'>
              {
                <>
                  TrainingStatus
                  {shadowProgress.map((prog, ind) => (
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
                          <div className='flex items-center space-x-2'>
                            <SessionIcon
                              session_type={prog.interview_session.session_type}
                            />
                            <p className='text-sm'>
                              {prog.interview_session.name}
                            </p>

                            {prog.is_approved ? (
                              <p className='text-xs text-accent-11'>
                                Approved by{' '}
                                <span className='font-semibold'>
                                  {getFullName(
                                    prog.recruiter_user?.first_name,
                                    prog.recruiter_user?.last_name,
                                  )}
                                </span>
                              </p>
                            ) : (
                              <button
                                className='text-sm font-medium text-primary hover:underline'
                                onClick={async () => {
                                  await approveTrainingProgress(prog.id);
                                }}
                              >
                                Approve
                              </button>
                            )}
                          </div>
                        </>
                      }
                    />
                  ))}
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
                  {reverseShadowProgress.map((prog, ind) => (
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
                          <div className='flex items-center space-x-2'>
                            <SessionIcon
                              session_type={prog.interview_session.session_type}
                            />
                            <p className='text-sm'>
                              {prog.interview_session.name}
                            </p>
                          </div>

                          {prog.is_approved ? (
                            <p className='text-xs text-accent-11'>
                              Approved by{' '}
                              <span className='font-semibold'>
                                {getFullName(
                                  prog.recruiter_user?.first_name,
                                  prog.recruiter_user?.last_name,
                                )}
                              </span>
                            </p>
                          ) : (
                            <button
                              className='text-sm font-medium text-primary hover:underline'
                              onClick={async () => {
                                await approveTrainingProgress(prog.id);
                              }}
                            >
                              Approve
                            </button>
                          )}
                        </>
                      }
                    />
                  ))}
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
            </div>
            <div className='hidden flex-row gap-5 pt-4'></div>
          </div>
        </div>
        <div className='flex flex-row space-x-3 px-4 pb-4'>
          <div className='flex items-center space-x-1'>
            <span>Shadow</span>
            <UIButton
              size='sm'
              variant='secondary'
              icon={<Minus />}
              disabled={
                shadowProgress.length
                  ? mutatedShadowProgress.length === 0
                  : mutatedShadowProgress.length === 1
              }
              onClick={async () => {
                await alterCount({
                  type: 'shadow',
                  count: shadow_to_complete - 1,
                  module_relation_id: module_realtion_id,
                });
              }}
            />
            <MuiNumberfield
              isMarginTop={false}
              width='80px'
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
            <UIButton
              size='sm'
              icon={<Plus />}
              variant='secondary'
              onClick={() => {
                if (isSaving) return;
                alterCount({
                  type: 'shadow',
                  count: shadow_to_complete + 1,
                  module_relation_id: module_realtion_id,
                });
              }}
            />
          </div>
          <div className='flex items-center space-x-1'>
            <span>Reverse Shadow</span>
            <UIButton
              size='sm'
              icon={<Minus />}
              variant='secondary'
              disabled={
                reverseShadowProgress.length
                  ? mutatedReverseShadowProgress.length === 0
                  : mutatedReverseShadowProgress.length === 1
              }
              onClick={async () => {
                await alterCount({
                  type: 'reverse_shadow',
                  count: reverse_shadow_to_complete - 1,
                  module_relation_id: module_realtion_id,
                });
              }}
            />
            <MuiNumberfield
              isMarginTop={false}
              width='80px'
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
            <UIButton
              size='sm'
              variant='secondary'
              icon={<Plus />}
              onClick={() => {
                if (isSaving) return;
                alterCount({
                  type: 'reverse_shadow',
                  count: reverse_shadow_to_complete + 1,
                  module_relation_id: module_realtion_id,
                });
              }}
            />
          </div>
        </div>
      </div>
    </>
  );
}

export default CollapseTrainingProgress;
