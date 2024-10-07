import UISelectDropDown from '@/components/Common/UISelectDropDown';

import {
  setEditSession,
  useEditSessionDrawerStore,
} from '../../../stores/editSessionDrawer';

function CountDropDown() {
  const { editSession, selectedInterviewers } = useEditSessionDrawerStore(
    (state) => ({
      editSession: state.editSession,
      selectedInterviewers: state.selectedInterviewers,
    }),
  );
  return (
    <UISelectDropDown
      className='w-16'
      fieldSize='small'
      name={'interviewer_cnt'}
      value={editSession!.interview_session.interviewer_cnt.toString() || '1'}
      onValueChange={(value) => {
        setEditSession({
          interview_session: {
            ...editSession!.interview_session,
            interviewer_cnt: Number(value),
          },
        });
      }}
      menuOptions={Array.from(
        { length: selectedInterviewers.length },
        (_, i) => i + 1,
      ).map((num) => ({
        name: num.toString(),
        value: num.toString(),
      }))}
    />
  );
}

export default CountDropDown;
