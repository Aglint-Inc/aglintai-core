import { getFullName } from '@aglint/shared-utils';

import { useTeamMembers } from '@/company/hooks/useTeamMembers';
import { useAuthDetails } from '@/context/AuthContext/AuthContext';
import { useMemberList } from '@/hooks/useMemberList';
import { useRouterPro } from '@/hooks/useRouterPro';
import ROUTES from '@/utils/routing/routes';

import { useInterviewer } from '../../hooks/useInterviewer';
import EditAdminDialog from './Dialog/EditAdminDialog';
import { EditUserDialog } from './Dialog/EditUserDialog';

export const EditUser = ({ isOpen, setIsOpen }) => {
  const router = useRouterPro();
  const { recruiterUser } = useAuthDetails();
  const { activeMembers } = useTeamMembers();
  const user_id = router.params.user as string;
  const { refetch: interviewerDetailsRefetch } = useInterviewer();

  const { data: members, refetch: memberListRefetch } = useMemberList();
  const details = members?.find((member) => member.user_id === user_id);

  const isAdmin = recruiterUser.role === 'admin';

  return (
    <>
      {isAdmin ? (
        <EditAdminDialog
          open={Boolean(isOpen)}
          memberList={activeMembers
            .map((mem) => ({
              id: mem.user_id,
              name: getFullName(mem.first_name, mem?.last_name),
            }))
            .filter((mem) => mem.id !== recruiterUser.user_id)}
          member={details}
          refetch={async () => {
            await interviewerDetailsRefetch();
            await memberListRefetch();
          }}
          onClose={() => {
            setIsOpen(null);
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
