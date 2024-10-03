import AddMemberDialog from '../../dialogs/AddMemberDialog';
import DeleteMemberDialog from '../../dialogs/DeleteMemberDialog';
import PauseDialog from '../../dialogs/PauseDialog';
import ResumeMemberDialog from '../../dialogs/ResumeMemberDialog';
import { useModulesStore } from '../../stores/store';

const Dialogs = () => {
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
