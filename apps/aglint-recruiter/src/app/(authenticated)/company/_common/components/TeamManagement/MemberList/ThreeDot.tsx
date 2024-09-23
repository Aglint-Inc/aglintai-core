import { useToast } from '@components/hooks/use-toast';
import { Button } from '@components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@components/ui/dropdown-menu';
import axios from 'axios';
import { Edit, Lock, Mail, MoreHorizontal, Power, Trash } from 'lucide-react';
import { useState } from 'react';

import { useAuthDetails } from '@/context/AuthContext/AuthContext';
import { updateMember } from '@/context/AuthContext/utils';
import { useRouterPro } from '@/hooks/useRouterPro';
import { type API_reset_password } from '@/pages/api/reset_password/type';

import { reinviteUser } from '../utils';
import DeleteMemberDialog from './Dialog/DeleteMemberDialog';

export const UserListThreeDot = ({ member }) => {
  const { toast } = useToast();
  const [dialogReason, setDialogReason] = useState(null);
  const router = useRouterPro();
  const { recruiterUser } = useAuthDetails();

  const canSuspend = member.role !== 'admin';

  const handleAction = (action) => {
    switch (action) {
      case 'edit':
        router.push(`/user/${member.user_id}?edit_enable=true`);
        break;
      case 'resend':
        reinviteUser(member.email, recruiterUser.user_id).then(
          ({ error, emailSend }) => {
            if (!error && emailSend) {
              toast({ description: 'Invite sent successfully.' });
            } else {
              toast({ variant: 'destructive', description: error });
            }
          },
        );
        break;
      case 'activate':
        updateMember({
          data: { user_id: member.user_id, status: 'active' },
        }).then(() => {
          toast({
            description: `${member.first_name}'s account is activated successfully.`,
          });
        });
        break;
      case 'suspend':
      case 'cancel_invite':
      case 'delete':
        setDialogReason(action);
        break;
      case 'reset_password':
        resetPassword(member.email)
          .then(() => toast({ description: 'Password reset email sent.' }))
          .catch(() =>
            toast({
              variant: 'destructive',
              description: 'Password reset failed.',
            }),
          );
        break;
    }
  };

  const handleSuspend = () => {
    updateMember({
      data: { user_id: member.user_id, status: 'suspended' },
    }).then(() => {
      toast({
        description: `${member.first_name}'s account is suspended successfully.`,
      });
      setDialogReason(null);
    });
  };

  const handleRemove = () => {
    // Implement your remove logic here
    // For example:
    // deleteMember(member.user_id).then(() => {
    //   toast({ description: `${member.first_name} has been removed from the team.` })
    //   setDialogReason(null)
    // })
  };

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant='ghost' className='h-8 w-8 p-0'>
            <MoreHorizontal className='h-4 w-4' />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align='end'>
          {member.status !== 'invited' && (
            <DropdownMenuItem onClick={() => handleAction('edit')}>
              <Edit className='mr-2 h-4 w-4' /> Edit
            </DropdownMenuItem>
          )}
          {member.status === 'invited' && (
            <DropdownMenuItem onClick={() => handleAction('resend')}>
              <Mail className='mr-2 h-4 w-4' /> Resend Invitation
            </DropdownMenuItem>
          )}
          {canSuspend && member.status === 'suspended' && (
            <DropdownMenuItem onClick={() => handleAction('activate')}>
              <Power className='mr-2 h-4 w-4' /> Activate
            </DropdownMenuItem>
          )}
          {canSuspend &&
            member.status === 'active' &&
            recruiterUser.user_id !== member.user_id && (
              <DropdownMenuItem onClick={() => handleAction('suspend')}>
                <Power className='mr-2 h-4 w-4' /> Suspend
              </DropdownMenuItem>
            )}
          {member.status === 'invited' && (
            <DropdownMenuItem onClick={() => handleAction('cancel_invite')}>
              <Trash className='mr-2 h-4 w-4' /> Cancel Invite
            </DropdownMenuItem>
          )}
          {member.status !== 'invited' &&
            recruiterUser.user_id !== member.user_id && (
              <DropdownMenuItem onClick={() => handleAction('reset_password')}>
                <Lock className='mr-2 h-4 w-4' /> Reset Password
              </DropdownMenuItem>
            )}
        </DropdownMenuContent>
      </DropdownMenu>
      <DeleteMemberDialog
        name={`${member.first_name} ${member.last_name}`.trim()}
        action={dialogReason === 'suspend' ? handleSuspend : handleRemove}
        role={member.role}
        reason={dialogReason}
        close={() => setDialogReason(null)}
      />
    </>
  );
};

const resetPassword = (email: string) => {
  const body: API_reset_password['request'] = { email };
  return axios
    .post<API_reset_password['response']>('/api/reset_password', body)
    .then(({ data }) => {
      if (data.error) throw new Error(data.error);
      return data.passwordReset;
    });
};

export default UserListThreeDot;
