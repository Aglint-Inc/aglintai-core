import UISelectDropDown from '@/components/Common/UISelectDropDown';
import { useInterviewModules } from '@/queries/interview-modules';

import {
  setEditSession,
  setSelectedInterviewers,
  setTrainingInterviewers,
  setTrainingToggle,
  useEditSessionDrawerStore,
} from './store';

function ModuleDropdown() {
  const interviewModules = useInterviewModules();

  const { editSession } = useEditSessionDrawerStore((state) => ({
    editSession: state.editSession,
  }));

  const filterArchivedModules =
    interviewModules?.data?.filter(
      (module) =>
        editSession?.interview_session.module_id === module.id ||
        !module.is_archived,
    ) || [];
  return (
    <>
      <UISelectDropDown
        fullWidth
        value={editSession.interview_session.module_id}
        menuOptions={filterArchivedModules.map((module) => ({
          value: module.id,
          name: module.name,
        }))}
        onValueChange={(value) => {
          setEditSession({
            interview_session: {
              ...editSession.interview_session,
              module_id: value,
            },
          });
          setSelectedInterviewers([]);
          setTrainingInterviewers([]);
          setTrainingToggle(false);
        }}
      />
    </>
  );
}

export default ModuleDropdown;
