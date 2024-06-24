import { InterviewSessionRelationTypeDB } from '@aglint/shared-types';
import { Dialog, Stack, TextField, Typography } from '@mui/material';
import axios from 'axios';
import React, { Dispatch, useEffect, useState } from 'react';

import { Checkbox } from '@/devlink/Checkbox';
import { DeletePopup } from '@/devlink3/DeletePopup';
import { useAuthDetails } from '@/src/context/AuthContext/AuthContext';
import { ApiBodyParamsCancelSchedule } from '@/src/pages/api/scheduling/application/cancelschedule';
import { supabase } from '@/src/utils/supabase/client';
import toast from '@/src/utils/toast';

import { addScheduleActivity } from '../../Candidates/queries/utils';
import { ScheduleMeeting } from '../types';

function CancelScheduleDialog({
  isDeclineOpen,
  setIsDeclineOpen,
  sessionRelation,
  schedule,
  refetch
}: {
  isDeclineOpen: boolean;
  setIsDeclineOpen: Dispatch<React.SetStateAction<boolean>>;
  sessionRelation: InterviewSessionRelationTypeDB;
  schedule: ScheduleMeeting;
  refetch: () => void;
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
    setReason('Too Many Interviews');
  }, []);

  const onClickConfirm = async () => {
    try {
      if (sessionRelation?.id) {
        const req_body: ApiBodyParamsCancelSchedule = {
          cancel_user_id: recruiterUser.user_id,
          meeting_id: schedule.interview_meeting.id,
          session_id: schedule.interview_session.id,
          notes,
          reason,
        };

        addScheduleActivity({
          title: `Canceled ${schedule.interview_session.name}. Reason: ${reason} `,
          application_id: schedule.schedule.application_id,
          logged_by: 'user',
          supabase: supabase,
          created_by: recruiterUser.user_id,
        });

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
                    <Checkbox isChecked={rea === reason} />
                    <Typography variant='body1' color={'var(--neutral-12)'}>
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
