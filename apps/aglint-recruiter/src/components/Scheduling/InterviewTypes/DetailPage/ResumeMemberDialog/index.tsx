import { Dialog } from '@mui/material';
import dayjs from 'dayjs';
import { useState } from 'react';

import { ButtonSoft } from '@/devlink/ButtonSoft';
import { ButtonSolid } from '@/devlink/ButtonSolid';
import { DcPopup } from '@/devlink/DcPopup';
import { Text } from '@/devlink/Text';

import { usePauseHandler } from '../../queries/hooks';
import { setIsResumeDialogOpen, useModulesStore } from '../../store';

function ResumeMemberDialog({ editModule }: { editModule: any }) {
  const isResumeDialogOpen = useModulesStore(
    (state) => state.isResumeDialogOpen,
  );
  const selUser = useModulesStore((state) => state.selUser);
  const [isSaving, setIsSaving] = useState(false);

  const { resumeHandler } = usePauseHandler();

  return (
    <Dialog
      open={isResumeDialogOpen}
      onClose={() => {
        if (!isSaving) setIsResumeDialogOpen(false);
      }}
    >
      <DcPopup
        popupName={'Resume Member'}
        onClickClosePopup={{
          onClick: () => {
            if (!isSaving) setIsResumeDialogOpen(false);
          },
        }}
        slotBody={
          <Text
            color={'neutral'}
            content={`This member is currently paused from scheduling for this interview until  ${selUser?.pause_json?.isManual ? 'you resume' : dayjs(selUser?.pause_json?.end_date).format('MMMM DD YYYY')}`}
          />
        }
        slotButtons={
          <>
            <ButtonSoft
              size={2}
              color={'neutral'}
              textButton={'Cancel'}
              onClickButton={{
                onClick: () => {
                  setIsResumeDialogOpen(false);
                },
              }}
            />
            <ButtonSolid
              size={2}
              color={'accent'}
              textButton={'Resume'}
              isLoading={isSaving}
              onClickButton={{
                onClick: async () => {
                  if (selUser.id && !isSaving) {
                    setIsSaving(true);
                    await resumeHandler({
                      module_id: editModule.id,
                      user_id: selUser.user_id,
                    });
                    setIsSaving(false);
                    setIsResumeDialogOpen(false);
                  }
                },
              }}
            />
          </>
        }
      />
    </Dialog>
  );
}

export default ResumeMemberDialog;
