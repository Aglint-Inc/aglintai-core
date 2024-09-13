import { type PauseJson } from '@aglint/shared-types';
import { Card, CardContent } from '@components/ui/card';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@components/ui/popover';
import { MemberListCardOption } from '@devlink2/MemberListCardOption';
import { cn } from '@lib/utils';
import { MoreVertical, PersonStanding } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';

import MuiAvatar from '@/components/Common/MuiAvatar';
import { UIBadge } from '@/components/Common/UIBadge';
import { UIButton } from '@/components/Common/UIButton';
import UITextField from '@/components/Common/UITextField';
import {
  setIsAddMemberDialogOpen,
  setIsDeleteMemberDialogOpen,
  setIsPauseDialogOpen,
  setIsResumeDialogOpen,
  setSelUser,
  setTrainingStatus,
} from '@/components/Scheduling/InterviewTypes/store';
import ROUTES from '@/utils/routing/routes';

import AddMemberDialog from '../../../dialogs/AddMemberDialog';
import DeleteMemberDialog from '../../../dialogs/DeleteMemberDialog';
import PauseDialog from '../../../dialogs/PauseDialog';
import ResumeMemberDialog from '../../../dialogs/ResumeMemberDialog';
import { useModuleAndUsers } from '../../../hooks/useModuleAndUsers';
import { getPauseMemberText } from '../../../utils/utils';

function Interviewers() {
  const { data: editModule } = useModuleAndUsers();
  const [search, setSearch] = useState('');

  const allUsers = editModule?.relations || [];

  const filtererdUsers: {
    name: string;
    image: string;
    role: string;
    today: string;
    week: string;
    load: number;
    rel: ReturnType<typeof useModuleAndUsers>['data']['relations'][0];
  }[] = allUsers
    .filter(
      (rel) =>
        rel.training_status === 'qualified' &&
        !rel.is_archived &&
        rel.full_name.toLowerCase().includes(search.toLowerCase()),
    )
    .map((rel) => ({
      name: rel.full_name,
      image: rel.recruiter_user.profile_image,
      role: rel.recruiter_user.position,
      today: rel.textTodayInterview,
      load: rel.week_load,
      week: rel.textWeekInterview,
      rel,
    }));

  const headers = {
    name: 'Name',
    today: 'Today',
    week: 'Week',
    load: 'Week Load',
    actions: '',
  };

  return (
    <>
      <DeleteMemberDialog />
      <AddMemberDialog />
      <PauseDialog />
      <ResumeMemberDialog />
      <div className='flex justify-between'>
        <UITextField
          placeholder='Search interviewers...'
          className='max-w-sm bg-white'
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <UIButton
          variant='default'
          leftIcon={<PersonStanding />}
          onClick={() => {
            setIsAddMemberDialogOpen(true);
            setTrainingStatus('qualified');
          }}
        >
          Add Interviewer
        </UIButton>
      </div>
      <Card>
        <CardContent className='p-0'>
          <table className='w-full'>
            <thead>
              <tr className='border-b bg-gray-50'>
                {Object.keys(headers).map((key, ind) => (
                  <th
                    key={key}
                    className={cn(
                      'p-4 text-left text-sm font-medium text-gray-700',
                      ind === Object.keys(headers).length - 1
                        ? 'rounded-tr-lg'
                        : ind === 0
                          ? 'rounded-tl-lg'
                          : '',
                    )}
                  >
                    {headers[key]}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtererdUsers.length === 0 && (
                <tr>
                  <td colSpan={5} className='p-4'>
                    No data found
                  </td>
                </tr>
              )}
              {filtererdUsers.map((interviewer, index) => (
                <tr
                  key={index}
                  className='border-b last:border-b-0 hover:bg-gray-50'
                >
                  <td className='p-4'>
                    <Link
                      href={ROUTES['/user/profile/[user_id]']({
                        user_id: interviewer.rel.recruiter_user.user_id,
                      })}
                    >
                      <div className='flex items-center space-x-3'>
                        <MuiAvatar
                          src={interviewer.image}
                          level={interviewer.name}
                          variant='rounded-medium'
                        />
                        <div>
                          <div className='font-medium text-gray-900 flex flex-row gap-2'>
                            {interviewer.name}
                            {interviewer.rel.pause_json && (
                              <UIBadge
                                size='sm'
                                color='warning'
                                textBadge={getPauseMemberText(
                                  interviewer.rel.pause_json as PauseJson,
                                )}
                              />
                            )}
                          </div>
                          <div className='text-sm text-gray-500'>
                            {interviewer.role}
                          </div>
                        </div>
                      </div>
                    </Link>
                  </td>
                  <td className='p-4 text-gray-700'>{interviewer.today}</td>
                  <td className='p-4 text-gray-700'>{interviewer.week}</td>
                  <td className='p-4'>
                    <UIBadge
                      color={
                        interviewer.load > 50
                          ? 'error'
                          : interviewer.load > 25
                            ? 'warning'
                            : 'success'
                      }
                      textBadge={interviewer.load + '%'}
                    />
                  </td>

                  <td className='p-4'>
                    <ThreeDot user={interviewer.rel} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </CardContent>
      </Card>
    </>
  );
}

export default Interviewers;

const ThreeDot = ({
  user,
}: {
  user: ReturnType<typeof useModuleAndUsers>['data']['relations'][0];
}) => {
  const [open, setOpen] = useState(false);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <UIButton variant='secondary' size='sm' icon={<MoreVertical />} />
      </PopoverTrigger>
      <PopoverContent className='w-auto p-0 rounded-md relative'>
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
