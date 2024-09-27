import { getFullName } from '@aglint/shared-utils';
import { type Dispatch, type SetStateAction } from 'react';

import { useTenant } from '@/company/hooks';
import { useTeamMembers } from '@/company/hooks/useTeamMembers';
import { useMemberList } from '@/hooks/useMemberList';
import { useRouterPro } from '@/hooks/useRouterPro';
import ROUTES from '@/utils/routing/routes';

import { useInterviewer } from '../../hooks/useInterviewer';
import EditAdminDialog from './Dialog/EditAdminDialog';
import { EditUserDialog } from './Dialog/EditUserDialog';

export type activeMembersType = NonNullable<
  ReturnType<typeof useTeamMembers>['activeMembers']
>;
export type memberDetailsType = NonNullable<
  ReturnType<typeof useMemberList>['data']
>[number];

export const EditUser = ({
  isOpen,
  setIsOpen,
}: {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
}) => {
  const router = useRouterPro();
  const { recruiter_user } = useTenant();
  const { activeMembers } = useTeamMembers();
  const user_id = router.params.user as string;
  const { refetch: interviewerDetailsRefetch } = useInterviewer();

  const { data: members, refetch: memberListRefetch } = useMemberList();
  const details = members?.find(
    (member) => member.user_id === user_id,
  ) as memberDetailsType;

  const isAdmin = recruiter_user?.role === 'admin';

  const actMembers = activeMembers as activeMembersType;

  return (
    <>
      {isAdmin ? (
        <EditAdminDialog
          open={Boolean(isOpen)}
          memberList={actMembers
            .map((mem) => ({
              id: mem.user_id ?? '',
              name: getFullName(mem?.first_name ?? '', mem?.last_name ?? ''),
            }))
            .filter((mem) => mem.id !== recruiter_user.user_id)}
          member={details}
          refetch={async () => {
            await interviewerDetailsRefetch();
            await memberListRefetch();
          }}
          onClose={() => {
            setIsOpen(false);
            //remove query param
            router.push(
              ROUTES['/user/[user]']({
                user_id: user_id,
              }),
            );
          }}
        />
      ) : (
        <EditUserDialog
          isOpen={isOpen}
          setIsOpen={setIsOpen}
          interviewerDetailsRefetch={interviewerDetailsRefetch}
        />
      )}
    </>
  );
};
