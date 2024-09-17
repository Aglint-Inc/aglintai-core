import { getFullName } from '@aglint/shared-utils';
import { useRouter } from 'next/router';

import { useTeamMembers } from '@/components/CompanyDetailComp/TeamManagement';
import EditMember from '@/components/CompanyDetailComp/TeamManagement/EditMemberDialog';
import { useAuthDetails } from '@/context/AuthContext/AuthContext';
import { useMemberList } from '@/hooks/useMemberList';

import { useInterviewer } from '../hook';
import { EditProfileDialog } from './EditProfileDialog';

export const EditUserDialog = ({ isOpen, setIsOpen }) => {
  const router = useRouter();
  const { recruiterUser } = useAuthDetails();
  const { activeMembers } = useTeamMembers();
  const user_id = router.query.user_id as string;
  const { refetch: interviewerDetailsRefetch } = useInterviewer();

  const { data: members } = useMemberList();
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
          refetch={interviewerDetailsRefetch}
          onClose={() => {
            setIsOpen(null);
            //remove query param
            const { pathname, query } = router;
            const updatedQuery = { ...query };
            delete updatedQuery['edit_enable'];
            router.push({
              pathname,
              query: updatedQuery,
            });
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
