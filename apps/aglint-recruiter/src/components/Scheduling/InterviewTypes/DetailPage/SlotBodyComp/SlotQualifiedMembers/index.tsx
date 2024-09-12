import { Button } from '@components/ui/button';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@components/ui/popover';
import { MemberListCardOption } from '@devlink2/MemberListCardOption';
import { FolderOpen, MoreVertical, PersonStanding } from 'lucide-react';
import { useRouter } from 'next/router';
import { useState } from 'react';

import { MemberListCardShadcn } from '@/components/Common/Member/MemberListCard';
import MuiAvatar from '@/components/Common/MuiAvatar';
import { UIButton } from '@/components/Common/UIButton';
import { getFullName } from '@/utils/jsonResume';
import ROUTES from '@/utils/routing/routes';

import {
  setIsAddMemberDialogOpen,
  setIsDeleteMemberDialogOpen,
  setIsPauseDialogOpen,
  setIsResumeDialogOpen,
  setSelUser,
  setTrainingStatus,
} from '../../../store';
import { type ModuleType } from '../../../types';
import { getPauseMemberText } from '../utils';

function SlotQualifiedMembers({ editModule }: { editModule: ModuleType }) {
  const allUsers = editModule.relations;

  const filtererdUsers = allUsers.filter(
    (rel) => rel.training_status === 'qualified' && !rel.is_archived,
  );
  const router = useRouter();

  return (
    <>
      {filtererdUsers.length === 0 && (
        <>
          <div className='flex flex-col items-center p-[60px_20px] text-center border border-neutral-200 rounded-md bg-white'>
            <FolderOpen size={30} strokeWidth={1} />
            <div className='text-gray-600'>No interviewers added yet.</div>
            <div className='mt-2'>
              <UIButton
                variant='outline'
                leftIcon={<PersonStanding />}
                onClick={() => {
                  setIsAddMemberDialogOpen(true);
                  setTrainingStatus('qualified');
                }}
              >
                Add Interviewer
              </UIButton>
            </div>
          </div>
        </>
      )}
      {filtererdUsers.map((user) => {
        const member = user.recruiter_user;
        const userSettings = user.recruiter_user.scheduling_settings;
        const textWeekInterview =
          userSettings.interviewLoad.dailyLimit.type === 'Hours'
            ? `${user.recruiter_user.total_hours_this_week} / ${userSettings.interviewLoad.dailyLimit.value}  ${userSettings.interviewLoad.dailyLimit.type}`
            : `${user.recruiter_user.total_interviews_this_week} / ${userSettings.interviewLoad.dailyLimit.value}  ${userSettings.interviewLoad.dailyLimit.type}`;

        const textTodayInterview =
          userSettings.interviewLoad.dailyLimit.type === 'Hours'
            ? `${user.recruiter_user.total_hours_today} / ${userSettings.interviewLoad.dailyLimit.value}  ${userSettings.interviewLoad.dailyLimit.type}`
            : `${user.recruiter_user.total_interviews_today} / ${userSettings.interviewLoad.dailyLimit.value}  ${userSettings.interviewLoad.dailyLimit.type}`;
        return (
          <>
            <MemberListCardShadcn
              isThreeDotVisible={true}
              isInterviewsVisible
              textWeekInterview={textWeekInterview}
              textTodayInterview={textTodayInterview}
              onClickCard={{
                onClick: () => {
                  router.push(
                    ROUTES['/user/profile/[user_id]']({
                      user_id: user.recruiter_user.user_id,
                    }),
                  );
                },
              }}
              isDropdownIconVisible={false}
              key={user.user_id}
              slotThreeDot={<ThreeDot user={user} />}
              isTrainingProgessVisible={true}
              isTrainingCompletedVisible={false}
              textPauseResumeDate={getPauseMemberText(user.pause_json)}
              isPauseResumeVisible={Boolean(user.pause_json)}
              slotProfileImage={
                <MuiAvatar
                  src={member.profile_image}
                  level={getFullName(member.first_name, member.last_name) || ''}
                  variant='rounded-medium'
                />
              }
              textName={getFullName(member.first_name, member.last_name) || ''}
              textRole={member.position || '--'}
            />
          </>
        );
      })}
      {filtererdUsers.length !== 0 && (
        <div className='pt-2'>
          <UIButton
            variant='outline'
            leftIcon={<PersonStanding />}
            onClick={() => {
              setIsAddMemberDialogOpen(true);
              setTrainingStatus('qualified');
            }}
          >
            Add Interviewer
          </UIButton>
        </div>
      )}
    </>
  );
}

export default SlotQualifiedMembers;

const ThreeDot = ({ user }: { user: ModuleType['relations'][0] }) => {
  const [open, setOpen] = useState(false);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button variant='ghost' size='sm'>
          <MoreVertical className='h-4 w-4' />
        </Button>
      </PopoverTrigger>
      <PopoverContent className='w-auto p-0'>
        <MemberListCardOption
          isMoveToQualifierVisible={false}
          isPauseVisible={!user.pause_json}
          isResumeVisible={Boolean(user.pause_json)}
          onClickRemoveModule={{
            onClick: () => {
              setSelUser(user);
              setIsDeleteMemberDialogOpen(true);
              setOpen(false);
            },
          }}
          onClickResumeInterview={{
            onClick: () => {
              setSelUser(user);
              setIsResumeDialogOpen(true);
              setOpen(false);
            },
          }}
          onClickPauseInterview={{
            onClick: () => {
              setSelUser(user);
              setIsPauseDialogOpen(true);
              setOpen(false);
            },
          }}
        />
      </PopoverContent>
    </Popover>
  );
};
