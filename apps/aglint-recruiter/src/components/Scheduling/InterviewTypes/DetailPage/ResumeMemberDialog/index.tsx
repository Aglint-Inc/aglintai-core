import { Text } from '@devlink/Text';
import dayjs from 'dayjs';
import { useState } from 'react';

import { UIButton } from '@/components/Common/UIButton';
import UIDialog from '@/components/Common/UIDialog';
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
    <UIDialog
      open={isResumeDialogOpen}
      onClose={() => {
        if (!isSaving) setIsResumeDialogOpen(false);
      }}
      title={'Resume Member'}
      slotButtons={
        <>
          <UIButton
            variant='secondary'
            onClick={() => setIsResumeDialogOpen(false)}
          >
            Cancel
          </UIButton>
          <UIButton
            isLoading={isSaving}
            variant='default'
            onClick={async () => {
              if (isSaving) return;
              else {
                setIsSaving(true);
                await resumeHandler({
                  module_id: editModule.id,
                  user_id: selUser.user_id,
                });
                setIsSaving(false);
                setIsResumeDialogOpen(false);
              }
            }}
          >
            Resume
          </UIButton>
        </>
      }
    >
      <Text
        color={'neutral'}
        content={`This member is currently paused from scheduling for this interview until  ${selUser?.pause_json?.isManual ? 'you resume' : dayjs(selUser?.pause_json?.end_date).format('MMMM DD YYYY')}`}
      />
    </UIDialog>
  );
}

export default ResumeMemberDialog;
