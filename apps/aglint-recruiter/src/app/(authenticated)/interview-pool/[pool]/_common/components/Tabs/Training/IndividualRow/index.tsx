import { type PauseJson } from '@aglint/shared-types';
import { Avatar, AvatarFallback, AvatarImage } from '@components/ui/avatar';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@components/ui/popover';
import { UIBadge } from '@components/ui-badge';
import { ChevronDown, MoreVertical } from 'lucide-react';
import Link from 'next/link';

import { getPauseMemberText } from '@/authenticated/utils';
import { HistoryPillShadcn } from '@/components/Common/Member/HistoryPill';
import { UIButton } from '@/components/Common/UIButton';
import ROUTES from '@/utils/routing/routes';

import { type useModuleAndUsers } from '../../../../hooks/useModuleAndUsers';
import { type useProgressModuleUsers } from '../../../../hooks/useProgressModuleUsers';
import {
  setIsDeleteMemberDialogOpen,
  setIsMovedToQualifiedDialogOpen,
  setIsPauseDialogOpen,
  setIsResumeDialogOpen,
  setSelUser,
} from '../../../../stores/store';
import { type PillsTraining } from '../../../../types/type';
import CollapseTrainingProgress from './Collapse';
import { MemberListCardOption } from './MemberListCardOption';

function IndividualRow({
  relation,
  progress,
}: {
  relation: NonNullable<
    ReturnType<typeof useModuleAndUsers>['data']
  >['relations'][0];
  progress: ReturnType<typeof useProgressModuleUsers>['data'];
}) {
  const shadowProgress = (progress || []).filter(
    (prog) => prog.interview_session_relation.training_type == 'shadow',
  );
  const mutatedShadowProgress = Array.from({
    length: relation.number_of_shadow - shadowProgress.length,
  });
  const reverseShadowProgress = (progress || []).filter(
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
        className='border-b last:border-b-0 hover:bg-muted/50'
      >
        <td className='p-4'>
          <Link
            href={ROUTES['/user/[user]']({
              user_id: relation.recruiter_user.user_id ?? '',
            })}
          >
            <div className='flex items-center space-x-3'>
              <Avatar className='h-8 w-8'>
                <AvatarImage
                  src={relation.recruiter_user.profile_image ?? ''}
                  alt={relation.recruiter_user.first_name ?? ''}
                />
                <AvatarFallback>
                  {(relation.recruiter_user.first_name ?? '').charAt(0)}
                </AvatarFallback>
              </Avatar>
              <div>
                <div className='flex flex-row gap-2 font-medium'>
                  {relation.full_name}
                  {relation.pause_json && (
                    <UIBadge
                      size='sm'
                      variant='warning'
                      textBadge={getPauseMemberText(
                        relation.pause_json as PauseJson,
                      )}
                    />
                  )}
                </div>
                <div className='text-sm text-muted-foreground'>
                  {relation.recruiter_user.position}
                </div>
              </div>
            </div>
          </Link>
        </td>
        <td className='p-4'>{relation.textTodayInterview}</td>
        <td className='p-4'>{relation.textWeekInterview}</td>
        <td className='p-4'>
          <UIBadge
            variant={
              relation.week_load > 50
                ? 'destructive'
                : relation.week_load > 25
                  ? 'warning'
                  : 'success'
            }
            textBadge={relation.week_load + '%'}
          />
        </td>
        <td className='p-4'>
          <div className='flex items-center'>
            <div className='flex flex-row gap-0.5 overflow-hidden rounded-md'>
              {pills.map((pill, i) => (
                <HistoryPillShadcn
                  key={i}
                  isShadow={pill.sessionType === 'shadow'}
                  isReverseShadow={pill.sessionType === 'rshadow'}
                  isActive={pill.completed}
                />
              ))}
            </div>
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
              <PopoverContent
                side='top'
                className='w-auto rounded-sm border border-border p-0'
              >
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
  user: NonNullable<
    ReturnType<typeof useModuleAndUsers>['data']
  >['relations'][0];
}) => {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <UIButton variant='secondary' size='sm' icon={<MoreVertical />} />
      </PopoverTrigger>
      <PopoverContent
        className='w-auto rounded-sm border border-border p-0'
        side='left'
      >
        <MemberListCardOption
          isMoveToQualifierVisible={isMoveToQualifierVisible}
          isRemoveVisible={true}
          isPauseVisible={!user.pause_json}
          isResumeVisible={Boolean(user.pause_json)}
          onClickMoveToQualifier={() => {
            setSelUser(user);
            setIsMovedToQualifiedDialogOpen(true);
          }}
          onClickRemoveModule={() => {
            setSelUser(user);
            setIsDeleteMemberDialogOpen(true);
          }}
          onClickResumeInterview={() => {
            setSelUser(user);
            setIsResumeDialogOpen(true);
          }}
          onClickPauseInterview={() => {
            setSelUser(user);
            setIsPauseDialogOpen(true);
          }}
        />
      </PopoverContent>
    </Popover>
  );
};
