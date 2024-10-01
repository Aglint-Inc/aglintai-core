import { Skeleton } from '@components/ui/skeleton';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@components/ui/table';
import { RefreshCw, Send, Users } from 'lucide-react';
import type { Dispatch, ReactNode, SetStateAction } from 'react';

import type { useTeamMembers } from '@/company/hooks/useTeamMembers';
import { UIButton } from '@/components/Common/UIButton';

import Member from '../MemberList';

export const TeamManagementUI = ({
  canManage,
  isRemoteSync,
  remote_sync,
  last_sync,
  setOpen,
  filter,
  filteredMembers,
  isTableLoading,
}: {
  canManage: boolean;
  isRemoteSync: boolean;
  remote_sync: () => Promise<void>;
  last_sync: string;
  setOpen: Dispatch<SetStateAction<boolean>>;
  filter: ReactNode;
  filteredMembers: ReturnType<typeof useTeamMembers>['data'];
  isTableLoading: boolean;
}) => {
  return (
    <div className='flex flex-col'>
      <div className='flex justify-between'>
        <div>
          <h2 className='mb-1 text-xl font-semibold'>Manage User</h2>
          <p className='mb-6 text-sm text-muted-foreground'>
            Invite your hiring team members and manage their roles and profile
            details in one place. Assign roles such as interviewer, hiring
            manager, or recruiter to ensure an organized team structure and
            compliance with user permissions in the organization.
          </p>
        </div>

        <div className='row flex justify-end pb-4'>
          {canManage &&
            (isRemoteSync ? (
              <div className='flex flex-col space-y-2'>
                <UIButton
                  variant='outline'
                  size='sm'
                  onClick={remote_sync}
                  className='flex items-center'
                >
                  <RefreshCw className='mr-2 h-4 w-4' />
                  Sync Team ({last_sync})
                </UIButton>
              </div>
            ) : (
              <UIButton
                leftIcon={<Send />}
                variant='default'
                size='sm'
                onClick={() => {
                  setOpen(true);
                }}
                className='flex items-center'
              >
                Invite Member
              </UIButton>
            ))}
        </div>
      </div>

      {filter}

      <div className='mt-6 overflow-x-auto rounded-lg border bg-white'>
        <Table>
          <TableHeader className='bg-gray-100'>
            <TableRow>
              <TableHead>Member</TableHead>
              <TableHead>Location</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>last Active</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isTableLoading ? (
              <TableRow>
                <TableCell colSpan={1}>
                  <div className='space-y-2'>
                    {[...Array(4)].map((_, index) => (
                      <div key={index} className='flex items-center space-x-4'>
                        <Skeleton className='h-12 w-12 rounded-full' />
                        <div className='space-y-2'>
                          <Skeleton className='h-4 w-[250px]' />
                          <Skeleton className='h-4 w-[200px]' />
                        </div>
                      </div>
                    ))}
                  </div>
                </TableCell>
                <TableCell colSpan={5}>
                  <div className='space-y-2'>
                    {[...Array(4)].map((_, index) => (
                      <div key={index} className='flex items-center space-x-4'>
                        <div className='space-y-2'>
                          <Skeleton className='h-4 w-[250px]' />
                          <Skeleton className='h-4 w-[200px]' />
                        </div>
                      </div>
                    ))}
                  </div>
                </TableCell>
              </TableRow>
            ) : filteredMembers.length === 0 ? (
              <TableCell colSpan={6}>
                <div className='flex flex-col items-center justify-center p-8 text-center'>
                  <Users className='mb-2 h-12 w-12 text-gray-400' />
                  <h3 className='mb-1 text-lg font-medium text-gray-900'>
                    No team members
                  </h3>
                  <p className='text-sm text-gray-500'>
                    Get started by adding a new team member.
                  </p>
                </div>
              </TableCell>
            ) : (
              filteredMembers?.map((member) => (
                <Member key={member.user_id} member={member} />
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};
