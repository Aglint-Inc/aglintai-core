import { getFullName } from '@aglint/shared-utils';
import { Minus, Plus } from 'lucide-react';

import { UIButton } from '@/components/Common/UIButton';
import { UIDivider } from '@/components/Common/UIDivider';
import UITextField from '@/components/Common/UITextField';
import { SessionIcon } from '@/components/Scheduling/Common/ScheduleProgress/ScheduleProgressPillComp';
import { numberToOrdinalText } from '@/utils/number/numberToOrdinalText';

import { useAlterCount } from '../../../../hooks/useAlterCount';
import { useApproveUsers } from '../../../../hooks/useApproveUsers';
import { type useProgressModuleUsers } from '../../../../hooks/useProgressModuleUsers';
import { TrainingDetailList } from '../../../ui/TrainingDetailList';
import { TrainingStatus } from '../../../ui/TraniningStatus';

function CollapseTrainingProgress({
  shadow_to_complete,
  reverse_shadow_to_complete,
  module_realtion_id,
  mutatedShadowProgress,
  shadowProgress,
  mutatedReverseShadowProgress,
  reverseShadowProgress,
}: {
  shadow_to_complete: number;
  reverse_shadow_to_complete: number;
  module_realtion_id: string;
  mutatedShadowProgress: any[];
  shadowProgress: NonNullable<
    ReturnType<typeof useProgressModuleUsers>['data']
  >;
  mutatedReverseShadowProgress: any[];
  reverseShadowProgress: NonNullable<
    ReturnType<typeof useProgressModuleUsers>['data']
  >;
}) {
  const { approveTrainingProgress } = useApproveUsers();

  const { alterCount, isSaving } = useAlterCount();

  return (
    <>
      <div className='w-full'>
        <div>
          <div className='flex flex-col gap-3 p-4'>
            <div className='flex w-full flex-col gap-4'>
              {
                <>
                  <div className='text-sm text-muted-foreground'>
                    TrainingStatus
                  </div>

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
                              <p className='text-accent-11 text-xs'>
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
                            <p className='text-accent-11 text-xs'>
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
        <div className='mb-4'>
          <UIDivider />
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
            <UITextField
              style={{ width: '60px', height: '28px' }}
              fieldSize='small'
              type='number'
              value={mutatedShadowProgress.length + shadowProgress.length}
              onChange={(e) => {
                if (isSaving) return;
                alterCount({
                  type: 'shadow',
                  count: Number(e.target.value),
                  module_relation_id: module_realtion_id,
                });
              }}
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
            <UITextField
              style={{ width: '60px', height: '28px' }}
              fieldSize='small'
              type='number'
              value={
                mutatedReverseShadowProgress.length +
                reverseShadowProgress.length
              }
              onChange={(e) => {
                if (isSaving) return;
                alterCount({
                  type: 'reverse_shadow',
                  count: Number(e.target.value),
                  module_relation_id: module_realtion_id,
                });
              }}
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
