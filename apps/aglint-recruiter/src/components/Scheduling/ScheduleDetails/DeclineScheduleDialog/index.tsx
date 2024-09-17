import { type InterviewSessionRelationTypeDB } from '@aglint/shared-types';
import { type InterviewerDeclineMetadata } from '@aglint/shared-types/src/db/tables/application_logs.types';
import { useToast } from '@components/hooks/use-toast';
import { RadioGroupItem } from '@components/ui/radio-group';
import { Stack, Typography } from '@mui/material';
import React, { type Dispatch, useEffect, useState } from 'react';

import { UIButton } from '@/components/Common/UIButton';
import UIDialog from '@/components/Common/UIDialog';
import { UITextArea } from '@/components/Common/UITextArea';
import { useAuthDetails } from '@/context/AuthContext/AuthContext';
import { addScheduleActivity } from '@/utils/scheduling/utils';
import { supabase } from '@/utils/supabase/client';

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
    <>
      <UIDialog
        open={isDeclineOpen}
        title='Decline Schedule'
        onClose={() => {
          setIsDeclineOpen(false);
        }}
        slotButtons={
          <>
            <UIButton
              size='sm'
              variant='secondary'
              onClick={() => {
                setIsDeclineOpen(false);
              }}
            >
              Cancel
            </UIButton>
            <UIButton
              onClick={() => {
                onClickConfirm();
              }}
            >
              Decline
            </UIButton>
          </>
        }
      >
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
                  <RadioGroupItem
                    value={rea}
                    checked={rea === reason}
                    id={`radio-${rea}`}
                  />
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
          <UITextArea
            value={notes}
            placeholder='Add additional notes.'
            onChange={(e) => {
              setNotes(e.target.value);
            }}
          />
        </Stack>
      </UIDialog>
    </>
  );
}

export default DeclineScheduleDialog;
