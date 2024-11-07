import { type InterviewerDeclineMetadata } from '@aglint/shared-types/src/db/tables/application_logs.types';
import { type createInterviewerRequestSchema } from '@aglint/shared-utils';
import { useToast } from '@components/hooks/use-toast';
import { RadioGroup, RadioGroupItem } from '@components/ui/radio-group';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { type z } from 'zod';

import { useTenant } from '@/company/hooks';
import { UIButton } from '@/components/Common/UIButton';
import UIDialog from '@/components/Common/UIDialog';
import { UITextArea } from '@/components/Common/UITextArea';
import { addScheduleActivity } from '@/utils/scheduling/utils';
import { supabase } from '@/utils/supabase/client';

import { useScheduleDetails } from '../../hooks/useScheduleDetails';
import { setIsDeclineDialogOpen, useScheduleDetailsStore } from '../../stores';

function DeclineScheduleDialog() {
  const {
    data: { schedule_data: schedule },
    refetch,
  } = useScheduleDetails();

  const { sessionUser, isDeclineDialogOpen } = useScheduleDetailsStore();
  const { toast } = useToast();
  const { recruiter, recruiter_user } = useTenant();
  const [isSaving, setIsSaving] = useState(false);
  const [reason, setReason] = useState('');
  const [notes, setNotes] = useState('');

  const reasons = recruiter?.scheduling_reason?.internal?.decline || [
    'Too Many Interviews',
    'Out of the office',
    'Scheduling conflicts',
    'Illness or emergency',
  ];

  useEffect(() => {
    setReason(reasons[0]);
  }, []);

  const sessionRelation = sessionUser?.interview_session_relation;

  const onClickConfirm = async () => {
    try {
      setIsSaving(true);
      if (sessionRelation?.id) {
        const payload: z.infer<typeof createInterviewerRequestSchema> = {
          declined_place: 'app',
          session_id: schedule.interview_session.id,
          session_relation_id: sessionRelation.id,
        };
        await axios.post('/api/request/interviewer-request', payload);

        const metadata: InterviewerDeclineMetadata = {
          meeting_id: schedule.interview_meeting.id,
          reason,
          other_details: {
            note: notes ?? '',
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
          created_by: recruiter_user?.user_id ?? '',
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
      setIsDeclineDialogOpen(false);
      setIsSaving(false);
    }
  };

  return (
    <>
      <UIDialog
        open={isDeclineDialogOpen}
        title='Decline Schedule'
        onClose={() => {
          if (!isSaving) return;
          setIsDeclineDialogOpen(false);
        }}
        slotButtons={
          <>
            <UIButton
              size='sm'
              variant='secondary'
              onClick={() => {
                setIsDeclineDialogOpen(false);
              }}
            >
              Cancel
            </UIButton>
            <UIButton
              isLoading={isSaving}
              onClick={() => {
                if (isSaving) return;
                onClickConfirm();
              }}
              data-testid='popup-primary-button'
            >
              Decline
            </UIButton>
          </>
        }
      >
        <div className='w-full space-y-4'>
          <p className='text-base'>
            Please provide a reason for declining and any additional notes.
          </p>
          <div className='space-y-1'>
            <RadioGroup>
              {reasons.map((rea) => {
                return (
                  <div
                    key={rea}
                    className='flex cursor-pointer items-center space-x-2'
                    onClick={() => {
                      setReason(rea);
                    }}
                    data-testid={`popup-decline-radio`}
                  >
                    <RadioGroupItem
                      value={rea}
                      checked={rea === reason}
                      id={`radio-${rea}`}
                    />
                    <span className='cursor-pointer text-sm'>{rea}</span>
                  </div>
                );
              })}
            </RadioGroup>
          </div>

          <UITextArea
            label='Additional Notes'
            value={notes}
            placeholder='Add additional notes.'
            onChange={(e) => {
              setNotes(e.target.value);
            }}
          />
        </div>
      </UIDialog>
    </>
  );
}

export default DeclineScheduleDialog;
