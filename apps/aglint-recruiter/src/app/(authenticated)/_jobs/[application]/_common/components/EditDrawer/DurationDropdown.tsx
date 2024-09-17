import UISelectDropDown from '@/components/Common/UISelectDropDown';
import { getBreakLabel } from '@/utils/getBreakLabel';
import { sessionDurations } from '@/utils/scheduling/const';

import { setEditSession, useEditSessionDrawerStore } from '../../stores/editSessionDrawer';

function SessionDuration() {
  const { editSession } = useEditSessionDrawerStore((state) => ({
    editSession: state.editSession,
  }));

  return (
    <>
      <UISelectDropDown
        label='Session Duration'
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
