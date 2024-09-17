import { Label } from '@components/ui/label';
import { RadioGroupItem } from '@components/ui/radio-group';
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
      <div className='flex w-[500px] items-center justify-center'>
        <div className='w-full max-w-lg rounded-lg bg-white shadow-lg'>
          <div className='flex items-center justify-between border-b border-gray-200 p-4'>
            <h2 className='font-semibold'>Cancel Schedule Initial Screening</h2>
            <UIButton
              onClick={() => {
                setIsDeclineOpen(false);
                closeDialog();
              }}
              variant='ghost'
              size='sm'
            >
              <X className='h-4 w-4' />
            </UIButton>
          </div>
          <div className='p-4'>
            <div className='w-full space-y-2'>
              <p className='text-base'>
                Please provide a reason for canceling and any additional notes.
              </p>
              <div className='space-y-1'>
                {reasons.map((rea) => {
                  return (
                    <div
                      key={rea}
                      className='flex cursor-pointer items-center space-x-2'
                      onClick={() => {
                        setReason(rea);
                      }}
                    >
                      <RadioGroupItem
                        value={rea}
                        checked={rea === reason}
                        id={`radio-${rea}`}
                      />
                      <span
                        className='text-base text-neutral-800'
                        sx={{
                          cursor: 'pointer',
                        }}
                      >
                        {rea}
                      </span>
                    </div>
                  );
                })}
              </div>

              <Label className='text-base font-medium'>Additional Notes</Label>
              <TextField
                multiline
                value={notes}
                minRows={3}
                placeholder='Add additional notes.'
                onChange={(e) => {
                  setNotes(e.target.value);
                }}
              />
            </div>
          </div>
          <div className='flex justify-end gap-2 border-t border-gray-200 p-4'>
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
