import { type Dispatch, type SetStateAction } from 'react';

import { useTenant } from '@/company/hooks';
import { useRouterPro } from '@/hooks/useRouterPro';
import ROUTES from '@/utils/routing/routes';

import { useInterviewer } from '../../hooks/useInterviewer';
import EditAdminDialog from './Dialog/EditAdminDialog';
import { EditUserDialog } from './Dialog/EditUserDialog';

export const EditUser = ({
  isOpen,
  setIsOpen,
}: {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
}) => {
  const router = useRouterPro();
  const { recruiter_user } = useTenant();

  const user_id = router.params.user as string;
  const { refetch: interviewerDetailsRefetch } = useInterviewer();

  const isAdmin = recruiter_user?.role === 'admin';

  return (
    <>
      {isAdmin ? (
        <EditAdminDialog
          open={Boolean(isOpen)}
          onClose={() => {
            setIsOpen(false);
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
