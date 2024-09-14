import { getFullName } from '@aglint/shared-utils';
import { useRouter } from 'next/router';

import { useTeamMembers } from '@/components/CompanyDetailComp/TeamManagement';
import EditMember from '@/components/CompanyDetailComp/TeamManagement/EditMemberDialog';
import { useImrQuery } from '@/components/Scheduling/Interviewers/InterviewerDetail/hooks';
import { EditProfileDialog } from '@/components/Scheduling/Interviewers/InterviewerDetail/Popups/EditProfileDialog';
import { useAuthDetails } from '@/context/AuthContext/AuthContext';

import { useInterviewer } from '../hook';

export const EditUserDialog = ({ isOpen, setIsOpen }) => {
  const router = useRouter();
  const { recruiterUser } = useAuthDetails();
  const { activeMembers } = useTeamMembers();
  const user_id = router.query.user_id as string;
  const { data: interviewerDetails } = useImrQuery({ user_id });
  const { refetch: interviewerDetailsRefetch } = useInterviewer();

  return (
    <>
      {' '}
      {recruiterUser.role === 'admin' ? (
        <EditMember
          open={Boolean(isOpen)}
          memberList={activeMembers
            .map((mem) => ({
              id: mem.user_id,
              name: getFullName(mem.first_name, mem?.last_name),
            }))
            .filter((mem) => mem.id !== recruiterUser.user_id)}
          member={interviewerDetails}
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
