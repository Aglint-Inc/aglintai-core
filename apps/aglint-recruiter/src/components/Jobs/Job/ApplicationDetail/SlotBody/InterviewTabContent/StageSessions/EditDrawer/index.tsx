import { Drawer, Stack } from '@mui/material';

import { ButtonSoft } from '@/devlink/ButtonSoft';
import { ButtonSolid } from '@/devlink/ButtonSolid';
import { SideDrawerBlock } from '@/devlink2/SideDrawerBlock';
import { SidedrawerBodySession } from '@/devlink2/SidedrawerBodySession';
import UITextField from '@/src/components/Common/UITextField';
import { ScheduleTypeField } from '@/src/components/Jobs/Job/Interview-Plan/sessionForms';

import DebriedForm from './DebriefFrom';
import SessionDuration from './DurationDropdown';
import { useEditSession } from './hooks';
import InterviewModeComp from './InterviewMode';
import ModuleDropdown from './ModuleDropdown';
import { setEditSession, useEditSessionDrawerStore } from './store';

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
    <Drawer
      open={isEditOpen}
      onClose={() => {
        if (!saving) handleClose();
      }}
      anchor='right'
    >
      <Stack overflow={'hidden'}>
        <SideDrawerBlock
          textTitle='Edit Session'
          onClickClose={{
            onClick: () => {
              if (!saving) handleClose();
            },
          }}
          slotSidedrawerBody={
            <Stack>
              {editSession &&
              editSession.interview_session.session_type !== 'debrief' ? (
                <SidedrawerBodySession
                  slotSessionNameInput={
                    <UITextField
                      name={'name'}
                      placeholder={'Session name'}
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
                        errorValidation.find(
                          (err) => err.field === 'session_name',
                        ).error
                      }
                      helperText={
                        errorValidation.find(
                          (err) => err.field === 'session_name',
                        ).message
                      }
                    />
                  }
                  slotDurationDropdown={<SessionDuration />}
                  slotModuleDropdown={<ModuleDropdown />}
                  slotScheduleTypeDropdown={
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
                  }
                  slotInterviewMode={<InterviewModeComp />}
                />
              ) : (
                editSession && <DebriedForm />
              )}
            </Stack>
          }
          slotButton={
            <>
              <ButtonSoft
                textButton='Cancel'
                color={'neutral'}
                size={2}
                onClickButton={{ onClick: () => handleClose() }}
              />
              <ButtonSolid
                isDisabled={errorValidation.some((err) => err.error)}
                textButton='Save'
                size={2}
                isLoading={Boolean(saving)}
                onClickButton={{
                  onClick: () => {
                    if (!saving) {
                      handleSave();
                    }
                  },
                }}
              />
            </>
          }
        />
      </Stack>
    </Drawer>
  );
}

export default SideDrawerEdit;
