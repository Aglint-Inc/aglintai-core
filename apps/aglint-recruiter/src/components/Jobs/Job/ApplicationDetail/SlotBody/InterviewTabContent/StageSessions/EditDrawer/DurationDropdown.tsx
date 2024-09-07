
import { getBreakLabel } from '@/components/Jobs/Job/Interview-Plan/utils';
import { sessionDurations } from '@/utils/scheduling/const';

import UISelectDropDown from '@/components/Common/UISelectDropDown';
import { setEditSession, useEditSessionDrawerStore } from './store';

function SessionDuration() {
  const { editSession } = useEditSessionDrawerStore((state) => ({
    editSession: state.editSession,
  }));

  return (
    <>
      <UISelectDropDown
        fullWidth
        value={editSession.interview_session.session_duration.toString()}
        menuOptions={sessionDurations.map((dur) => ({
          name: getBreakLabel(dur),
          value: dur.toString(),
        }))}
        onValueChange={(value) => {
          setEditSession({
            interview_session: {
              ...editSession.interview_session,
              session_duration: parseInt(value),
            },
          });
        }}
      />
    </>
  );
}

export default SessionDuration;
