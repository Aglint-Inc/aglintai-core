import { type InterviewSessionRelationTypeDB } from '@aglint/shared-types';
import { type InterviewerDeclineMetadata } from '@aglint/shared-types/src/db/tables/application_logs.types';
import { Dialog, Radio, Stack, TextField, Typography } from '@mui/material';
import React, { type Dispatch, useEffect, useState } from 'react';

import { useToast } from '@/components/hooks/use-toast';
import { DeletePopup } from '@/devlink3/DeletePopup';
import { useAuthDetails } from '@/src/context/AuthContext/AuthContext';
import { addScheduleActivity } from '@/src/utils/scheduling/utils';
import { supabase } from '@/src/utils/supabase/client';

import { type ScheduleDetailsType } from '../hooks';

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
  schedule: ScheduleDetailsType['schedule_data'];
  refetch: () => void;
}) {
  const { toast } = useToast();
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
    setReason(reasons[0]);
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
          application_id: schedule.application_id,
          logged_by: 'user',
          supabase: supabase,
          created_by: recruiterUser.user_id,
          metadata,
        });

        refetch();
      }
    } catch {
      toast({
        variant: 'destructive',
        title: 'Error',
        description: 'Unable to save cancel reason',
      });
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

export default DeclineScheduleDialog;
