import { useToast } from '@components/hooks/use-toast';
import { Button } from '@components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@components/ui/dropdown-menu';
import axios from 'axios';
import { Lock, Mail, MoreHorizontal, Pen, Power, Trash } from 'lucide-react';
import { useState } from 'react';

import { useTenant, type useTenantMembers } from '@/company/hooks';
import { useMemberUpdate } from '@/company/hooks/useMemberUpdate';
import { useCancelInvite } from '@/company/hooks/useTeamMembers';
import { useRouterPro } from '@/hooks/useRouterPro';
import { type API_reset_password } from '@/pages/api/reset_password/type';
import { api } from '@/trpc/client';

import DeleteMemberDialog from './DeleteMemberDialog';

export const UserListThreeDot = ({
  member,
}: {
  member: ReturnType<typeof useTenantMembers>['data'][number];
}) => {
  const { toast } = useToast();
  const { updateMember } = useMemberUpdate();
  const { mutateAsync: reinviteUser } =
    api.tenant['resend-invite'].useMutation();
  const { cancelInvite } = useCancelInvite();
  const [dialogReason, setDialogReason] = useState<
    'delete' | 'suspend' | 'cancel_invite' | null
  >(null);
  const router = useRouterPro();
  const { recruiter_user } = useTenant();
  const canSuspend = member.role !== 'admin';

  const handleAction = (
    action:
      | 'edit'
      | 'resend'
      | 'activate'
      | 'suspend'
      | 'cancel_invite'
      | 'delete'
      | 'reset_password',
  ) => {
    switch (action) {
      case 'edit':
        router.push(`/user/${member.user_id}?edit_enable=true`);
        break;
      case 'resend': {
        reinviteUser({ email: member.email })
          .then(() => {
            toast({
              variant: 'default',
              title: 'Invite sent successfully.',
            });
          })
          .catch(() => {
            toast({
              variant: 'destructive',
              title: 'Failed to resend invite',
            });
          });
        break;
      }
      case 'activate':
        updateMember({ user_id: member.user_id, status: 'active' }).then(() => {
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
    updateMember({ user_id: member.user_id, status: 'suspended' }).then(() => {
      toast({
        description: `${member.first_name}'s account is suspended successfully.`,
      });
      setDialogReason(null);
    });
  };

  const handleRemove = () => {
    removeMember();
  };

  const removeMember = async () => {
    if (recruiter_user.user_id === member.user_id) {
      toast({
        variant: 'destructive',
        title: "Can't remove Your own account.",
      });
    }
    if (member.status !== 'invited' && member.role === 'admin') {
      toast({
        variant: 'destructive',
        title: "Can't remove Admin account.",
      });
    } else {
      try {
        await cancelInvite({ user_id: member.user_id });
      } catch (error) {
        toast({
          variant: 'destructive',
          title:
            "This member is tied to an active schedule, so removal is unavailable until it's finished.",
        });
        return null;
      }
    }
  };

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant='outline' className='h-8 w-8 p-0'>
            <MoreHorizontal className='h-4 w-4' />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align='end'>
          {member.status !== 'invited' && (
            <DropdownMenuItem onClick={() => handleAction('edit')}>
              <Pen className='mr-2 h-4 w-4' /> Edit
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
            recruiter_user.user_id !== member.user_id && (
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
            recruiter_user.user_id !== member.user_id && (
              <DropdownMenuItem onClick={() => handleAction('reset_password')}>
                <Lock className='mr-2 h-4 w-4' /> Reset Password
              </DropdownMenuItem>
            )}
        </DropdownMenuContent>
      </DropdownMenu>
      {!!dialogReason && (
        <DeleteMemberDialog
          name={`${member.first_name} ${member.last_name}`.trim()}
          action={dialogReason === 'suspend' ? handleSuspend : handleRemove}
          role={member.role}
          reason={dialogReason}
          close={() => setDialogReason(null)}
        />
      )}
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
