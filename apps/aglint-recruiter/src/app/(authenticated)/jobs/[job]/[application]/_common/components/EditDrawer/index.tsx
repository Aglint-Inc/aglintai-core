import { UIButton } from '@/components/Common/UIButton';
import UIDrawer from '@/components/Common/UIDrawer';
import UITextField from '@/components/Common/UITextField';

import { ScheduleTypeField } from '../../../../(job-edit)/interview-plan/_common/components/sessionForms';
import { useEditSession } from '../../hooks/useEditSession';
import {
  setEditSession,
  useEditSessionDrawerStore,
} from '../../stores/editSessionDrawer';
import DebriedForm from './DebriefFrom';
import SessionDuration from './DurationDropdown';
import InterviewModeComp from './InterviewMode';
import ModuleDropdown from './ModuleDropdown';

function SideDrawerEdit() {
  const { isEditOpen } = useEditSessionDrawerStore((state) => ({
    isEditOpen: state.isEditOpen,
  }));

  const { editSession, saving, errorValidation } = useEditSessionDrawerStore(
    (state) => ({
      editSession: state.editSession,
      saving: state.saving,
      errorValidation: state.errorValidation,
    }),
  );

  const { handleClose, handleSave } = useEditSession();

  return (
    <UIDrawer
      open={isEditOpen}
      onClose={() => {
        if (!saving) handleClose();
      }}
      size='sm'
      title='Edit Session'
      slotBottom={
        <>
          <UIButton fullWidth variant='secondary' onClick={() => handleClose()}>
            Cancel
          </UIButton>
          <UIButton
            fullWidth
            variant='default'
            disabled={errorValidation.some((err) => err.error)}
            isLoading={Boolean(saving)}
            onClick={() => {
              if (!saving) {
                handleSave();
              }
            }}
          >
            Save
          </UIButton>
        </>
      }
    >
      <div className='p-4'>
        {editSession &&
        editSession.interview_session.session_type !== 'debrief' ? (
          <div className='flex flex-col space-y-4'>
            <div>
              <UITextField
                label='Name'
                placeholder='Session name'
                value={editSession.interview_session.name}
                onChange={(e) =>
                  setEditSession({
                    interview_session: {
                      ...editSession.interview_session,
                      name: e.target.value,
                    },
                  })
                }
                error={
                  errorValidation.find((err) => err.field === 'session_name')
                    ?.error
                }
                helperText={
                  errorValidation.find((err) => err.field === 'session_name')
                    ?.message
                }
              />
            </div>
            <SessionDuration />
            <ModuleDropdown />
            <ScheduleTypeField
              value={editSession.interview_session.schedule_type}
              handleTypeChange={(value) => {
                setEditSession({
                  interview_session: {
                    ...editSession.interview_session,
                    schedule_type: value,
                  },
                });
              }}
            />
            <InterviewModeComp />
          </div>
        ) : (
          editSession && <DebriedForm />
        )}
      </div>
    </UIDrawer>
  );
}

export default SideDrawerEdit;
