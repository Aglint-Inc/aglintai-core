import { Dialog } from '@mui/material';
import dayjs from 'dayjs';

import { ResumePop } from '@/devlink3';
import { supabase } from '@/src/utils/supabase/client';
import toast from '@/src/utils/toast';

import {
  setEditModule,
  setIsResumeDialogOpen,
  useSchedulingStore
} from '../../store';

function ResumeMemberDialog() {
  const isResumeDialogOpen = useSchedulingStore(
    (state) => state.isResumeDialogOpen
  );
  const editModule = useSchedulingStore((state) => state.editModule);
  const selUser = useSchedulingStore((state) => state.selUser);

  const resumeHandler = async () => {
    try {
      if (selUser.user_id) {
        const { error } = await supabase
          .from('interview_module_relation')
          .update({ pause_json: null })
          .match({ module_id: editModule.id, user_id: selUser.user_id });
        if (!error) {
          setEditModule({
            ...editModule,
            relations: editModule.relations.map((rel) =>
              rel.user_id === selUser.user_id
                ? { ...rel, pause_json: null }
                : rel
            )
          });
        }
      } else {
        throw new Error();
      }
    } catch {
      toast.error('Error resuming user');
    } finally {
      setIsResumeDialogOpen(false);
    }
  };

  return (
    <Dialog
      sx={{
        '& .MuiDialog-paper': {
          background: 'transparent',
          border: 'none',
          borderRadius: '10px'
        }
      }}
      open={isResumeDialogOpen}
      onClose={() => {
        setIsResumeDialogOpen(false);
      }}
    >
      <ResumePop
        textResumeWarning={`This member is paused from scheduling until ${selUser?.pause_json?.isManual ? 'you resume' : dayjs(selUser?.pause_json?.end_date).format('MMMM DD YYYY')}`}
        onClickClose={{
          onClick: () => {
            setIsResumeDialogOpen(false);
          }
        }}
        onClickResume={{
          onClick: () => {
            if (selUser.id) resumeHandler();
          }
        }}
      />
    </Dialog>
  );
}

export default ResumeMemberDialog;
