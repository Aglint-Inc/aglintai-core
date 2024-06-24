import { InterviewSessionRelationTypeDB } from '@aglint/shared-types';
import { InterviewerDeclineMetadata } from '@aglint/shared-types/src/db/tables/application_logs.types';
import { Dialog, Stack, TextField, Typography } from '@mui/material';
import React, { Dispatch, useEffect, useState } from 'react';

import { Checkbox } from '@/devlink/Checkbox';
import { DeletePopup } from '@/devlink3/DeletePopup';
import { useAuthDetails } from '@/src/context/AuthContext/AuthContext';
import { supabase } from '@/src/utils/supabase/client';
import toast from '@/src/utils/toast';

import { addScheduleActivity } from '../../Candidates/queries/utils';
import { ScheduleMeeting } from '../types';

function DeclineScheduleDialog({
  isDeclineOpen,
  setIsDeclineOpen,
  sessionRelation,
  schedule,
  refetch,
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

  const reasons = recruiter.scheduling_reason?.internal?.decline || [
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
        const { error: errorSelRel } = await supabase
          .from('interview_session_relation')
          .update({ accepted_status: 'declined' })
          .eq('id', sessionRelation.id);

        if (errorSelRel) throw new Error();

        const { error } = await supabase
          .from('interview_session_cancel')
          .insert({
            reason,
            session_relation_id: sessionRelation.id,
            type: 'declined',
            session_id: schedule.interview_session.id,
            other_details: {
              dateRange: null,
              note: notes,
            },
          });
        if (error) throw new Error();

        const metadata: InterviewerDeclineMetadata = {
          meeting_id: schedule.interview_meeting.id,
          reason,
          other_details: {
            dateRange: null,
            note: notes,
          },
          response_type: 'cancel',
          type: 'interviewer_decline',
          action: 'waiting',
        };

        addScheduleActivity({
          title: `Declined ${schedule.interview_session.name}. Reason: ${reason} `,
          application_id: schedule.schedule.application_id,
          logged_by: 'user',
          supabase: supabase,
          created_by: recruiterUser.user_id,
          metadata,
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
        textTitle={'Decline Schedule'}
        textDescription=''
        isIcon={false}
        isWidget={true}
        slotWidget={
          <Stack spacing={2} width={'100%'}>
            <Typography variant='body1'>
              Please provide a reason for declineing and any additional notes.
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

export default DeclineScheduleDialog;
