import dayjs from 'dayjs';
import { useState } from 'react';

import { UIButton } from '@/components/Common/UIButton';
import UIDialog from '@/components/Common/UIDialog';

import { useModuleAndUsers } from '../../hooks/useModuleAndUsers';
import { useResumeHandler } from '../../hooks/useResumeHandler';
import { setIsResumeDialogOpen, useModulesStore } from '../../stores/store';

function ResumeMemberDialog() {
  const isResumeDialogOpen = useModulesStore(
    (state) => state.isResumeDialogOpen,
  );
  const selUser = useModulesStore((state) => state.selUser);
  const [isSaving, setIsSaving] = useState(false);
  const { data: editModule } = useModuleAndUsers();

  const { resumeHandler } = useResumeHandler();

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
            size='sm'
            onClick={() => setIsResumeDialogOpen(false)}
          >
            Cancel
          </UIButton>
          <UIButton
            isLoading={isSaving}
            variant='default'
            size='sm'
            onClick={async () => {
              if (isSaving) return;
              else {
                setIsSaving(true);
                await resumeHandler({
                  module_id: editModule.id,
                  user_id: selUser.user_id,
                  editModule,
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
      <p className='text-muted-foreground'>
        This member is currently paused from scheduling for this interview until{' '}
        {selUser?.pause_json?.isManual
          ? 'you resume'
          : dayjs(selUser?.pause_json?.end_date).format('MMMM DD YYYY')}
      </p>
    </UIDialog>
  );
}

export default ResumeMemberDialog;
