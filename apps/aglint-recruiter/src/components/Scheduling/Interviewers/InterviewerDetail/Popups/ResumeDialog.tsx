import { Dialog } from '@mui/material';
import React from 'react';

import { ButtonSoft } from '@/devlink/ButtonSoft';
import { ButtonSolid } from '@/devlink/ButtonSolid';
import { DcPopup } from '@/devlink/DcPopup';
import { Text } from '@/devlink/Text';
import dayjs from '@/src/utils/dayjs';
import { supabase } from '@/src/utils/supabase/client';

import { useModuleRelations } from '../hooks';
import {
  setIsPauseDialogOpen,
  setIsResumeDialogOpen,
  useInterviewerDetailStore,
} from '../store';

function ResumeDialog() {
  const [isSaving, setIsSaving] = React.useState(false);

  const { isResumeDialogOpen, selRelation } = useInterviewerDetailStore(
    (state) => ({
      isResumeDialogOpen: state.isResumeDialogOpen,
      selRelation: state.selRelation,
    }),
  );
  const { refetch } = useModuleRelations({
    user_id: selRelation?.user_id,
  });

  const resume = async () => {
    try {
      setIsSaving(true);
      await supabase
        .from('interview_module_relation')
        .update({ pause_json: null })
        .eq('id', selRelation.id)
        .throwOnError();

      await refetch();

      setIsPauseDialogOpen(false);
    } catch (e) {
      //
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <Dialog
      open={isResumeDialogOpen}
      onClose={() => {
        setIsPauseDialogOpen(false);
      }}
    >
      <DcPopup
        popupName={'Resume Member'}
        onClickClosePopup={{
          onClick: () => {
            setIsResumeDialogOpen(false);
          },
        }}
        slotBody={
          <Text
            color={'neutral'}
            content={`This member is currently paused from scheduling for this interview until  ${selRelation?.pause_json?.isManual ? 'you resume' : dayjs(selRelation?.pause_json?.end_date).format('MMMM DD YYYY')}`}
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
                  if (!isSaving) {
                    setIsSaving(true);
                    await resume();
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

export default ResumeDialog;
