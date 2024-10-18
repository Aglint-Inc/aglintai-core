import { type PauseJson } from '@aglint/shared-types';
import { EmptyState } from '@components/empty-state';
import { Avatar, AvatarFallback, AvatarImage } from '@components/ui/avatar';
import { Card, CardContent } from '@components/ui/card';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@components/ui/popover';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@components/ui/table';
import { UIBadge } from '@components/ui-badge';
import { MoreVertical, Pause, Play, Plus, Trash2, User } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';

import { getPauseMemberText } from '@/authenticated/utils';
import { UIButton } from '@/components/Common/UIButton';
import UITextField from '@/components/Common/UITextField';
import ROUTES from '@/utils/routing/routes';

import { useModuleAndUsers } from '../../../hooks/useModuleAndUsers';
import {
  setIsAddMemberDialogOpen,
  setIsDeleteMemberDialogOpen,
  setIsPauseDialogOpen,
  setIsResumeDialogOpen,
  setSelUser,
  setTrainingStatus,
} from '../../../stores/store';

function Interviewers() {
  const { data: editModule } = useModuleAndUsers();
  const [search, setSearch] = useState('');

  const allUsers = editModule?.relations || [];

  const filtererdUsers: {
    name: string;
    image: string | null;
    role: string | null;
    today: string;
    week: string;
    load: number;
    rel: NonNullable<
      ReturnType<typeof useModuleAndUsers>['data']
    >['relations'][0];
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

  return (
    <>
      <div className='mb-4 flex justify-between'>
        <UITextField
          placeholder='Search interviewers...'
          className='w-64'
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <UIButton
          variant='default'
          onClick={() => {
            setIsAddMemberDialogOpen(true);
            setTrainingStatus('qualified');
          }}
        >
          Add Interviewer
        </UIButton>
      </div>
      <Card className='overflow-hidden border border-border shadow-none'>
        <CardContent className='overflow-hidden p-0'>
          <Table className='overflow-hidden'>
            <TableHeader className='overflow-hidden bg-muted'>
              <TableHead className='w-4/12'>Name</TableHead>
              <TableHead className='w-2/12'>Today</TableHead>
              <TableHead className='w-2/12'>Week</TableHead>
              <TableHead className='w-2/12'>Week Load</TableHead>
              <TableHead className='w-2/12'></TableHead>
            </TableHeader>
            <TableBody>
              {filtererdUsers.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={5} className='text-center'>
                    <EmptyState
                      variant='inline'
                      icon={User}
                      description='No interviewers found'
                      primarySlot={
                        <UIButton
                          variant='outline'
                          onClick={() => {
                            setIsAddMemberDialogOpen(true);
                            setTrainingStatus('qualified');
                          }}
                          size='sm'
                        >
                          <Plus className='mr-2 h-4 w-4' />
                          Add Interviewer now
                        </UIButton>
                      }
                    />
                  </TableCell>
                </TableRow>
              ) : (
                filtererdUsers.map((interviewer) => (
                  <TableRow
                    key={interviewer.rel.recruiter_user.user_id}
                    className='group'
                  >
                    <TableCell className='w-4/12'>
                      <Link
                        href={
                          interviewer.rel.recruiter_user.user_id
                            ? ROUTES['/user/[user]']({
                                user_id: interviewer.rel.recruiter_user.user_id,
                              })
                            : ''
                        }
                      >
                        <div className='flex items-center space-x-3'>
                          <Avatar className='h-8 w-8'>
                            <AvatarImage
                              src={interviewer.image ?? ''}
                              alt={interviewer.name}
                            />
                            <AvatarFallback>
                              {interviewer.name.charAt(0)}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <div className='flex flex-row gap-2 font-medium'>
                              <div> {interviewer.name}</div>
                              {interviewer.rel.pause_json && (
                                <UIBadge
                                  size='sm'
                                  variant='warning'
                                  textBadge={getPauseMemberText(
                                    interviewer.rel.pause_json as PauseJson,
                                  )}
                                />
                              )}
                            </div>
                            <div className='text-sm text-muted-foreground'>
                              {interviewer.role}
                            </div>
                          </div>
                        </div>
                      </Link>
                    </TableCell>
                    <TableCell className='w-2/12'>
                      {interviewer.today}
                    </TableCell>
                    <TableCell className='w-2/12'>{interviewer.week}</TableCell>
                    <TableCell className='w-2/12'>
                      <UIBadge
                        variant={
                          interviewer.load > 50
                            ? 'destructive'
                            : interviewer.load > 25
                              ? 'warning'
                              : 'success'
                        }
                        textBadge={interviewer.load + '%'}
                      />
                    </TableCell>
                    <TableCell className='w-2/12'>
                      <Popover>
                        <PopoverTrigger asChild>
                          <div className='invisible flex justify-end group-hover:visible'>
                            <UIButton variant='ghost' size='sm'>
                              <MoreVertical className='h-4 w-4' />
                            </UIButton>
                          </div>
                        </PopoverTrigger>
                        <PopoverContent
                          align='start'
                          side='bottom'
                          className='w-[150px] cursor-pointer rounded-md border border-border p-2'
                        >
                          <div className='flex flex-col'>
                            {interviewer.rel.pause_json ? (
                              <div
                                className='flex cursor-pointer items-center rounded-sm p-2 hover:bg-muted'
                                onClick={() => {
                                  setSelUser(interviewer.rel);
                                  setIsResumeDialogOpen(true);
                                }}
                              >
                                <Play className='mr-2 h-4 w-4' />
                                Resume
                              </div>
                            ) : (
                              <div
                                className='flex cursor-pointer items-center rounded-sm p-2 hover:bg-muted'
                                onClick={() => {
                                  setSelUser(interviewer.rel);
                                  setIsPauseDialogOpen(true);
                                }}
                              >
                                <Pause className='mr-2 h-4 w-4' />
                                Pause
                              </div>
                            )}
                            <div
                              className='flex cursor-pointer items-center rounded-sm p-2 hover:bg-muted'
                              onClick={() => {
                                setSelUser(interviewer.rel);
                                setIsDeleteMemberDialogOpen(true);
                              }}
                            >
                              <Trash2 className='mr-2 h-4 w-4' />
                              Remove
                            </div>
                          </div>
                        </PopoverContent>
                      </Popover>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </>
  );
}

export default Interviewers;
