import React from 'react';

import AddMemberDialog from '../../dialogs/AddMemberDialog';
import DeleteMemberDialog from '../../dialogs/DeleteMemberDialog';
import PauseDialog from '../../dialogs/PauseDialog';
import ResumeMemberDialog from '../../dialogs/ResumeMemberDialog';
import { useModuleAndUsers } from '../../hooks/useModuleAndUsers';
import { useModulesStore } from '../../stores/store';

const Dialogs = () => {
  const { data } = useModuleAndUsers();

  const selUser = useModulesStore((state) => state.selUser);

  return (
    <>
      {selUser && <DeleteMemberDialog />}
      <AddMemberDialog />
      <PauseDialog />
      <ResumeMemberDialog />
    </>
  );
};

export default Dialogs;
