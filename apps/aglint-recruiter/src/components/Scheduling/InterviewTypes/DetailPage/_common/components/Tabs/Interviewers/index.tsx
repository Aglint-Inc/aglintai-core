import { Avatar, AvatarFallback } from '@components/ui/avatar';
import { Card, CardContent } from '@components/ui/card';
import { MoreVertical, PersonStanding } from 'lucide-react';

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

import AddMemberDialog from '../../../dialogs/AddMemberDialog';
import MuiAvatar from '@/components/Common/MuiAvatar';
import { ModuleType } from '@/pages/api/scheduling/fetch_interview_module_by_id';
import { useState } from 'react';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@components/ui/popover';
import { Button } from '@components/ui/button';
import { MemberListCardOption } from '@devlink2/MemberListCardOption';
import { useModuleAndUsers } from '../../../hooks/useModuleAndUsers';
import PauseDialog from '../../../dialogs/PauseDialog';

function Interviewers() {
  const { data: editModule } = useModuleAndUsers();

  const allUsers = editModule?.relations || [];

  const filtererdUsers: {
    name: string;
    image: string;
    role: string;
    today: string;
    week: string;
    load: number;
    rating: number;
    rel: ReturnType<typeof useModuleAndUsers>['data']['relations'][0];
  }[] = allUsers
    .filter((rel) => rel.training_status === 'qualified' && !rel.is_archived)
    .map((rel) => ({
      name: rel.full_name,
      image: rel.recruiter_user.profile_image,
      role: rel.recruiter_user.position,
      today: rel.textTodayInterview,
      load: 0,
      rating: 0,
      week: rel.textWeekInterview,
      rel,
    }));

  console.log(filtererdUsers);

  const headers = {
    name: 'Name',
    today: 'Today',
    week: 'Week',
    load: 'Load',
    rating: 'Rating',
    trainingStatus: 'Training Status',
  };

  return (
    <>
      <AddMemberDialog />
      <PauseDialog />
      <div className='flex justify-between'>
        <UITextField
          placeholder='Search interviewers...'
          className='max-w-sm bg-white'
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
                {Object.keys(headers).map((key) => (
                  <th
                    key={key}
                    className='p-4 text-left text-sm font-medium text-gray-700'
                  >
                    {headers[key]}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtererdUsers.map((interviewer, index) => (
                <tr
                  key={index}
                  className='border-b last:border-b-0 hover:bg-gray-50'
                >
                  <td className='p-4'>
                    <div className='flex items-center space-x-3'>
                      <MuiAvatar
                        src={interviewer.image}
                        level={interviewer.name}
                        variant='rounded-medium'
                      />
                      <div>
                        <div className='font-medium text-gray-900'>
                          {interviewer.name}
                        </div>
                        <div className='text-sm text-gray-500'>
                          {interviewer.role}
                        </div>
                      </div>
                    </div>
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
                      textBadge={interviewer.load}
                    />
                  </td>
                  <td className='p-4'>
                    <UIBadge color='neutral' textBadge={interviewer.rating} />
                  </td>

                  <td className='p-4'>
                    <UIButton
                      variant='ghost'
                      size='sm'
                      className='text-gray-500 hover:text-gray-700'
                    >
                      <ThreeDot user={interviewer.rel} />
                    </UIButton>
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
        <Button variant='ghost' size='sm'>
          <MoreVertical className='h-4 w-4' />
        </Button>
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
