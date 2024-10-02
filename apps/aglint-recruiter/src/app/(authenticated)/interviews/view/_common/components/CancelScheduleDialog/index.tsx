import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@components/ui/dialog';
import { Label } from '@components/ui/label';
import { RadioGroup, RadioGroupItem } from '@components/ui/radio-group';
import axios from 'axios';
import { Loader2 } from 'lucide-react';
import { useEffect, useState } from 'react';

import { useTenant } from '@/company/hooks';
import { UIButton } from '@/components/Common/UIButton';
import { UITextArea } from '@/components/Common/UITextArea';
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
  setIsDeclineOpen: (_open: boolean) => void;
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
  const { recruiter, recruiter_user } = useTenant();

  const [reason, setReason] = useState('');
  const [notes, setNotes] = useState('');
  const [isSaving, setIsSaving] = useState(false);
  const reasons = recruiter?.scheduling_reason?.internal?.cancellation || [
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
          cancel_user_id: recruiter_user?.user_id ?? '',
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
      onOpenChange={(open) => {
        if (!open) {
          setIsDeclineOpen(false);
          closeDialog();
        }
      }}
    >
      <DialogContent className='sm:max-w-[500px]'>
        <DialogHeader>
          <DialogTitle>Cancel Schedule Initial Screening</DialogTitle>
          <DialogDescription>
            Please provide a reason for canceling and any additional notes.
          </DialogDescription>
        </DialogHeader>
        <div className='space-y-4'>
          <RadioGroup value={reason} onValueChange={setReason}>
            {reasons.map((rea) => (
              <div key={rea} className='flex items-center space-x-2'>
                <RadioGroupItem value={rea} id={`radio-${rea}`} />
                <Label htmlFor={`radio-${rea}`}>{rea}</Label>
              </div>
            ))}
          </RadioGroup>

          <div className='space-y-2'>
            <Label htmlFor='notes' className='text-base font-medium'>
              Additional Notes
            </Label>
            <UITextArea
              value={notes}
              placeholder='Add additional notes.'
              onChange={(e) => {
                setNotes(e.target.value);
              }}
            />
          </div>
        </div>
        <DialogFooter>
          <UIButton
            variant='outline'
            onClick={() => {
              setIsDeclineOpen(false);
              closeDialog();
            }}
          >
            Close
          </UIButton>
          <UIButton
            variant='destructive'
            disabled={isSaving || !reason}
            onClick={onClickConfirm}
          >
            {isSaving ? (
              <Loader2 className='mr-2 h-4 w-4 animate-spin' />
            ) : null}
            Cancel Schedule
          </UIButton>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default CancelScheduleDialog;
