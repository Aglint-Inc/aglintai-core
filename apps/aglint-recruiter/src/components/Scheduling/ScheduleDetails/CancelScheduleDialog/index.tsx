import { RadioGroupItem } from '@components/ui/radio-group';
import { Dialog, Stack, TextField, Typography } from '@mui/material';
import axios from 'axios';
import { X } from 'lucide-react';
import React, { type Dispatch, useEffect, useState } from 'react';

import { UIButton } from '@/components/Common/UIButton';
import { useAuthDetails } from '@/context/AuthContext/AuthContext';
import { type ApiBodyParamsCancelSchedule } from '@/pages/api/scheduling/application/cancelschedule';
import toast from '@/utils/toast';

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
  const [isSaving, setIsSaving] = useState(false);
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
      setIsSaving(true);
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
      setIsSaving(false);
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
      <div className='flex items-center justify-center w-[500px]'>
        <div className='bg-white rounded-lg shadow-lg w-full max-w-lg'>
          <div className='flex justify-between items-center p-4 border-b border-gray-200'>
            <h2 className='font-semibold'>Cancel Schedule Initial Screening</h2>
            <UIButton
              onClick={() => {
                setIsDeclineOpen(false);
                closeDialog();
              }}
              variant='ghost'
              size='sm'
            >
              <X className='w-4 h-4' />
            </UIButton>
          </div>
          <div className='p-4'>
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
          </div>
          <div className='flex justify-end p-4 border-t border-gray-200 gap-2'>
            <UIButton
              variant='secondary'
              onClick={() => {
                setIsDeclineOpen(false);
                closeDialog();
              }}
            >
              Close
            </UIButton>
            <UIButton
              variant='destructive'
              isLoading={isSaving}
              onClick={() => {
                if (reason && !isSaving) {
                  onClickConfirm();
                }
              }}
            >
              Cancel Schedule
            </UIButton>
          </div>
        </div>
      </div>
    </Dialog>
  );
}

export default CancelScheduleDialog;
