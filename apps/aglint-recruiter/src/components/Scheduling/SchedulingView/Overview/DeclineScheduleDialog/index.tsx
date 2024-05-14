import { Dialog, Stack, TextField, Typography } from '@mui/material';
import { useQueryClient } from '@tanstack/react-query';
import React, { Dispatch, useEffect, useState } from 'react';

import { Checkbox } from '@/devlink';
import { DeletePopup } from '@/devlink3';
import { useAuthDetails } from '@/src/context/AuthContext/AuthContext';
import { InterviewSessionRelationTypeDB } from '@aglint/shared-types';
import { supabase } from '@/src/utils/supabase/client';
import toast from '@/src/utils/toast';

function DeclineScheduleDialog({
  isDeclineOpen,
  setIsDeclineOpen,
  sessionRelation,
  meeting_id,
  session_id,
}: {
  isDeclineOpen: boolean;
  setIsDeclineOpen: Dispatch<React.SetStateAction<boolean>>;
  sessionRelation: InterviewSessionRelationTypeDB;
  meeting_id: string;
  session_id: string;
}) {
  const { recruiter } = useAuthDetails();
  const queryClient = useQueryClient();

  const [reason, setReason] = useState('');
  const [notes, setNotes] = useState('');

  const reasons = recruiter.scheduling_reason.company.decline || [
    'Too Many Interviews',
    'Out of the office',
    'Scheduling conflicts',
    'Illness or emergency',
  ];

  useEffect(() => {
    setReason('Too Many Interviews');
  }, []);

  const onClickConfirm = async () => {
    try {
      if (sessionRelation?.id) {
        await supabase
          .from('interview_session_relation')
          .update({ accepted_status: 'declined' })
          .eq('id', sessionRelation.id);
        const { error } = await supabase
          .from('interview_session_cancel')
          .insert({
            reason,
            session_relation_id: sessionRelation.id,
            type: 'declined',
            session_id,
            other_details: {
              dateRange: null,
              note: notes,
            },
          });
        if (error) throw new Error();
        queryClient.invalidateQueries({
          queryKey: ['schedule_details', meeting_id],
        });
      }
    } catch {
      toast.error('Unable to save cancel reason');
    } finally {
      setIsDeclineOpen(false);
    }
  };

  return (
    <Dialog
      sx={{
        '& .MuiDialog-paper': {
          background: 'transparent',
          border: 'none',
          borderRadius: '10px',
        },
      }}
      open={isDeclineOpen}
      onClose={() => {
        setIsDeclineOpen(false);
      }}
    >
      <DeletePopup
        textTitle={'Decline Schedule'}
        isIcon={false}
        isWidget={true}
        slotWidget={
          <Stack spacing={2} width={'100%'}>
            <Typography variant='body2'>
              Please provide a reason for reschedule.
            </Typography>
            <Stack spacing={1}>
              {reasons.map((rea) => {
                return (
                  <Stack
                    direction={'row'}
                    key={rea}
                    onClick={() => {
                      setReason(rea);
                    }}
                    alignItems={'center'}
                    spacing={1}
                  >
                    <Checkbox isChecked={rea === reason} />
                    <Typography variant='body2' color={'#000'}>
                      {rea}
                    </Typography>
                  </Stack>
                );
              })}
            </Stack>

            <Typography variant='body2'>Additional Notes</Typography>
            <TextField
              multiline
              value={notes}
              minRows={3}
              placeholder='Add additional notes.'
              onChange={(e) => {
                setNotes(e.target.value);
              }}
            />
          </Stack>
        }
        onClickCancel={{
          onClick: () => {
            setIsDeclineOpen(false);
          },
        }}
        onClickDelete={{
          onClick: () => {
            onClickConfirm();
          },
        }}
        buttonText={'Decline'}
      />
    </Dialog>
  );
}

export default DeclineScheduleDialog;
