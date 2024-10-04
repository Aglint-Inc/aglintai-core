import { dayjsLocal } from '@aglint/shared-utils';
import { Label } from '@components/ui/label';
import { RadioGroup, RadioGroupItem } from '@components/ui/radio-group';
import React, { type ComponentProps } from 'react';

import { UIButton } from '@/components/Common/UIButton';
import { UIDatePicker } from '@/components/Common/UIDatePicker';
import UIDialog from '@/components/Common/UIDialog';
import { UITextArea } from '@/components/Common/UITextArea';
import { capitalizeFirstLetter } from '@/utils/text/textUtils';

import { useHandleReschedule } from '../hooks/useHandleReschedule';
import {
  setDateRange,
  setIsRescheduleCancelOpen,
  setOtherDetails,
  setReason,
  useCandidateInviteStore,
} from '../store/store';
import { type ConfirmedInvitePage } from '.';

function RequestRescheduleDialog({
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
  const dateRange = useCandidateInviteStore((state) => state.dateRange);
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
      open={isCancelRescheduleDialogOpen === 'reschedule'}
      onClose={() => setIsRescheduleCancelOpen(null)}
      title={'Request Reschedule'}
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
            onClick={() => {
              mutate({
                reason: reason,
                type: 'reschedule',
                other_details,
              });
            }}
          >
            Request Reschedule
          </UIButton>
        </>
      }
    >
      <RequestReschedule
        slotDateRangeInput={
          <div className='flex gap-2'>
            <UIDatePicker
              value={new Date(dateRange.startDate)}
              onAccept={(value) => {
                if (dayjsLocal(value) < dayjsLocal(dateRange.startDate)) {
                  setDateRange({
                    startDate: dayjsLocal(value).toISOString(),
                    endDate: dateRange.endDate,
                  });
                } else {
                  setDateRange({
                    startDate: dayjsLocal(value).toISOString(),
                    endDate: '',
                  });
                }
              }}
              closeOnSelect={true}
            />
            <UIDatePicker
              value={new Date(dateRange.endDate)}
              onAccept={(value) => {
                setDateRange({
                  startDate: dateRange.startDate,
                  endDate: dayjsLocal(value).toISOString(),
                });
              }}
              closeOnSelect={true}
            />
          </div>
        }
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

export default RequestRescheduleDialog;

interface RequestRescheduleProps {
  slotDateRangeInput: React.ReactNode;
  slotRadioText: React.ReactNode;
  slotInputAdditionalNotes: React.ReactNode;
}

export function RequestReschedule({
  slotDateRangeInput,
  slotRadioText,
  slotInputAdditionalNotes,
}: RequestRescheduleProps) {
  return (
    <div className='space-y-4'>
      {slotDateRangeInput && (
        <div className='space-y-2'>
          <p className='text-sm text-neutral-600'>
            Please select new dates for your interview and provide a reason for
            the reschedule.
          </p>
          {slotDateRangeInput}
        </div>
      )}

      <div className='space-y-2'>
        <p className='text-sm text-neutral-600'>
          Please provide a reason to cancel.
        </p>
        {slotRadioText}
      </div>

      <div className='space-y-2'>
        <p className='text-sm text-neutral-600'>Additional Notes</p>
        {slotInputAdditionalNotes}
      </div>
    </div>
  );
}
