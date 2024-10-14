import { Label } from '@components/ui/label';
import { RadioGroup, RadioGroupItem } from '@components/ui/radio-group';
import { UIAlert } from '@components/ui-alert';
import React, { type ComponentProps } from 'react';

import { UIButton } from '@/components/Common/UIButton';
import UIDialog from '@/components/Common/UIDialog';
import { UITextArea } from '@/components/Common/UITextArea';
import { capitalizeFirstLetter } from '@/utils/text/textUtils';

import { useHandleReschedule } from '../hooks/useHandleReschedule';
import {
  setIsRescheduleCancelOpen,
  setOtherDetails,
  setReason,
  useCandidateInviteStore,
} from '../store/store';
import { type ConfirmedInvitePage } from '.';

function RequestCancelDialog({
  reasons,
  meetings,
  application_id,
  filter_json_id,
  candidate_name,
}: {
  reasons: string[];
  meetings: ComponentProps<typeof ConfirmedInvitePage>['meetings'];
  application_id: string;
  filter_json_id: string | null;
  candidate_name: string;
}) {
  const isCancelRescheduleDialogOpen = useCandidateInviteStore(
    (state) => state.isCancelRescheduleDialogOpen,
  );
  const other_details = useCandidateInviteStore((state) => state.other_details);
  const reason = useCandidateInviteStore((state) => state.reason);

  const { mutate, isPending } = useHandleReschedule({
    filter_json_id,
    meetings,
    application_id,
    candidate_name,
  });

  return (
    <UIDialog
      open={isCancelRescheduleDialogOpen === 'cancel'}
      onClose={() => setIsRescheduleCancelOpen(null)}
      title={'Cancel Interview'}
      slotButtons={
        <>
          <UIButton
            variant='secondary'
            onClick={() => setIsRescheduleCancelOpen(null)}
          >
            Close
          </UIButton>
          <UIButton
            isLoading={isPending}
            variant='default'
            onClick={async () =>
              await mutate({
                reason: reason,
                type: 'candidate_request_decline',
                other_details,
              })
            }
          >
            Cancel Interview
          </UIButton>
        </>
      }
    >
      <CancelSchedile
        slotRadioText={reasons.map((item, i) => (
          <div key={i} className='flex items-center space-x-2'>
            <RadioGroup>
              <RadioGroupItem
                checked={item === reason}
                value={reason}
                onClick={() => {
                  setReason(item);
                }}
                id={`radio-${item + 1}`}
              />
            </RadioGroup>
            <Label htmlFor={item} className='text-sm'>
              {capitalizeFirstLetter(item)}
            </Label>
          </div>
        ))}
        slotInputAdditionalNotes={
          <UITextArea
            className='resize-none'
            placeholder='Add additional notes.'
            rows={6}
            value={other_details?.note}
            fullWidth
            onChange={(e) =>
              setOtherDetails({ ...other_details, note: e.target.value })
            }
          />
        }
      />
    </UIDialog>
  );
}

export default RequestCancelDialog;

interface RequestRescheduleProps {
  slotRadioText: React.ReactNode;
  slotInputAdditionalNotes: React.ReactNode;
}

export function CancelSchedile({
  slotRadioText,
  slotInputAdditionalNotes,
}: RequestRescheduleProps) {
  return (
    <div className='space-y-4'>
      <UIAlert type='warning' title='Consider Rescheduling'>
        If you wish to keep this job opportunity open, consider opting for
        rescheduling rather than canceling.
      </UIAlert>
      <div className='space-y-4'>
        <Label className='text-sm text-neutral-600'>
          Please provide a reason to cancel.
          {slotRadioText}
        </Label>
      </div>
      <div className='space-y-2'>
        <Label className='text-sm text-neutral-600'>
          Additional Notes
          {slotInputAdditionalNotes}
        </Label>
      </div>
    </div>
  );
}
