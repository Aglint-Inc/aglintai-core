import { DatabaseEnums } from '@aglint/shared-types';
import { Dialog, Radio, Stack, TextField, Typography } from '@mui/material';
import axios from 'axios';
import React, { Dispatch, useEffect, useState } from 'react';

import { DeletePopup } from '@/devlink3/DeletePopup';
import { useAuthDetails } from '@/src/context/AuthContext/AuthContext';
import { ApiBodyParamsCancelSchedule } from '@/src/pages/api/scheduling/application/cancelschedule';
import { supabase } from '@/src/utils/supabase/client';
import toast from '@/src/utils/toast';

import { addScheduleActivity } from '../../Candidates/queries/utils';

function CancelScheduleDialog({
  isDeclineOpen,
  setIsDeclineOpen,
  refetch,
  meeting_id,
  session_id,
  application_id,
  session_name,
  meeting_flow,
}: {
  isDeclineOpen: boolean;
  setIsDeclineOpen: Dispatch<React.SetStateAction<boolean>>;
  refetch: () => void;
  meeting_id: string;
  session_id: string;
  application_id: string;
  session_name: string;
  meeting_flow: DatabaseEnums['meeting_flow'];
}) {
  const { recruiter, recruiterUser } = useAuthDetails();

  const [reason, setReason] = useState('');
  const [notes, setNotes] = useState('');
  const reasons = recruiter.scheduling_reason?.internal?.cancellation || [
    'Too Many Interviews',
    'Out of the office',
    'Scheduling conflicts',
    'Illness or emergency',
  ];

  useEffect(() => {
    setReason(reasons[0]);
  }, []);

  const onClickConfirm = async () => {
    try {
      const req_body: ApiBodyParamsCancelSchedule = {
        cancel_user_id: recruiterUser.user_id,
        meeting_id,
        session_id,
        notes,
        reason,
        application_id,
        meeting_flow,
      };

      await axios.post('/api/scheduling/application/cancelschedule', {
        ...req_body,
      });

      addScheduleActivity({
        title: `Canceled ${session_name}. Reason: ${reason} `,
        application_id,
        logged_by: 'user',
        supabase: supabase,
        created_by: recruiterUser.user_id,
      });

      refetch();
    } catch {
      toast.error('Unable to save cancel reason');
    } finally {
      setIsDeclineOpen(false);
    }
  };

  return (
    <Dialog
      open={isDeclineOpen}
      onClose={() => {
        setIsDeclineOpen(false);
      }}
    >
      <DeletePopup
        textTitle={'Cancel Schedule'}
        textDescription=''
        isIcon={false}
        isWidget={true}
        slotWidget={
          <Stack spacing={2} width={'100%'}>
            <Typography variant='body1'>
              Please provide a reason for canceling and any additional notes.
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
                    <Radio checked={rea === reason} />
                    <Typography
                      variant='body1'
                      color={'var(--neutral-12)'}
                      sx={{
                        cursor: 'pointer',
                      }}
                    >
                      {rea}
                    </Typography>
                  </Stack>
                );
              })}
            </Stack>

            <Typography variant='body1'>Additional Notes</Typography>
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

export default CancelScheduleDialog;
