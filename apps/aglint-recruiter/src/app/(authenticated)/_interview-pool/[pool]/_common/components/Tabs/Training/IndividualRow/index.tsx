import { type PauseJson } from '@aglint/shared-types';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@components/ui/popover';
import { MemberListCardOption } from '@devlink2/MemberListCardOption';
import { ChevronDown, MoreVertical } from 'lucide-react';
import Link from 'next/link';

import { HistoryPillShadcn } from '@/components/Common/Member/HistoryPill';
import MuiAvatar from '@/components/Common/MuiAvatar';
import { UIBadge } from '@/components/Common/UIBadge';
import { UIButton } from '@/components/Common/UIButton';
import {
  setIsDeleteMemberDialogOpen,
  setIsMovedToQualifiedDialogOpen,
  setIsPauseDialogOpen,
  setIsResumeDialogOpen,
  setSelUser,
} from '@/components/Scheduling/InterviewTypes/store';
import ROUTES from '@/utils/routing/routes';

import { type useModuleAndUsers } from '../../../../hooks/useModuleAndUsers';
import { type useProgressModuleUsers } from '../../../../hooks/useProgressModuleUsers';
import { type PillsTraining } from '../../../../types/type';
import { getPauseMemberText } from '../../../../utils/utils';
import CollapseTrainingProgress from './Collapse';

function IndividualRow({
  relation,
  progress,
}: {
  relation: ReturnType<typeof useModuleAndUsers>['data']['relations'][0];
  progress: ReturnType<typeof useProgressModuleUsers>['data'];
}) {
  const shadowProgress = progress.filter(
    (prog) => prog.interview_session_relation.training_type == 'shadow',
  );
  const mutatedShadowProgress = Array.from({
    length: relation.number_of_shadow - shadowProgress.length,
  });
  const reverseShadowProgress = progress.filter(
    (prog) => prog.interview_session_relation.training_type == 'reverse_shadow',
  );
  const mutatedReverseShadowProgress = Array.from({
    length: relation.number_of_reverse_shadow - reverseShadowProgress.length,
  });

  const pills: PillsTraining[] = [
    ...shadowProgress.map(() => {
      return { sessionType: 'shadow' as const, completed: true };
    }),
    ...mutatedShadowProgress.map(() => {
      return { sessionType: 'shadow' as const, completed: false };
    }),
    ...reverseShadowProgress.map(() => {
      return { sessionType: 'rshadow' as const, completed: true };
    }),
    ...mutatedReverseShadowProgress.map(() => {
      return { sessionType: 'rshadow' as const, completed: false };
    }),
  ];

  return (
    <>
      <tr
        key={relation.id}
        className='border-b last:border-b-0 hover:bg-gray-50'
      >
        <td className='p-4'>
          <Link
            href={ROUTES['/user/profile/[user_id]']({
              user_id: relation.recruiter_user.user_id,
            })}
          >
            <div className='flex items-center space-x-3'>
              <MuiAvatar
                src={relation.recruiter_user.profile_image}
                level={relation.full_name}
              />
              <div>
                <div className='flex flex-row gap-2 font-medium text-gray-900'>
                  {relation.full_name}
                  {relation.pause_json && (
                    <UIBadge
                      size='sm'
                      color='warning'
                      textBadge={getPauseMemberText(
                        relation.pause_json as PauseJson,
                      )}
                    />
                  )}
                </div>
                <div className='text-sm text-gray-500'>
                  {relation.recruiter_user.position}
                </div>
              </div>
            </div>
          </Link>
        </td>
        <td className='p-4 text-gray-700'>{relation.textTodayInterview}</td>
        <td className='p-4 text-gray-700'>{relation.textWeekInterview}</td>
        <td className='p-4'>
          <UIBadge
            color={
              relation.week_load > 50
                ? 'error'
                : relation.week_load > 25
                  ? 'warning'
                  : 'success'
            }
            textBadge={relation.week_load + '%'}
          />
        </td>
        <td className='p-4'>
          <div className='flex flex-row space-x-0.5 overflow-hidden rounded-md'>
            {pills.map((pill, i) => (
              <HistoryPillShadcn
                key={i}
                isShadow={pill.sessionType === 'shadow'}
                isReverseShadow={pill.sessionType === 'rshadow'}
                isActive={pill.completed}
              />
            ))}
          </div>
        </td>
        <td className='p-4'>
          <div className='flex flex-row gap-2'>
            <Popover>
              <PopoverTrigger asChild>
                <UIButton
                  variant='secondary'
                  size='sm'
                  icon={<ChevronDown />}
                />
              </PopoverTrigger>
              <PopoverContent className='w-auto rounded-sm p-0'>
                <CollapseTrainingProgress
                  reverse_shadow_to_complete={relation.number_of_reverse_shadow}
                  shadow_to_complete={relation.number_of_shadow}
                  module_realtion_id={relation.id}
                  mutatedReverseShadowProgress={mutatedReverseShadowProgress}
                  mutatedShadowProgress={mutatedShadowProgress}
                  reverseShadowProgress={reverseShadowProgress}
                  shadowProgress={shadowProgress}
                />
              </PopoverContent>
            </Popover>

            <ThreeDot user={relation} isMoveToQualifierVisible={true} />
          </div>
        </td>
      </tr>
    </>
  );
}

export default IndividualRow;

const ThreeDot = ({
  isMoveToQualifierVisible,
  user,
}: {
  isMoveToQualifierVisible: boolean;
  user: ReturnType<typeof useModuleAndUsers>['data']['relations'][0];
}) => {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <UIButton variant='secondary' size='sm' icon={<MoreVertical />} />
      </PopoverTrigger>
      <PopoverContent className='w-auto rounded-sm p-0'>
        <MemberListCardOption
          isMoveToQualifierVisible={isMoveToQualifierVisible}
          isRemoveVisible={true}
          isPauseVisible={!user.pause_json}
          isResumeVisible={Boolean(user.pause_json)}
          onClickMoveToQualifier={{
            onClick: () => {
              setSelUser(user);
              setIsMovedToQualifiedDialogOpen(true);
            },
          }}
          onClickRemoveModule={{
            onClick: () => {
              setSelUser(user);
              setIsDeleteMemberDialogOpen(true);
            },
          }}
          onClickResumeInterview={{
            onClick: () => {
              setSelUser(user);
              setIsResumeDialogOpen(true);
            },
          }}
          onClickPauseInterview={{
            onClick: () => {
              setSelUser(user);
              setIsPauseDialogOpen(true);
            },
          }}
        />
      </PopoverContent>
    </Popover>
  );
};
