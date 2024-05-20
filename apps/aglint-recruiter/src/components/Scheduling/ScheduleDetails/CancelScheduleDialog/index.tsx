import { InterviewSessionRelationTypeDB } from '@aglint/shared-types';
import { Dialog, Stack, TextField, Typography } from '@mui/material';
import axios from 'axios';
import React, { Dispatch, useEffect, useState } from 'react';

import { Checkbox } from '@/devlink/Checkbox';
import { DeletePopup } from '@/devlink3/DeletePopup';
import { useAuthDetails } from '@/src/context/AuthContext/AuthContext';
import { ApiBodyParamsCancelSchedule } from '@/src/pages/api/scheduling/application/cancelschedule';
import toast from '@/src/utils/toast';

import { useScheduleDetails } from '../hooks';

function CancelScheduleDialog({
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
  const { recruiter, recruiterUser } = useAuthDetails();

  const [reason, setReason] = useState('');
  const [notes, setNotes] = useState('');
  const { refetch } = useScheduleDetails();
  const reasons = recruiter.scheduling_reason?.internal?.cancellation || [
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
        const req_body: ApiBodyParamsCancelSchedule = {
          cancel_user_id: recruiterUser.user_id,
          meeting_id,
          session_id,
          notes,
          reason,
        };
        await axios.post('/api/scheduling/application/cancelschedule', {
          ...req_body,
        });
        refetch();
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

export default CancelScheduleDialog;
