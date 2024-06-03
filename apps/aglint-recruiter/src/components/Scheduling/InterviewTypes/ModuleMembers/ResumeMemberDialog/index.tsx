import { Dialog } from '@mui/material';
import dayjs from 'dayjs';

import { ResumePop } from '@/devlink3/ResumePop';

import { usePauseHandler } from '../../queries/hooks';
import { setIsResumeDialogOpen, useModulesStore } from '../../store';

function ResumeMemberDialog({ editModule }: { editModule: any }) {
  const isResumeDialogOpen = useModulesStore(
    (state) => state.isResumeDialogOpen,
  );
  const selUser = useModulesStore((state) => state.selUser);

  const { resumeHandler } = usePauseHandler();

  return (
    <Dialog
      open={isResumeDialogOpen}
      onClose={() => {
        setIsResumeDialogOpen(false);
      }}
    >
      <ResumePop
        textResumeWarning={`This member is currently paused from scheduling for this interview until  ${selUser?.pause_json?.isManual ? 'you resume' : dayjs(selUser?.pause_json?.end_date).format('MMMM DD YYYY')}`}
        onClickClose={{
          onClick: () => {
            setIsResumeDialogOpen(false);
          },
        }}
        onClickResume={{
          onClick: async () => {
            if (selUser.id) {
              await resumeHandler({
                module_id: editModule.id,
                user_id: selUser.user_id,
              });
              setIsResumeDialogOpen(false);
            }
          },
        }}
      />
    </Dialog>
  );
}

export default ResumeMemberDialog;
