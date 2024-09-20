import { getFullName } from '@aglint/shared-utils';
import { useTeamMembers } from 'src/app/(authenticated)/_company/_common/components/TeamManagement';
import EditMember from 'src/app/(authenticated)/_company/_common/components/TeamManagement/EditMemberDialog';

import { useAuthDetails } from '@/context/AuthContext/AuthContext';
import { useMemberList } from '@/hooks/useMemberList';
import { useRouterPro } from '@/hooks/useRouterPro';
import ROUTES from '@/utils/routing/routes';

import { useInterviewer } from '../../hooks/useInterviewer';
import { EditProfileDialog } from './EditProfileDialog';

export const EditUserDialog = ({ isOpen, setIsOpen }) => {
  const router = useRouterPro();
  const { recruiterUser } = useAuthDetails();
  const { activeMembers } = useTeamMembers();
  const user_id = router.params.user as string;
  const { refetch: interviewerDetailsRefetch } = useInterviewer();

  const { data: members, refetch: memberListRefetch } = useMemberList();
  const details = members?.find((member) => member.user_id === user_id);

  return (
    <>
      {recruiterUser.role === 'admin' ? (
        <EditMember
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
        <EditProfileDialog
          isOpen={isOpen}
          setIsOpen={setIsOpen}
          interviewerDetailsRefetch={interviewerDetailsRefetch}
        />
      )}
    </>
  );
};
