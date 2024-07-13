import { Dialog, Radio, Stack, TextField, Typography } from '@mui/material';
import axios from 'axios';
import React, { Dispatch, useEffect, useState } from 'react';

import { DeletePopup } from '@/devlink3/DeletePopup';
import { useAuthDetails } from '@/src/context/AuthContext/AuthContext';
import { ApiBodyParamsCancelSchedule } from '@/src/pages/api/scheduling/application/cancelschedule';
import toast from '@/src/utils/toast';

function CancelScheduleDialog({
  isDeclineOpen,
  setIsDeclineOpen,
  refetch,
  metaDetails,
  closeDialog,
  application_log_id,
}: {
  isDeclineOpen: boolean;
  setIsDeclineOpen: Dispatch<React.SetStateAction<boolean>>;
  refetch: () => void;
  metaDetails: {
    meeting_id: string;
    session_id: string;
    application_id: string;
    session_name: string;
  }[];
  application_log_id: string | null; // used for removing cancel button from activities after cancelling
  closeDialog: () => void;
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
      const promises = metaDetails.map(async (meta) => {
        const req_body: ApiBodyParamsCancelSchedule = {
          cancel_user_id: recruiterUser.user_id,
          meeting_id: meta.meeting_id,
          session_id: meta.session_id,
          notes,
          reason,
          application_id: meta.application_id,
          application_log_id,
        };
        return axios.post(
          '/api/scheduling/application/cancelschedule',
          req_body,
        );
      });

      await Promise.all(promises);
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
        closeDialog();
      }}
    >
      <DeletePopup
        textTitle={`Cancel Schedule ${metaDetails.map((meta) => meta.session_name).join(', ')}`}
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
            closeDialog();
          },
        }}
        onClickDelete={{
          onClick: () => {
            if (reason) {
              onClickConfirm();
            }
          },
        }}
        buttonText={'Cancel'}
      />
    </Dialog>
  );
}

export default CancelScheduleDialog;
